import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function MyProducts() {
  const sellerid = sessionStorage.getItem("id");
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/products?sellerid=" + sellerid)
      .then((resp) => {
        console.log(resp.data);
        setProducts(resp.data.data);
        console.log(products);
      });
  }, []);

  const deleteProduct = (prodid) => {
    let resp = Swal.fire({
      title: "Etes-vous sur?",
      text: "Processus irréversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((resp) => {
      if (resp.isConfirmed) {
        Swal.fire("Suprimé!", "", "success");
        axios.delete("http://localhost:8080/api/products/" + prodid);
        axios
          .get("http://localhost:8080/api/products?sellerid=" + sellerid)
          .then((resp) => {
            console.log(resp.data);
            setProducts(resp.data.data);
            console.log(products);
          });
      }
    });
  };
  return (
    <div className="container">
      <div className="card shadow bg-transparent text-black">
        <div className="card-body">
          <h4 className="text-sm-center p-3">
            <style>
              @import
              url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
            </style>
            <b className="b">Mes produits</b>
          </h4>
          <table className="table table-hover">
            <thead className="table-dark table-hover">
              <tr>
                <th>Photo</th>
                <th>Nom</th>
                <th>Categorie</th>
                <th>Type</th>
                <th>Prix</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((x) => (
                <tr key={x.prodid}>
                  <td>
                    <img
                      width="100"
                      src={"http://localhost:8080/" + x.photo}
                      className="img-thumnail"
                    />
                  </td>
                  <td>{x.pname}</td>
                  <td>{x.pcat}</td>
                  <td>{x.brand}</td>
                  <td>{x.price}</td>
                  <td>
                    <Link
                      to={"/edit/" + x.prodid}
                      className="btn btn-primary btn-sm mr-2"
                    >
                      Editer
                    </Link>
                    <button
                      onClick={() => deleteProduct(x.prodid)}
                      className="btn btn-danger btn-sm"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MyProducts;
