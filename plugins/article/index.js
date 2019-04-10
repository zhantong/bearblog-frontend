import Article from "./article";
import { reducer as articleReducer } from "./article/store";
import Articles from "./articles";
import { reducer as articlesReducer } from "./articles/store";

export default {
  id: "article",
  components: [
    {
      slug: "article",
      main: Article,
      reducer: articleReducer
    },
    {
      slug: "articles",
      main: Articles,
      reducer: articlesReducer
    }
  ]
};
