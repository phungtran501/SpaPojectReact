import { Outlet } from "react-router-dom";
import HeaderAdmin from "../UI/HeaderAdmin";
import "../../../assets/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const MasterPageAdmin = () => (
  <div>
    <header className="vs-header header-layout3">
      <HeaderAdmin />
    </header>
    <Outlet />
    <footer className="footer-wrapper footer-layout1"></footer>
  </div>
);

export default MasterPageAdmin;
