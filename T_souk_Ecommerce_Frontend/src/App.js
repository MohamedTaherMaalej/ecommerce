import './App.css';
import RegSupplier from './components/RegSupplier';
import NavBar from './components/NavBar';
import RegCustomer from './components/RegCustomer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SellerLogin from './components/SellerLogin';
import CustomerLogin from './components/CustomerLogin';
import SellerProfile from './components/SellerProfile';
import AddProduct from './components/AddProduct';
import MyProducts from './components/MyProducts';
import AllProduct from './components/AllProducts';
import EditProduct from './components/EditProduct';
import CustomerProfile from './components/CustomerProfile';
import MyOrders from './components/MyOrders';
import Orders from './components/Orders';
import ViewCart from './components/ViewCart';
import About from './components/About';
import Footer from './components/Footer';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route component={AllProduct} path="/" exact />
          <Route component={AllProduct} path="/cats" />
          <Route component={RegSupplier} path="/regsupplier" />
          <Route component={RegCustomer} path="/register" />
          <Route component={SellerLogin} path="/slogin" />
          <Route component={CustomerLogin} path="/clogin" />
          <Route component={SellerProfile} path="/sprofile" />
          <Route component={CustomerProfile} path="/cprofile" />
          <Route component={AddProduct} path="/add-product" />
          <Route component={EditProduct} path="/edit/:prodid" />
          <Route component={MyProducts} path="/myproducts" />
          <Route component={MyOrders} path="/myorders" />
          <Route component={Orders} path="/orders" />
          <Route component={ViewCart} path="/cart" />
          <Route component={About} path="/About" />
          
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
