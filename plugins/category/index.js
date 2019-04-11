import Categories from "./categories";
import { reducer as categoriesReducer } from "./categories/store";
import ArticleList from "./article/List";

export default {
  id: "category",
  components: [
    {
      slug: "categories",
      main: Categories,
      reducer: categoriesReducer
    }
  ],
  attach: {
    article: {
      list: {
        component: ArticleList
      }
    }
  }
};
