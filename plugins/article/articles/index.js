import React from "react";
import {connect} from 'react-redux'
import Item from './Item'


function Articles({articles}) {
    return (
        <div>
            {articles.map(article =>
                <Item article={article}/>
            )}
        </div>
    )
}

function mapStateToProps(state) {
    const {articles} = state;
    return {articles}
}

export default connect(mapStateToProps)(Articles)