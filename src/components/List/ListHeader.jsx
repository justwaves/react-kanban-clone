import React from "react";
import Textarea from "react-textarea-autosize";
import styled from "styled-components";
import { Button, Wrapper, Menu, MenuItem } from "react-aria-menubutton";

const ListHeaderWrapper = styled.div`
  display: inline-flex;
  flex-shrink: 0;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  font-size: 18px;
`;

const ListTitleButton = styled.div`
  flex-grow: 1;
  min-width: 50%;
  padding: 10px;
  border: none;
  border-top-left-radius: inherit;
  color: white;
  font-weight: 700;
  overflow-wrap: break-word;
  cursor: pointer !important;
`;

const ListTitleTextareaWrapper = styled.div`
  width: 100%;
  padding: 4px 4px 4px 4px;
`;

const ListTitleTextarea = styled(Textarea)`
  float: left;
  box-sizing: border-box;
  width: 100%;
  padding: 6px;
  border-radius: 3px;
  border: 0;
  color: #222;
  font-family: inherit;
  font-size: 18px;
  font-weight: 700;
  line-height: inherit;
  overflow: hidden;
  resize: none;
`;

const DeleteListWrapper = styled(Wrapper)`
  position: relative;
  align-self: flex-start;
`;

const DeleteListButton = styled(Button)`
  display: flex;
  align-items: center;
  margin: 4px;
  padding: 10px;
  border-radius: 8px;
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover,
  &:focus {
    background: rgba(0, 0, 0, 0.5);
  }
`;

const DeleteListMenu = styled(Menu)`
  position: absolute;
  top: 100%;
  left: -60px;
  right: -60px;
  display: flex;
  flex-direction: column;
  margin-top: 4px;
  padding: 5px;
  border-radius: 3px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.6);
  color: #222;
  background: white;
  font-weight: 700;
  text-align: center;
  z-index: 1;
`;

const DeleteListConfirm = styled(MenuItem)`
  margin-top: 5px;
  padding: 8px 30px;
  border-radius: 6px;
  color: white;
  background: red;
  text-align: center;
  cursor: pointer;

  &:hover,
  &:focus {
    background: darkred;
  }
`;

const ListHeader = ({
  dragHandleProps,
  listTitle,
  isOpen,
  newTitle,
  handleButtonKeyDown,
  handleKeyDown,
  handleChange,
  handleSubmit,
  openTitleEditor,
  deleteList,
}) => {
  return (
    <ListHeaderWrapper>
      {isOpen ? (
        <ListTitleTextareaWrapper>
          <ListTitleTextarea
            autoFocus
            useCacheForDOMMeasurements
            value={newTitle}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={handleSubmit}
            spellCheck={false}
          />
        </ListTitleTextareaWrapper>
      ) : (
        <ListTitleButton
          {...dragHandleProps}
          role="button"
          tabIndex={0}
          onClick={openTitleEditor}
          onKeyDown={(event) => {
            handleButtonKeyDown(event);
            dragHandleProps.onKeyDown(event);
          }}
        >
          {listTitle}
        </ListTitleButton>
      )}
      <DeleteListWrapper onSelection={deleteList}>
        <DeleteListButton>delete</DeleteListButton>
        <DeleteListMenu>
          <div className="delete-list-header">Are you sure?</div>
          <DeleteListConfirm>Delete</DeleteListConfirm>
        </DeleteListMenu>
      </DeleteListWrapper>
    </ListHeaderWrapper>
  );
};

export default React.memo(ListHeader);
