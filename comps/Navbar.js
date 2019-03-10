import React from "react";
import {connect} from "react-redux";
import {requestNavbar} from "../store/actions";
import {Layout, Menu, Icon} from 'antd';
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
            <Layout.Sider
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse}
            >
                <Menu
                    theme="dark"
                    mode="inline"
                >
                    {pages.map(page => {
                        const pageUrl = buildPageUrl(page.slug);
                        return <Menu.Item>
                            <Link as={pageUrl.as} href={pageUrl.href} passHref>
                                <a>
                                    <Icon type="pie-chart"/>
                                    <span>{page.title}</span>
                                </a>
                            </Link>
                        </Menu.Item>
                    })}
                </Menu>
            </Layout.Sider>
        )
    }
}

function mapStateToProps(state) {
    const {navbarLoading, pages} = state.reducer;
    return {navbarLoading, pages}
}

export default connect(mapStateToProps)(Navbar)