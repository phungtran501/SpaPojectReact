import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div>
      <div className="header-top">
        <div className="container">
          <div className="row justify-content-center justify-content-md-between align-items-center">
            <div className="col-auto d-none d-md-block">
              <div className="social-style1">
                <NavLink to="/login" className={"nav-link"}>
                  Login
                </NavLink>{" "}
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
                    <li className="menu-item-has-children">
                      <a href="match.html">Service</a>
                      <ul className="sub-menu">
                        <li>
                          <a href="service.html">Services</a>
                        </li>
                        <li>
                          <a href="service-details.html">Service Details</a>
                        </li>
                      </ul>
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
    </div>
  );
}

export default Header;
