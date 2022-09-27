import { FULL_CONFIG } from "../const";

const { API_PREFIX, SERVER_PORT } = FULL_CONFIG;

export const _fetch = async (input: string, init?: RequestInit) => {
  const host = window.location.hostname;
  console.log("http://" + host + ":" + SERVER_PORT + API_PREFIX + input);
  try {
    const res = await window.fetch(
      "http://" + host + ":" + SERVER_PORT + API_PREFIX + input,
      {
        credentials: "include",
        mode: "cors",
        ...init,
        // "Access-Control-Allow-Origin": "*",
        // Connection: "keep-alive",
        // "Content-Type": init?.body ? "application/json" : "",
        // "Keep-Alive": "timeout=5",
        // "Transfer-Encoding": "chunked",
      }
    );
    const data = await res.json();
    if (data.status === "no-permission") {
      window.location.href = `${window.location.origin}/manager/no_permission`;
    }
    return data;
  } catch (e) {
    console.log(e);
  }
};

// const originFetch = window.fetch;

// window.fetch = (resource, options = {}) => {
//   if (window.X_TT_ENV) {
//     options.headers = {
//       ...options.headers,
//       'x-tt-env': window.X_TT_ENV,
//     };
//   }

//   return originFetch(resource, options);
// };
