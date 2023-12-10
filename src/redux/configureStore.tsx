import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux'
import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from '../Components/Cart/CartSlice';

export const store = configureStore({
    reducer: {
        cart: cartSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;