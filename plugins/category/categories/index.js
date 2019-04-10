import React from "react";
import {requestCategories} from "./store";
import {connect} from "react-redux";
import {Collapse, List, Badge} from 'antd'
import Link from 'next/link'

class Categories extends React.Component {

    componentDidMount() {
        this.props.requestCategories();
    }

    render() {
        if (!this.props.categories) {
            return null;
        }

        return (
            <Collapse defaultActiveKey={['1']}>
                <Collapse.Panel header='分类' key='1'>
                    <List
                        dataSource={this.props.categories}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    title={
                                        <Link as={`/category/${item.slug}`} href={`/index?category=${item.slug}`}>
                                            <a>{item.name}</a>
                                        </Link>
                                    }
                                />
                                <Badge count={item.articleCount}/>
                            </List.Item>
                        )}
                    />
                </Collapse.Panel>
            </Collapse>
        )
    }
}

function mapStateToProps(state) {
    const {categories} = state['category.categories'];
    return {categories}
}

function mapDispatchToProps(dispatch) {
    return {
        requestCategories: () => dispatch(requestCategories())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories)