import React from "react";
import {requestComments, toggleReply, submitReply} from "./store";
import {connect} from "react-redux";
import {Comment, Typography} from "antd";
import ReplyForm from './ReplyForm'

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

    reply = (commentId) => {
        this.props.toggleReply(commentId)
    };

    submitReply(values) {
        this.props.submitReply(this.props.article.number, values.name, values.email, values.content, this.props.replyCommentId)
    }

    renderComments(comments, replyCommentId) {
        return (
            <>
                {comments.map(comment =>
                    <>
                        <Comment
                            actions={[<span onClick={() => this.reply(comment.comment.id)}>回复</span>]}
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
                            {replyCommentId === comment.comment.id &&
                            <ReplyForm onSubmit={this.submitReply}/>}
                            {comment.children.length > 0 &&
                            this.renderComments(comment.children, replyCommentId)
                            }
                        </Comment>
                    </>
                )}
            </>
        )
    }


    render() {
        const {comments = [], replyCommentId = null} = this.props;

        return (
            <>
                {this.renderComments(comments, replyCommentId)}
                {replyCommentId === null &&
                <ReplyForm onSubmit={this.submitReply}/>}
            </>
        )
    }
}


function mapStateToProps(state) {
    const {article} = state['article.article'];
    const {comments, replyCommentId} = state['comment.comments'];
    return {article, comments, replyCommentId}
}

function mapDispatchToProps(dispatch) {
    return {
        requestComments: (article) => dispatch(requestComments(article)),
        toggleReply: (commentId) => dispatch(toggleReply(commentId)),
        submitReply: (articleId, name, email, content, replyCommentId) => dispatch(submitReply(articleId, name, email, content, replyCommentId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)