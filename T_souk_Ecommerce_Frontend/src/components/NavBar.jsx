import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import RoleNavbar from "./RoleNavbar";
import "./navbar.css";
import { BsFillHouseFill, BsFillBookmarkStarFill,  } from "react-icons/bs";
import ph1 from "../img/result (1).png"
const { Fragment } = require("react");
function NavBar() {
  const state = useSelector((state) => state);

  return (
    <Fragment>
        <div>
      <div className="clearfix"></div>
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ top: 0, zIndex: "1000", height:100, backgroundColor:"peru"}}
      >
        <img src={ph1} style={{width:"10%", heigth:"50%"}} className="l"/>
        <ul className="navbar-nav nav" style={{display:"flex"}}>
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
