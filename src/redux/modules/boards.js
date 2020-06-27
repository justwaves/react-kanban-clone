import { createAction, handleActions } from "redux-actions";

const ADD_LIST = "boards/ADD_LIST";
const MOVE_LIST = "boards/MOVE_LIST";
const DELETE_LIST = "boards/DELETE_LIST";
const ADD_BOARD = "boards/ADD_BOARD";
const CHANGE_BOARD_TITLE = "boards/CHANGE_BOARD_TITLE";
const CHANGE_BOARD_COLOR = "boards/CHANGE_BOARD_COLOR";
const DELETE_BOARD = "boards/DELETE_BOARD";

export const addList = createAction(ADD_LIST);
export const moveList = createAction(MOVE_LIST);
export const deleteList = createAction(DELETE_LIST);
export const addBoard = createAction(ADD_BOARD);
export const changeBoardTitle = createAction(CHANGE_BOARD_TITLE);
export const changeBoardColor = createAction(CHANGE_BOARD_COLOR);
export const deleteBoard = createAction(DELETE_BOARD);

const initialState = {
  BkZ8tbMRI: {
    _id: "BkZ8tbMRI",
    title: "Tutorial board",
    color: "blue",
    lists: ["rkDPTLmGCL"],
    users: [],
  },
  SydQ7GzCL: {
    _id: "SydQ7GzCL",
    title: "Tutorial board2",
    color: "blue",
    lists: ["ryewpUXzRB", "H1XvaLQG0L"],
    users: [],
  },
};

const boards = handleActions(
  {
    [ADD_LIST]: (state, { payload: { boardId, listId } }) => ({
      ...state,
      [boardId]: {
        ...state[boardId],
        lists: [...state[boardId].lists, listId],
      },
    }),
    [MOVE_LIST]: (
      state,
      { payload: { oldListIndex, newListIndex, boardId } }
    ) => {
      const newLists = Array.from(state[boardId].lists);
      const [removedList] = newLists.splice(oldListIndex, 1);
      newLists.splice(newListIndex, 0, removedList);
      return {
        ...state,
        [boardId]: { ...state[boardId], lists: newLists },
      };
    },
    [DELETE_LIST]: (state, { payload: { newListId, boardId } }) => ({
      ...state,
      [boardId]: {
        ...state[boardId],
        lists: state[boardId].lists.filter((listId) => listId !== newListId),
      },
    }),
    [ADD_BOARD]: (state, { payload: { boardTitle, boardId, userId } }) => ({
      ...state,
      [boardId]: {
        _id: boardId,
        title: boardTitle,
        lists: [],
        users: [userId],
        color: "blue",
      },
    }),
    [CHANGE_BOARD_TITLE]: (state, { payload: { boardTitle, boardId } }) => ({
      ...state,
      [boardId]: {
        ...state[boardId],
        title: boardTitle,
      },
    }),
    [CHANGE_BOARD_COLOR]: (state, { payload: { boardId, color } }) => ({
      ...state,
      [boardId]: {
        ...state[boardId],
        color,
      },
    }),
    [DELETE_BOARD]: (state, { payload: { boardId } }) => {
      const { [boardId]: deletedBoard, ...restOfBoards } = state;
      return restOfBoards;
    },
  },
  initialState
);

export default boards;
