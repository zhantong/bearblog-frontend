import React from "react";
import {connect} from "react-redux";
import {requestNavbar} from "../store/actions";
import {Menu, Container, Placeholder} from 'semantic-ui-react'


class Navbar extends React.Component {
    async componentDidMount() {
        if (!this.props.navbar) {
            const {dispatch} = this.props;
            await dispatch(requestNavbar());
        }
    }

    render() {
        const {navbarLoading = true, navbar} = this.props;

        return (
            <Menu fixed='top'>
                <Menu.Item>
                    {navbarLoading ? (
                            <Placeholder>
                                <Placeholder.Header image>
                                </Placeholder.Header>
                            </Placeholder>
                        ) :
                        navbar.brand
                    }
                </Menu.Item>
                <Container>
                    {navbarLoading ? (
                            <Menu.Item>
                                <Placeholder fluid>
                                    <Placeholder.Header image>
                                    </Placeholder.Header>
                                </Placeholder>
                            </Menu.Item>
                        ) :
                        navbar.items.map(item =>
                            <Menu.Item as='a'>{item.name}</Menu.Item>
                        )}
                </Container>
            </Menu>
        )
    }
}

function mapStateToProps(state) {
    const {navbarLoading, navbar} = state.reducer;
    return {navbarLoading, navbar}
}

export default connect(mapStateToProps)(Navbar)