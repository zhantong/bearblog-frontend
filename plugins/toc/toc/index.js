import React from "react";
import {connect} from 'react-redux'

import {Collapse, Anchor} from 'antd'

class Toc extends React.Component {
    constructor(props) {
        super(props);
        this.renderItem = this.renderItem.bind(this);
    }

    renderItem(item) {
        return (
            <Anchor.Link href={'#' + item.id} title={item.textContent}>
                {item.children.map(child => {
                    return this.renderItem(child)
                })}
            </Anchor.Link>
        )
    }

    render() {
        const options = {
            contentSelector: 'article',
            headingSelector: 'h2, h3'
        };
        const ParseContent = require('tocbot/src/js/parse-content.js');
        const parseContent = ParseContent(options);
        const headingsArray = parseContent.selectHeadings(options.contentSelector, options.headingSelector);
        if (headingsArray === null) {
            return null;
        }
        const nestedHeadingsObj = parseContent.nestHeadingsArray(headingsArray);
        return (
            <Collapse defaultActiveKey={['1']}>
                <Collapse.Panel header='目录' key='1'>
                    <Anchor affix={false}>
                        {nestedHeadingsObj.nest.map(item => {
                            return this.renderItem(item);
                        })}
                    </Anchor>
                </Collapse.Panel>
            </Collapse>
        )
    }
}

function mapStateToProps(state) {
    const {article} = state.article;
    return {article}
}


export default connect(mapStateToProps)(Toc)