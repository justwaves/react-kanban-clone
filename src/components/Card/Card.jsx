import React from "react";
import styled, { css } from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import formatMarkdown from "./formatMarkdown";
import { findCheckboxes } from "../../libs/utils";
import CardBadges from "../CardBadges/CardBadges";
import CardModalContainer from "../../containers/CardModal/CardModalContainer";

const Card = ({
  handleKeyDown,
  handleClick,
  card,
  index,
  listId,
  isDraggingOver,
  isModalOpen,
  toggleCardEditor,
}) => {
  const checkboxes = findCheckboxes(card.text);

  return (
    <>
      <Draggable draggableId={card._id} index={index}>
        {(provided, snapshot) => (
          <>
            <CardTitle
              drag={snapshot.isDragging}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              onClick={(event) => {
                provided.dragHandleProps.onClick(event);
                handleClick(event);
              }}
              onKeyDown={(event) => {
                provided.dragHandleProps.onKeyDown(event);
                handleKeyDown(event);
              }}
              style={{
                ...provided.draggableProps.style,
                background: card.color,
              }}
            >
              <CardTitleHtml
                dangerouslySetInnerHTML={{
                  __html: formatMarkdown(card.text),
                }}
              />
              {(card.date || checkboxes.total > 0) && (
                <CardBadges date={card.date} checkboxes={checkboxes} />
              )}
            </CardTitle>
            {/* Remove placeholder when not dragging over to reduce snapping */}
            {isDraggingOver && provided.placeholder}
          </>
        )}
      </Draggable>
      <CardModalContainer
        isOpen={isModalOpen}
        // cardElement={this.ref}
        card={card}
        listId={listId}
        toggleCardEditor={toggleCardEditor}
      />
    </>
  );
};

export default Card;

const CardTitle = styled.div`
  position: relative;
  box-sizing: border-box;
  margin: 8px 5px 0 5px;
  border-radius: 3px;
  color: #222;
  background: white;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  font-size: 16px;
  overflow-wrap: break-word;
  transition: box-shadow 0.15s;
  user-select: none;
  cursor: pointer !important;

  &:focus {
    box-shadow: 0px 0px 1px 3px rgb(0, 180, 255);

    ${(props) =>
      props.drag &&
      css`
        box-shadow: 1px 9px 8px 1px rgba(0, 0, 0, 0.3) !important;
        opacity: 1 !important;
      `}
  }
`;

const CardTitleHtml = styled.div`
  padding: 6px 8px;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 8px 0;
  }

  img {
    max-width: 100%;
  }

  p {
    margin: 4px 0;
  }

  code,
  pre {
    white-space: pre-wrap;
  }
  pre {
    margin: 4px 0;
    padding: 4px 2px;
    background: rgba(100, 100, 100, 0.08);
  }
`;
