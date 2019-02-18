import React from 'react';
import {connect} from 'react-redux'
import Layout from '../comps/Layout.js'
import {configWidgets} from '../store/actions'
import {Grid} from 'semantic-ui-react'
import widgets from '../widgets'


class Index extends React.Component {
    static async getInitialProps(props) {
        const mainWidget = props.query.widgets.main;
        await widgets[mainWidget.pluginName][mainWidget.widgetName].widget.getInitialProps(props);
        await props.reduxStore.dispatch(configWidgets(props.query.widgets));
        return {};
    }

    render() {
        if (!this.props.widgets) {
            return null;
        }
        const mainWidgetProps = this.props.widgets.main;
        const MainWidget = widgets[mainWidgetProps.pluginName][mainWidgetProps.widgetName].widget;
        return (
            <Layout>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={3}>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <MainWidget/>
                        </Grid.Column>
                        <Grid.Column width={3}>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>
        )
    }
}

function mapStateToProps(state) {
    const {widgets} = state.reducer;
    return {widgets}
}

export default connect(mapStateToProps)(Index)