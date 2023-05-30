import { useState, useEffect } from "react";
import { getSegmentsQuerie } from "./queries";
import { TFetchHook, TSegment } from "./services.types";
import { API_URL } from "../config";
import axios from "axios";

async function getSegments(param: number) {
  try {
    const response = await axios({
      url: API_URL,
      method: "POST",
      headers: {
        "Authorization": `Api-Key ${localStorage.getItem("CMGT_TOKEN")}`,
      },
      data: {
        query: getSegmentsQuerie,
      },
    });

    const { data } = response.data;

    const leakedContent = data.getAllSegments.filter(
      (segment: TSegment) => segment.SEGMENT_PARENT === param
    );

    return leakedContent as TSegment[];
  } catch {
    return [];
  }
}

export const useFetch = (param: number): TFetchHook => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      const result = await getSegments(param);
      setData(result);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error };
};
