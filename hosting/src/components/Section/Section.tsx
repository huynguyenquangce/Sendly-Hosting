import { useEffect } from "react";
import axiosConfig from "../../config/axiosConfig";

const Section = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosConfig.get("/staffs/test-guard");
        console.log(response.data, "data from section");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Profile Data</h1>
    </div>
  );
};

export default Section;
