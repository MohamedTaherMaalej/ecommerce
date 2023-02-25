import ReactStars from "react-rating-stars-component";
import React from "react";
import "../App.css";

import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage
} from 'mdb-react-ui-kit';
function Product(props) {
  const { x, showModal, demo } = props;
  return (
    <div className="col-sm-3" key={x.prodid}>
    <MDBCard style={{backgroundColor:"white"}}>
    <div className="course_card">
      <MDBCardImage onClick={(e) => showModal(x)} src={"http://localhost:8080/" + x.photo} alt='...' position='top'
      style={{height: "200px"}}
      />
      </div>
      <MDBCardBody>
        <MDBCardText>
        <h4 class="font-weight-bold">{x.pname}</h4>
          <h6 className="text-center">Type :{x.brand}</h6>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          />
          <div class="form-floating">
            <label for="floatingTextarea">
              Notation{" "}
              <ReactStars
                count={5}
                size={24}
                activeColor="#ffd700"
              />
            </label>
          </div>
          <h5 class="font-weight-bold my-3">Prix: {x.price} DT </h5>
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
    </div>
  );
}

export default Product;
