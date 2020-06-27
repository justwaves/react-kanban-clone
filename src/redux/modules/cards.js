import { createAction, handleActions } from "redux-actions";

const ADD_CARD = "cards/ADD_CARD";
const CHANGE_CARD_TEXT = "cards/CHANGE_CARD_TEXT";
const CHANGE_CARD_DATE = "cards/CHANGE_CARD_DATE";
const CHANGE_CARD_COLOR = "cards/CHANGE_CARD_COLOR";
const DELETE_CARD = "cards/DELETE_CARD";
const DELETE_LIST = "cards/DELETE_LIST";

export const addCard = createAction(ADD_CARD);
export const changeCardText = createAction(CHANGE_CARD_TEXT);
export const changeCardDate = createAction(CHANGE_CARD_DATE);
export const changeCardColor = createAction(CHANGE_CARD_COLOR);
export const deleteCard = createAction(DELETE_CARD);
export const deleteList = createAction(DELETE_LIST);

const initialState = {
  rJZDpIQfAL: {
    color: "white",
    _id: "rJZDpIQfAL",
    text: "### An open source application inspired by Trello",
  },
  ByGvaIXGCU: {
    color: "#6df",
    _id: "ByGvaIXGCU",
    text:
      "![Octocat](https://assets-cdn.github.com/images/modules/logos_page/Octocat.png) Check out the [source code on GitHub](https://github.com/yogaboll/react-kanban) ",
  },
  SyVw6L7z0U: {
    color: "white",
    _id: "SyVw6L7z0U",
    text:
      "### Supports GitHub flavored markdown Featuring cutting edge HTML features like * Headings * Bullet points * **Bold** and *italic* text * Links * Images * ``` () => { // Code blocks } ``` Watch out, Netscape navigator 2.0!",
  },
  ByHDp8mfR8: {
    color: "white",
    _id: "ByHDp8mfR8",
    text: "### Works on mobile devices Unlike a certain other website...",
  },
  H1UvaIQzRU: {
    color: "#ff6",
    _id: "H1UvaIQzRU",
    text: "### And more! [x] Colors [x] Deadlines [x] Checkboxes",
    date: "2020-06-25T13:29:35.160Z",
  },
  HJ_DTU7MAU: {
    color: "white",
    _id: "HJ_DTU7MAU",
    text:
      "### Sign in to save changes Since you are not signed in, your changes will not persist after you leave the website. Go back to the login screen by pressing the 'Sign in' button in the top right corner.",
  },
  SJKwaUmGCI: {
    color: "white",
    _id: "SJKwaUmGCI",
    text:
      "### Edit a card You can edit the contents of a card by clicking on it. Remember to use Shift + Enter to create a newline.",
  },
  B19vpImG08: {
    color: "white",
    _id: "B19vpImG08",
    text:
      "### Drag a card or list Reposition cards and lists by dragging them with a mouse or touch gesture.",
  },
  SJiDaU7zCU: {
    color: "white",
    _id: "SJiDaU7zCU",
    text:
      "### Create a card or list Add a new card to an existing list by clicking the + button below each list. You can add a new list by clicking the -button to the right",
  },
  rJ3DTLXMRI: {
    color: "white",
    _id: "rJ3DTLXMRI",
    text:
      "### Add a checklist For a task that has many sub-tasks, you can create a checklist with markdown. [x] Like this [ ] Click me",
  },
  ByTvpIXfRU: {
    color: "white",
    _id: "ByTvpIXfRU",
    text:
      "### Change the board You can edit the title of the board by clicking it. You can also change the color of the board by clicking the button in the top right corner.",
  },
};

const user = handleActions(
  {
    [ADD_CARD]: (state, { payload: { cardText, cardId } }) => ({
      ...state,
      [cardId]: { text: cardText, _id: cardId },
    }),
    [CHANGE_CARD_TEXT]: (state, { payload: { cardText, cardId } }) => ({
      ...state,
      [cardId]: { ...state[cardId], text: cardText },
    }),
    [CHANGE_CARD_DATE]: (state, { payload: { date, cardId } }) => ({
      ...state,
      [cardId]: { ...state[cardId], date },
    }),
    [CHANGE_CARD_COLOR]: (state, { payload: { color, cardId } }) => ({
      ...state,
      [cardId]: { ...state[cardId], color },
    }),
    [DELETE_CARD]: (state, { payload: { cardId } }) => {
      const { [cardId]: deletedCard, ...restOfCards } = state;
      return restOfCards;
    },
    [DELETE_LIST]: (state, { payload: { cards: cardIds } }) => {
      return Object.keys(state)
        .filter((cardId) => !cardIds.includes(cardId))
        .reduce(
          (newState, cardId) => ({ ...newState, [cardId]: state[cardId] }),
          {}
        );
    },
  },
  initialState
);

export default user;
