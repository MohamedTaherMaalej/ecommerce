import { MDBTable } from "mdb-react-ui-kit";
import {MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
function MyOrders() {
  return (
    <div style={{marginBottom:"10%",marginLeft:"10%",marginRight:"10%"}}>
    <MDBTable striped hover>
      <MDBTableHead>
      <tr>
                <th>Id</th>
                <th>Date de l'ordre</th>
                <th>Valeur</th>
                <th>Action</th>
              </tr>
      </MDBTableHead>
      <MDBTableBody>
      </MDBTableBody>
    </MDBTable>
  </div>
  );
}
export default MyOrders;
