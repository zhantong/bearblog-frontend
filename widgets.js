import Articles from './plugins/article/articles'
import {reducer as articlesReducer} from './plugins/article/articles/store'

const widgets = {
    article: {
        articles: {
            widget: Articles,
            reducer: articlesReducer
        }
    }
};

export default widgets