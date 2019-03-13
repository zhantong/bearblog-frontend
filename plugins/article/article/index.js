import React from "react";
import {connect} from 'react-redux'
import {requestArticle} from "./store";
import {Typography, Card, Icon, Row, Col, Tag, Divider} from 'antd';
import ReactMarkdown from 'react-markdown'

class Article extends React.Component {
    static async getInitialProps({query, reduxStore}) {
        const {number} = query;
        await reduxStore.dispatch(requestArticle(number));
        return {};
    }

    render() {
        if (!this.props.article) {
            return null;
        }
        return (
            <Card>
                <Typography>
                    <Typography.Title>
                        {this.props.article.title}
                    </Typography.Title>
                    <Row justify="space-between">
                        {this.props.article.meta.map(meta =>
                            <Col span={24 / this.props.article.meta.length}>
                                <Meta meta={meta}/>
                            </Col>)}
                    </Row>
                    <Divider/>
                    <ReactMarkdown
                        source={this.props.article.body}
                    />
                </Typography>
            </Card>
        )
    }
}

const IconText = (props) => (
    <span>
    <Icon type={props.type} style={{marginRight: 8}}/>
        {props.children}
  </span>
);

const Meta = ({meta}) => {
    if (meta.slug === 'category') {
        return (
            <>
                {meta.value.map(category =>
                    <IconText type='folder-open'>
                        {category.name}
                    </IconText>
                )}
            </>
        )
    }
    if (meta.slug === 'view_count') {
        return (
            <IconText type='heart'>
                {meta.value}
            </IconText>
        )
    }
    if (meta.slug === 'comment') {
        return (
            <IconText type='message'>
                {meta.value}
            </IconText>
        )
    }
    if (meta.slug === 'tag') {
        return (
            <IconText type='tag'>
                {meta.value.map(tag =>
                    <Tag>
                        {tag.name}
                    </Tag>
                )}
            </IconText>
        )
    }
    return null
};

function mapStateToProps(state) {
    const {article} = state.article;
    return {article}
}

export function buildArticleUrl(number) {
    return {
        as: `/a/${number}`,
        href: `/index?_type=article&number=${number}`
    }
}

export default connect(mapStateToProps)(Article)