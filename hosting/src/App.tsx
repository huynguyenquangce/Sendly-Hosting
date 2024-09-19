import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import ResponsiveAppBar from "./components/Homepage/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./components/Admin/Admin";
import Section from "./components/Section/Section";
import Theme_Manage from "./components/Theme_Manage/Theme_Manage";
import Theme_Category from "./components/Theme_Category/Theme_Categoy";
function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <ResponsiveAppBar />
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/theme_manage" element={<Theme_Manage />}></Route>
            <Route path="/admin" element={<Admin />}></Route>1`1`
            <Route path="/section" element={<Section />}></Route>
            <Route path="/theme_category" element={<Theme_Category />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
