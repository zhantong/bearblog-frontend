import Articles from './plugins/article/articles'
import {reducer as articlesReducer} from './plugins/article/articles/store'
import Article from './plugins/article/article'
import {reducer as articleReducer} from './plugins/article/article/store'

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
    }
};

export function getWidgetsProp(type) {
    switch (type) {
        case 'article':
            return {
                main: {
                    pluginName: 'article',
                    widgetName: 'article'
                }
            };
        default:
            return {
                main: {
                    pluginName: 'article',
                    widgetName: 'articles'
                }
            }
    }
}

export default widgets