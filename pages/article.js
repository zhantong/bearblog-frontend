import React from "react";
import Layout from '../comps/Layout.js'
import ArticleService from "../api/article";

export default class Article extends React.Component {
    static async getInitialProps(context) {
        const {number} = context.query;
        return await ArticleService.get(number);
    }

    render() {
        return (
            <Layout>
                <h1>{this.props.title}</h1>
                <article dangerouslySetInnerHTML={{__html: this.props.bodyHtml}}>
                </article>
            </Layout>
        )
    }
}