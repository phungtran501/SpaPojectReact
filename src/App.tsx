import React from "react";
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
import ServicePage from "./Components/ServicePage";
import ProductPage from "./Components/Products/ProductPage";


function App() {
  const commonRoutes = [
    { path: "/", element: <Home /> },
    { path: "/about", element: <AboutUs /> },
    { path: "/services/:id", element: <ServicePage /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/product/:id", element: <ProductDetail /> },
    { path: "/product", element: <ProductPage /> },
    { path: "*", element: <Home /> }
  ];

  const adminRoutes = [
    { path: '/admin', element: <Dashboard /> },
    { path: '/admin/services', element: <ServiceList /> },
    { path: '/admin/service', element: <AddService /> },
    { path: '/admin/service/:id/detail', element: <AddService /> },
    { path: '/admin/accounts', element: <AccountList /> },
    { path: '/admin/account-form', element: <FormAccount /> },
    { path: '/admin/account/:id', element: <FormAccount /> },
    { path: '/admin/products', element: <ProductList /> },
    { path: '/admin/product-form', element: <ProductForm /> },
    { path: '/admin/product/:id', element: <ProductForm /> },
    { path: '/admin/appointments', element: <AppointmentList /> },
    { path: '/admin/appointment-form', element: <AppointmentForm /> },
    { path: '/admin/appointment/:id', element: <AppointmentForm /> },
  ];

  const router = createBrowserRouter([
    {
      element: <MasterPage />,
      children: commonRoutes,
    },
    {
      element: <MasterPageAdmin />,
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
