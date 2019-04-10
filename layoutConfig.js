export default {
  article: {
    main: {
      plugin: "article",
      component: "article"
    },
    left: [
      {
        plugin: "toc",
        component: "toc"
      }
    ],
    right: [
      {
        plugin: "comment",
        component: "latestComments"
      }
    ],
    mainBottom: [
      {
        plugin: "comment",
        component: "comments"
      }
    ]
  },
  page: {
    main: {
      plugin: "page",
      component: "page"
    },
    left: [],
    right: [
      {
        plugin: "comment",
        component: "latestComments"
      }
    ],
    mainBottom: []
  },
  home: {
    main: {
      plugin: "article",
      component: "articles"
    },
    left: [
      {
        plugin: "category",
        component: "categories"
      }
    ],
    right: [
      {
        plugin: "comment",
        component: "latestComments"
      }
    ],
    mainBottom: []
  }
};