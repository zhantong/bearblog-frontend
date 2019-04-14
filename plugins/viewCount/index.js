import ArticleList from "./article/List";

export default {
  id: "viewCount",
  components: [],
  attach: {
    article: {
      listMeta: {
        component: ArticleList
      },
      articleMeta: {
        component: ArticleList
      }
    }
  }
};
