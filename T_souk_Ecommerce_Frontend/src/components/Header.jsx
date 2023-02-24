import "../App.css";
import { useSelector } from "react-redux";
import web10 from "../img/logo.png";

function Header() {
  const state = useSelector((state) => state);
  console.log("Header ", state.loggedin.Username);
  return (
    <div>
      <div className="jumbotron p-4 mb-1 center rounded-0 text-white ">
        {state.loggedin.IsLoggedIn ? (
          <>
            <link
              href="https://fonts.googleapis.com/css2?family=ABeeZee&display=swap"
              rel="stylesheet"
              type="text/css"
            ></link>
            <h5 className="float-right" id="role">
              Welcome
              <br /> Name: {state.loggedin.Username}
            </h5>{" "}
          </>
        ) : (
          ""
        )}
        { <a class="navbar-brand">
          <img width="250" src={web10} class="d-block w-100" className="w-100" />
        </a> }
        <div className="clearfix"></div>
      </div>
    </div>
  );
}
export default Header;
