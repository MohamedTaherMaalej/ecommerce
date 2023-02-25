import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";

function CustomerProfile() {
  const [uname, setUname] = useState(sessionStorage.getItem("uname"));
  const userid = sessionStorage.getItem("userid");
  const id = sessionStorage.getItem("id");

  const [user, setUser] = useState({
    id: sessionStorage.getItem("id"),
    name: "",
    city: "",
    userid: "",
    pwd: "",
    phone: "",
  });

  useEffect(() => {
    axios.get("http://localhost:8080/api/customers/" + id).then((resp) => {
      setUser(resp.data.data);
    });
  }, []);

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:8080/api/customers/" + id, user)
      .then((resp) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Profile editer avec succés",
          showConfirmButton: false,
          timer: 1500,
        });
        setUname(user.name);
      });
  };

  return (
    <div className="container text-black">
      <div className="row">
        <div className="col-sm-7 mx-auto">
          <div className="card shadow mt-3">
            <div className="card-body">
              <h4 className="text-sm-center p-5">
                <style>
                  @import
                  url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
                </style>
                <b className="b">Bienvenue {uname}</b>
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
                  </div>
                </div>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">Id</label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      readOnly
                      name="userid"
                      value={user.userid}
                      onChange={handleInput}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">Téléphone</label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      maxLength="10"
                      name="phone"
                      value={user.phone}
                      onChange={handleInput}
                      className="form-control"
                    />
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
                  </div>
                </div>
                <button className="btn btn-lg btn-primary btn-block btn-signin">
                  Editer
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerProfile;
