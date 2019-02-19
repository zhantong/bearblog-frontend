import Articles from './plugins/article/articles'
import {reducer as articlesReducer} from './plugins/article/articles/store'
import Article from './plugins/article/article'
import {reducer as articleReducer} from './plugins/article/article/store'
import LatestComments from './plugins/comment/latestComments'
import {reducer as latestCommentsReducer} from './plugins/comment/latestComments/store'

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