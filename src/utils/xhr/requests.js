const endpoints = {
  cost: {
    store: {
      method: 'POST',
      url: '/admin/cost',
      showErrorSnackbar: true,
      showSucessSnackbar: true,
    },
  },
  post: {
    index: {
      method: 'GET',
      url: '/post',
      showErrorSnackbar: true,
    },
    like: {
      method: 'POST',
      url: '/post/like/:id',
      showErrorSnackbar: true,
    },
    unlike: {
      method: 'POST',
      url: '/post/unlike/:id',
      showErrorSnackbar: true,
    },
    comment: {
      method: 'POST',
      url: '/post/:id/comment',
      showErrorSnackbar: true,
    },
  },
  news: {
    index: {
      method: 'GET',
      url: '/news',
      showErrorSnackbar: true,
      queryParams: {
        withTimestamps: true,
      },
    },
    show: {
      method: 'GET',
      url: '/news/:id',
      showErrorSnackbar: true,
    },
  },
  comment: {
    store: {
      method: 'POST',
      url: '/comment/:id',
      showErrorSnackbar: true,
    },
    reply: {
      method: 'POST',
      url: '/comment/:id/reply',
      showErrorSnackbar: true,
    },
    index: {
      method: 'GET',
      url: '/comment/:id',
      showErrorSnackbar: true,
    },
    indexReplies: {
      method: 'GET',
      url: '/replies/:id',
      showErrorSnackbar: true,
    },
    like: {
      method: 'POST',
      url: '/comment/like/:id',
      showErrorSnackbar: true,
    },
    unlike: {
      method: 'POST',
      url: '/comment/unlike/:id',
      showErrorSnackbar: true,
    },
  },
};

export default endpoints;
