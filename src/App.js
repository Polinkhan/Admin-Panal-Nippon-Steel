import "./App.css";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import PreventRoute from "./components/Auth Route/PreventRoute";
import PrivateRoute from "./components/Auth Route/PrivateRoute";
// import LandingPage from "./components/LandingPage/LandingPage";
import Login from "./components/LandingPage/Login";
import DashBoard from "./components/Home/DashBoard";
import { useDataContext } from "./contexts/DataContext";
import Overview from "./components/Home/Overview";
import RegisterUser from "./components/Home/RegisterUser/RegisterUser";
import ManageUser from "./components/Home/ManageUsers/ManageUser";
import ManageDB from "./components/Home/ManageDB/ManageDB";
import NotFound from "./components/Not Found/NotFound";
import { AnimatePresence } from "framer-motion";
import Recyclebin from "./components/Home/RecycleBin/RecycleBin";

function App() {
  const { isDataFetched } = useDataContext();

  return (
    isDataFetched && (
      <HashRouter>
        <AnimatePresence>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<DashBoard />}>
                <Route path="Dashboard" element={<Overview />} />
                <Route path="Register User" element={<RegisterUser />} />
                <Route path="Manage Users" element={<ManageUser />} />
                <Route path="Manage DB" element={<ManageDB />} />
                <Route path="Recycle Bin" element={<Recyclebin />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Route>
            <Route element={<PreventRoute />}>
              {/* <Route path="/home" element={<LandingPage />} /> */}
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </HashRouter>
    )
  );
}

//eslint-disable-next-line

export default App;
