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
                left: [],
                right: [
                    {
                        pluginName: 'comment',
                        widgetName: 'latestComments'
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
                ]
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
                ]
            }
    }
}

export default widgets