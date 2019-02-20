import React from "react";
import {requestCategories} from "./store";
import {connect} from "react-redux";
import {Card, Menu} from "semantic-ui-react";
import Item from './item'

class Categories extends React.Component {

    componentDidMount() {
        this.props.requestCategories();
    }

    render() {
        if (!this.props.categories) {
            return null;
        }

        return (
            <Card>
                <Card.Content>
                    <Card.Header>
                        分类
                    </Card.Header>
                </Card.Content>
                <Card.Content style={{padding: 0}}>
                    <Menu fluid vertical style={{border: 0}}>
                        {this.props.categories.map(category =>
                            <Item category={category}/>
                        )}
                    </Menu>
                </Card.Content>
            </Card>
        )
    }
}

function mapStateToProps(state) {
    const {categories} = state.categories;
    return {categories}
}

function mapDispatchToProps(dispatch) {
    return {
        requestCategories: () => dispatch(requestCategories())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories)