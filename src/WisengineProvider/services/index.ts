import { useState, useEffect } from "react";
import { TFetchHook } from "./services.types";
import { getContent, getContents, getSegments } from "./getters";

export const getContentById = (id: number): TFetchHook => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      const result = await getContent(id);
      result[0].SEGMENTS.sort((a, b) => a.ORDER - b.ORDER)
      setData(result);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [id]);
  
  return { data, loading, error };
};

export const getAllContents = (): TFetchHook => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      const result = await getContents();
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

export const getAllSegments = (): TFetchHook => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      const result = await getSegments();
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