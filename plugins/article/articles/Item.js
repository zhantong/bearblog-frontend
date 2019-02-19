import React from "react";
import {Card} from 'semantic-ui-react'
import Link from 'next/link'
import {buildArticleUrl} from '../../article/article'

export default ({article}) => {
    if (!article) {
        return null;
    }
    const articleUrl = buildArticleUrl(article.number);
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>
                    <Link as={articleUrl.as} href={articleUrl.href}><a>{article.title}</a></Link>
                </Card.Header>
            </Card.Content>
            <Card.Content description={article.bodyAbstract}/>
        </Card>
    )
}

