import React from 'react';
import ArticleService from '../api/article'


export default class Index extends React.Component {
    static async getInitialProps() {
        const res = await ArticleService.getList();
        return {
            articles: res.articles
        };
    }

    render() {
        return (
            <table>
                <thead>
                <tr>
                    <th>发表时间</th>
                    <th>标题</th>
                </tr>
                </thead>
                <tbody>
                {
                    this.props.articles.map(article =>
                        <tr>
                            <td>{article.timestamp}</td>
                            <td>{article.title}</td>
                        </tr>
                    )
                }
                </tbody>
            </table>
        )
    }
}