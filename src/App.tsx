import React from 'react';
import {RouterProvider, createBrowserRouter } from 'react-router-dom';
import AboutUs from './Components/AboutUs';
import MasterPage from './Components/UI/MasterPage/MasterPage';
import Home from './Components/Home';
import Detail from './Components/Detail';
import Login from './Components/Login';
import MasterPageAdmin from './Components/Admin/MasterPage/MasterPageAdmin';
import Dashboard from './Components/Admin/DashBoard';
import LoginAdmin from './Components/Admin/UI/LoginAdmin';
import ServiceList from './Components/Admin/ServiceList';
import Register from './Components/Register';
import AddService from './Components/Admin/AddService';
import AccountList from './Components/Admin/AccountList';
import FormAccount from './Components/Admin/FormAccount';
import ProductList from './Components/Admin/ProductList';
import ProductForm from './Components/Admin/ProductForm';
import AppointmentList from './Components/Admin/AppointmentList';
import AppointmentForm from './Components/Admin/AppointmentForm';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  const router = createBrowserRouter([
    {
      element: <MasterPage />,
      children: [
        {
          path: '/',
          element: <Home/>
        },
        {
          path: '/about',
          element: <AboutUs/>
        },
        {
          path: '/about/detail',
          element: <Detail/>
        },
        {
          path: '*',
          element: <Home/>
        },
        {
          path: '/login',
          element: <Login/>
        },
        {
          path: '/register',
          element: <Register/>
        },
      
      ]
      
    },
    {
      element: <MasterPageAdmin/>,
      children: [
        {
          path: '/admin',
          element: <Dashboard />
        },
        {
          path: '/admin/services',
          element: <ServiceList />
        },
        {
          path: '/admin/service',
          element: <AddService />
        },
        {
          path: '/admin/service/:id/detail',
          element: <AddService />
        },
        {
          path: '/admin/accounts',
          element: <AccountList />
        },
        {
          path: '/admin/account-form',
          element: <FormAccount />
        },
        {
          path: '/admin/account/:id',
          element: <FormAccount />
        },
        {
          path: '/admin/products',
          element: <ProductList />
        },
        {
          path: '/admin/product-form',
          element: <ProductForm />
        },
        {
          path: '/admin/product/:id',
          element: <ProductForm />
        },
        {
          path: '/admin/appointments',
          element: <AppointmentList />
        },
        {
          path: '/admin/appointment-form',
          element: <AppointmentForm />
        },
        {
          path: '/admin/appointment/:id',
          element: <AppointmentForm />
        },
      ]
    },
    {
      path: '/admin/login',
      element: <LoginAdmin />
    }

  ]);

  

  return (
    <>
      <div className="container">
          <div className="row gx-70">
              <RouterProvider router={router}></RouterProvider>
              <ToastContainer />
          </div>
      </div>
      <a href="#" className="scrollToTop scroll-btn"><i className="far fa-arrow-up"></i></a>
    </>
  );
}

export default App;
