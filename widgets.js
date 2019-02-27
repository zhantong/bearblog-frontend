import Articles from './plugins/article/articles'
import {reducer as articlesReducer} from './plugins/article/articles/store'
import Article from './plugins/article/article'
import {reducer as articleReducer} from './plugins/article/article/store'
import LatestComments from './plugins/comment/latestComments'
import {reducer as latestCommentsReducer} from './plugins/comment/latestComments/store'
import Categories from './plugins/category/categories'
import {reducer as categoriesReducer} from './plugins/category/categories/store'
import Page from './plugins/page/page'
import {reducer as pageReducer} from './plugins/page/page/store'
import Toc from './plugins/toc/toc'
import Comments from './plugins/comment/comments'
import {reducer as commentsReducer} from './plugins/comment/comments/store'

const widgets = {
    article: {
        articles: {
            widget: Articles,
            reducer: articlesReducer
        },
        article: {
            widget: Article,
            reducer: articleReducer
        }
    },
    comment: {
        latestComments: {
            widget: LatestComments,
            reducer: latestCommentsReducer
        },
        comments: {
            widget: Comments,
            reducer: commentsReducer
        }
    },
    category: {
        categories: {
            widget: Categories,
            reducer: categoriesReducer
        }
    },
    page: {
        page: {
            widget: Page,
            reducer: pageReducer
        }
    },
    toc: {
        toc: {
            widget: Toc
        }
    }
};

export function getWidgetsProp(type) {
    switch (type) {
        case 'article':
            return {
                main: {
                    pluginName: 'article',
                    widgetName: 'article'
                },
                left: [
                    {
                        pluginName: 'toc',
                        widgetName: 'toc'
                    }
                ],
                right: [
                    {
                        pluginName: 'comment',
                        widgetName: 'latestComments'
                    }
                ],
                mainBottom: [
                    {
                        pluginName: 'comment',
                        widgetName: 'comments'
                    }
                ]
            };
        case 'page':
            return {
                main: {
                    pluginName: 'page',
                    widgetName: 'page'
                },
                left: [],
                right: [
                    {
                        pluginName: 'comment',
                        widgetName: 'latestComments'
                    }
                ],
                mainBottom: []
            };
        default:
            return {
                main: {
                    pluginName: 'article',
                    widgetName: 'articles'
                },
                left: [
                    {
                        pluginName: 'category',
                        widgetName: 'categories'
                    }
                ],
                right: [
                    {
                        pluginName: 'comment',
                        widgetName: 'latestComments'
                    }
                ],
                mainBottom: []
            }
    }
}

export default widgets