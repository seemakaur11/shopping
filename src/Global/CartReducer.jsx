
export default function CartReducer(state, action) {
  const { shoppingCart, totalPrice, qty } = state;
  let product,
    updatedPrice,
    updatedQty,
    index;
  switch (action.type) {
    case 'ADD_TO_CART':
      const checkCart = shoppingCart.find(product => product.id === action.id)
      if (!!checkCart) {
        return state;
      }
      else {
        product = action.product;
        product['qty'] = 1;
        updatedQty = qty + 1;
        updatedPrice = totalPrice + product.price;
        return { shoppingCart: [product, ...shoppingCart], totalPrice: updatedPrice, qty: updatedQty }

      }
      // break;
    case 'INC':
      product = action.cart;
      product.qty = product.qty + 1;
      updatedPrice = totalPrice + product.price;
      updatedQty = qty + 1;
      index = shoppingCart.findIndex(cart => cart.id === action.id);
      shoppingCart[index] = product;
      return { shoppingCart: [...shoppingCart], totalPrice: updatedPrice, qty: updatedQty }
      // break;

    case 'DEC':
      product = action.cart;
      if (product.qty > 1) {
        product.qty = product.qty - 1;
        updatedPrice = totalPrice - product.price;
        updatedQty = qty - 1;
        index = shoppingCart.findIndex(cart => cart.id === action.id);
        shoppingCart[index] = product;
        return { shoppingCart: [...shoppingCart], totalPrice: updatedPrice, qty: updatedQty }
      }
      else {
        return state;
      }
      // break;
      case 'DELETE':
        const filtered = shoppingCart.filter(product => product.id !== action.id);
        product = action.cart;
        updatedQty = qty - 1;
        updatedPrice = totalPrice - product.price *product.qty;
        return { shoppingCart: [...filtered], totalPrice: updatedPrice, qty: updatedQty };
        // break;
        case 'EMPTY':
          return {shoppingCart: [], totalPrice: 0,
          qty: 0}


    default: return state
  }
}
//https://www.youtube.com/watch?v=8R-golowiB0&t=4s