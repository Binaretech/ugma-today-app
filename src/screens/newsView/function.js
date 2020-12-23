import { useReducer, useState, createContext } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useXhr } from '../../utils/xhr/hook';
import requests from '../../utils/xhr/requests';
import { actions, reducer } from './reducer';

export const NewsContext = createContext(null);

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
