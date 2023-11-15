import {NavLink } from 'react-router-dom';

function HeaderAdmin() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarLeftAlignExample">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/admin" className={"nav-link"}>Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/services" className={"nav-link"}>Service</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/accounts" className={"nav-link"}>Account</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/products" className={"nav-link"}>Product</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/appointments" className={"nav-link"}>Appointment</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default HeaderAdmin;
