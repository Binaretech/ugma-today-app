export const actions = {
  SET_NEWS: 'SET_NEWS',
  ADD_LIKE: 'ADD_LIKE',
  REMOVE_LIKE: 'REMOVE_LIKE',
  ADD_COMMENT: 'ADD_COMMENT',
  LOAD_COMMENTS: 'LOAD_COMMENTS',
  LOAD_REPLIES: 'LOAD_REPLIES',
  ADD_REPLY: 'ADD_REPLY',
  LIKE_COMMENT: 'LIKE_COMMENT',
};

/**
 * @param {object} state
 * @param {{type, news?, payload?}} action
 *
 * @return {object}
 */
export function reducer(state = {}, action) {
  switch (action.type) {
    case actions.SET_NEWS:
      return {
        ...action.news,
        comments: {
          ids: action.news?.comments?.ids,
          data: action.news?.comments?.data,
          currentPage: action.news?.comments?.currentPage ?? 1,
        },
        replies: action.news.replies,
      };
    case actions.ADD_LIKE:
      return {
        ...state,
        likedByUser: true,
        likesCount: state.likesCount + 1,
      };
    case actions.REMOVE_LIKE:
      return {
        ...state,
        likedByUser: false,
        likesCount: state.likesCount - 1,
      };
    case actions.ADD_COMMENT:
      return {
        ...state,
        comments: {
          ids: [...(state.comments?.ids ?? []), action.payload?.id],
          data: {
            ...state.comments.data,
            [action.payload?.id]: action.payload,
          },
        },
      };
    case actions.LIKE_COMMENT:
      debugger;
      return {
        ...state,
        comments: {
          ...state.comments,
          data: {
            ...state.comments.data,
            [action.comment]: {
              ...state.comments.data[action.comment],
              likes: state.comments.data[action.comment].likes + 1,
              likedByUser: true,
            },
          },
        },
      };
    case actions.LOAD_COMMENTS:
      return loadComments(state, action);
    case actions.LOAD_REPLIES:
      return loadReplies(state, action);
    case actions.ADD_REPLY:
      return addReply(state, action);
    default:
      return state;
  }
}

function loadComments(state, action) {
  return {
    ...state,
    comments: {
      ids: [
        ...new Set([
          ...(state.comments?.ids ?? []),
          ...action.payload?.comments?.ids,
        ]),
      ],
      data: {
        ...state.comments.data,
        ...(action.payload?.comments?.data ?? {}),
      },
      currentPage: action.payload?.comments?.current_page ?? 1,
    },
    replies: { ...state.replies, ...action.payload.replies },
  };
}

function loadReplies(state, action) {
  const comment = state.comments.data[action.comment];

  return {
    ...state,
    comments: {
      ...state.comments,
      data: {
        ...state.comments.data,
        [action.comment]: {
          ...comment,
          replies: {
            ids: [...new Set([...comment.replies.ids, ...action.payload.ids])],
            currentPage: action.payload?.current_page,
          },
        },
      },
    },
    replies: {
      ...state.replies,
      ...action.payload.data,
    },
  };
}

function addReply(state, action) {
  const comment = state.comments.data[action.comment];

  return {
    ...state,
    comments: {
      ...state.comment,
      data: {
        ...state.comment.data,
        [action.comment]: {
          ...comment,
          replies: [...comment.replies, action.payload.id],
        },
      },
    },
    replies: {
      ...state.replies,
      [action.payload.id]: action.payload,
    },
  };
}
