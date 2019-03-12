import React from "react";
import {connect} from 'react-redux'
import {requestArticle} from "./store";
import {Typography, Card} from 'antd';

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
            <Card>
                <Typography>
                    <Typography.Title>
                        {this.props.article.title}
                    </Typography.Title>
                    <div dangerouslySetInnerHTML={{__html: this.props.article.bodyHtml}}>
                    </div>
                </Typography>
            </Card>
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