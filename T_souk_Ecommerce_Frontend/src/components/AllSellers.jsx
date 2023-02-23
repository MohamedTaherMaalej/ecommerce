import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

function AllSellers() {
  const [sellers, setSellers] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8080/api/sellers").then((resp) => {
      //console.log(resp.data.data)
      setSellers(resp.data.data);
      console.log(sellers);
    });
  }, []);

  const deleteSeller = (id) => {
    let response = Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((response) => {
      if (response.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        console.log(id);
        axios.delete("http://localhost:8080/api/sellers/" + id).then((resp) => {
          axios.get("http://localhost:8080/api/sellers").then((resp) => {
            //console.log(resp.data.data)
            setSellers(resp.data.data);
          });
        });
      }
    });
  };
  return (
    <div className="container-fluid text-black">
      <h4 className="text-center p-5">
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        </style>
        <b className="b">Seller Informatation</b>
      </h4>

      <table className="table ">
        <thead className="table table-hover">
          <tr class="bg-info">
            <th>Id</th>
            <th>Name</th>
            <th>City</th>
            <th>Phone</th>
            <th>User Id</th>
            <th>Password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sellers.map((x) => (
            <tr key={x.id}>
              <td>{x.id}</td>
              <td>{x.name}</td>
              <td>{x.city}</td>
              <td>{x.phone}</td>
              <td>{x.userid}</td>
              <td>{x.pwd}</td>
              <td>
                <button
                  onClick={(e) => deleteSeller(x.id)}
                  className="btn btn-outline-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
    </div>
  );
}

export default AllSellers;
