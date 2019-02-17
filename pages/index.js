import React from 'react';
import {connect} from 'react-redux'
import Layout from '../comps/Layout.js'
import Articles from '../plugins/article/articles'
import {requestArticleList} from '../store/actions'
import {Grid} from 'semantic-ui-react'


class Index extends React.Component {
    static async getInitialProps({reduxStore}) {
        await reduxStore.dispatch(requestArticleList());
        return {};
    }

    render() {
        return (
            <Layout>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={3}>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <Articles/>
                        </Grid.Column>
                        <Grid.Column width={3}>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>
        )
    }
}

export default connect()(Index)