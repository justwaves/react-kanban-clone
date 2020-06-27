import { createAction, handleActions } from "redux-actions";

const PUT_BOARD_ID_IN_REDUX = "currentBoard/PUT_BOARD_ID_IN_REDUX";
const ADD_BOARD = "currentBoard/ADD_BOARD";

export const putBoardIdInRedux = createAction(PUT_BOARD_ID_IN_REDUX);
export const addBoard = createAction(ADD_BOARD);

const initialState = {
  boardId: null,
};

const currentBoardId = handleActions(
  {
    [PUT_BOARD_ID_IN_REDUX]: (state, { payload: { boardId } }) => ({
      ...state,
      boardId,
    }),
    [ADD_BOARD]: (state, { payload: { boardId } }) => ({
      ...state,
      boardId,
    }),
  },
  initialState
);

export default currentBoardId;
