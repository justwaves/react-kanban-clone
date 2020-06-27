import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import ListHeaderContainer from "../../containers/List/ListHeaderContainer";
import Cards from "./Cards";

const ListWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  height: 100%;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
`;

const StyledList = styled.div`
  display: inline-flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 300px;
  min-height: 0px; // fix flexbox browser incostiency
  max-height: 100%;
  margin: 0 5px 0 5px;
  border-radius: 8px;
  font-size: 14px;
  transition: box-shadow 0.15s, background 0.3s;

  ${(props) =>
    props.drag &&
    css`
      box-shadow: 1px 3px 8px 2px rgba(0, 0, 0, 0.3) !important;
    `}

  ${(props) =>
    props.color &&
    css`
      background-color: ${props.color};
    `}
`;

const CardsWrapper = styled.div`
  height: 100%;
  margin: 0 3px 6px 3px;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 8px;
    border-radius: 2px;
    background-color: rgba(0, 0, 0, 0.2);
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: rgba(255, 255, 255, 0.4);
  }
`;

// const StyledCards = styled.div`
//   min-height: 1px;
//   margin-bottom: 3px;
// `;

const List = ({ list, boardId, index }) => {
  return (
    <Draggable
      draggableId={list._id}
      index={index}
      disableInteractiveElementBlocking
    >
      {(provided, snapshot) => (
        <>
          <ListWrapper ref={provided.innerRef} {...provided.draggableProps}>
            <StyledList drag={snapshot.isDragging}>
              <ListHeaderContainer
                dragHandleProps={provided.dragHandleProps}
                listTitle={list.title}
                listId={list._id}
                cards={list.cards}
                boardId={boardId}
              />
              <CardsWrapper>
                <Cards listId={list._id} />
              </CardsWrapper>
            </StyledList>
            {/* <CardAdder listId={list._id} /> */}
          </ListWrapper>
          {provided.placeholder}
        </>
      )}
    </Draggable>
  );
};

List.propTypes = {
  boardId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  list: PropTypes.shape({ _id: PropTypes.string.isRequired }).isRequired,
};

export default React.memo(List);
