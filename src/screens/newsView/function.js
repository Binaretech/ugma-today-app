import { useReducer, useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useXhr } from '../../utils/xhr/hook';
import requests from '../../utils/xhr/requests';

export const actions = {
  SET_NEWS: 'SET_NEWS',
  ADD_LIKE: 'ADD_LIKE',
  REMOVE_LIKE: 'REMOVE_LIKE',
  ADD_COMMENT: 'ADD_COMMENT',
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
      return action.news;
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
    case action.ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    default:
      return state;
  }
}

export function useHandleComment(dispatch) {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [send] = useXhr({ ...requests.post.comment, ...{ params: { id } } });

  async function comment(value) {
    setLoading(true);

    let response = await send({ body: { comment: value } });

    dispatch({
      action: actions.ADD_COMMENT,
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
