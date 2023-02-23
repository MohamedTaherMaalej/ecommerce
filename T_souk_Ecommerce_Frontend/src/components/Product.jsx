import ReactStars from "react-rating-stars-component";
import React from "react";
import "../App.css";

const ratingChanged = (newRating) => {
  console.log(newRating);
};

function Product(props) {
  const { x, showModal, demo } = props;
  return (
    <div className="col-sm-3" key={x.prodid}>
      <div
        className="card text-center text-black mb-3 bg-transparent"
        style={{ boxShadow: "0 0 1px 1px white" }}
      >
        <div className="card-body py-1 bg-transparent">
          <img
            onClick={(e) => showModal(x)}
            style={{ width: "240px", height: "220px", marginBottom: "10px" }}
            src={"http://localhost:8080/" + x.photo}
            className="img-thumnail"
          />
          <h4 class="font-weight-bold">{x.pname}</h4>
          <h6 className="text-center">Type :{x.brand}</h6>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          />
          <div class="form-floating">
            <label for="floatingTextarea">
              Rating{" "}
              <ReactStars
                count={5}
                onChange={ratingChanged}
                size={24}
                activeColor="#ffd700"
              />
            </label>
          </div>
          <h5 class="font-weight-bold my-3">Price: {x.price} DT </h5>
        </div>
      </div>
    </div>
  );
}

export default Product;
