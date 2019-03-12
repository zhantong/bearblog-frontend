import 'antd/dist/antd.css'
import Navbar from "./Navbar";
import {Layout} from 'antd';
import React from "react";


const TheLayout = (props) => (
    <Layout>
        <Navbar/>
        <Layout>
            {props.children}
        </Layout>
    </Layout>
);

export default TheLayout