import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import user from "./modules/user";
import boards from "./modules/boards";
import cards from "./modules/cards";
import lists from "./modules/lists";
import currentBoard from "./modules/currentBoard";

const env = process.env.NODE_ENV;

const rootReducer = combineReducers({
  user,
  boards,
  cards,
  lists,
  currentBoard,
});

const middlewares = [];

if (env === "development") {
  // const { createLogger } = require("redux-logger");
  // const logger = createLogger();
  // middlewares.push(logger);
}

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
