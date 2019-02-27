import React from "react";
import {requestComments, toggleReply, submitReply} from "./store";
import {connect} from "react-redux";
import {Comment, Header} from "semantic-ui-react";
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

    submitReply(values) {
        console.log(this.props.replyCommentId);
        console.log(values);
        this.props.submitReply(this.props.article.number, values.name, values.email, values.content, this.props.replyCommentId)
    }

    renderComments(comments) {
        return (
            <>
                {comments.map(comment =>
                    <Comment>
                        <Comment.Content>
                            <Comment.Author style={{fontSize: '1.5em'}}>{comment.comment.author.name}</Comment.Author>
                            <Comment.Metadata>
                                <div>{comment.comment.timestamp}</div>
                            </Comment.Metadata>
                            <Comment.Text>
                                {comment.comment.bodyHtml}
                            </Comment.Text>
                            <Comment.Actions>
                                <button onClick={() => this.props.toggleReply(comment.comment.id)}>回复</button>
                            </Comment.Actions>
                            {this.props.replyCommentId === comment.comment.id &&
                            <ReplyForm onSubmit={this.submitReply}/>}
                        </Comment.Content>
                        {comment.children.length > 0 &&
                        <Comment.Group>
                            {this.renderComments(comment.children)}
                        </Comment.Group>
                        }
                    </Comment>
                )}
            </>
        )
    }


    render() {
        const {comments = [], replyCommentId = null} = this.props;

        return (
            <Comment.Group minimal>
                <Header as='h3' dividing>
                    评论
                </Header>
                {this.renderComments(comments)}
                {replyCommentId === null &&
                <ReplyForm onSubmit={this.submitReply}/>}
            </Comment.Group>
        )
    }
}


function mapStateToProps(state) {
    const {article} = state.article;
    const {comments, replyCommentId} = state.comments;
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