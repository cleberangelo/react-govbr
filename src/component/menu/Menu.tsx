import { BRMenu } from "@govbr-ds/core";
import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

interface MenuProps {
  active: boolean,
  headerLogo: string,
  headerTitle: string
}

export const Menu: React.FC<MenuProps> = ({ active, headerLogo, headerTitle }) => {
  const objectRef = useRef<typeof BRMenu>();
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current && !objectRef.current) {
      objectRef.current = new BRMenu(".br-menu", divRef.current);
      objectRef.current.breakpoints = ["col-sm-5", "col-md-4", "col-lg-3", "col-xl-2"]
    }

    if (active) objectRef.current._openMenu();
  }, []);

  return (
    <div id="main-navigation" className={"br-menu push" + (active ? " active" : "")} ref={divRef}>
      <div className="menu-container position-static">
        <div className="menu-panel h-auto position-static">

          <div className="menu-header">
            <div className="menu-title">
              <img src={headerLogo} alt={headerTitle} />
              <span className="br-divider vertical mx-2"></span>
              <span>{headerTitle}</span>
            </div>
            <div className="menu-close">
              <button className="br-button circle" type="button" aria-label="Fechar o menu" data-dismiss="menu">
                <i className="fas fa-times" aria-hidden="true"></i>
              </button>
            </div>
          </div>

          <nav className="menu-body" role="tree">
            <ul>
              <li>
                <NavLink className="menu-item" to="/home" role="treeitem">
                  <span className="icon">
                    <i className="fas fa-home" aria-hidden="true"></i>
                  </span>
                  <span className="content">Início</span>
                </NavLink>
              </li>              

              <li>
                <NavLink className="menu-item" to="/product" role="treeitem">
                  <span className="icon">
                    <i className="fas fa-heart" aria-hidden="true"></i>
                  </span>
                  <span className="content">Produtos</span>
                </NavLink>
              </li>
            </ul>
            <div className="menu-folder">
              <a className="menu-item" href="#!" role="treeitem">
                <span className="icon">
                  <i className="fas fa-bell" aria-hidden="true"></i>
                </span>
                <span className="content">Camada 1</span>
              </a>
              <ul>
                <li>
                  <a className="menu-item" href="#!" role="treeitem">
                    <span className="icon">
                      <i className="fas fa-heart" aria-hidden="true"></i>
                    </span>
                    <span className="content">Camada 2</span>
                  </a>
                </li>
                <li>
                  <a className="menu-item" href="#!" role="treeitem">
                    <span className="icon">
                      <i className="fas fa-address-book" aria-hidden="true"></i>
                    </span>
                    <span className="content">Camada 2</span>
                  </a>
                  <ul>
                    <li>
                      <a className="menu-item" href="#!" role="treeitem">
                        <span className="icon">
                          <i className="fas fa-book" aria-hidden="true"></i>
                        </span>
                        <span className="content">Camada 3</span>
                      </a>
                    </li>
                    <li>
                      <a className="menu-item" href="#!" role="treeitem">
                        <span className="icon">
                          <i className="fas fa-tree" aria-hidden="true"></i>
                        </span>
                        <span className="content">Camada 3</span>
                      </a>
                      <ul>
                        <li>
                          <a className="menu-item" href="#!" role="treeitem">
                            <span className="content">Camada 4</span>
                          </a>
                        </li>
                        <li>
                          <a className="menu-item" href="#!" role="treeitem">
                            <span className="content">Camada 4</span>
                          </a>
                        </li>
                        <li>
                          <a className="menu-item" href="#!" role="treeitem">
                            <span className="content">Camada 4</span>
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a className="menu-item" href="#!">
                        <span className="icon">
                          <i className="fas fa-moon" aria-hidden="true"></i>
                        </span>
                        <span className="content">Camada 3</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a className="menu-item" href="#!">
                    <span className="icon">
                      <i className="fas fa-archive" aria-hidden="true"></i>
                    </span>
                    <span className="content">Camada 2</span>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}