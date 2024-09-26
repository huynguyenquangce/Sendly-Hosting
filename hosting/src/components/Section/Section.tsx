import axiosConfig from "../../config/axiosConfig";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
interface ProfileData {
  id: string;
  name: string;
  email: string;
}

const Section = () => {
  // Use useSelector at the top level of the component
  const accessToken = useSelector(
    (state: RootState) => state.user.login.accessToken
  );
  const refreshToken = useSelector(
    (state: RootState) => state.user.login.refreshToken
  );
  const userId = useSelector((state: RootState) => state.user.login.userId);

  const CallAPI = async () => {
    // console.log(accessToken, "check access token");
    try {
      // const response = await axiosConfig.get<ProfileData>("/staffs", {
      //   headers: {
      //     Authorization: `Bearer ${accessToken}`,
      //     "Content-Type": "application/json",
      //   },
      // });
      // if (response.status == 200) {
      //   console.log("hello console", response.data);
      // }

      console.log("check userid", userId);
      const newToken = await axiosConfig.get<string>(`auth/refresh/${userId}`, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
          "Content-Type": "application/json",
        },
      });
      console.log(newToken, "check newToken");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Call API only if accessToken is available
    if (accessToken) {
      CallAPI();
    }
  }, [accessToken]); // Add accessToken as a dependency

  return (
    <div>
      <h1>Profile Data</h1>
    </div>
  );
};

export default Section;
