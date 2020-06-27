import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import List from "../List/List";

const BoardWrapper = styled.div`
  display: inline-flex;
  height: 100%;
  min-width: 100%;
`;

const BoardUnderlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  transition: background 0.3s;

  ${(props) =>
    props.color &&
    css`
      background-color: ${props.color};
    `}
`;

const ListWrapper = styled.div`
  display: inline-flex;
  box-sizing: border-box;
  height: 100%;
  padding: 85px 5px 8px 5px;
`;

const Lists = styled.div`
  display: inline-flex;
  align-items: flex-start;
  height: 100%;
  user-select: none;
`;

const Board = ({
  board,
  lists,
  boardTitle,
  boardColor,
  boardId,
  handleDragEnd,
  handleMouseDown,
  handleWheel,
}) => {
  const boardLists = board.lists.map((listId) => {
    return lists[listId];
  });

  return (
    <>
      <BoardWrapper>
        {/* <BoardHeader /> */}
        <ListWrapper onMouseDown={handleMouseDown} onWheel={handleWheel}>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable
              droppableId={boardId}
              type="COLUMN"
              direction="horizontal"
            >
              {(provided) => (
                <Lists ref={provided.innerRef}>
                  {boardLists.map((list, index) => (
                    <List
                      list={list}
                      boardId={boardId}
                      index={index}
                      key={list._id}
                    />
                  ))}
                  {provided.placeholder}
                  {/* <ListAdder boardId={boardId} /> */}
                </Lists>
              )}
            </Droppable>
          </DragDropContext>
        </ListWrapper>
        <BoardUnderlay />
      </BoardWrapper>
    </>
  );
};

Board.propTypes = {
  board: PropTypes.object,
  boardId: PropTypes.string.isRequired,
  boardTitle: PropTypes.string.isRequired,
  boardColor: PropTypes.string.isRequired,
  handleDragEnd: PropTypes.func.isRequired,
  handleMouseDown: PropTypes.func.isRequired,
  handleWheel: PropTypes.func.isRequired,
};

export default React.memo(Board);
