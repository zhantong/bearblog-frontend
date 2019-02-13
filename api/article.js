import request from './client'

function getList() {
    return request({
        url: 'articles',
        method: 'GET'
    })
}

const ArticleService = {
    getList
};

export default ArticleService