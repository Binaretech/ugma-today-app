import { useReducer, useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useXhr } from '../../utils/xhr/hook';
import requests from '../../utils/xhr/requests';
import { reducer, actions } from './reducer';

export const errors = {
  NOT_FOUND: 'NOT_FOUND',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
};

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
  const [send] = useXhr(requests.news.show);
  const [error, setError] = useState(null);

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
        setError({
          type:
            error?.status === 404 ? errors.NOT_FOUND : errors.INTERNAL_ERROR,
          message: error?.message || error?.data?.message,
        });
      });
    // eslint-disable-next-line
  }, [id]);

  return [loading, news, dispatch, error];
}
