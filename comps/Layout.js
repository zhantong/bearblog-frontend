import 'antd/dist/antd.css'
import Navbar from "./Navbar";
import {Layout} from 'antd';
import React from "react";


const TheLayout = (props) => (
    <Layout>
        <Navbar/>
        <Layout.Content style={{marginTop: 64}}>
            {props.children}
        </Layout.Content>
    </Layout>
);

export default TheLayout