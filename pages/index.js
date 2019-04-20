import React from "react";
import { connect } from "react-redux";
import Layout from "../comps/Layout.js";
import { configWidgets } from "../store/actions";
import { Row, Col, Affix } from "antd";
import hljs from "highlight.js";
import "highlight.js/styles/default.css";
import pluginManager from "../plugins";
import getConfig from "next/config";

class Index extends React.Component {
  static async getInitialProps(props) {
    const config = getConfig().publicRuntimeConfig.layout.page[
      props.query._type || "home"
    ];
    await pluginManager
      .getComponent(config.main.plugin, config.main.component)
      .main.getInitialProps(props);
    await props.reduxStore.dispatch(configWidgets(config));
    return {};
  }

  componentDidMount() {
    hljs.initHighlighting.called = false;
    hljs.initHighlighting();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    hljs.initHighlighting.called = false;
    hljs.initHighlighting();
  }

  render() {
    if (!this.props.widgets) {
      return null;
    }
    const mainWidgetProps = this.props.widgets.main;
    const MainWidget = pluginManager.getComponent(
      mainWidgetProps.plugin,
      mainWidgetProps.component
    ).main;
    const LeftWidgets = this.props.widgets.left.map(widgetProps => {
      return pluginManager.getComponent(
        widgetProps.plugin,
        widgetProps.component
      ).main;
    });
    const RightWidgets = this.props.widgets.right.map(widgetProps => {
      return pluginManager.getComponent(
        widgetProps.plugin,
        widgetProps.component
      ).main;
    });
    const MainBottomWidgets = this.props.widgets.mainBottom.map(widgetProps => {
      return pluginManager.getComponent(
        widgetProps.plugin,
        widgetProps.component
      ).main;
    });
    return (
      <Layout>
        <Row type="flex" gutter={8}>
          <Col xs={0} sm={0} md={6} lg={6} xl={4} style={{ marginTop: "8px" }}>
            <Affix>
              {LeftWidgets.map(Widget => (
                <Widget />
              ))}
            </Affix>
          </Col>
          <Col xs={24} sm={24} md={18} lg={18} xl={16}>
            <MainWidget />
            {MainBottomWidgets.map(Widget => (
              <Widget />
            ))}
          </Col>
          <Col xs={0} sm={0} md={0} lg={0} xl={4} style={{ marginTop: "8px" }}>
            {RightWidgets.map(Widget => (
              <Widget />
            ))}
          </Col>
        </Row>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  const { widgets } = state.reducer;
  return { widgets };
}

export default connect(mapStateToProps)(Index);
