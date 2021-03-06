import Comments from "./comments";
import { reducer as commentsReducer } from "./comments/store";
import LatestComments from "./latestComments";
import { reducer as latestCommentsReducer } from "./latestComments/store";
import ArticleList from "./article/List";

export default {
  id: "comment",
  components: [
    {
      slug: "comments",
      main: Comments,
      reducer: commentsReducer
    },
    {
      slug: "latestComments",
      main: LatestComments,
      reducer: latestCommentsReducer
    }
  ],
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
