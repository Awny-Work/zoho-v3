import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../../components/layouts/Sidebar";

const Protected = () => {
  if (!Cookies.get("MangmentToken")) {
    return <Navigate to={"/login"} />;
  }
  return (
    <Sidebar>
      <Outlet />
    </Sidebar>
  );
};

export default Protected;
