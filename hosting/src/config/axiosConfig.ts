import axios from "axios";

let refreshingToken = false;
let refreshSubcribers: any[] = [];

// https://asia-southeast1-sendly-email-template-builder.cloudfunctions.net/sendly
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
  // api get new_access_token
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
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${refresh_token}`,
    };
    const response = await instance.get(`/auth/refresh`, { headers });
    const new_access_token = response.data.token;
    localStorage.setItem("access_token", new_access_token);
    return new_access_token;
  } catch (error) {
    console.error("Unable to refresh access token", error);
    return null;
  }
};

const onRrefreshed = (token: string) => {
  refreshSubcribers.map((cb) => cb(token));
  refreshSubcribers = [];
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

    // If status 401
    if (status === 401 && !config.url?.includes("/auth/refresh")) {
      if (!refreshingToken) {
        refreshingToken = true;
        try {
          refreshAccessToken()
            .then((newToken) => {
              if (newToken) {
                onRrefreshed(newToken);
                refreshingToken = false;
              } else {
                // If refresh token is invalid, user must log in again
                localStorage.clear();
                sessionStorage.clear();
                window.location.href = "/login";
                return Promise.reject(new Error("Invalid refresh token"));
              }
            })
            .catch((error) => {
              console.error("Error refreshing token:", error);
              // Additional error handling if needed
            });
        } catch (err) {
          // Failed to token refresh, force logout
          refreshingToken = false;
          localStorage.clear();
          sessionStorage.clear();
          window.location.href = "/login";
          return Promise.reject(error);
        }
      }

      // Call API in queue with new Access Token
      const retryOrigReq = new Promise((resolve, reject) => {
        subscribeTokenRefresh((token: string) => {
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          resolve(axios(originalRequest));
        });
      });
      return retryOrigReq;
    } else if (status === 401 && config.url?.includes("/auth/refresh")) {
      // If status 401 when refresh the token, force login
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/login";
      return Promise.reject(error);
    } else {
      // Any other error
      return Promise.reject(error);
    }
  }
);

export default instance;
