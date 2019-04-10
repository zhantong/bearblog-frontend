import Page from "./page";
import { reducer as pageReducer } from "./page/store";

export default {
  id: "page",
  components: [
    {
      slug: "page",
      main: Page,
      reducer: pageReducer
    }
  ]
};
