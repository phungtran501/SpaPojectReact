import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AboutUs from "./Components/AboutUs";
import Appointment from "./Components/Appointment";
import MasterPage from "./Components/UI/MasterPage/MasterPage";
import Home from "./Components/Home";
import ProductDetail from "./Components/Products/ProductDetail";
import Login from "./Components/Login";
import MasterPageAdmin from "./Components/Admin/MasterPage/MasterPageAdmin";
import Dashboard from "./Components/Admin/DashBoard";
import LoginAdmin from "./Components/Admin/UI/LoginAdmin";
import ServiceList from "./Components/Admin/ServiceList";
import Register from "./Components/Register";
import Cart from "./Components/Cart/Cart";
import CheckOutCart from "./Components/Cart/CheckoutCart";
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
import { useEffect } from "react";
import { useAppDispatch } from "./redux/configureStore";
import { setAllCart } from "./Components/Cart/CartSlice";
import { AuthHandler } from "./utilities/AuthHandler";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const cart = localStorage.getItem("cart");

    if (cart) {
      const cartItems = JSON.parse(cart);
      dispatch(setAllCart(cartItems));
    }
  }, []);

  const commonRoutes = [
    { path: "/", element: <Home /> },
    { path: "/about", element: <AboutUs /> },
    { path: "/service-page", element: <ServicePage /> },
    { path: "/services/:id", element: <ServiceDetail /> },
    { path: "/login", element: <Login /> },
    { path: "/cart", element: <Cart /> },
    { path: "/cart-check-out", loader: AuthHandler().AuthSite, element: <CheckOutCart /> },
    { path: "/register", element: <Register /> },
    { path: "/product/:id", element: <ProductDetail /> },
    { path: "/product", element: <ProductPage /> },
    { path: "/appointment/:id", element: <Appointment /> },
    { path: "*", element: <Home /> },
  ];

  const adminRoutes = [
    { path: "/admin", loader: AuthHandler().AuthAdmin, element: <Dashboard /> },
    { path: "/admin/services", loader: AuthHandler().AuthAdmin, element: <ServiceList /> },
    { path: "/admin/service", loader: AuthHandler().AuthAdmin, element: <AddService /> },
    {
      path: "/admin/service/:id/detail",
      loader: AuthHandler().AuthAdmin,
      element: <AddService />,
    },
    { path: "/admin/accounts", loader: AuthHandler().AuthAdmin, element: <AccountList /> },
    {
      path: "/admin/account-form",
      loader: AuthHandler().AuthAdmin,
      element: <FormAccount />,
    },
    {
      path: "/admin/account/:id",
      loader: AuthHandler().AuthAdmin,
      element: <FormAccount />,
    },
    { path: "/admin/products", loader: AuthHandler().AuthAdmin, element: <ProductList /> },
    {
      path: "/admin/product-form",
      loader: AuthHandler().AuthAdmin,
      element: <ProductForm />,
    },
    {
      path: "/admin/product/:id",
      loader: AuthHandler().AuthAdmin,
      element: <ProductForm />,
    },
    {
      path: "/admin/appointments",
      loader: AuthHandler().AuthAdmin,
      element: <AppointmentList />,
    },
    {
      path: "/admin/appointment-form",
      loader: AuthHandler().AuthAdmin,
      element: <AppointmentForm />,
    },
    {
      path: "/admin/appointment/:id",
      loader: AuthHandler().AuthAdmin,
      element: <AppointmentForm />,
    },
    { path: "/admin/plans", loader: AuthHandler().AuthAdmin, element: <PlanList /> },
    { path: "/admin/plan-form", element: <PlanForm /> },
    { path: "/admin/plan/:id", loader: AuthHandler().AuthAdmin, element: <PlanForm /> },
    { path: "/admin/roles", loader: AuthHandler().AuthAdmin, element: <RoleList /> },
    { path: "/admin/role-form", loader: AuthHandler().AuthAdmin, element: <RoleForm /> },
    { path: "/admin/role/:id", loader: AuthHandler().AuthAdmin, element: <RoleForm /> },
  ];

  const router = createBrowserRouter([
    {
      element: <MasterPage />,
      children: commonRoutes,
    },
    {
      element: <MasterPageAdmin />,
      loader: AuthHandler().AuthAdmin,
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
