import { useCallback, useEffect, useState } from "react";
import { useXhr } from "../../utils/xhr/hook";
import requests from "../../utils/xhr/requests";

export function useFetchNews() {
  const [send] = useXhr(requests.news.index);
  const fetchPosts = useCallback(send, []);

  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchPosts().then((response) => {
      setLoading(false);
      setPosts(
        response?.ids?.map((id) => {
          return response?.data?.[id];
        }) ?? []
      );
    });
  }, [fetchPosts]);

  return [loading, posts];
}
