import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Login } from "../auth/Login";
import { Logout } from "../auth/Logout";
import { About } from "../page/About";
import { ProductPage } from "../page/product/ProductPage";
import { Home } from "../page/Home";
import { NotFound } from "../page/NotFound";
import { Layout } from "../component/Layout";
import { AuthRequired } from "../auth/AuthRequired";

const Routes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "*",
          element: <NotFound />
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "home",
          element: <AuthRequired><Home /></AuthRequired>,
        },
        {
          path: "product",
          element: <AuthRequired><ProductPage /></AuthRequired>,
        },
        {
          path: "logout",
          element: <AuthRequired><Logout /></AuthRequired>,
        },
      ]
    }
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;