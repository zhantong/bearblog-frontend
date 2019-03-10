import React from "react";
import {requestLatestComments} from "./store";
import {connect} from "react-redux";
import {Collapse, List} from 'antd'
import {buildArticleUrl} from "../../article/article";
import Link from 'next/link'

class LatestComments extends React.Component {

    componentDidMount() {
        this.props.requestLatestComments();
    }

    render() {
        if (!this.props.latestComments) {
            return null;
        }

        return (
            <Collapse defaultActiveKey={['1']}>
                <Collapse.Panel header='最近评论' key='1'>
                    <List
                        dataSource={this.props.latestComments}
                        renderItem={item => {
                            const articleUrl = buildArticleUrl(item.to.number);
                            return <List.Item>
                                <List.Item.Meta
                                    title={
                                        <>
                                            {item.author.name}
                                            评论了
                                            <Link as={articleUrl.as}
                                                  href={articleUrl.href}><a>《{item.to.title}》</a></Link>
                                        </>
                                    }
                                    description={item.body_html}
                                />
                            </List.Item>
                        }}
                    />
                </Collapse.Panel>
            </Collapse>
        )
    }
}

function mapStateToProps(state) {
    const {latestComments} = state.latestComments;
    return {latestComments}
}

function mapDispatchToProps(dispatch) {
    return {
        requestLatestComments: () => dispatch(requestLatestComments())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LatestComments)