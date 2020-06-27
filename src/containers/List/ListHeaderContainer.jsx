import React, { useState, useCallback } from "react";
import ListHeader from "../../components/List/ListHeader";
import { useDispatch } from "react-redux";
import { changeListTitle } from "../../redux/modules/lists";

const ListHeaderContainer = ({
  dragHandleProps,
  listTitle,
  listId,
  cards,
  boardId,
}) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(listTitle);

  const handleChange = useCallback((e) => {
    setNewTitle(e.target.value);
  }, []);

  const handleSubmit = useCallback(() => {
    if (newTitle === "") return;
    if (newTitle !== listTitle) {
      dispatch(
        changeListTitle({
          listTitle: newTitle,
          listId,
        })
      );
    }
    setIsOpen(false);
  }, [dispatch, newTitle, listTitle, listId]);

  const revertTitle = useCallback(() => {
    setNewTitle(listTitle);
    setIsOpen(false);
  }, [listTitle]);

  const deleteList = useCallback(() => {
    dispatch(deleteList({ cards, listId, boardId }));
  }, [dispatch, cards, listId, boardId]);

  const openTitleEditor = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleButtonKeyDown = useCallback(
    (event) => {
      if (event.keyCode === 13) {
        event.preventDefault();
        openTitleEditor();
      }
    },
    [openTitleEditor]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.keyCode === 13) {
        e.preventDefault();
        handleSubmit();
      }
      if (e.keyCode === 27) {
        revertTitle();
      }
    },
    [handleSubmit, revertTitle]
  );

  return (
    <ListHeader
      dragHandleProps={dragHandleProps}
      listTitle={listTitle}
      isOpen={isOpen}
      newTitle={newTitle}
      handleKeyDown={handleKeyDown}
      handleButtonKeyDown={handleButtonKeyDown}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      openTitleEditor={openTitleEditor}
      deleteList={deleteList}
    />
  );
};

export default ListHeaderContainer;
