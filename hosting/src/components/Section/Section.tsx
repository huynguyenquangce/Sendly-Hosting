import { useEffect } from "react";
import axiosConfig from "../../config/axiosConfig";
import { useTranslation } from "react-i18next";
const Section = () => {
  const { t } = useTranslation();
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
      <h1>{t("section_page.main-title")}</h1>
    </div>
  );
};

export default Section;
