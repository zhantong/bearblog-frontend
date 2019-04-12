import Article from "./article/Article";

export default {
  id: "tag",
  components: [],
  attach: {
    article: {
      article: {
        component: Article
      }
    }
  }
};
