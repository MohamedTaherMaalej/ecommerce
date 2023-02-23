import axios from "axios";
import { useEffect, useState } from "react";
import Moment from "react-moment";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [show, setShow] = useState(false);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/orders").then((resp) => {
      console.log(resp.data);
      setOrders(resp.data.data);
    });
  }, []);

  const showDetails = (orderid) => {
    axios.get("http://localhost:8080/api/orders/" + orderid).then((resp) => {
      console.log(resp.data);
      setDetails(resp.data.data.details);
    });
    setShow(true);
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-7">
          <h4 className="text-center p-5">
            <style>
              @import
              url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
            </style>
            <b className="b">Customer Orders</b>
          </h4>
          <table className="table table-hover">
            <thead>
              <tr class="bg-info">
                <th>Id</th>
                <th>Order Date</th>
                <th>Amount</th>
                <th>Customer</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((x) => (
                <tr key={x.orderid}>
                  <td>{x.orderid}</td>
                  <td>
                    <Moment format="ddd, DD-MMM-YYYY">{x.orderDate}</Moment>
                  </td>
                  <td>&#8377; {x.payment.amount}</td>
                  <td>{x.customer.name}</td>
                  <td>
                    <button
                      onClick={(e) => showDetails(x.orderid)}
                      class="btn btn-outline-info"
                    >
                      Show Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-sm-5">
          {show ? (
            <>
              <h4 className="text-center p-5">
                <style>
                  @import
                  url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
                </style>
                <b className="b">Orders Details</b>
              </h4>
              <table className="table table-hover">
                <thead>
                  <tr class="bg-info">
                    <th>Id</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {details.map((x) => (
                    <tr key={x.product.prodid}>
                      <td>{x.product.prodid}</td>
                      <td>
                        <img
                          className="mr-2 float-left"
                          src={"http://localhost:8080/" + x.product.photo}
                          width="100"
                          alt="order"
                        />
                        <b>Name: </b> {x.product.pname} <br />
                        <b>Category:</b> {x.product.pcat}
                        <br />
                        <b>Brand:</b> {x.product.brand}
                      </td>
                      <td>{x.product.price}</td>
                      <td>{x.qty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            ""
          )}
        </div>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
      </div>
    </div>
  );
}

export default Orders;
