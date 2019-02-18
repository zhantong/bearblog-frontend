import React from "react";
import {Card} from 'semantic-ui-react'
import Link from 'next/link'

export default ({article}) => {
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>
                    <Link as={`/a/${article.number}`} href={`/index?_type=article&number=${article.number}`}><a>{article.title}</a></Link>
                </Card.Header>
            </Card.Content>
            <Card.Content description={article.bodyAbstract}/>
        </Card>
    )
}

