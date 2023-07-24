import { useState, useEffect } from "react";

const useSSE = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const eventSource = new EventSource(url);
    console.log("sse called");

    eventSource.onmessage = (event) => {
      const eventData = JSON.parse(event.data);
      setData(eventData);
    };

    eventSource.onerror = (error) => {
      console.error("SSE Error:", error);
    };

    return () => {
      eventSource.close();
    };
  }, [url]);

  return data;
};

export default useSSE;
