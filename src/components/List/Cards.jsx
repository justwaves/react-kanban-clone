import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import CardContainer from "../../containers/Card/CardContainer";

const Cards = ({ listId }) => {
  const { cards } = useSelector(({ lists }) => ({
    cards: lists[listId].cards,
  }));
  console.log(cards);
  const listEnd = useRef();

  const scrollToBottom = () => {
    listEnd.current.scrollIntoView();
  };

  useEffect(() => {
    if (cards[cards.length - 2] === cards.length - 1) {
      scrollToBottom();
    }
  }, [cards]);

  return (
    <Droppable droppableId={listId}>
      {(provided, { isDraggingOver }) => (
        <>
          <div className="cards" ref={provided.innerRef}>
            {cards.map((cardId, index) => (
              <CardContainer
                isDraggingOver={isDraggingOver}
                key={cardId}
                cardId={cardId}
                index={index}
                listId={listId}
              />
            ))}
            {provided.placeholder}
            <div style={{ float: "left", clear: "both" }} ref={listEnd} />
          </div>
        </>
      )}
    </Droppable>
  );
};

export default React.memo(Cards);
