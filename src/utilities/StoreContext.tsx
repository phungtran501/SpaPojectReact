import { createContext } from "react";
import { Cart } from "../Components/Cart/Model/CartModel";


interface StoreContextValue {
    cart: Cart | null;
    setCart: (cart: Cart) => void;
    removeItem: (productId: number, quantity: number) => void;
}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined);



