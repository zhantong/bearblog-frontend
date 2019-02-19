import React from "react";
import {connect} from 'react-redux'
import {requestArticle} from "./store";

class Article extends React.Component {
    static async getInitialProps({query, reduxStore}) {
        const {number} = query;
        await reduxStore.dispatch(requestArticle(number));
        return {};
    }

    render() {
        if (!this.props.article) {
            return null;
        }
        return (
            <>
                <h1>{this.props.article.title}</h1>
                <article dangerouslySetInnerHTML={{__html: this.props.article.bodyHtml}}>
                </article>
            </>
        )
    }
}

function mapStateToProps(state) {
    const {article} = state.article;
    return {article}
}

export function buildArticleUrl(number) {
    return {
        as: `/a/${number}`,
        href: `/index?_type=article&number=${number}`
    }
}

export default connect(mapStateToProps)(Article)