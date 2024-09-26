import { Route, Routes } from "react-router-dom";
import Loader from "./components/layouts/loading/loading";
import React, { Suspense } from "react";
import "./styles/style.css";
import { useSelector } from "react-redux";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import EmployeeDash from "./pages/Employee/EmployeeDash";
import Workshop from "./pages/Workshop/Workshop";
import AddWrorkShop from "./pages/Workshop/AddWrorkShop";
import EditeWrokShop from "./pages/Workshop/EditeWrokShop";
import Home from "./pages/Home";
const Login = React.lazy(() => import("./pages/auth/login"));
const Protected = React.lazy(() => import("./pages/auth/Protected"));

function App() {
  const { isAuthLoading } = useSelector((state) => state.AuthSlice);
  const { isEmployeesLoading } = useSelector((state) => state.EmployeesSlice);
  return (
    <>
      {isAuthLoading && <Loader />}
      {isEmployeesLoading && <Loader />}
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<Protected />}>
            <Route path="/geust" element={<EmployeeDash />} />
            <Route path="/wrokshop" element={<Workshop />} />
            <Route path="/add-wrokshop" element={<AddWrorkShop />} />
            <Route path="/edite-wrokshop/:id" element={<EditeWrokShop />} />
            <Route path="/" element={<Home />} />
            {/* Home */}
            <Route path="*" element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
