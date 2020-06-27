import { createAction, handleActions } from "redux-actions";

const ENTER_AS_GUEST = "user/ENTER_AS_GUEST";

export const enterAsGuest = createAction(ENTER_AS_GUEST);

const initialState = {
  user: null,
  isGuest: true,
};

const user = handleActions(
  {
    [ENTER_AS_GUEST]: (state, action) => ({
      ...state,
      isGuest: true,
    }),
  },
  initialState
);

export default user;
