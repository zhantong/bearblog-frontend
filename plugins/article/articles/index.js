import React from "react";
import { connect } from "react-redux";
import { List, Card, Pagination } from "antd";
import { requestArticleList } from "./store";
import { buildArticleUrl } from "../article";
import Link from "next/link";
import pluginManager from "../../../plugins";
import Timestamp from "../Timestamp";
import scrollIntoView from "dom-scroll-into-view";
import Router from "next/router";
import queryString from "query-string";

class Articles extends React.Component {
  constructor(props) {
    super(props);
  }

  static async getInitialProps({ reduxStore, query }) {
    await reduxStore.dispatch(requestArticleList(query));
    if (process.browser) {
      scrollIntoView(document.body, document);
    }
    return {};
  }

  render() {
    const { articles = [], pagination } = this.props;
    return (
      <Card>
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
        <Pagination
          current={pagination.page}
          total={pagination.total}
          pageSize={pagination.perPage}
          style={{ textAlign: "center" }}
          onChange={async page => {
            const query = this.props.query;
            query.page = page;
            Router.push(
              `/index?${queryString.stringify(query)}`,
              `/articles?${queryString.stringify(query)}`
            );
          }}
        />
      </Card>
    );
  }
}

function mapStateToProps(state) {
  const { articles, pagination, query } = state["article.articles"];
  return { articles, pagination, query };
}

export default connect(mapStateToProps)(Articles);
