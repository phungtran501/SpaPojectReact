import { NavLink, redirect } from "react-router-dom";

function HeaderAdmin() {

  const userName = ()=> {
  const token = localStorage.getItem('token');
  if (token) {
    const tokenData = JSON.parse(atob(token.split('.')[1]));
    return tokenData.Username;

  }
}

const logOut = () => {
  
  localStorage.clear();
  return redirect(`/admin/login`);
}
  

  
  return (
    <>
      <div className="header-top">
        <div className="container">
          <div className="row justify-content-center justify-content-md-between align-items-center">
            <div className="col-auto d-none d-md-block">
              <div className="social-style1 login-admin">
                <NavLink to="#" onClick={() => logOut()} className={"nav-link"}>Hello {userName()} / LogOut</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
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
              <li className="nav-item">
                <NavLink to="/admin/plans" className={"nav-link"}>Plan</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/roles" className={"nav-link"}>Role</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default HeaderAdmin;
