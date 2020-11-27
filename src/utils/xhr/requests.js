export default {
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
  },
  news: {
    index: {
      method: "GET",
      url: "/news",
      showErrorSnackbar: true,
    },
  },
};
