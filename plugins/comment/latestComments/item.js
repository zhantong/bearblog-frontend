import React from "react";
import Link from 'next/link'
import {buildArticleUrl} from '../../article/article'
import {Feed, Divider} from "semantic-ui-react";


export default ({comment}) => {
    if (!comment) {
        return null;
    }
    const articleUrl = buildArticleUrl(comment.to.number);
    return (
        <>
            <Feed.Event>
                <Feed.Content>
                    <Feed.Date>
                        {comment.timestamp}
                    </Feed.Date>
                    <Feed.Summary>
                        <a>{comment.author.name}</a>评论了
                        <Link as={articleUrl.as} href={articleUrl.href}><a>《{comment.to.title}》</a></Link>
                    </Feed.Summary>
                    <Feed.Extra text>
                        {comment.body_html}
                    </Feed.Extra>
                </Feed.Content>
            </Feed.Event>
            <Divider fitted/>
        </>
    )
}

