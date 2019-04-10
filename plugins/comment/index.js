import Comments from "./comments";
import { reducer as commentsReducer } from "./comments/store";
import LatestComments from "./latestComments";
import { reducer as latestCommentsReducer } from "./latestComments/store";

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
  ]
};
