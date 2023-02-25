import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import productvalidation from "./productvalidation";
import Swal from "sweetalert2";

function AddProduct() {
  const sellerid = sessionStorage.getItem("id");
  const [product, setProduct] = useState({
    pname: "",
    pcat: "",
    price: "",
    brand: "",
    sellerId: sellerid,
  });
  const [errors, setErrors] = useState({});
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [file, setFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const history = useHistory();

  const handleInput = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileInput = (e) => {
    setSelectedPhoto(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(productvalidation(product));
    setSubmitted(true);
  };

  useEffect(() => {
    console.log(errors);
    if (Object.keys(errors).length === 0 && submitted) {
      const formData = new FormData();
      formData.append("pic", selectedPhoto);
      formData.append("pname", product.pname);
      formData.append("pcat", product.pcat);
      formData.append("price", product.price);
      formData.append("brand", product.brand);
      formData.append("sellerId", sellerid);
      console.log(product);
      axios
        .post("http://localhost:8080/api/products", formData)

        .then((resp) => {
          let result = resp.data.data;

          Swal.fire("Succès d'ajout !");
          history.push("/myproducts");
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Error Saving Product",
            text: "The Image Size is More than 1 MB. ",
          });
        });
    }
  }, [errors]);
  return (
    <div className="container">
      <div className="card shadow bg-transparent text-black">
        <div className="card-body">
          <div className="row">
            <div class="col-sm-4 pt-4">
              {selectedPhoto ? (
                <img className="img-thumbnail" src={file} alt="Photo" />
              ) : (
                ""
              )}
            </div>
            <div className="col-sm-6">
              <h4 className="text-center p-3">
                <style>
                  @import
                  url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
                </style>
                <b className="b">Ajouter article</b>
              </h4>
              <form onSubmit={handleSubmit}>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">
                    Nom du produit
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      name="pname"
                      value={product.pname}
                      onChange={handleInput}
                      className="form-control"
                    />
                    {errors.pname && (
                      <small className="text-danger float-right">
                        {errors.pname}
                      </small>
                    )}
                  </div>
                </div>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">
                    Catégories
                  </label>
                  <div className="col-sm-8">
                    <select
                      name="pcat"
                      value={product.pcat}
                      onChange={handleInput}
                      className="form-control"
                    >
                      <option value="">Choisir une categorie</option>
                      <option>Vêtement</option>
                      <option>Vaisselle</option>
                      <option>Décoration</option>
                      <option>Meuble</option>
                    </select>
                    {errors.pcat && (
                      <small className="text-danger float-right">
                        {errors.pcat}
                      </small>
                    )}
                  </div>
                </div>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">Prix</label>
                  <div className="col-sm-8">
                    <input
                      type="number"
                      name="price"
                      value={product.price}
                      onChange={handleInput}
                      className="form-control"
                    />
                    {errors.price && (
                      <small className="text-danger float-right">
                        {errors.price}
                      </small>
                    )}
                  </div>
                </div>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">Type</label>
                  <div className="col-sm-8">
                    <select
                      name="brand"
                      value={product.brand}
                      onChange={handleInput}
                      className="form-control"
                    >
                      <option value="">Choisir un type</option>
                      <option>Textile</option>
                      <option>Bois</option>
                      <option>Cuir</option>
                      <option>Argile</option>
                    </select>
                    {errors.brand && (
                      <small className="text-danger float-right">
                        {errors.brand}
                      </small>
                    )}
                  </div>
                </div>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">Photo</label>
                  <div className="col-sm-8">
                    <input
                      type="file"
                      required
                      name="photo"
                      value={product.photo}
                      onChange={handleFileInput}
                      className="form-control-file"
                    />
                  </div>
                </div>
                &nbsp;
                <button className="btn btn-lg btn-primary btn-block btn-signin1">
                  sauvegarder
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
