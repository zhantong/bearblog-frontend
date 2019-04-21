import { Layout } from "antd";
import React from "react";
import getConfig from "next/config";
import Link from "next/link";

const TheFooter = () => (
  <Layout.Footer style={{ textAlign: "center" }}>
    ©<span> </span>
    {new Date().getFullYear()}
    <span> </span>
    <Link href="/">
      <a>{getConfig().publicRuntimeConfig.name}</a>
    </Link>
    <span> | 由 BearBlog 强力驱动</span>
    {getConfig().publicRuntimeConfig.beianSerial && (
      <span>
        {" "}
        |{" "}
        <a href="http://www.miibeian.gov.cn/">
          {getConfig().publicRuntimeConfig.beianSerial}
        </a>
      </span>
    )}
  </Layout.Footer>
);

export default TheFooter;
