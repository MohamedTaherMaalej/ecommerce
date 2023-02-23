import { useEffect, useState } from "react";
import Translation from "./Data.json";
import "../App.css";
import axios from "axios";

import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, useLocation } from "react-router-dom";
import Product from "./Product";
import queryString from "query-string";
import Swal from "sweetalert2";

// translation **
function TranslationEngTohindi() {
  const [language, setLanguage] = useState("hindi");
  const [content, setContent] = useState({});

  useEffect(() => {
    if (language == "english") {
      setContent(Translation.english);
    } else if (language == "hindi") {
      setContent(Translation.hindi);
    }
  });

//
  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const state = useSelector((state) => state);
  const location = useLocation();
  const [item, setItem] = useState({});
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const history = useHistory();

  const [showDialog, setShowDialog] = useState("modal fade");
  const [display, setDisplay] = useState("none");

  const showModal = (prod) => {
    setShowDialog("modal fade show");
    setDisplay("block");
    setItem(prod);
  };

  const checkItem = (prodid) => {
    return state.cart.findIndex((x) => x.prodid === prodid) < 0;
  };

  const closeDialog = () => {
    setShowDialog("modal fade");
    setDisplay("none");
  };

  const loadDataFromServer = (page = 0, pagesize = 8) => {
    axios
      .get(
        "http://localhost:8080/api/products/paginated?page=" +
          page +
          "&pagesize=" +
          pagesize
      )
      .then((resp) => {
        console.log(resp.data.data.total);
        setProducts(resp.data.data.plist);
        setTotalPage(Math.ceil(resp.data.data.total / pagesize));
        console.log(products);
      });
  };

  useEffect(() => {
    console.log("I am here cat", location.search);
    let pcat = queryString.parse(location.search);
    console.log(pcat.cat);
    if (pcat.cat !== undefined) {
      axios
        .get("http://localhost:8080/api/products?cat=" + pcat.cat)
        .then((resp) => {
          console.log(resp.data);
          setProducts(resp.data.data);
          console.log(products);
        });
    } else {
      loadDataFromServer();
    }
  }, [location]);
  const addToCart = (item) => {
    if (sessionStorage.getItem("userid") == null) {
      Swal.fire("Please Login", "You must Login the Account", "info");
      history.push("/clogin");
    } else if (sessionStorage.getItem("role") !== "customer") {
      Swal.fire("Please Login", "Only customer can buy product", "warning");
    } else {
      if (checkItem(item.prodid)) {
        showModal();
        setDisplay("none");
        setShowDialog("modal fade");
        item.qty = qty;
        dispatch({ type: "AddItem", payload: item });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Item added to cart successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire("Cart", "Item already in cart", "success");
      }
    }
  };

  const handlePageClick = ({ selected: selectedPage }) => {
    loadDataFromServer(selectedPage);
  };
  const mystyle = {
    color: "white",
    backgroundColor: "DodgerBlue",
    padding: "10px",
    fontFamily: "Arial",
  };

  return (
    <div>
      <div class="container mt-3 mx-0">
        <h4>Translate page</h4>
        <select
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value);
          }}
        >
          <option>english</option>
          <option>hindi</option>
        </select>
      </div>
      {/* <h2>{content.Title}</h2>
      <span>{content.Description}</span> */}

      <>
        <div className="container-fluid p-2"></div>
        <div className="container-fluid" style={{ width: "100y%" }}>
          <div className="shadow p-3 mb-3 bg-white rounded ">
            <div className="card-body">
              <script
                src="https://kit.fontawesome.com/a076d05399.js"
                crossorigin="anonymous"
              ></script>
              <center>
                <ReactPaginate
                  previousLabel={
                    <li class="page-item">
                      <a href="#" class="page-link" aria-label="Previous">
                        <span aria-hidden="true">«</span>
                      </a>
                    </li>
                  }
                  nextLabel={
                    <li class="page-item">
                      <a href="#" class="page-link" aria-label="Next">
                        <span aria-hidden="true">»</span>
                      </a>
                    </li>
                  }
                  containerClassName={"pagination"}
                  pageCount={totalPage}
                  onPageChange={handlePageClick}
                  previousLinkClassName={"Previous"}
                  nextLinkClassName={"Next"}
                  disabledClassName={"pagination li a.page-link"}
                  activeClassName={"pagination li.active"}
                />
                <div className="row">
                  {products.map((x) => (
                    <Product key={x.prodid} x={x} showModal={showModal} />
                  ))}
                </div>
              </center>
            </div>
          </div>
          {display == "block" ? (
            <div
              className={showDialog}
              style={{ zIndex: "1000", display: display }}
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="text-center p-4">
                      <style>
                        @import
                        url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
                      </style>
                      <b className="b">{content.Add}</b>
                    </h4>
                    <button onClick={closeDialog} className="close">
                      &times;
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="d-flex">
                      <img
                        src={"http://localhost:8080/" + item.photo}
                        style={{ width: "240px" }}
                      />
                      <div className="ml-3">
                        <h4 className="px-2">
                          <b>Name: </b>
                          {item.pname}
                        </h4>
                        <h5 className="px-2">
                          <b>Type: </b>
                          {item.brand}
                        </h5>
                        <h5 className="px-2">
                          <b>Category: </b>
                          {item.pcat}
                        </h5>
                        <h5 className="px-2">
                          <b>Seller: </b>
                          {item.sellerName}
                        </h5>
                        <h4 className="px-2" class="text-danger">
                          {" "}
                          <b>Price:</b> &#8377; {item.price}{" "}
                        </h4>
                        <label for="quantity">
                          {" "}
                          <b>Qty :</b>{" "}
                          <input
                            type="number"
                            id="quantity"
                            value={qty}
                            min="1"
                            max="100"
                            onChange={(e) => setQty(e.target.value)}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      onClick={(e) => addToCart(item)}
                      className="btn btn-warning btn-sm"
                    >
                      {content.Add}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </>
    </div>
  );
}
export default TranslationEngTohindi;
