import React from "react";
import {connect} from 'react-redux'
import {requestPage} from "./store";

class Page extends React.Component {
    static async getInitialProps({query, reduxStore}) {
        const {slug} = query;
        await reduxStore.dispatch(requestPage(slug));
        return {};
    }

    render() {
        if (!this.props.page) {
            return null;
        }
        return (
            <>
                <h1>{this.props.page.title}</h1>
                <article dangerouslySetInnerHTML={{__html: this.props.page.bodyHtml}}>
                </article>
            </>
        )
    }
}

function mapStateToProps(state) {
    const {page} = state.page;
    return {page}
}

export function buildPageUrl(slug) {
    return {
        as: `/p/${slug}`,
        href: `/index?_type=page&slug=${slug}`
    }
}

export default connect(mapStateToProps)(Page)