import "antd/dist/antd.less";
import "../custom.css";
import Navbar from "./Navbar";
import { Layout } from "antd";
import React from "react";
import Footer from "./Footer";

const TheLayout = props => (
  <Layout>
    <Navbar />
    <Layout.Content style={{ margin: "0 8px" }}>
      {props.children}
    </Layout.Content>
    <Footer />
  </Layout>
);

export default TheLayout;
