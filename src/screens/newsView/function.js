import { useReducer, useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useXhr } from '../../utils/xhr/hook';
import requests from '../../utils/xhr/requests';
import { mergeUniqueElements } from '../../utils/array';

export const actions = {
  SET_NEWS: 'SET_NEWS',
  ADD_LIKE: 'ADD_LIKE',
  REMOVE_LIKE: 'REMOVE_LIKE',
  ADD_COMMENT: 'ADD_COMMENT',
  LOAD_COMMENTS: 'LOAD_COMMENTS',
  LOAD_REPLIES: 'LOAD_REPLIES',
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
    case actions.LOAD_COMMENTS:
      return {
        ...state,
        comments: {
          ids: [
            ...new Set([
              ...(state.comments?.ids ?? []),
              ...action.payload?.ids,
            ]),
          ],
          data: {
            ...state.comments.data,
            ...(action.payload?.data ?? {}),
          },
          currentPage: action.payload.current_page,
        },
      };
    case actions.LOAD_REPLIES:
      return {
        ...state,
        comments: {
          ...state.comments,
          ids: state.comments.ids,
          data: {
            ...state.comments.data,
            [action?.comment]: {
              ...state?.comments?.data[action?.comment],
              replies: {
                ids: [
                  ...new Set([
                    ...state.comments?.data?.[action.comment]?.replies?.ids,
                    ...action?.payload?.ids,
                  ]),
                ],
                data: {
                  ...state?.comments?.data?.[action?.comment].replies?.data,
                  ...action?.payload?.data,
                },
                currentPage: action.payload?.current_page,
              },
            },
          },
        },
      };
    default:
      return state;
  }
}

export function useHandleComment(dispatch) {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [send] = useXhr({ ...requests.comment.store, params: { id } });

  async function comment(value) {
    setLoading(true);

    let response = await send({ body: { comment: value } });

    dispatch({
      type: actions.ADD_COMMENT,
      payload: response.data,
    });

    setLoading(false);
  }

  return [comment, loading];
}

export function useHandleNews() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [news, dispatch] = useReducer(reducer, {});
  const [send, error] = useXhr(requests.news.show);

  useEffect(() => {
    setLoading(true);
    send({
      params: {
        id,
      },
      queryParams: {
        withTimestamps: true,
      },
    })
      .then((response) => {
        setLoading(false);
        dispatch({ type: actions.SET_NEWS, news: response.data });
      })
      .catch((error) => {
        setLoading(false);
      });
    // eslint-disable-next-line
  }, [id]);

  return [loading, news, dispatch, error];
}

export function useHandleCommentPagination(dispatch) {
  const { id } = useParams();
  const [send] = useXhr({ ...requests.comment.index, params: { id } });
  const [loading, setLoading] = useState(false);

  const fetchComments = (page) => () => {
    setLoading(true);
    send({
      queryParams: {
        page,
        withTimestamps: true,
      },
    })
      .then((response) => {
        setLoading(false);
        dispatch({ type: actions.LOAD_COMMENTS, payload: response });
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  return [fetchComments, loading];
}

export function useHandleRepliesPagination(dispatch) {
  const [send] = useXhr({ ...requests.comment.index });
  const [loading, setLoading] = useState(false);

  const fetchReplies = (page, id = 1) => () => {
    setLoading(true);
    send({
      params: { id },
      queryParams: {
        page,
        withTimestamps: true,
      },
    })
      .then((response) => {
        setLoading(false);
        dispatch({
          type: actions.LOAD_REPLIES,
          comment: id,
          payload: response,
        });
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  return [fetchReplies, loading];
}
