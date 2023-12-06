import axios from "axios";
const baseUrl = "http://localhost:3008/";


export const apiPost = async (url: string, body: unknown) => {
  try {
    console.log("Api post client running");
    const response = await axios.post(`${baseUrl}${url}`, body, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const apiPatch = async (url: string, body: unknown) => {
  try {
    console.log("Api patch client running");
    const response = await axios.patch(`${baseUrl}${url}`, body, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const apiGet = async (url: string, abortController: AbortController) => {
  try {
    const response = await axios.get(`${baseUrl}${url}`, {
      withCredentials: true,
      signal: abortController.signal,
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const apiIntercept = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    },
  withCredentials: true,
});