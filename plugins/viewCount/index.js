import ArticleList from "./article/List";

export default {
  id: "viewCount",
  components: [],
  attach: {
    article: {
      list: {
        component: ArticleList
      }
    }
  }
};
