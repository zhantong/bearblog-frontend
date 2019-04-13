import { actionTypes as articleActionTypes } from "../../article/article/store";

// REDUCERS

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case articleActionTypes.DID_RENDER_ARTICLE:
      return Object.assign({}, state, {
        article: action.article
      });
    default:
      return state;
  }
};
