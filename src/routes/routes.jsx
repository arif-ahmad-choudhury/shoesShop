import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";
import About from "../pages/About";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./private/PrivateRoute";
import Dashboard from "../pages/Dashboard";
import EditProfile from "../pages/EditProfile";
import AllProducts from "../pages/AllProducts";
import AddProducts from "../pages/AddProducts";
import EditProducts from "../pages/EditProducts";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => fetch("https://shoes-shop-server-main.vercel.app/shoes"),
      },
      {
        path: "/products/:id",
        element: <ProductDetails />,
        loader: ({ params }) =>
          fetch(`https://shoes-shop-server-main.vercel.app/shoes/${params.id}`),
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Registration />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "home",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "profile/edit/:id",
        element: (
          <PrivateRoute>
            <EditProfile />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://shoes-shop-server-main.vercel.app/user/get/${params.id}`),
      },
      {
        path: "all-products",
        element: (
          <PrivateRoute>
            <AllProducts />
          </PrivateRoute>
        ),
      },
      {
        path: "add-products",
        element: (
          <PrivateRoute>
            <AddProducts />
          </PrivateRoute>
        ),
      },
      {
        path: "all-products/edit/:id",
        element: (
          <PrivateRoute>
            <EditProducts />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://shoes-shop-server-main.vercel.app/shoes/${params.id}`),
      },
    ],
  },
]);
