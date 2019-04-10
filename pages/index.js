import React from "react";
import { connect } from "react-redux";
import Layout from "../comps/Layout.js";
import { configWidgets } from "../store/actions";
import layoutConfig from "../layoutConfig";
import { Row, Col, Affix } from "antd";
import hljs from "highlight.js";
import "highlight.js/styles/default.css";
import pluginManager from "../plugins";

class Index extends React.Component {
  static async getInitialProps(props) {
    const config = layoutConfig[props.query._type || "home"];
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
          <Col span={4}>
            <Affix>
              {LeftWidgets.map(Widget => (
                <Widget />
              ))}
            </Affix>
          </Col>
          <Col span={16}>
            <MainWidget />
            {MainBottomWidgets.map(Widget => (
              <Widget />
            ))}
          </Col>
          <Col span={4}>
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
