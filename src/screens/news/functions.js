import { useEffect, useState } from 'react';
import { useXhr } from '../../utils/xhr/hook';
import requests from '../../utils/xhr/requests';

export function useFetchNews() {
  const [send] = useXhr(requests.news.index);

  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setLoading(true);
    send()
      .then((response) => {
        setLoading(false);
        setPosts(
          response?.ids?.map((id) => {
            return response?.data?.[id];
          }) ?? [],
        );
      })
      .catch((e) => {
        setLoading(false);
      });
    //eslint-disable-next-line
  }, []);

  return [loading, posts];
}
