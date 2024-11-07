import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BRHeader } from "@govbr-ds/core";
import { useAuth } from "../../auth/AuthProvider";

interface HeaderProps {
  loggedIn: boolean,
  headerLogo: string,
  headerTitle: string,
  headerSign: string
  small?: boolean,
  headerSignIn?: boolean,
  headerMenuTrigger?: boolean,
  headerSubtitle?: boolean,
  headerSearch?: boolean,
}

export const Header: React.FC<HeaderProps> = ({ loggedIn, headerLogo, headerTitle, headerSign, small = false, headerSignIn = false, headerMenuTrigger = loggedIn, headerSubtitle = false, headerSearch = false, ...rest }) => {
  const objectRef = useRef<typeof BRHeader>();
  const divRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { loading }: any = useAuth();

  useEffect(() => {
    if (divRef.current && !objectRef.current) {
      objectRef.current = new BRHeader(".br-header", divRef.current);
    }
  }, []);

  return (
    <header className={"br-header" + (small ? " small" : "")} ref={divRef}>
      <div className="container-fluid">
        <div className="header-top">
          <div className="header-logo">
            <img src={headerLogo} alt="Logo" />
            <span className="br-divider vertical"></span>
            <div className="header-sign">{headerSign}</div>
          </div>
          <div className="header-actions">
            <div className="header-links dropdown">
              <button className="br-button circle small" type="button" data-toggle="dropdown" aria-label="Abrir Acesso Rápido">
                <i className="fas fa-ellipsis-v" aria-hidden="true"></i>
              </button>
              <div className="br-list">
                <div className="header">
                  <div className="title">Acesso</div>
                </div>
                {loggedIn ? <>
                  <Link className="br-item" to="#">Link de acesso 1</Link>
                </> : <>
                  <Link className="br-item" to="/login">Login</Link>
                  <Link className="br-item" to="/about">Sobre</Link>
                </>}
              </div>
            </div>
            <span className="br-divider vertical mx-half mx-sm-1"></span>
            <div className="header-functions dropdown">
              <button className="br-button circle small" type="button" data-toggle="dropdown" aria-label="Abrir Funcionalidades do Sistema">
                <i className="fas fa-th" aria-hidden="true"></i>
              </button>
              <div className="br-list">
                <div className="header">
                  <div className="title">Funcionalidades</div>
                </div>
                <div className={"br-item" + (loggedIn ? " d-none" : "")}>
                  <button className="br-button circle small" type="button" aria-label="Funcionalidade 1">
                    <i className="fas fa-chart-bar" aria-hidden="true"></i>
                    <span className="text">Funcionalidade 1</span>
                  </button>
                </div>
                <div className={"br-item" + (loggedIn ? "" : " d-none")}>
                  <button className="br-button circle small" type="button" aria-label="Logout" onClick={() => navigate('/logout')}>
                    <i className="fas fa-arrow-right-from-bracket" aria-hidden="true"></i>
                    <span className="text">Logout</span>
                  </button>
                </div>
              </div>
            </div>
            <div className={"header-search-trigger" + (headerSearch ? "" : " d-none")}>
              <button className="br-button circle" type="button" aria-label="Abrir Busca" data-toggle="search" data-target=".header-search">
                <i className="fas fa-search" aria-hidden="true"></i>
              </button>
            </div>
            <div className="header-login">
              <div className={"header-sign-in" + (headerSignIn ? "" : " d-none")}>
                <button className="br-sign-in small" type="button" data-trigger="login">
                  <i className="fas fa-user" aria-hidden="true"></i>
                  <span className="d-sm-inline">Entrar</span>
                </button>
              </div>
              <div className={"header-avatar" + (loggedIn ? "" : " d-none")}>
                <span className="br-avatar mr-3" title="Fulano da Silva">
                  <span className="content">
                    <img src="https://picsum.photos/id/1005/400" alt="Avatar" />
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="header-bottom">
          <div className="header-menu">
            <div className={"header-menu-trigger" + (headerMenuTrigger ? "" : " d-none")}>
              <button className="br-button small circle" type="button" aria-label="Menu" data-toggle="menu" data-target="#main-navigation" id="menu-small">
                <i className="fas fa-bars" aria-hidden="true"></i>
              </button>
            </div>
            <div className="header-info">
              <div className="header-title">{headerTitle}</div>
              <div className={"header-subtitle" + (headerSubtitle ? "" : " d-none")}>Subtítulo do Header</div>
            </div>
          </div>
          <div className={"header-search" + (headerSearch ? "" : " d-none")}>
            <div className="br-input has-icon">
              <label htmlFor="searchbox-52997">Texto da pesquisa</label>
              <input id="searchbox-52997" type="text" placeholder="O que você procura?" />
              <button className="br-button circle small" type="button" aria-label="Pesquisar">
                <i className="fas fa-search" aria-hidden="true"></i>
              </button>
            </div>
            <button className="br-button circle search-close ml-1" type="button" aria-label="Fechar Busca" data-dismiss="search">
              <i className="fas fa-times" aria-hidden="true"></i>
            </button>
          </div>
          {loading &&
            <div className="d-flex flex-row mt-2">
              <div className="br-loading mr-2" role="progressbar" aria-label="Carregando..."></div>
              <span className="rotulo">Carregando...</span>
            </div>
          }
        </div>
      </div>
    </header >
  );
}