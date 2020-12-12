export const actions = {
  SET_NEWS: 'SET_NEWS',
  ADD_LIKE: 'ADD_LIKE',
  REMOVE_LIKE: 'REMOVE_LIKE',
  ADD_COMMENT: 'ADD_COMMENT',
  ADD_REPLY: 'ADD_REPY',
};

/*
 * @param {any} state
 * @param {{type:any, news:any?, payload:any?}} action
 *
 * @return {object}
 */
export function reducer(state = {}, action) {
  switch (action.type) {
    case actions.SET_NEWS:
      return {
        ...action.news,
        comments: {
          currentPage: action.news.comments.current_page,
          data: action.news.comments.data,
          ids: action.news.comments.ids,
        },
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
          ids: [...state.comments.ids, action?.payload?.id],
          data: {
            ...state.comments.data,
            [action?.payload?.id]: action.payload,
          },
        },
      };
    case actions.ADD_REPLY:
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.payload.reply_to_id]: {
            ...state.comments[action.payload.reply_to_id],
            replies: {
              ids: [
                ...state.comments[action.payload.reply_to_id].replies,
                action.payload.id,
              ],
              data: {
                ...state.comments[action.payload.reply_to_id].replies,
                [action.payload.id]: action.payload,
              },
            },
          },
        },
      };
    default:
      return state;
  }
}
