import { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import big1 from "../img/biig1.jpg";
import ph2 from "../img/argile.jpg";
import ph1 from "../img/1.png";
import ph3 from "../img/7.jpg";
import ph4 from "../img/5.jpg";
import big2 from "../img/big1.jpg";
import big3 from "../img/big2.jpg";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import Product from "./Product";
import queryString from "query-string";
import Swal from "sweetalert2";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Allproduct() {

  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const state = useSelector((state) => state);
  const location = useLocation();
  const [item, setItem] = useState({});
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const history = useHistory();

  const [modalShow, setModalShow] =useState(false);
  const [display, setDisplay] = useState("none");

  const showModal = (prod) => {
    setModalShow(true);
    setDisplay("block");
    setItem(prod);
  };

  const checkItem = (prodid) => {
    return state.cart.findIndex((x) => x.prodid === prodid) < 0;
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
    let pcat = queryString.parse(location.search);
    if (pcat.cat !== undefined) {
      axios
        .get("http://localhost:8080/api/products?cat=" + pcat.cat)
        .then((resp) => {
          setProducts(resp.data.data);
        });
    } else {
      loadDataFromServer();
    }
  }, [location]);
  const addToCart = (item) => {
    if (sessionStorage.getItem("userid") == null) {
      Swal.fire("Inscrivez-vous", "", "info");
      history.push("/clogin");
    } else if (sessionStorage.getItem("role") !== "customer") {
      Swal.fire("Inscrivez-vous", "Seulement le client peut acheter des produits", "warning");
    } else {
      if (checkItem(item.prodid)) {
        showModal();
        setDisplay("none");
        item.qty = qty;
        dispatch({ type: "AddItem", payload: item });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Succès d'ajout",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire("Cart", "Produit déjà dans le pannier", "success");
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
      <>
        <div className="container-fluid p-2"></div>
        <div className="container-fluid" style={{ width: "100y%" }}>
          <div className="shadow p-3 mb-3 bg-white rounded ">
            <div class="bd-example">
              <div
                id="carouselExampleCaptions"
                class="carousel slide"
                data-interval="1000"
                data-ride="carousel"
              >
                <ol class="carousel-indicators">
                  <li
                    data-target="#carouselExampleCaptions"
                    data-slide-to="0"
                    class="active"
                  ></li>
                  <li
                    data-target="#carouselExampleCaptions"
                    data-slide-to="1"
                  ></li>
                  <li
                    data-target="#carouselExampleCaptions"
                    data-slide-to="2"
                  ></li>
                </ol>
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img
                      src={big3}
                      class="d-block w-100"
                      height={350}
                      alt="..."
                    />
                    
                </div>
                  <div class="carousel-item">
                    <img
                      src={big2}
                      class="d-block w-100"
                      height={350}
                      alt="..."
                    />
                  </div>
                  <div class="carousel-item">
                    <img
                      src={big1}
                      class="d-block w-100"
                      height={350}
                      alt="..."
                    />
                  </div>
                </div>
                <a
                  class="carousel-control-prev"
                  href="#carouselExampleCaptions"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    class="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="sr-only">Précendent</span>
                </a>
                <a
                  class="carousel-control-next"
                  href="#carouselExampleCaptions"
                  role="button"
                  data-slide="next"
                >
                  <span
                    class="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="sr-only">Suivant</span>
                </a>
              </div>
              <div style={{paddingTop:"5%"}}>
                <div class="row mx-auto">
                  <div class="col-lg-3 col-md-6 col-sm-12">
                    <div class="course_card">
                      <div class="course_card_img">
                        <img
                          src={ph1}
                          alt="course"
                        />
                      </div>
                      <div class="course_card_content">
                        <h3 class="title">Bois d'Olivier  : Tradition & Authenticité</h3>
                        <p class="description">Des produits fabriqués avec le bois d'olivier. Un matériau très hygiénique qui peut être utilisé  dans
 la cuisine et dans la fabrication d'une vaisselle authentique et qui est imperméable aux odeurs et aux bactéries.
</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3 col-md-6 col-sm-12">
                    <div class="course_card">
                      <div class="course_card_img">
                        <img
                          src={ph2}
                          alt="course"
                        />
                      </div>
                      <div class="course_card_content">
                        <h3 class="title">Trésors en terre cuite</h3>
                        <p class="description">Durables, écologiques, détoxifiants, les produits artisanaux en argile offrent une variété de textures et de finitions
 et peuvent agir comme régulateurs d'humidité.</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3 col-md-6 col-sm-12">
                    <div class="course_card">
                      <div class="course_card_img">
                        <img
                          src={ph3}
                          alt="course"
                        />
                      </div>
                      <div class="course_card_content">
                        <h3 class="title">Artisanat filaire</h3>
                        <p class="description">A la différence des produits standardisés, le textile traditionnel offre une variété de produits uniques et authentiques. Faites
l'exception par votre style et votre apparence.</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3 col-md-6 col-sm-12">
                    <div class="course_card">
                      <div class="course_card_img">
                        <img
                          src={ph4}
                          alt="course"
                        />
                      </div>
                      <div class="course_card_content">
                        <h3 class="title">Le charme du cuir traditionnel</h3>
                        <p class="description">Le cuir est un matériau très esthétique qui ajoute une touche de sophistication et d'élégance à tout produit artisanal.
Sa résistance et sa robustesse en font un choix parfait pour les produits qui sont destinés à être utilisés régulièrement. </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
             <Modal
             show={modalShow}
             onHide={() => setModalShow(false)}
             aria-labelledby="contained-modal-title-vcenter"
             centered
           >
             <Modal.Header >
               <Modal.Title id="contained-modal-title-vcenter">
               <style>
                        @import
                        url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
                      </style>
                      <b className="b">Ajouter article</b>
               </Modal.Title>
             </Modal.Header>
             <Modal.Body>
              <div className="d-flex">
             <img
                        src={"http://localhost:8080/" + item.photo}
                        style={{ width: "240px" }}
                      />
                      <div className="ml-3">
                        <h4 className="px-2">
                          <b>Nom: </b>
                          {item.pname}
                        </h4>
                        <h5 className="px-2">
                          <b>Type: </b>
                          {item.brand}
                        </h5>
                        <h5 className="px-2">
                          <b>Categorie: </b>
                          {item.pcat}
                        </h5>
                        <h5 className="px-2">
                          <b>Vendeur: </b>
                          {item.sellerName}
                        </h5>
                        <h4 className="px-2" class="text-danger">
                          {" "}
                          <b>Prix:</b>{" "}{item.price}{" DT"}{" "}
                        </h4>
                        <label for="quantity">
                          {" "}
                          <b>quantité :</b>{" "}
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
             </Modal.Body>
             <Modal.Footer>
               <Button onClick={(e)=>addToCart(item)}>Ajouter au pannier</Button>
             </Modal.Footer>
           </Modal>
          ) : (
            ""
          )}
        </div>
      </>
    </div>
  );
}
export default Allproduct;
