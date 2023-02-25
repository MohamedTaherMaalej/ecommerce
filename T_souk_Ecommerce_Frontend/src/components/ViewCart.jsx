import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import ph1 from "../img/Card.jpg";
import "./card.css"
import {BsFillExclamationTriangleFill} from "react-icons/bs";
import Alert from 'react-bootstrap/Alert';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
function ViewCart() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const deleteItem = (item) => {
    let response = Swal.fire({
      title: "Etes-vous sur?",
      text: "Ce processus est irréversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Supprimer!",
    }).then((response) => {
      if (response.isConfirmed) {
        Swal.fire("Supprimé!", ".", "success");
        dispatch({ type: "RemoveItem", payload: item });
        let amount = state.cart.reduce((a, b) => a + b.price, 0);
        console.log("Amount ", amount);
      }
    });
  };


  useEffect(() => {}, [state.cart]);
  return (
    <div style={{marginBottom:"10%",marginLeft:"10%",marginRight:"10%"}}>
      {state.cart.length > 0 ? (
      <MDBTable striped hover>
      <MDBTableHead>
        <tr>
           <th>Id</th>
          <th>Photo</th>
          <th>Nom</th>
          <th>Prix</th>
          <th>Quantité</th>
          <th>Valeur</th>
          <th>Action</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
      {state.cart.map((item) => (
      <tr key={item.prodid}>
                    <td>{item.prodid}</td>
                    <td>
                      <img
                        className="mr-2 float-left"
                        src={"http://localhost:8080/" + item.photo}
                        width="100"
                      />
                    </td>
                    <td>{item.pname}</td>
                    <td>{item.price}{" DT"}</td>
                    <td>{item.qty}</td>
                    <td>{item.qty * item.price}{" DT"}</td>
                    <td>
                      <button
                        onClick={(e) => deleteItem(item)}
                        className="btn btn-outline-danger"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                  ))}
      </MDBTableBody>
    </MDBTable>
     ) : (
      <>
      <img src={ph1} class="c" />
      <Alert variant="danger" style={{marginLeft:"39.5%",marginRight:"auto",width:"fit-content",marginBottom:"10%"}}>
      Votre pannier est vide 
        <BsFillExclamationTriangleFill/>
      </Alert>
      </>
    )}
    </div>
  );
}

export default ViewCart;
