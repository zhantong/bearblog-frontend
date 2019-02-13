import React from 'react'
import App, {Container} from 'next/app'
import TheNavbar from '../comps/TheNavbar'

class MyApp extends App {
    static async getInitialProps({Component, ctx}) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }

        let navbarProps = await TheNavbar.getInitialProps();

        return {pageProps, navbarProps}
    }

    render() {
        const {Component, pageProps} = this.props;

        return (
            <Container>
                <TheNavbar {...this.props.navbarProps}/>
                <Component {...pageProps} />
            </Container>
        )
    }
}

export default MyApp