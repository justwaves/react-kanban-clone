import React, { useCallback, useState, useEffect } from "react";
import { Redirect } from "react-router";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Board from "../../components/Board/Board";
import { moveList } from "../../redux/modules/boards";
import { moveCard } from "../../redux/modules/lists";
import { putBoardIdInRedux } from "../../redux/modules/currentBoard";

const BoardContainer = () => {
  const dispatch = useDispatch();
  const { boardId } = useParams();
  const { board, lists } = useSelector(({ boards, lists }) => ({
    board: boards[boardId],
    lists: lists,
  }));

  const [startX, setStartX] = useState(null);
  const [startScrollX, setStartScrollX] = useState(null);

  useEffect(() => {
    dispatch(putBoardIdInRedux({ boardId }));
  }, [dispatch, boardId]);

  const handleDragEnd = useCallback(
    ({ source, destination, type }) => {
      if (!destination) {
        return;
      }
      if (type === "COLUMN") {
        if (source.index !== destination.index) {
          dispatch(
            moveList({
              oldListIndex: source.index,
              newListIndex: destination.index,
              boardId: source.droppableId,
            })
          );
        }
        return;
      }

      if (
        source.index !== destination.index ||
        source.droppableId !== destination.droppableId
      ) {
        dispatch(
          moveCard({
            sourceListId: source.droppableId,
            destListId: destination.droppableId,
            oldCardIndex: source.index,
            newCardIndex: destination.index,
            boardId,
          })
        );
      }
    },
    [dispatch, boardId]
  );

  const handleMouseMove = useCallback(
    ({ clientX }) => {
      const scrollX = startScrollX - clientX + startX;
      window.scrollTo(scrollX, 0);
      const windowScrollX = window.scrollX;
      if (scrollX !== windowScrollX) {
        setStartX(clientX + windowScrollX - startScrollX);
      }
    },
    [startScrollX, startX]
  );

  const handleMouseUp = useCallback(() => {
    if (startX) {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      setStartX(null);
      setStartScrollX(null);
    }
  }, [handleMouseMove, startX]);

  const handleMouseDown = useCallback(
    ({ target, clientX }) => {
      if (target.className !== "list-wrapper" && target.className !== "lists") {
        return;
      }
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      setStartX(clientX);
      setStartScrollX(window.scrollX);
    },
    [handleMouseMove, handleMouseUp]
  );

  const handleWheel = useCallback(({ target, deltaY }) => {
    if (
      target.className !== "list-wrapper" &&
      target.className !== "lists" &&
      target.className !== "open-composer-button" &&
      target.className !== "list-title-button"
    ) {
      return;
    }

    if (Math.sign(deltaY) === 1) {
      window.scrollTo(window.scrollX + 80, 0);
    } else if (Math.sign(deltaY) === -1) {
      window.scrollTo(window.scrollX - 80, 0);
    }
  }, []);

  return (
    <>
      {board ? (
        <Board
          board={board}
          lists={lists}
          boardTitle={board.title}
          boardColor={board.color}
          boardId={board._id}
          handleDragEnd={handleDragEnd}
          handleMouseDown={handleMouseDown}
          handleWheel={handleWheel}
        />
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default BoardContainer;
