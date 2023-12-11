import { useEffect, useState } from "react";
import { CartProduct } from "./Model/CartProduct";

function Cart() {
  useEffect(() => {
    itemCart();
  }, []);

  const [cart, setCart] = useState<CartProduct[]>([]);

  const itemCart = () => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      const cartData = JSON.parse(cart);
      setCart(cartData);
    }
  };

  return (
    <>
      <div>
        {cart.map((product, index) =>
            cart.length === 0 ?
        (
          <>Cart empty
          </>
        ) : (<>
            <th key={index}>
            <td>{product.id}</td>
          </th>
        </>)
        )}
      </div>
    </>
  );
}

export default Cart;
