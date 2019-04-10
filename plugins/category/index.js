import Categories from "./categories";
import { reducer as categoriesReducer } from "./categories/store";

export default {
  id: "category",
  components: [
    {
      slug: "categories",
      main: Categories,
      reducer: categoriesReducer
    }
  ]
};
