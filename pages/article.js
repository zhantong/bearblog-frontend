import React from "react";
import Layout from '../comps/Layout.js'
import ArticleService from "../api/article";
import Container from 'react-bootstrap/Container'

export default class Article extends React.Component {
    static async getInitialProps(context) {
        const {number} = context.query;
        return await ArticleService.get(number);
    }

    render() {
        return (
            <Layout>
                <Container>
                    <h1>{this.props.title}</h1>
                    <article dangerouslySetInnerHTML={{__html: this.props.bodyHtml}}>
                    </article>
                </Container>
            </Layout>
        )
    }
}