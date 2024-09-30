import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { t } = useTranslation();
  return <div>{t("dashboard_page.main-title")}</div>;
};

export default Dashboard;
