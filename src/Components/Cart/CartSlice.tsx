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
      console.log(state.cartProduct);
    },
  },
});

export const { setCart } = cartSlice.actions;
