import React from 'react';
import ArticleService from '../api/article'
import Layout from '../comps/Layout.js'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Link from 'next/link'


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
                    {this.props.articles.map(article =>
                        <Card key={article.number}>
                            <Card.Header>
                                <Link as={`/a/${article.number}`} href={`/article?number=${article.number}`}>
                                    <a>{article.title}</a>
                                </Link>
                            </Card.Header>
                            <Card.Body>{article.bodyAbstract}</Card.Body>
                        </Card>
                    )}
                </Container>
            </Layout>
        )
    }
}