import axios from "axios";
import { useEffect, useState } from "react";

interface ProfileData {
  id: string;
  name: string;
  email: string;
}

const Section = () => {
  // State to hold the API response with appropriate type
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getAccessTokenFromCookies = (): string | null => {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === "access_token") {
        return value;
      }
    }
    return null;
  };

  const CallAPI = async () => {
    try {
      const accessToken = getAccessTokenFromCookies();
      // , {
      //   headers: {
      //     Authorization: `Bearer ${accessToken}`,
      //     "Content-Type": "application/json",
      //   },
      // }
      const response = await axios.get<ProfileData>(
        "https://asia-southeast1-sendly-email-template-builder.cloudfunctions.net/api/api/staffs/profile"
      );

      setProfileData(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    CallAPI();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Profile Data</h1>
      {profileData ? (
        <pre>{JSON.stringify(profileData, null, 2)}</pre>
      ) : (
        <div>No profile data available</div>
      )}
    </div>
  );
};

export default Section;
