import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import RoleNavbar from "./RoleNavbar";
import { useEffect, useState } from "react";
import Translation from "./Data.json";
import "./navbar.css";
import { BsFillHouseFill, BsFillBookmarkStarFill,  } from "react-icons/bs";
const { Fragment } = require("react");

function NavBar() {
  const state = useSelector((state) => state);
  console.log("LoggedIn ", state.loggedin);
  console.log("Cart ", state.cart);

  return (
    <Fragment>
        <div>
      <div className="clearfix"></div>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark"
        style={{ top: 0, zIndex: "1000", height:100}}
      >
        {" "}
        <ul className="navbar-nav nav">
          <li className="nav-item ">
            <Link className="nav-link" to="/">
              <BsFillHouseFill />
              &nbsp;
               Accueil
            </Link>
          </li>
          <li className="nav navbar-nav ">
            <Link className="nav-link" to="/About">
              <BsFillBookmarkStarFill/>
              &nbsp;
              A propos
            </Link>
          </li>
        </ul>
        &nbsp;&nbsp; &nbsp;&nbsp;
        <RoleNavbar isLoggedIn={state.loggedin.IsLoggedIn} />
      </nav>
      
      </div>
    </Fragment>
  );
}

export default NavBar;
