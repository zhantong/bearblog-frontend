import request from './client'


function get() {
    return request({
        url: 'navbar',
        method: 'GET'
    })
}

const NavbarService = {
    get
};

export default NavbarService