import '../semantic/dist/semantic.min.css'
import Navbar from "./Navbar";
import {Container} from 'semantic-ui-react'
import React from "react";


const TheLayout = (props) => (
    <>
        <Navbar/>
        <Container fluid style={{marginTop: '4em'}}>
            {props.children}
            <style jsx global>{`
            h1::before, h2::before, h3::before, h4::before, h5::before, h6::before {
    display: block;
    content: " ";
    height: 54px;
    margin-top: -54px;
    visibility: hidden;
}
            `}</style>
        </Container>
    </>
);

export default TheLayout