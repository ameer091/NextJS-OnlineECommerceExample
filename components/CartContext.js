import {createContext, useEffect, useState} from "react";

export const CartContext = createContext({});

export function CartContextProvider({children}) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([])

  useEffect(() => {
    if (ls) {
      if (cartProducts?.length > 0) {
        ls.setItem('cart', JSON.stringify(cartProducts));
      } else {
        ls.removeItem('cart');
      }
    }
  }, [cartProducts, ls]);

  useEffect(() => {
    if(ls && ls.getItem('cart')) {
      setCartProducts(JSON.parse(ls.getItem('cart')))
    }
  }, [ls]);

  function addProduct(productId){
    setCartProducts(prev => [...prev, productId]);
  }

  function removeProduct(productId){
    setCartProducts(prev => {
      const positionOfId = prev.indexOf(productId);
      if (positionOfId !== -1) {
        return prev.filter((value,index) => index !== positionOfId);
      }
      return prev;
    })
  }

  function clearCart(){
    setCartProducts([]);
  }

  return (
    <CartContext.Provider value={{cartProducts, setCartProducts, addProduct, removeProduct, clearCart}}>
      {children}
    </CartContext.Provider>
  )
}
