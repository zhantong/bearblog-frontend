import React from "react";
import { connect } from "react-redux";
import { requestArticle, didRenderArticle } from "./store";
import { Typography, Card, Divider, Row, Col } from "antd";
import ReactMarkdown from "react-markdown";
import pluginManager from "../../../plugins";
import Timestamp from "../Timestamp";

function flatten(text, child) {
  return typeof child === "string"
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text);
}

function HeadingRenderer(props) {
  const children = React.Children.toArray(props.children);
  const text = children.reduce(flatten, "");
  const slug = text.replace(/\s+/g, "-");
  return React.createElement("h" + props.level, { id: slug }, props.children);
}

class Article extends React.Component {
  static async getInitialProps({ query, reduxStore }) {
    const { number } = query;
    await reduxStore.dispatch(requestArticle(number));
    return {};
  }
  componentDidMount() {
    this.props.didRenderArticle(this.props.article);
  }
  componentDidUpdate() {
    this.props.didRenderArticle(this.props.article);
  }

  render() {
    const { article = null } = this.props;
    if (!article) {
      return null;
    }
    return (
      <Card style={{ marginBottom: 10 }}>
        <Typography>
          <Typography.Title>{article.title}</Typography.Title>
          <Row justify="space-between" type="flex">
            <Col>
              <Timestamp data={article.timestamp} />
            </Col>
            {Object.keys(article.plugin).map(pluginId => {
              const attach = pluginManager.getAttach(
                pluginId,
                "article",
                "articleMeta"
              );
              if (attach) {
                const Element = attach.component;
                return (
                  <Col>
                    <Element
                      article={article}
                      data={article.plugin[pluginId]}
                    />
                  </Col>
                );
              }
            })}
          </Row>
          <Divider />
          <ReactMarkdown
            source={article.body}
            renderers={{
              heading: HeadingRenderer
            }}
          />
        </Typography>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  const { article } = state["article.article"];
  return { article };
}
function mapDispatchToProps(dispatch) {
  return {
    didRenderArticle: article => dispatch(didRenderArticle(article))
  };
}

export function buildArticleUrl(number) {
  return {
    as: `/a/${number}`,
    href: `/index?_type=article&number=${number}`
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Article);
