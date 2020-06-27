import React from "react";
import styled from "styled-components";
import ClickOutside from "../ClickOutside/ClickOutside";

const BoardAdder = ({
  isOpen,
  title,
  toggleOpen,
  handleChange,
  handleSubmit,
  handleKeyDown,
}) => {
  return isOpen ? (
    <ClickOutside handleClickOutside={toggleOpen}>
      <BoaderAdderWrapper onSubmit={handleSubmit}>
        <SubmitBoardInput
          autoFocus
          type="text"
          value={title}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          spellCheck={false}
        />
        <SubmitBoardButton
          type="submit"
          value="Create"
          disabled={title === ""}
        />
      </BoaderAdderWrapper>
    </ClickOutside>
  ) : (
    <AddBoardButton onClick={toggleOpen}>Add a new board...</AddBoardButton>
  );
};

export default BoardAdder;

const AddBoardButton = styled.button`
  /* @include board-button; */
  margin-bottom: 20px;
  border: 0;
  background: #ddd;
  color: #444;

  &:hover,
  &:focus {
    background: #ccc;
  }
`;

const BoaderAdderWrapper = styled.form`
  box-sizing: border-box;
  width: 260px;
  height: 140px;
  margin: 5px;
  margin-bottom: 20px;
  padding: 8px;
  border-radius: 3px;
  background: #ddd;
  color: #444;
  font-size: 16px;
`;

const SubmitBoardButton = styled.input`
  padding: 8px 12px 8px 12px;
  margin: 8px 0 0 0;
  border: none;
  border-radius: 3px;
  background: #5aac44;
  color: white;
  font-size: 14px;
  font-weight: 700;
  transition: background 0.2s;
  cursor: pointer;

  &:focus,
  &:hover {
    background: #3a8a24;
  }
`;

const SubmitBoardInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 4px;
  border: 0;
  border-radius: 3px;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  font-weight: 700;
  overflow: hidden;
  resize: none;
`;
