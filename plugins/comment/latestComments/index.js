import React from "react";
import { requestLatestComments } from "./store";
import { connect } from "react-redux";
import { Collapse, List, Typography } from "antd";
import { buildArticleUrl } from "../../article/article";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

class LatestComments extends React.Component {
  componentDidMount() {
    this.props.requestLatestComments();
  }

  render() {
    if (!this.props.latestComments) {
      return null;
    }

    return (
      <Collapse defaultActiveKey={["1"]}>
        <Collapse.Panel header="最近评论" key="1">
          <List
            dataSource={this.props.latestComments}
            renderItem={item => {
              const articleUrl = buildArticleUrl(item.to.number);
              return (
                <List.Item>
                  <List.Item.Meta
                    title={
                      <>
                        <Typography.Text strong>
                          {item.author.name}
                        </Typography.Text>
                        <Typography.Text type="secondary">
                          评论了
                        </Typography.Text>
                        <Link as={articleUrl.as} href={articleUrl.href}>
                          <a>
                            <Typography.Text underline>
                              《{item.to.title}》
                            </Typography.Text>
                          </a>
                        </Link>
                      </>
                    }
                    description={
                      <Typography.Text style={{ "word-break": "break-all" }}>
                        <ReactMarkdown
                          source={item.body}
                          disallowedTypes={["paragraph"]}
                          unwrapDisallowed
                        />
                      </Typography.Text>
                    }
                  />
                </List.Item>
              );
            }}
          />
        </Collapse.Panel>
      </Collapse>
    );
  }
}

function mapStateToProps(state) {
  const { latestComments } = state["comment.latestComments"];
  return { latestComments };
}

function mapDispatchToProps(dispatch) {
  return {
    requestLatestComments: () => dispatch(requestLatestComments())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LatestComments);
