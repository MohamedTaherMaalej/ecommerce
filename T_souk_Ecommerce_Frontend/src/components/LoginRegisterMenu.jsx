import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./navbar.css";
import { BsFillPersonCheckFill,BsFillPersonPlusFill  } from "react-icons/bs";
function LoginRegisterMenu() {
  const [content, setContent] = useState({});

  return (
    <ul className="navbar-nav ml-auto nav">
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="#"
          id="navbarDropdownMenuLink"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <BsFillPersonCheckFill />
          &nbsp;
          Connexion
        </a>
        
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <Link className="dropdown-item" to="/slogin">
            Vendeur
          </Link>
          <Link className="dropdown-item" to="/clogin">
            Client
          </Link>
        </div>
      </li>
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="#"
          id="navbarDropdownMenuLink"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <BsFillPersonPlusFill/>
          &nbsp;
          S'inscrir
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <Link className="dropdown-item" to="/regsupplier">
            Vendeur
          </Link>
          <Link className="dropdown-item" to="/register">
            Client
          </Link>
        </div>
      </li>
    </ul>
  );
}
export default LoginRegisterMenu;
