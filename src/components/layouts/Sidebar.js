import { useCallback, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import logo from "../../images/wlogo2.png";
import { FaHome, FaUserTie, FaUsers } from "react-icons/fa";
import "../../styles/SideMenu.css";
import { RiPresentationLine } from "react-icons/ri";

const Sidebar = ({ children }) => {
  const location = useLocation();
  const [locat, setLocat] = useState("");

  const loc = useCallback(() => {
    setLocat(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    loc();
  }, [loc]);

  const Logout = () => {
    Cookies.remove("MangmentToken");
    window.location.reload();
  };

  const [isOpen, setIsOpen] = useState(true);

  const navigate = useNavigate();

  return (
    <div
      style={{
        display: locat.includes("/login") ? "none " : "flex",
        overflow: "hidden",
      }}
      className="mainn"
    >
      <div
        style={{
          direction: "ltr",
        }}
        className={`sidebar rigth_nav ${isOpen ? "SideActive" : "SideNormal"}`}
      >
        <div
          className="top_section"
          style={{
            justifyContent: isOpen ? "space-between" : "center",
            flexDirection: isOpen ? "row-reverse" : "row",
          }}
        >
          {isOpen && (
            <div className="relative LogoImgContainet">
              <img
                src={logo}
                alt={"logo"}
                style={{ display: isOpen ? "block" : "none" }}
                className="logo"
              />
            </div>
          )}
        </div>

        <button
          style={{
            justifyContent: isOpen ? "flex-start" : "center",
          }}
          className={`link ${locat === "/" ? "side_active" : ""}`}
          onClick={() => navigate("/")}
        >
          <div className="icon">
            <FaHome />
          </div>
          <div
            style={{ display: isOpen ? "block" : "none" }}
            className="link_text"
          >
            الرئيسية
          </div>
        </button>

        <button
          style={{
            justifyContent: isOpen ? "flex-start" : "center",
          }}
          className={`link  ${locat.includes("wrokshop") ? "side_active" : ""}`}
          onClick={() => navigate("/wrokshop")}
        >
          <div className="icon">
            <RiPresentationLine />
          </div>
          <div
            style={{ display: isOpen ? "block" : "none" }}
            className="link_text"
          >
            ورشة العمل
          </div>
        </button>
        <button
          style={{
            justifyContent: isOpen ? "flex-start" : "center",
          }}
          className={`link ${
            locat.includes("/employees") ? "side_active" : ""
          }`}
          onClick={() => navigate("/employees")}
        >
          <div className="icon">
            <FaUserTie />
          </div>
          <div
            style={{ display: isOpen ? "block" : "none" }}
            className="link_text"
          >
            الضيوف
          </div>
        </button>
        <button
          style={{
            justifyContent: isOpen ? "flex-start" : "center",
          }}
          className={`link  ${locat.includes("users") ? "side_active" : ""}`}
          onClick={() => {}}
        >
          <div className="icon">
            <FaUsers />
          </div>
          <div
            style={{ display: isOpen ? "block" : "none" }}
            className="link_text"
          >
            المستخدمين
          </div>
        </button>
        <NavLink
          to={"/login"}
          className="link"
          style={{
            justifyContent: isOpen ? "flex-start" : "center",
          }}
          onClick={() => Logout()}
        >
          <div className="icon">
            <span className={"icon-exit"}></span>
          </div>
          <div
            style={{ display: isOpen ? "block" : "none", cursor: "pointer" }}
            className="link_text"
          >
            تسجيل الخروج
          </div>
        </NavLink>
      </div>
      {locat.includes("/employees") && (
        <div className="sidebar-Links">
          <NavLink
            style={{
              justifyContent: isOpen ? "flex-start" : "center",
            }}
            to={"/employees"}
            className="sidebar-link"
          >
            <div className="icon">
              <FaUserTie />
            </div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              الضيوف
            </div>
          </NavLink>
        </div>
      )}
      {locat.includes("wrokshop") && (
        <div className="sidebar-Links">
          <NavLink
            style={{
              justifyContent: isOpen ? "flex-start" : "center",
            }}
            to={"/wrokshop"}
            className="sidebar-link"
          >
            <div className="icon">
              <RiPresentationLine />
            </div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              قائمة ورش العمل
            </div>
          </NavLink>
          <NavLink
            style={{
              justifyContent: isOpen ? "flex-start" : "center",
            }}
            to={"/add-wrokshop"}
            className="sidebar-link"
          >
            <div className="icon">
              <RiPresentationLine />
            </div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              اضافة ورش عمل
            </div>
          </NavLink>
        </div>
      )}

      <main className="left_nav">{children}</main>
    </div>
  );
};

export default Sidebar;
