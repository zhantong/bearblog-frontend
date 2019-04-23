import React from "react";
import { connect } from "react-redux";
import { requestNavbar } from "../store/actions";
import { Layout, Menu, Row, Col, Typography, Input } from "antd";
import Link from "next/link";
import { buildPageUrl } from "../plugins/page/page";
import getConfig from "next/config";
import Router from "next/router";

class Navbar extends React.Component {
  state = {
    collapsed: true
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  async componentDidMount() {
    if (!this.props.pages) {
      const { dispatch } = this.props;
      await dispatch(requestNavbar());
    }
  }

  render() {
    const { pages = [] } = this.props;

    return (
      <Layout.Header theme="light">
        <Row>
          <Col span={4}>
            <Typography.Text strong style={{ fontSize: "26px" }}>
              <Link href="/">
                <a
                  style={{
                    color: "rgba(255, 255, 255, 0.65)",
                    textDecoration: "none"
                  }}
                >
                  {getConfig().publicRuntimeConfig.name}
                </a>
              </Link>
            </Typography.Text>
          </Col>
          <Col span={16}>
            <Menu mode="horizontal" theme="dark" style={{ lineHeight: "64px" }}>
              {pages.map(page => {
                const pageUrl = buildPageUrl(page.slug);
                return (
                  <Menu.Item>
                    <Link as={pageUrl.as} href={pageUrl.href} passHref>
                      <a>{page.title}</a>
                    </Link>
                  </Menu.Item>
                );
              })}
            </Menu>
          </Col>
          <Col span={4}>
            <Input.Search
              placeholder="搜索"
              onSearch={value =>
                Router.push(
                  `/index?search=${value}`,
                  `/articles?search=${value}`
                )
              }
            />
          </Col>
        </Row>
      </Layout.Header>
    );
  }
}

function mapStateToProps(state) {
  const { navbarLoading, pages } = state.reducer;
  return { navbarLoading, pages };
}

export default connect(mapStateToProps)(Navbar);
