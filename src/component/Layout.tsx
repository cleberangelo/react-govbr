import { Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { Header } from "./header/Header";
import { Menu } from "./menu/Menu";

export const Layout = () => {
  // const { isAuthenticated }: any = useAuth();
  const isAuthenticated = true;
  const headerLogo = "/img/govbr-logo.png";
  const headerTitle = "Aplicação Teste";
  const headerSign = "gov.br";

  return (
    <>
      <Header loggedIn={isAuthenticated} headerLogo={headerLogo} headerTitle={headerTitle} headerSign={headerSign} />
      <div className="container-fluid">
        <div className="row my-3">
          {isAuthenticated &&
            <Menu active={true} headerLogo={headerLogo} headerTitle={headerTitle} />
          }
          <div className="col">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}