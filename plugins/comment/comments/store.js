import request from "../../../api/client";

export const actionTypes = {
  REQUEST_COMMENTS: "REQUEST_COMMENTS",
  RECEIVE_COMMENTS: "RECEIVE_COMMENTS",
  TOGGLE_REPLY: "TOGGLE_REPLY",
  SUBMIT_REPLY: "SUBMIT_REPLY",
  COMPLETE_REPLY: "COMPLETE_REPLY"
};

// REDUCERS

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.RECEIVE_COMMENTS:
      return Object.assign({}, state, {
        comments: action.comments
      });
    case actionTypes.TOGGLE_REPLY:
      console.log(action.commentId);
      return Object.assign({}, state, {
        replyCommentId: action.commentId
      });
    default:
      return state;
  }
};

// ACTIONS

export const requestComments = article => async dispatch => {
  dispatch({ type: actionTypes.REQUEST_COMMENTS });
  const res = await request({
    url: `article/${article.number}/comment`,
    method: "GET"
  });
  dispatch({ type: actionTypes.RECEIVE_COMMENTS, comments: res });
};

export const toggleReply = commentId => async dispatch => {
  dispatch({ type: actionTypes.TOGGLE_REPLY, commentId: commentId });
};

export const submitReply = (
  articleId,
  name,
  email,
  content,
  replyCommentId
) => async dispatch => {
  dispatch({ type: actionTypes.SUBMIT_REPLY });
  const res = await request({
    url: `article/${articleId}/comment${
      replyCommentId ? "/" + replyCommentId : ""
    }`,
    method: "POST",
    data: {
      articleId: articleId,
      name: name,
      email: email,
      content: content
    }
  });
  dispatch({ type: actionTypes.COMPLETE_REPLY });
};
