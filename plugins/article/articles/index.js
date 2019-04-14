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
                ...Object.keys(item.plugin).map(pluginId => {
                  const attach = pluginManager.getAttach(
                    pluginId,
                    "article",
                    "listMeta"
                  );
                  if (attach) {
                    const Element = attach.component;
                    return (
                      <Element
                        article={item}
                        data={item && item.plugin[pluginId]}
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
