import axios from "axios";

let refreshingToken = false;
let refreshSubcribers: any[] = [];

const instance = axios.create({
  baseURL: `https://asia-southeast1-sendly-email-template-builder.cloudfunctions.net/sendly/api`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getRefreshToken = () => {
  const refreshToken = localStorage.getItem("refresh_token");
  return refreshToken;
};

export const getAccessToken = () => {
  const accessToken = localStorage.getItem("access_token");
  return accessToken;
};

// interceptors to assign access token
instance.interceptors.request.use((config) => {
  if (!config.url?.includes("/auth/refresh")) {
    const access_token = getAccessToken();
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
  }
  return config;
});

//handle API refreshToken to get new access_token
export const refreshAccessToken = async () => {
  try {
    const refresh_token = getRefreshToken();
    console.log("check refresh token", refresh_token);
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${refresh_token}`,
    };
    const response = await instance.get(`/auth/refresh`, { headers });
    console.log("refresh token response", response.data);
    const new_access_token = response.data.token;
    localStorage.setItem("access_token", new_access_token);
    return new_access_token;
  } catch (error) {
    console.error("Unable to refresh access token", error);
  }
};

const onRrefreshed = (token: string) => {
  refreshSubcribers.map((cb) => cb(token));
};

const subscribeTokenRefresh = (cb: any) => {
  refreshSubcribers.push(cb);
};

// Handle case access_token expired, apply new access_token to headers or if refresh_token expired, required user login again
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response, config } = error;
    const status = response?.status;
    const originalRequest = config;
    if (status === 401) {
      if (!refreshingToken) {
        refreshingToken = true;
        refreshAccessToken().then((newToken) => {
          console.log("new token", newToken);
          refreshingToken = false;
          onRrefreshed(newToken);
        });
      }
      const retryOrigReq = new Promise((resolve, reject) => {
        subscribeTokenRefresh((token: string) => {
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          resolve(axios(originalRequest));
        });
      });
      return retryOrigReq;
    } else {
      return Promise.reject(error);
    }
  }
);

export default instance;
