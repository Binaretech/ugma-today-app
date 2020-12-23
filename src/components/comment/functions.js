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

export function useOnLike(id, dispatch, reply = false) {
  const [send] = useXhr();
  function like() {
    debugger;
    send({ ...requests.comment.like, params: { id } }).then(() =>
      dispatch({
        type: !reply ? newsActions.LIKE_COMMENT : newsActions.LIKE_REPLY,
        comment: id,
      }),
    );
  }

  function unlike() {
    send({ ...requests.comment.unlike, params: { id } }).then(() =>
      dispatch({
        type: !reply ? newsActions.UNLIKE_COMMENT : newsActions.UNLIKE_REPLY,
        comment: id,
      }),
    );
  }

  return [like, unlike];
}
