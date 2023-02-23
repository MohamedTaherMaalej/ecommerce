import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import productvalidation from "./productvalidation";
import Swal from "sweetalert2";

function EditProduct() {
  console.log("Edit product page");
  const sellerid = sessionStorage.getItem("id");
  const { prodid } = useParams();
  const [product, setProduct] = useState({
    prodid: prodid,
    pname: "",
    pcat: "",
    subcat: "",
    price: "",
    brand: "",
    sellerId: sellerid,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const history = useHistory();

  const handleInput = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(productvalidation(product));
    setSubmitted(true);
  };

  useEffect(() => {
    console.log(errors);

    axios.get("http://localhost:8080/api/products/" + prodid).then((resp) => {
      console.log(resp.data.data);
      setProduct(resp.data.data);
    });

    if (Object.keys(errors).length === 0 && submitted) {
      console.log(product);
      axios
        .put("http://localhost:8080/api/products/" + prodid, product)
        .then((resp) => {
          let result = resp.data.data;
          console.log(result);
          Swal.fire("Product Edited successfully");
          history.push("/myproducts");
        })
        .catch((error) => {
          console.log("Error", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="">Why do I have this issue?</a>',
          });
        });
    }
  }, [errors]);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-3">
          <img width="300" src={"http://127.0.0.1:8887/" + product.photo} />
        </div>
        <div className="col-sm-7 mx-3 ">
          <h4 className="text-sm-center mx-2  p-5">
            <style>
              @import
              url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
            </style>
            <b className="b">Edit product list</b>
          </h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group form-row">
              <label className="col-sm-4 form-control-label">
                Product Name
              </label>
              <div className="col-sm-4">
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
              <label className="col-sm-4 form-control-label">Category</label>
              <div className="col-sm-4">
                <select
                  name="pcat"
                  value={product.pcat}
                  onChange={handleInput}
                  className="form-control"
                >
                  <option value="">Select Category</option>
                  <option>Frui​ts</option>
                  <option>Organic items</option>
                  <option>Vegetables</option>
                  <option>Non-veg​ Meals</option>
                </select>
                {errors.pcat && (
                  <small className="text-danger float-right">
                    {errors.pcat}
                  </small>
                )}
              </div>
            </div>
            <div className="form-group form-row">
              <label className="col-sm-4 form-control-label">Price</label>
              <div className="col-sm-4">
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
              <div className="col-sm-4">
                <select
                  name="brand"
                  value={product.brand}
                  onChange={handleInput}
                  className="form-control"
                >
                  <option value="">Select Type</option>
                  <option>Veg</option>
                  <option>Non-veg</option>
                </select>
                {errors.brand && (
                  <small className="text-danger float-right">
                    {errors.brand}
                  </small>
                )}
              </div>
            </div>
            <dir>
              <div className="col-sm-8 mt-2 pt-2">
                <button className="btn btn-lg btn-primary btn-block btn-signin1">
                  Update Product
                </button>
              </div>
            </dir>

            <p>&nbsp;</p>
            <p>&nbsp;</p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
