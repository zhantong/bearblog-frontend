import React from "react";
import {requestLatestComments} from "./store";
import {connect} from "react-redux";
import {Card, Feed} from "semantic-ui-react";
import Item from './item'

class LatestComments extends React.Component {

    componentDidMount() {
        this.props.requestLatestComments();
    }

    render() {
        if (!this.props.latestComments) {
            return null;
        }

        return (
            <Card>
                <Card.Content>
                    <Card.Header>
                        最近评论
                    </Card.Header>
                </Card.Content>
                <Card.Content>
                    <Feed>
                        {this.props.latestComments.map(comment =>
                            <Item comment={comment}/>
                        )}
                    </Feed>

                </Card.Content>
            </Card>
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