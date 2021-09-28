import React, { useContext } from 'react';
import Banner from './Banner';
import { CartContext } from '../Global/CartContext';

export default function Products(props) {
    const { products} = props;
    const {dispatch} = useContext(CartContext);
   
    return (
        <div>
            <Banner/>
            <div className="products">
                {products.map((product) =>(
                    <div className="product" key={product.id}>
                        <div className="productImage"><img src={product.image} alt='image'/>
                        </div>
                        <div className="product-details">
                            <div className="product-name">{product.name}</div>
                            <div className="product-price">${product.price}.00</div>
                        </div>
                        <div className="add-to-cart" onClick={()=>dispatch({
                            type: 'ADD_TO_CART', id: product.id,product})}>add to cart</div>
                        {product.status === "hot" ? <div className="hot">Hot</div> : " "}
                        {product.status ===  "new" ? <div className="new">New</div> : " "}
                    </div>
                ))

                }
            </div>
        </div>
            
     )
    

    }
   
//https://www.youtube.com/watch?v=boGHCRDtlQ8