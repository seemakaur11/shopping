import React, { useContext } from 'react';
import { CartContext } from '../Global/CartContext';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
const Cart = (props) => {
    const { shoppingCart, totalPrice, qty, dispatch } = useContext(CartContext);
    const handleToken = async(token)=>{
        const product = {name: 'All products', price: totalPrice}
      await axios.post('http://localhost:5005/checkout',{
            product, token })
            .then(res => {
                const { status } = res.data
                if(status === "error"){
                    dispatch({type: 'EMPTY'})
                    props.history.push('/')
                    toast.success('You have paid successfully now you can continue your shopping',
                    {position: toast.POSITION.TOP_RIGHT})
                }
                else {
                    toast.error('Your payment failed',
                    {position: toast.POSITION.TOP_RIGHT})
                }
              })

    }
    return (
        <div className="cart-container">
            <div className="cart-details">
              {shoppingCart.length > 0 ?
               shoppingCart.map(cart =>(
                   
                   <div className="cart" key = {cart.id}>
                       <span className="cart-image"><img src={cart.image} alt='image'/></span>
                       <span className="cart-name">{cart.name}</span>
                       <span className="cart-price">${cart.price}.00</span>
                       <span className="increment" onClick={()=>
                    dispatch({type: 'INC', id: cart.id, cart})}><i className="fas fa-plus"></i></span>
                       <span className="cart-qty">{cart.qty}</span>
                       <span className="decrement" onClick={()=>
                    dispatch({type: 'DEC', id: cart.id, cart})}><i className="fas fa-minus"></i></span>
                       <span className="total-price">${cart.price*cart.qty}.00</span>
                       <span className="delete-cart" onClick={()=>
                    dispatch({type: 'DELETE', id: cart.id, cart})} ><i className="fas fa-trash-alt"></i></span>
                   </div>
               ))
               : <div className="empty">Sorry your cart is currently empty</div>}
            </div>
            {shoppingCart.length > 0 ? <div className="cart-summary">
                <div className="summary">
                    <h2>Cart Summary </h2>
                    <div className="total-items"></div>
                        <div className="items">Total Items</div>
                        <div className="items-count">{qty}</div>
                </div>
                <div className="total-price-section">
                    <div className="just-title">Total Price</div>
                    <div className="items-price">${totalPrice}.00</div>
                </div>
                <div className="stripe-section">
                    <StripeCheckout 
                    stripeKey="pk_test_51JeYHHSEH5sbunfAWl8dhnpKcEGkMM4JwLgtTQnLLqY97zdu8hFRc72VVTPleJTG6GwAwpjnoBHbF7jT7L0y01dl00sf60W326"
                    token={handleToken}
                    billingAddress
                    shippingAddress
                    amount={totalPrice*100}
                    name="all products">

                    </StripeCheckout>
                </div>
            </div> : ''}
        </div>
    )
}
export default Cart