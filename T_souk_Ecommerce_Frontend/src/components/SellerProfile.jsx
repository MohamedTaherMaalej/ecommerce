import axios from "axios";
import { useEffect, useState } from "react";

function SellerProfile() {
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
    axios.get("http://localhost:8080/api/sellers/" + id).then((resp) => {
      console.log(resp.data.data);
      setUser(resp.data.data);
    });
  }, []);
  return (
    <div className="container">
      <div className="card shadow m-5 p-3 text-black text-center">
        <h4 className="text-sm-center p-5">
          <style>
            @import
            url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
          </style>
          <h4 className="b">
            Bienvenue <br /> {user.name}
          </h4>
        </h4>
        <h5>Id : {user.userid}</h5>
        <h5>Ville : {user.city}</h5>
        <h5>Téléphone: {user.phone}</h5>
      </div>
    </div>
  );
}

export default SellerProfile;
