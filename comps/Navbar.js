import React from "react";
import {connect} from "react-redux";
import {requestNavbar} from "../store/actions";
import {Layout, Menu} from 'antd';
import Link from 'next/link'
import {buildPageUrl} from "../plugins/page/page";


class Navbar extends React.Component {
    state = {
        collapsed: true,
    };

    onCollapse = (collapsed) => {
        this.setState({collapsed});
    };

    async componentDidMount() {
        if (!this.props.pages) {
            const {dispatch} = this.props;
            await dispatch(requestNavbar());
        }
    }

    render() {
        const {pages = []} = this.props;

        return (
            <Layout.Header theme="light">
                <Menu
                    mode="horizontal"
                    theme="dark"
                    style={{lineHeight: '64px'}}
                >
                    {pages.map(page => {
                        const pageUrl = buildPageUrl(page.slug);
                        return (<Menu.Item>
                            <Link as={pageUrl.as} href={pageUrl.href} passHref>
                                <a>
                                    {page.title}
                                </a>
                            </Link>
                        </Menu.Item>)
                    })}
                </Menu>
            </Layout.Header>
        )
    }
}

function mapStateToProps(state) {
    const {navbarLoading, pages} = state.reducer;
    return {navbarLoading, pages}
}

export default connect(mapStateToProps)(Navbar)