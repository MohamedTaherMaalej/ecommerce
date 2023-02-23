import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

function AdminProfile() {
  const userid = sessionStorage.getItem("userid");
  const uname = sessionStorage.getItem("uname");
  const [user, setUser] = useState({
    uname: uname,
    userid: userid,
    pwd: "",
  });

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/admin", user)
      .then((resp) => {
        console.log(resp);
        Swal.fire("Done", "Profile updated successfully", "success");
        sessionStorage.setItem("uname", user.uname);
      })
      .catch((error) => console.log("Error", error));
  };

  return (
    <div className="container-fluid">
      <h4 className="text-sm-center p-5">
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        </style>
        <h4 className="b">
          Welcome <br /> {user.uname}
        </h4>
        <marquee scrollamount="15" class="news-content">
          {" "}
          <p> Edit Your Profile {user.uname} </p>{" "}
        </marquee>
      </h4>

      <div className="row">
        <div className="col-sm-4 mx-auto">
          <div className="card shadow ">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">User ID</label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      name="userid"
                      readOnly
                      value={user.userid}
                      onChange={handleInput}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">
                    User Name
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      name="uname"
                      value={user.uname}
                      onChange={handleInput}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">
                    Password
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
                  Update Profile
                </button>
              </form>
            </div>
          </div>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
