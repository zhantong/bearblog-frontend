import request from './client'

function getList() {
    return request({
        url: 'articles',
        method: 'GET'
    })
}

function get(number) {
    return request({
        url: `article/${number}`,
        method: 'GET'
    })
}

const ArticleService = {
    getList, get
};

export default ArticleService