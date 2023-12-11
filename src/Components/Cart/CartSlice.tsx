import { createSlice } from "@reduxjs/toolkit";
import { CartProduct } from "./Model/CartProduct";

interface CartState {
  cartProduct: CartProduct[] | [];
}

const initialState: CartState = {
  cartProduct: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setAllCart: (state: CartState, action) => {
      state.cartProduct = action.payload;
    },
    setCart: (state: CartState, action) => { 
      const exitsProduct = state.cartProduct.find(
        (product) => product.id === action.payload
      );

      if (exitsProduct) {
        exitsProduct.quantity += 1;
        state.cartProduct = state.cartProduct;
      } else {
        const product: CartProduct = {
          id: action.payload,
          quantity: 1,
        };

        const newProduct = [...state.cartProduct, product];

        state.cartProduct = newProduct;
        
      }
      localStorage.setItem("cart", JSON.stringify(state.cartProduct));
    },
  },
});

export const { setCart, setAllCart } = cartSlice.actions;




