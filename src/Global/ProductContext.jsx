import React, { createContext, useState } from 'react'
import watch from '../assets/watch.jpg';
import phone from '../assets/phone.jpg';
import dress from '../assets/dress.jpg';
import laptop from '../assets/laptop.jpg';
import earphone from '../assets/earphone.jpg';
import necklase from '../assets/necklase.jpg';
import perfume from '../assets/perfume.jpg';
import shoe from '../assets/shoe.jpg';
import Products from '../components/Products';
const productContext = createContext(); 


export default function ProductContext() {
    const [products] = useState([
        {id: 1, name: 'Watch', price: 550, image: watch, status: 'hot'},
        {id: 2, name: 'Necklase', price: 2000, image: necklase, status: 'new'},
        {id: 3, name: 'Perfume', price: 245, image: perfume, status: 'hot'},
        {id: 4, name: 'Shoes', price: 1200, image: shoe, status: 'new'},
        {id: 5, name: 'iPhone', price: 3000, image:phone, status: 'hot'},
        {id: 6, name: 'Dress', price: 800, image: dress, status: 'new'},
        {id: 7, name: 'Laptop', price: 2500, image: laptop, status: 'hot'},
        {id: 8, name: 'Headphone', price: 1350, image: earphone, status: 'new'}
    ])
    return (
        <div>
            <productContext.Provider value={{products: [...products]}}>
                <Products products={products} className ="container"/>
            </productContext.Provider>
        </div>
    )
}
