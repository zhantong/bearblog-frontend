import Toc from "./toc";
import { reducer as tocReducer } from "./toc/store";

export default {
  id: "toc",
  components: [
    {
      slug: "toc",
      main: Toc,
      reducer: tocReducer
    }
  ]
};
