import React from 'react';
import ArticleService from '../api/article'
import Layout from '../comps/Layout.js'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'


export default class Index extends React.Component {
    static async getInitialProps() {
        const res = await ArticleService.getList();
        return {
            articles: res.articles
        };
    }

    render() {
        return (
            <Layout>
                <Container>
                    {
                        this.props.articles.map(article =>
                            <Card>
                                <Card.Header>{article.title}</Card.Header>
                                <Card.Body>{article.bodyAbstract}</Card.Body>
                            </Card>
                        )
                    }
                </Container>
            </Layout>
        )
    }
}