import React from "react";
import {connect} from "react-redux";
import {requestNavbar} from "../store/actions";
import {Menu, Container, Placeholder} from 'semantic-ui-react'
import Link from 'next/link'
import {buildPageUrl} from "../plugins/page/page";


class Navbar extends React.Component {
    async componentDidMount() {
        if (!this.props.pages) {
            const {dispatch} = this.props;
            await dispatch(requestNavbar());
        }
    }

    render() {
        const {navbarLoading = true, pages} = this.props;

        return (
            <Menu fixed='top'>
                <Link href='/' passHref>
                    <Menu.Item name="BearBlog"/>
                </Link>
                <Container>
                    {navbarLoading ? (
                            <Menu.Item>
                                <Placeholder fluid>
                                    <Placeholder.Header image>
                                    </Placeholder.Header>
                                </Placeholder>
                            </Menu.Item>
                        ) :
                        pages.map(page =>
                            <Item page={page}/>
                        )}
                </Container>
            </Menu>
        )
    }
}

const Item = ({page}) => {
    if (!page) {
        return null;
    }
    const pageUrl = buildPageUrl(page.slug);
    return (
        <Link as={pageUrl.as} href={pageUrl.href} passHref>
            <Menu.Item name={page.title}/>
        </Link>
    )
};

function mapStateToProps(state) {
    const {navbarLoading, pages} = state.reducer;
    return {navbarLoading, pages}
}

export default connect(mapStateToProps)(Navbar)