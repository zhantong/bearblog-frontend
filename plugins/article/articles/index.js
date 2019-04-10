import React from "react";
import { connect } from "react-redux";
import { List, Icon } from "antd";
import { requestArticleList } from "./store";
import { buildArticleUrl } from "../article";
import Link from "next/link";
import Moment from "react-moment";

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
                <IconText type="calendar">
                  <Moment format="YYYY-MM-DD">{item.timestamp}</Moment>
                </IconText>,
                ...Object.keys(item.plugin).map(id => (
                  <Meta id={id} meta={item.plugin[id]} />
                ))
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

const IconText = props => (
  <span>
    <Icon type={props.type} style={{ marginRight: 8 }} />
    {props.children}
  </span>
);

const Meta = ({ id, meta }) => {
  if (id === "category") {
    return (
      <>
        {meta.map(category => (
          <IconText type="folder-open">{category.name}</IconText>
        ))}
      </>
    );
  }
  if (id === "view_count") {
    return <IconText type="heart">{meta.value}</IconText>;
  }
  if (id === "comment") {
    return <IconText type="message">{meta.value}</IconText>;
  }
  return null;
};

function mapStateToProps(state) {
  const { articles } = state['article.articles'];
  return { articles };
}

export default connect(mapStateToProps)(Articles);
