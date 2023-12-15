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

      const { id, quantity } = action.payload as CartProduct;

      const exitsProduct = state.cartProduct.find(
        (product) => product.id === id
      );

      if (exitsProduct) {
         exitsProduct.quantity += quantity;
        state.cartProduct = state.cartProduct;
      } else {

        const newProduct = [...state.cartProduct, action.payload];

        state.cartProduct = newProduct;
        
      }
      localStorage.setItem("cart", JSON.stringify(state.cartProduct));
    },
    removeItem: (state: CartState, action) => {
      const {id} = action.payload;
      const item = state.cartProduct.findIndex(x => x.id === id);
      state.cartProduct.splice(item, 1);
      localStorage.setItem("cart", JSON.stringify(state.cartProduct));
    }
  },
});

export const { setCart, setAllCart, removeItem } = cartSlice.actions;




