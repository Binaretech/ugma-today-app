import { useReducer, useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useXhr } from "../../utils/xhr/hook";
import requests from "../../utils/xhr/requests";

export const actions = {
  SET_NEWS: "SET_NEWS",
  ADD_LIKE: "ADD_LIKE",
  REMOVE_LIKE: "REMOVE_LIKE",
};

/**
 * @param {object} state
 * @param {{type, news?}} action
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
    default:
      return state;
  }
}

export function useHandleNews() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [news, dispatch] = useReducer(reducer, {});
  const [send] = useXhr(requests.news.show);

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
      .catch(() => {
        setLoading(false);
      });
    // eslint-disable-next-line
  }, [id]);

  return [loading, news, dispatch];
}
