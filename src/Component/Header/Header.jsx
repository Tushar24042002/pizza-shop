import React from "react";
import Classes from "./Header.module.css";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
    const location = useLocation();

    const isActive = (path) => {
      return location.pathname === path;
    };
  return (
    <div className={`container-fluid  ${Classes.header}`}>
      <div className="row">
        <div className="col-lg-12">
          <div className="d-flex px-3 py-0">
            <div className={Classes.logo}>Pizza Shop</div>
            <div className={`${Classes.nav} ms-auto`}>
            <ul>
                <li className={isActive("/") ? Classes.activeShow : ""}>
                <Link to={"/"}>Home</Link>
             
                </li>
                <li className={isActive("/addOrder") ? Classes.activeShow : ""}>
                <Link to={"/addOrder"}>Add Order</Link>
                </li>
            </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
