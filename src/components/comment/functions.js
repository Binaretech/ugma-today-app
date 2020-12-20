import { useState } from 'react';
import { newsActions } from '../../screens/newsView';
import { useXhr } from '../../utils/xhr/hook';
import requests from '../../utils/xhr/requests';

export function useHandleRepliesPagination(dispatch) {
  const [send] = useXhr({ ...requests.comment.indexReplies });
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
          type: newsActions.LOAD_REPLIES,
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
