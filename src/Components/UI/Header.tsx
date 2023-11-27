import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/img/logo-5.jpg";

function Header() {
  return (
    <>
      <div className="header-top">
        <div className="container">
          <div className="row justify-content-center justify-content-md-between align-items-center">
            <div className="col-auto text-center py-2 py-md-0">
              <div className="header-links style-white">
                <ul>
                  <li className="d-none d-xxl-inline-block">
                    <i className="far fa-map-marker-alt"></i>Hung Loi, q.Ninh Kieu, tp.CanTho
                  </li>
                  <li>
                    <i className="far fa-phone-alt"></i>
                    <a href="tel:0767951944">0767951944</a>
                  </li>
                  <li>
                    <i className="far fa-envelope"></i>
                    <a href="mailto:tmphung1101@gmail.com">tmphung1101@gmail.com</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-auto d-none d-md-block">
              <div className="social-style1">
                <NavLink to="/login" className={"nav-link"}>
                  Login
                </NavLink>
                &nbsp;
                <NavLink to="/register" className={"nav-link"}>
                  Register
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sticky-wrap">
        <div className="sticky-active">
          <div className="container">
            <div className="row justify-content-between align-items-center gx-60">
              <div className="col-auto">
                <div className="header-logo">
                  <Link to="/">
                    <img src={logo} alt="logo" className="logo-5-page" />
                  </Link>
                </div>
              </div>
              <div className="col-auto">
                <nav className="main-menu menu-style1 d-none d-lg-block">
                  <ul>
                    <li>
                      <NavLink to="/" className={"nav-link"}>
                        Home
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/about" className={"nav-link"}>
                        About Us
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/service-page" className={"nav-link"}>
                        Service
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/product" className={"nav-link"}>
                        Product
                      </NavLink>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="col-auto">
                <div className="header-icons">
                  <a
                    href="contact.html"
                    className="vs-btn style2 d-none d-xl-inline-block"
                  >
                    Book
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
