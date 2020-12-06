import { useXhr } from "../../utils/xhr/hook";
import requests from "../../utils/xhr/requests";
import { newsActions } from "../../screens/newsView";

export function useOnLike(id, dispatch) {
  const [send] = useXhr();

  function like() {
    send({ ...requests.post.like, params: { id } }).then(() =>
      dispatch({ type: newsActions.ADD_LIKE })
    );
  }

  function unlike() {
    send({ ...requests.post.unlike, params: { id } }).then(() =>
      dispatch({ type: newsActions.REMOVE_LIKE })
    );
  }

  return [like, unlike];
}
