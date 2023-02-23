import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import web1 from "../img/carte.png";

function ViewCart() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const [address, setAddress] = useState({
    city: "Jalgaon",
    state: "Maharashtra",
    zip: "425001",
    country: "India",
  });
  const [payment, setPayment] = useState({
    cardno: "4251-1511-5556-1112",
    nameoncard: "Your Name",
    cvv: "123",
    amount: state.cart.reduce((a, b) => a + b.price, 0),
  });

  const deleteItem = (item) => {
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
        dispatch({ type: "RemoveItem", payload: item });
        let amount = state.cart.reduce((a, b) => a + b.price, 0);
        console.log("Amount ", amount);
      }
    });
  };

  const handleAddressInput = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePaymentInput = (e) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    let amount = state.cart.reduce((a, b) => a + b.price, 0);
    setPayment({ ...payment, amount: amount });
    console.log("Amount => ", amount);
  }, [state.cart]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //setSubmitted(true)
    let amount = state.cart.reduce((a, b) => a + b.price, 0);
    console.log("Amount ", payment.amount);
    setPayment({ ...payment, amount: amount });

    let data = {
      cart: state.cart,
      payment: payment,
      address: address,
      customerid: sessionStorage.getItem("id"),
    };
    console.log(data);
    axios.post("http://localhost:8080/api/orders", data).then((resp) => {
      console.log(resp);
      dispatch({ type: "Clear" });
      history.push("/myorders");
    });
  };
  return (
    <div className="container-fluid text-black">
      {state.cart.length > 0 ? (
        <div className="row">
          <div className="col-sm-6">
            <h4 className="text-center p-5">
              <style>
                @import
                url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
              </style>
              <b className="b">My Purchased Orders</b>
            </h4>
            <table className="table table-hover table-black table-striped">
              <thead>
                <tr class="bg-info">
                  <th>Product id</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {state.cart.map((item) => (
                  <tr key={item.prodid}>
                    <td>{item.prodid}</td>
                    <td>
                      <img
                        className="mr-2 float-left"
                        src={"http://localhost:8080/" + item.photo}
                        width="100"
                      />
                      {item.pname}
                    </td>
                    <td>&#8377; {item.price}</td>
                    <td>{item.qty}</td>
                    <td>&#8377; {item.qty * item.price}</td>
                    <td>
                      <button
                        onClick={(e) => deleteItem(item)}
                        className="btn btn-outline-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-sm-5">
            <form onSubmit={handleSubmit}>
              <h4 className="text-center p-5">
                <style>
                  @import
                  url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
                </style>
                <b className="b">Address Information </b> &nbsp;
              </h4>
              <div className="form-group form-row">
                <label className="col-sm-4 form-control-label">City</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    name="city"
                    placeholder="Enter City Name"
                    required
                    value={address.city}
                    onChange={handleAddressInput}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form-group form-row">
                <label className="col-sm-4 form-control-label">State</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    name="state"
                    placeholder="Maharashtra"
                    required
                    value={address.state}
                    onChange={handleAddressInput}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form-group form-row">
                <label className="col-sm-4 form-control-label">Zip</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    name="zip"
                    placeholder="Enter yor zipcode"
                    required
                    value={address.zip}
                    onChange={handleAddressInput}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form-group form-row">
                <label className="col-sm-4 form-control-label">Country</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    name="country"
                    placeholder="Enter your Country"
                    required
                    value={address.country}
                    onChange={handleAddressInput}
                    className="form-control"
                  />
                </div>
              </div>

              <h4 className="text-center p-5">
                <style>
                  @import
                  url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
                </style>
                <b className="b">Payment Information </b> &nbsp;
              </h4>
              <div className="form-group form-row">
                <label className="col-sm-4 form-control-label">Card No</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    name="cardno"
                    value={payment.cardno}
                    onChange={handlePaymentInput}
                    className="form-control"
                    maxLength="16"
                  />
                </div>
              </div>
              <div className="form-group form-row">
                <label className="col-sm-4 form-control-label">
                  Name on Card
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    name="nameoncard"
                    value={payment.nameoncard}
                    onChange={handlePaymentInput}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form-group form-row">
                <label className="col-sm-4 form-control-label">
                  Expiry Date
                </label>
                <div className="col-sm-8">
                  <input type="month" required className="form-control" />
                </div>
              </div>
              <div className="form-group form-row">
                <label className="col-sm-4 form-control-label">CVV</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    maxLength="3"
                    value={payment.cvv}
                    onChange={handlePaymentInput}
                    className="form-control"
                  />
                </div>
              </div>
              <p>&nbsp;</p>
              <button className="btn btn-lg btn-primary btn-block btn-signin ">
                Place Order
              </button>
              <p>&nbsp;</p>
              <p>&nbsp;</p>
              <p>&nbsp;</p>
            </form>
          </div>
        </div>
      ) : (
        <img src={web1} class="d-block w-100" alt="..." />
      )}
    </div>
  );
}

export default ViewCart;
