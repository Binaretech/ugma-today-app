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
      .catch(() => {
        setLoading(false);
      });
  };

  return [fetchReplies, loading];
}

export function useOnLike(id, dispatch, reply = false) {
  const [send] = useXhr();
  function like() {
    return send({ ...requests.comment.like, params: { id } }).then(() =>
      dispatch({
        type: !reply ? newsActions.LIKE_COMMENT : newsActions.LIKE_REPLY,
        comment: id,
      }),
    );
  }

  function unlike() {
    return send({ ...requests.comment.unlike, params: { id } }).then(() =>
      dispatch({
        type: !reply ? newsActions.UNLIKE_COMMENT : newsActions.UNLIKE_REPLY,
        comment: id,
      }),
    );
  }

  return [like, unlike];
}

export function useOnReply(id, dispatch) {
  const [send] = useXhr({ ...requests.comment.reply, params: { id } });
  const [value, setValue] = useState('');

  function reply() {
    send({ body: { comment: value } }).then((response) => {
      dispatch({
        type: newsActions.ADD_REPLY,
        payload: response.data,
        comment: id,
      });
      setValue('');
    });
  }

  return [value, setValue, reply];
}
