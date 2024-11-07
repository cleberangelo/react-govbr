import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Login } from "../auth/Login";
import { Logout } from "../auth/Logout";
import { About } from "../page/About";
import { ProductPage } from "../page/product/ProductPage";
import { Home } from "../page/Home";
import { NotFound } from "../page/NotFound";
import { Layout } from "../component/Layout";

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
          element: <Home />,
        },
        {
          path: "product",
          element: <ProductPage />,
        },
        {
          path: "logout",
          element: <Logout />,
        },
      ]
    }
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;