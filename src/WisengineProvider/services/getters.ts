import { getSegmentsQuerie, getContentsQuerie } from "../config/queries";
import { API_URL } from "../config";
import { TSegment, TContent } from "./services.types";
import axios from "axios";

export async function getSegments() {
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

    return data.getAllSegments as TSegment[];
  } catch {
    return [];
  }
}

export async function getContent(id: number) {
  if(id === 0) return [];
  try {
    const response = await axios({
      url: API_URL,
      method: "POST",
      headers: {
        "Authorization": `Api-Key ${localStorage.getItem("CMGT_TOKEN")}`,
      },
      data: {
        query: getContentsQuerie,
      },
    });

    const { data } = response.data;

    const leakedContent = data.getAllContents.filter(
      (content: TContent) => content.ID === String(id)
    );

    const allSegments = await getSegments();

    const leakedSegments = allSegments.filter(
      (segment: TSegment) => segment.SEGMENT_PARENT === id
    );

    leakedContent[0].SEGMENTS = leakedSegments;

    return leakedContent as TContent[];
  } catch {
    return [];
  }
}

export async function getContents() {
  try {
    const response = await axios({
      url: API_URL,
      method: "POST",
      headers: {
        "Authorization": `Api-Key ${localStorage.getItem("CMGT_TOKEN")}`,
      },
      data: {
        query: getContentsQuerie,
      },
    });

    const { data } = response.data;

    return data.getAllContents as TContent[];
  } catch {
    return [];
  }
}
