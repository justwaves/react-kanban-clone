import React, { useState } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import slugify from "slugify";
import shortid from "shortid";
import { addBoard } from "../../redux/modules/boards";
import BoardAdder from "../../components/Home/BoardAdder";

const BoardAdderContainer = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { userId } = useSelector(({ user }) => ({
    userId: user.userId,
  }));

  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "") return;

    const boardId = shortid.generate();

    dispatch(
      addBoard({
        boardTitle: title,
        boardId,
        userId,
      })
    );

    const urlSlug = slugify(title, { lower: true });
    history.push(`/b/${boardId}/${urlSlug}`);

    setIsOpen(false);
    setTitle("");
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      setIsOpen(false);
    }
  };

  return (
    <BoardAdder
      isOpen={isOpen}
      title={title}
      toggleOpen={toggleOpen}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleKeyDown={handleKeyDown}
    />
  );
};

export default BoardAdderContainer;
