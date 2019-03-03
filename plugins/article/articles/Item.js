import React from "react";
import {Card, Icon, Label} from 'semantic-ui-react'
import Link from 'next/link'
import {buildArticleUrl} from '../../article/article'
import Moment from 'react-moment';

export default class Item extends React.Component {
    constructor(props) {
        super(props);
        this.renderMeta = this.renderMeta.bind(this);
    }

    renderMeta(meta) {
        if (meta.slug === 'category') {
            return (
                <>
                    {meta.value.map(category =>
                        <Label>
                            <Icon name='folder open'/>{category.name}
                        </Label>
                    )}
                </>
            )
        }
        if (meta.slug === 'view_count') {
            return (
                <Label>
                    <Icon name='heart'/>{meta.value}
                </Label>
            )
        }
        if (meta.slug === 'comment') {
            return (
                <Label>
                    <Icon name='comments'/>{meta.value}
                </Label>
            )
        }
        return null
    }

    render() {
        const {article = null} = this.props;
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
                <Card.Content extra>
                    <Label>
                        <Icon name='calendar alternate'/>
                        <Moment format='YYYY-MM-DD'>
                            {article.timestamp}
                        </Moment>
                    </Label>
                    {article.meta.map(meta => {
                        return this.renderMeta(meta)
                    })}
                </Card.Content>
            </Card>
        )
    }

}

