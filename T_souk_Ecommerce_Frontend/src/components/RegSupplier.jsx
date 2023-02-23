import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import uservalidation from "../uservalidation";
import Swal from "sweetalert2";

function RegSupplier() {
  const history = useHistory();
  const [submitted, setSubmitted] = useState(false);
  const [user, setUser] = useState({
    name: "",
    city: "",
    userid: "",
    pwd: "",
    cpwd: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(uservalidation(user));
    setSubmitted(true);
  };

  useEffect(() => {
    console.log(errors);
    if (Object.keys(errors).length === 0 && submitted) {
      console.log(user);
      axios
        .post("http://localhost:8080/api/sellers", user)
        .then((resp) => {
          console.log(resp);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Success d'inscription",
            footer: "Vous pouvez vous connecter",
            showConfirmButton: false,
            timer: 2000,
          });
          history.push("/slogin");
        })
        .catch((error) => console.log("Error", error));
    }
  }, [errors]);

  return (
    <div className="container">
      <div className="card shadow bg-mintcream mt-4 text-black">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-6 mx-auto">
              <h4 className="text-center p-3">
                <style>
                  @import
                  url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
                </style>
                <b className="b">Inscription vendeur</b>
              </h4>
              <form onSubmit={handleSubmit}>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">
                    Nom
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      name="name"
                      value={user.name}
                      onChange={handleInput}
                      className="form-control"
                    />
                    {errors.name && (
                      <small className="text-danger float-right">
                        Champ obligatoire
                      </small>
                    )}
                  </div>
                </div>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">Ville</label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      name="city"
                      value={user.city}
                      onChange={handleInput}
                      className="form-control"
                    />
                    {errors.city && (
                      <small className="text-danger float-right">
                        Champ obligatoire
                      </small>
                    )}
                  </div>
                </div>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">Id</label>
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
                        Champ obligatoire
                      </small>
                    )}
                  </div>
                </div>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">Télephone</label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      maxLength="10"
                      name="phone"
                      value={user.phone}
                      onChange={handleInput}
                      className="form-control"
                    />
                    {errors.phone && (
                      <small className="text-danger float-right">
                        Champ obligatoire
                      </small>
                    )}
                  </div>
                </div>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">
                    M.d.p
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
                        Champ obligatoire
                      </small>
                    )}
                  </div>
                </div>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">
                    Confirmer M.d.p
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="password"
                      name="cpwd"
                      value={user.cpwd}
                      onChange={handleInput}
                      className="form-control"
                    />
                    {errors.cpwd && (
                      <small className="text-danger float-right">
                        Champ obligatoire
                      </small>
                    )}
                  </div>
                </div>
                <button className="btn btn-lg btn-primary btn-block btn-signin1">
                  S'inscrire
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegSupplier;
