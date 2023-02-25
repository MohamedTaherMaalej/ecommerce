import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import LoginRegisterMenu from "./LoginRegisterMenu";
import "./navbar.css";
import { BsFillPersonFill, BsFillBasket3Fill, BsFillCartFill, BsFillPersonDashFill, BsFillBasket2Fill, BsFillCartCheckFill} from "react-icons/bs";
const RoleNavbar = ({ isLoggedIn }) => {
  const logout = (e) => {
    dispatch({ type: "LogOut" });
    sessionStorage.clear();
    history.push("/");
  };
  const state = useSelector((state) => state);
  const history = useHistory();
  const dispatch = useDispatch();

  if (!isLoggedIn) {
    return <LoginRegisterMenu />;
  } else if (sessionStorage.getItem("role") === "customer") {
    return (
      <ul className="navbar-nav ml-auto nav">
        <li className="nav-item">
          <Link className="nav-link" to="/cart">
          <BsFillBasket2Fill/>
          &nbsp;
            Panier{" "}
            {state.cart.length === 0 ? (
              ""
            ) : (
              <span className="badge badge-primary p-2">
                {state.cart
                  .map((x) => x.qty)
                  .reduce((a, b) => parseInt(a) + parseInt(b))}
              </span>
            )}
          </Link>
        </li>
        <li className="nav-item nav">
          <Link className="nav-link" to="/cprofile">
          <BsFillPersonFill/>
            &nbsp;
            Profile
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/myorders">
            <BsFillCartCheckFill/>
            &nbsp;
            Mes ordres
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" onClick={logout} to="#">
          <BsFillCartFill/>
          &nbsp;
            Déconnexion
          </Link>
        </li>
      </ul>
    );
  } else if (sessionStorage.getItem("role") === "seller") {
    return (
      <ul className="navbar-nav ml-auto nav">
        <li className="nav-item">
          <Link className="nav-link" to="/sprofile">
            <BsFillPersonFill/>
            &nbsp;
            Profile
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/add-product">
            <BsFillBasket3Fill/>
            &nbsp;
            Ajouter produit
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/myproducts">
          <BsFillCartFill/>
          &nbsp;
            Produits
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" onClick={logout} to="#">
            <BsFillPersonDashFill/>
            &nbsp;
            Déconnexion
          </Link>
        </li>
      </ul>
    );
  }
  return (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/aprofile">
          Profile
        </Link>
      </li>
      <li className="nav-item active">
        <Link className="nav-link" to="/sellers">
          Vendeurs
        </Link>
      </li>
      <li className="nav-item active">
        <Link className="nav-link" to="/customers">
          Clients
        </Link>
      </li>
      <li className="nav-item active">
        <Link className="nav-link" to="/orders">
          Ordres
        </Link>
      </li>
      <li className="nav-item active">
        <Link className="nav-link" onClick={logout} to="#">
          Déconnexion
        </Link>
      </li>
    </ul>
  );
};

export default RoleNavbar;
