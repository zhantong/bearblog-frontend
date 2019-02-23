import React from 'react';
import {connect} from 'react-redux'
import Layout from '../comps/Layout.js'
import {configWidgets} from '../store/actions'
import {Grid} from 'semantic-ui-react'
import widgets, {getWidgetsProp} from '../widgets'
import StickyBox from "react-sticky-box";


class Index extends React.Component {
    static async getInitialProps(props) {
        const widgetsProp = getWidgetsProp(props.query._type);
        await widgets[widgetsProp.main.pluginName][widgetsProp.main.widgetName].widget.getInitialProps(props);
        await props.reduxStore.dispatch(configWidgets(widgetsProp));
        return {};
    }

    render() {
        if (!this.props.widgets) {
            return null;
        }
        const mainWidgetProps = this.props.widgets.main;
        const MainWidget = widgets[mainWidgetProps.pluginName][mainWidgetProps.widgetName].widget;
        const LeftWidgets = this.props.widgets.left.map(widgetProps => {
            return widgets[widgetProps.pluginName][widgetProps.widgetName].widget
        });
        const RightWidgets = this.props.widgets.right.map(widgetProps => {
            return widgets[widgetProps.pluginName][widgetProps.widgetName].widget
        });
        return (
            <Layout>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <StickyBox offsetTop={54}>
                                {LeftWidgets.map(Widget =>
                                    <Widget/>
                                )}
                            </StickyBox>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <MainWidget/>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            {RightWidgets.map(Widget =>
                                <Widget/>
                            )}
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