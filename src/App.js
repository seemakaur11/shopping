import './App.css';
// import Banner from './components/Banner';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ProductContext from './Global/ProductContext';
import Cart from './components/Cart';
import NotFound from './components/NotFound';
import CartContextProvider from './Global/CartContext'

function App() {
  return (
    <div>
      <CartContextProvider>
        <Router>
        <Navbar />
        {/* <Banner /> */}
         <Switch>
          <Route exact path='/' component={ProductContext} />
          <Route  path='/cart' component={Cart}/>
          <Route component={NotFound}/>
        </Switch>
      </Router>
      </CartContextProvider>

    </div>
  );
}

export default App;
