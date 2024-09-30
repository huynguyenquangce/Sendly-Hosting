// import axiosConfig, { getToken } from "./axiosConfig";
// import { useSelector } from "react-redux";
// import { updateAccessToken } from "../redux/slice/user/loginSlice";
// import { RootState } from "../redux/store";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../redux/store";
// import { resetLogin } from "../redux/slice/user/loginSlice";
// import { useNavigate } from "react-router-dom";

// // Refresh Token
// const refreshAccessToken = async (refreshToken: string) => {
//   const dispatch = useDispatch<AppDispatch>();
//   const useId = useSelector((state: RootState) => state.user.login.userId);
//   try {
//     const response = await axiosConfig.post(`/auth/refresh/${useId}`);
//     const new_access_token = response.data.access_token;
//     dispatch(updateAccessToken(new_access_token));
//     return new_access_token;
//   } catch (error) {
//     console.error("Unable to refresh access token", error);
//   }
// };

// axiosConfig.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch<AppDispatch>();
//     const { response, config } = error;
//     const status = response?.status;
//     // Check error accesss_token expired
//     if (status === 401 || status === 403) {
//       const { refreshToken } = getToken();
//       if (refreshToken) {
//         const newAccessToken = await refreshAccessToken(refreshToken);
//         if (newAccessToken) {
//           config.headers.Authorization = `Bearer ${newAccessToken}`;
//           return axiosConfig(config);
//         }
//       } else {
//         await localStorage.clear();
//         dispatch(resetLogin());
//         navigate("/login");
//       }
//     } else {
//       return Promise.reject(error);
//     }
//   }
// );
