import { createAction, handleActions } from "redux-actions";

const ADD_CARD = "lists/ADD_CARD";
const MOVE_CARD = "lists/MOVE_CARD";
const DELETE_CARD = "lists/DELETE_CARD";
const ADD_LIST = "lists/ADD_LIST";
const CHANGE_LIST_TITLE = "lists/CHANGE_LIST_TITLE";
const DELETE_LIST = "lists/DELETE_LIST";

export const addCard = createAction(ADD_CARD);
export const moveCard = createAction(MOVE_CARD);
export const deleteCard = createAction(DELETE_CARD);
export const addList = createAction(ADD_LIST);
export const changeListTitle = createAction(CHANGE_LIST_TITLE);
export const deleteList = createAction(DELETE_LIST);

const initialState = {
  ryewpUXzRB: {
    _id: "ryewpUXzRB",
    title: "Welcome to React Kanban",
    cards: ["rJZDpIQfAL", "ByGvaIXGCU"],
  },
  H1XvaLQG0L: {
    _id: "H1XvaLQG0L",
    title: "Features",
    cards: ["SyVw6L7z0U", "ByHDp8mfR8", "H1UvaIQzRU"],
  },
  rkDPTLmGCL: {
    _id: "rkDPTLmGCL",
    title: "How to use",
    cards: [
      "HJ_DTU7MAU",
      "SJKwaUmGCI",
      "B19vpImG08",
      "SJiDaU7zCU",
      "rJ3DTLXMRI",
      "ByTvpIXfRU",
    ],
  },
};

const lists = handleActions(
  {
    [ADD_CARD]: (state, { payload: { listId, cardId } }) => ({
      ...state,
      [listId]: { ...state[listId], cards: [...state[listId].cards, cardId] },
    }),
    [MOVE_CARD]: (
      state,
      { payload: { oldCardIndex, newCardIndex, sourceListId, destListId } }
    ) => {
      if (sourceListId === destListId) {
        const newCards = Array.from(state[sourceListId].cards);
        const [removedCard] = newCards.splice(oldCardIndex, 1);
        newCards.splice(newCardIndex, 0, removedCard);
        return {
          ...state,
          [sourceListId]: { ...state[sourceListId], cards: newCards },
        };
      }
      // Move card from one list to another
      const sourceCards = Array.from(state[sourceListId].cards);
      const [removedCard] = sourceCards.splice(oldCardIndex, 1);
      const destinationCards = Array.from(state[destListId].cards);
      destinationCards.splice(newCardIndex, 0, removedCard);
      return {
        ...state,
        [sourceListId]: { ...state[sourceListId], cards: sourceCards },
        [destListId]: { ...state[destListId], cards: destinationCards },
      };
    },
    [DELETE_CARD]: (state, { payload: { newCardId, listId } }) => ({
      ...state,
      [listId]: {
        ...state[listId],
        cards: state[listId].cards.filter((cardId) => cardId !== newCardId),
      },
    }),
    [ADD_LIST]: (state, { payload: { listId, listTitle } }) => ({
      ...state,
      [listId]: { _id: listId, title: listTitle, cards: [] },
    }),
    [CHANGE_LIST_TITLE]: (state, { payload: { listId, listTitle } }) => ({
      ...state,
      [listId]: { ...state[listId], title: listTitle },
    }),
    [DELETE_LIST]: (state, { payload: { listId } }) => {
      const { [listId]: deletedList, ...restOfLists } = state;
      return restOfLists;
    },
  },
  initialState
);

export default lists;
