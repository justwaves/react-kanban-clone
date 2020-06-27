import React, { useState, useCallback } from "react";
import Card from "../../components/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { changeCardText } from "../../redux/modules/cards";

const CardContainer = ({ isDraggingOver, cardId, index, listId }) => {
  const dispatch = useDispatch();
  const { card } = useSelector(({ cards }) => ({
    card: cards[cardId],
  }));
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleCardEditor = useCallback(() => {
    setIsModalOpen(!isModalOpen);
  }, [isModalOpen]);

  const toggleCheckbox = useCallback(
    (checked, i) => {
      let j = 0;
      const newText = card.text.replace(/\[(\s|x)\]/g, (match) => {
        let newString;
        if (i === j) {
          newString = checked ? "[x]" : "[ ]";
        } else {
          newString = match;
        }
        j += 1;
        return newString;
      });
      dispatch(
        changeCardText({
          cardId: card._id,
          cardText: newText,
        })
      );
    },
    [dispatch, card._id, card.text]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.keyCode === 13 && e.target.tagName.toLowerCase() !== "a") {
        e.preventDefault();
        toggleCardEditor();
      }
    },
    [toggleCardEditor]
  );

  const handleClick = useCallback(
    (e) => {
      const { tagName, checked, id } = e.target;
      if (tagName.toLowerCase() === "input") {
        toggleCheckbox(checked, parseInt(id, 10));
      }

      if (tagName.toLowerCase() !== "a") {
        toggleCardEditor(e);
      }
    },
    [toggleCheckbox, toggleCardEditor]
  );

  return (
    <Card
      handleKeyDown={handleKeyDown}
      handleClick={handleClick}
      card={card}
      index={index}
      listId={listId}
      isDraggingOver={isDraggingOver}
      isModalOpen={isModalOpen}
      toggleCardEditor={toggleCardEditor}
    />
  );
};

export default React.memo(CardContainer);
