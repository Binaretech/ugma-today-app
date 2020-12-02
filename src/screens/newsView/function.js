import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useXhr } from "../../utils/xhr/hook";
import requests from "../../utils/xhr/requests";

export function useFetchNews() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState({});
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
        setNews(response.data);
      })
      .catch(() => {
        setLoading(false);
      });
    // eslint-disable-next-line
  }, [id]);

  return [loading, news];
}
