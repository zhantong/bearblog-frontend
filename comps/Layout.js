import 'semantic-ui-css/semantic.min.css'
import Navbar from "./Navbar";
import {Container} from 'semantic-ui-react'
import React from "react";


const TheLayout = (props) => (
    <>
        <Navbar/>
        <Container style={{marginTop: '4em'}}>
            {props.children}
        </Container>
    </>
);

export default TheLayout