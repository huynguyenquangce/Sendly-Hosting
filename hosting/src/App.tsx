import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import ResponsiveAppBar from "./components/Navigation/Navigation";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"; // Import Navigate
import Admin from "./components/Admin/Admin";
import Section from "./components/Section/Section";
import Theme_Manage from "./components/Theme_Manage/Theme_Manage";
import Theme_Category from "./components/Theme_Category/Theme_Categoy";
import Login from "./components/Login/Login";
import PrivateRoute from "./PrivateRoute";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

const App: React.FC = () => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.user.login.isLoggined
  );
  return (
    <div className="App">
      <BrowserRouter>
        {isLoggedIn && <ResponsiveAppBar />}
        <Routes>
          {/* Redirect to login page if not logged in */}
          <Route
            path="/"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="/dashboard"
            element={<PrivateRoute element={<Dashboard />} />}
          />
          <Route
            path="/theme_manage"
            element={<PrivateRoute element={<Theme_Manage />} />}
          />
          <Route path="/admin" element={<PrivateRoute element={<Admin />} />} />
          <Route
            path="/section"
            element={<PrivateRoute element={<Section />} />}
          />
          <Route
            path="/theme_category"
            element={<PrivateRoute element={<Theme_Category />} />}
          />
          {/* Route đăng nhập không cần bảo vệ */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
