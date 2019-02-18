import React from "react";
import {connect} from 'react-redux'
import Item from './Item'
import {requestArticleList} from "./store";

class Articles extends React.Component {
    static async getInitialProps({reduxStore}) {
        await reduxStore.dispatch(requestArticleList());
        return {};
    }

    render() {
        const {articles = []} = this.props;
        return (
            <div>
                {articles.map(article =>
                    <Item article={article}/>
                )}
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {articles} = state.articles;
    return {articles}
}

export default connect(mapStateToProps)(Articles)