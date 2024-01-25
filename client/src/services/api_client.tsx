import { isJson } from "../utils/util_functions";

// const baseUrl = "http://localhost:3008/";
const baseUrl = "https://find-me-trees-server-production.up.railway.app/";


export const apiPost = async (url: string, body: unknown) => {
  try {
    console.log("Api post client running");
    const response = await fetch(`${baseUrl}${url}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      credentials: "include",
      mode: "cors",
      body: JSON.stringify(body),
    });
    console.log(response);
    if (!isJson(response)) {
      console.log("is not json");
      console.log(response.body)
      return response.body;
    } else {
      const data = await response.json();
      console.log('is json')
      console.log(data);
      return data;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const apiPatch = async (url: string, body: unknown) => {
  try {
    console.log("Api patch client running");
    const response = await fetch(`${baseUrl}${url}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      credentials: "include",
      mode: "cors",
      body: JSON.stringify(body),
    });
    console.log(response)
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const apiGet = async (url: string, abortController: AbortController) => {
  console.log("Api get client running");
  try {
    const response = await fetch(`${baseUrl}${url}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
      credentials: "include",
      signal: abortController.signal,
    });
    const data = await response.json();
  
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

// Axios caused cors issues

// export const apiPost = async (url: string, body: unknown) => {
//   try {
//     console.log("Api post client running");
//     const response = await axios.post(`${baseUrl}${url}`, body, {
//       withCredentials: true,
//       headers: {
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Origin": `${baseUrl}`,
//       },
//     });
//     return response.data;
//   } catch (err) {
//     console.log(err);
//     return err;
//   }
// };

// export const apiPatch = async (url: string, body: unknown) => {
//   try {
//     console.log("Api patch client running");
//     const response = await axios.patch(`${baseUrl}${url}`, body, {
//       withCredentials: true,
//       headers: {
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Origin": `${baseUrl}`,
//       },
//     });
//     return response.data;
//   } catch (err) {
//     console.log(err);
//     return err;
//   }
// };

// export const apiGet = async (url: string, abortController: AbortController) => {
//   try {
//     const response = await axios.get(`${baseUrl}${url}`, {
//       withCredentials: true,
//       headers: {
//         "Access-Control-Allow-Origin": `${baseUrl}`,
//       },
//       signal: abortController.signal,
//     });
//     return response.data;
//   } catch (err) {
//     console.log(err);
//     return err;
//   }
// };

// export const apiIntercept = axios.create({
//   baseURL: baseUrl,
//   headers: {
//     "Content-Type": "application/json",
//     "Access-Control-Allow-Origin": `${baseUrl}`,
//   },
//   withCredentials: true,
// });

// export const apiIntercept = {
//   async get(url: string) {
//     try {
//       const response = await fetch(`${baseUrl}${url}`, {
//         method: 'GET',
//         credentials: 'include',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       const data = await response.json();
//       return data;
//     } catch (err) {
//       console.log(err);
//       return err;
//     }
//   },