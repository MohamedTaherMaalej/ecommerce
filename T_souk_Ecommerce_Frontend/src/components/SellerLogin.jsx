import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import loginvalidation from "../loginvalidation";
import "../App.css";
import Swal from "sweetalert2";
import ph1 from "../img/Signin.png";

function SellerLogin() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    userid: "",
    pwd: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const history = useHistory();

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(loginvalidation(user));
    setSubmitted(true);
  };

  useEffect(() => {
    console.log(errors);
    if (Object.keys(errors).length === 0 && submitted) {
      console.log(user);
      axios
        .post("http://localhost:8080/api/sellers/validate", user)
        .then((resp) => {
          let result = resp.data.data;
          console.log(resp.data.data);
          sessionStorage.setItem("userid", result.userid);
          sessionStorage.setItem("uname", result.name);
          sessionStorage.setItem("role", "seller");
          sessionStorage.setItem("id", result.id);
          dispatch({ type: "IsLoggedIn" });
          history.push("/sprofile");
        })
        .catch((error) => {
          console.log("Error", error);
          Swal.fire("Utilisateur introuvable", "Id ou Mot de passe est invalide", "warning");
        });
    }
  }, [errors]);

  return (
    <div className="container">
      <div className="container">
        <div class="card card-container">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-13 mx-auto">
                <img
                  id="profile-img"
                  class="profile-img-card"
                  src={ph1}
                />
                <h4 className="text-center p-3">
                  <style>
                    @import
                    url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
                  </style>
                  <b className="b">Connexion Vendeur</b>
                </h4>
                <form onSubmit={handleSubmit}>
                  <div className="form-group form-row">
                    <label className="col-sm-4 form-control-label">
                      Id
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        name="userid"
                        value={user.userid}
                        onChange={handleInput}
                        className="form-control"
                      />
                      {errors.userid && (
                        <small className="text-danger float-right">
                          champ obligatoire
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="form-group form-row">
                    <label className="col-sm-4 form-control-label">
                      M.d.p.
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="password"
                        name="pwd"
                        value={user.pwd}
                        onChange={handleInput}
                        className="form-control"
                      />
                      {errors.pwd && (
                        <small className="text-danger float-right">
                          champ obligatoire
                        </small>
                      )}
                    </div>
                  </div>
                  <button
                    class="btn btn-lg btn-primary btn-block btn-signin"
                    type="submit"
                  >
                    Connexion
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
    </div>
  );
}

export default SellerLogin;
