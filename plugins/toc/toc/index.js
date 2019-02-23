import React from "react";
import {connect} from 'react-redux'
import tocbot from 'tocbot'

import {Card} from "semantic-ui-react";

class Toc extends React.Component {

    componentDidMount() {
        tocbot.init({
            tocSelector: '#card-toc',
            contentSelector: 'article',
            headingSelector: 'h1, h2, h3',
            headingsOffset: 56,
            collapseDepth: 3,
            listClass: 'ui list link',
            linkClass: 'item',
            activeLinkClass: 'active'
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        tocbot.refresh();
    }

    render() {
        return (
            <Card>
                <Card.Content>
                    <Card.Header>
                        目录
                    </Card.Header>
                </Card.Content>
                <Card.Content id="card-toc">
                </Card.Content>
            </Card>
        )
    }
}

function mapStateToProps(state) {
    const {article} = state.article;
    return {article}
}


export default connect(mapStateToProps)(Toc)