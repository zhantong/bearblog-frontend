import React from "react";
import { connect } from "react-redux";
import { List } from "antd";
import { requestArticleList } from "./store";
import { buildArticleUrl } from "../article";
import Link from "next/link";
import pluginManager from "../../../plugins";
import Timestamp from "../Timestamp";

class Articles extends React.Component {
  constructor(props) {
    super(props);
  }

  static async getInitialProps({ reduxStore, query }) {
    await reduxStore.dispatch(requestArticleList(query));
    return {};
  }

  render() {
    const { articles = [] } = this.props;
    return (
      <List
        itemLayout="vertical"
        dataSource={articles}
        renderItem={item => {
          const articleUrl = buildArticleUrl(item.number);
          return (
            <List.Item
              actions={[
                <Timestamp data={item.timestamp} />,
                ...pluginManager.getAttaches("article").map(attach => {
                  if (attach.attach.list) {
                    const Element = attach.attach.list.component;
                    return (
                      <Element
                        article={item}
                        data={item && item.plugin[attach.pluginId]}
                      />
                    );
                  }
                })
              ]}
            >
              <List.Item.Meta
                title={
                  <Link as={articleUrl.as} href={articleUrl.href}>
                    <a>{item.title}</a>
                  </Link>
                }
              />
              {item.bodyAbstract}
            </List.Item>
          );
        }}
      />
    );
  }
}

function mapStateToProps(state) {
  const { articles } = state["article.articles"];
  return { articles };
}

export default connect(mapStateToProps)(Articles);
