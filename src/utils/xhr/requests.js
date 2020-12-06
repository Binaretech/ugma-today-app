const endpoints = {
  cost: {
    store: {
      method: "POST",
      url: "/admin/cost",
      showErrorSnackbar: true,
      showSucessSnackbar: true,
    },
  },
  post: {
    index: {
      method: "GET",
      url: "/post",
      showErrorSnackbar: true,
    },
    like: {
      method: "POST",
      url: "/post/like/:id",
      showErrorSnackbar: true,
    },
    unlike: {
      method: "POST",
      url: "/post/unlike/:id",
      showErrorSnackbar: true,
    },
  },
  news: {
    index: {
      method: "GET",
      url: "/news",
      showErrorSnackbar: true,
      queryParams: {
        withTimestamps: true,
      },
    },
    show: {
      method: "GET",
      url: "/news/:id",
    },
  },
};

export default endpoints;
