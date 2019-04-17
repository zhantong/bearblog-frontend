import React from "react";
import { requestComments, toggleReply, submitReply } from "./store";
import { connect } from "react-redux";
import { Comment, Typography, Card } from "antd";
import ReplyForm from "./ReplyForm";

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.renderComments = this.renderComments.bind(this);
    this.submitReply = this.submitReply.bind(this);
  }

  componentDidMount() {
    if (this.props.article.number) {
      this.props.requestComments(this.props.article);
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.article.number !== nextProps.article.number) {
      this.props.requestComments(nextProps.article);
    }
  }

  reply(commentId) {
    this.props.toggleReply(commentId);
  }

  submitReply(values) {
    this.props.submitReply(
      this.props.article.number,
      values.name,
      values.email,
      values.content,
      this.props.replyCommentId
    );
  }

  renderComments(comments, replyCommentId, changeBackground = false) {
    return (
      <>
        {comments.map(comment => (
          <Card
            bodyStyle={{ padding: "0 10px" }}
            style={{
              margin: "10px 0",
              background: changeBackground ? "#FAFAFA" : "#FFF"
            }}
          >
            <Comment
              actions={[
                <span onClick={() => this.reply(comment.comment.id)}>回复</span>
              ]}
              author={comment.comment.author.name}
              content={
                <Typography>
                  <Typography.Paragraph>
                    {comment.comment.body}
                  </Typography.Paragraph>
                </Typography>
              }
              datetime={comment.comment.timestamp}
            >
              {replyCommentId === comment.comment.id && (
                <ReplyForm onSubmit={this.submitReply} />
              )}
              {comment.children.length > 0 &&
                this.renderComments(
                  comment.children,
                  replyCommentId,
                  !changeBackground
                )}
            </Comment>
          </Card>
        ))}
      </>
    );
  }

  render() {
    const { comments, replyCommentId = null } = this.props;
    if (!comments) {
      return null;
    }
    return (
      <Card title={`已有${comments.count}条评论`}>
        {this.renderComments(comments.value, replyCommentId)}
        {replyCommentId === null && <ReplyForm onSubmit={this.submitReply} />}
      </Card>
    );
  }
}

function mapStateToProps(state) {
  const { article } = state["article.article"];
  const { comments, replyCommentId } = state["comment.comments"];
  console.log(comments);
  return { article, comments, replyCommentId };
}

function mapDispatchToProps(dispatch) {
  return {
    requestComments: article => dispatch(requestComments(article)),
    toggleReply: commentId => dispatch(toggleReply(commentId)),
    submitReply: (articleId, name, email, content, replyCommentId) =>
      dispatch(submitReply(articleId, name, email, content, replyCommentId))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments);
