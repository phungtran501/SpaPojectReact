import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AboutUs from "./Components/AboutUs";
import MasterPage from "./Components/UI/MasterPage/MasterPage";
import Home from "./Components/Home";
import ProductDetail from "./Components/Products/ProductDetail";
import Login from "./Components/Login";
import MasterPageAdmin from "./Components/Admin/MasterPage/MasterPageAdmin";
import Dashboard from "./Components/Admin/DashBoard";
import LoginAdmin from "./Components/Admin/UI/LoginAdmin";
import ServiceList from "./Components/Admin/ServiceList";
import Register from "./Components/Register";
import AddService from "./Components/Admin/AddService";
import AccountList from "./Components/Admin/AccountList";
import FormAccount from "./Components/Admin/FormAccount";
import ProductList from "./Components/Admin/ProductList";
import ProductForm from "./Components/Admin/ProductForm";
import AppointmentList from "./Components/Admin/AppointmentList";
import AppointmentForm from "./Components/Admin/AppointmentForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServiceDetail from "./Components/ServiceDetail";
import ProductPage from "./Components/Products/ProductPage";
import PlanList from "./Components/Admin/PlanList";
import PlanForm from "./Components/Admin/PlanForm";
import ServicePage from "./Components/ServicePage";
import RoleList from "./Components/Admin/RoleList";
import RoleForm from "./Components/Admin/RoleForm";
import AuthHandler  from "./utilities/AuthHandler";

function App() {
  

  const commonRoutes = [
    { path: "/", element: <Home /> },
    { path: "/about", element: <AboutUs /> },
    { path: "/service-page", element: <ServicePage /> },
    { path: "/services/:id", element: <ServiceDetail /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/product/:id", element: <ProductDetail /> },
    { path: "/product", element: <ProductPage /> },
    { path: "*", element: <Home /> }
  ];

  const adminRoutes = [
    { path: '/admin', loader: AuthHandler, element: <Dashboard /> },
    { path: '/admin/services', loader: AuthHandler, element: <ServiceList /> },
    { path: '/admin/service', loader: AuthHandler, element: <AddService /> },
    { path: '/admin/service/:id/detail', loader: AuthHandler, element: <AddService /> },
    { path: '/admin/accounts', loader: AuthHandler, element: <AccountList /> },
    { path: '/admin/account-form', loader: AuthHandler, element: <FormAccount /> },
    { path: '/admin/account/:id', loader: AuthHandler, element: <FormAccount /> },
    { path: '/admin/products', loader: AuthHandler, element: <ProductList /> },
    { path: '/admin/product-form', loader: AuthHandler, element: <ProductForm /> },
    { path: '/admin/product/:id', loader: AuthHandler, element: <ProductForm /> },
    { path: '/admin/appointments', loader: AuthHandler, element: <AppointmentList /> },
    { path: '/admin/appointment-form', loader: AuthHandler, element: <AppointmentForm /> },
    { path: '/admin/appointment/:id', loader: AuthHandler, element: <AppointmentForm /> },
    { path: '/admin/plans', loader: AuthHandler, element: <PlanList /> },
    { path: '/admin/plan-form', element: <PlanForm /> },
    { path: '/admin/plan/:id', loader: AuthHandler, element: <PlanForm /> },
    { path: '/admin/roles', loader: AuthHandler, element: <RoleList /> },
    { path: '/admin/role-form', loader: AuthHandler, element: <RoleForm /> },
    { path: '/admin/role/:id', loader: AuthHandler, element: <RoleForm /> },
  ];

  const router = createBrowserRouter([
    {
      element: <MasterPage />,
      children: commonRoutes,
    },
    {
      element: <MasterPageAdmin />,
      loader: AuthHandler,
      children: adminRoutes,
    },
    {
      path: "/admin/login",
      element: <LoginAdmin />,
    },
  ]);

  return (
    <>
      <div className="container-fluid">
        <div className="row gx-70">
          <RouterProvider router={router}></RouterProvider>
          <ToastContainer />
        </div>
      </div>
      <a href="#" className="scrollToTop scroll-btn">
        <i className="far fa-arrow-up"></i>
      </a>
    </>
  );
}

export default App;
