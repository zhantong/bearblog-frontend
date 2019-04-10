import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { reducer } from "./reducers";
import pluginManager from "../plugins";

const exampleInitialState = {};

export function initializeStore(initialState = exampleInitialState) {
  let reducers = { reducer };
  for (let plugin of pluginManager.plugins) {
    for (let component of plugin.components) {
      if (component.reducer) {
        reducers[`${plugin.id}.${component.slug}`] = component.reducer;
      }
    }
  }
  const combinedReducer = combineReducers(reducers);
  return createStore(
    combinedReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
}
