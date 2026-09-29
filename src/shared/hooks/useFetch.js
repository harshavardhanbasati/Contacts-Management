import { useCallback, useEffect, useState } from "react";

async function requestData(url, signal) {
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const result = await response.json();
  if (!Array.isArray(result)) {
    throw new Error("Expected the response to contain a list");
  }

  return result;
}

function useFetch(url) {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const controller = new AbortController();

    requestData(url, controller.signal)
      .then((result) => {
        if (controller.signal.aborted) {
          return;
        }
        setData(result);
        setStatus("success");
      })
      .catch((error) => {
        if (!controller.signal.aborted) {
          console.error(error);
          setStatus("error");
        }
      });

    return () => controller.abort();
  }, [url]);

  const refetch = useCallback(async () => {
    setStatus("loading");

    try {
      const result = await requestData(url);
      setData(result);
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }, [url]);

  return { data, status, refetch };
}

export default useFetch;
