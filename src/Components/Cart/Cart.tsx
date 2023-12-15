import { useEffect, useState } from "react";
import { CartProduct } from "./Model/CartProduct";
import iconRemove from "../../assets/img/icon/remove-from-cart.png";
import HttpRequestHelper from "../../utilities/HttpRequestHelper";
import { useAppDispatch, useAppSelector } from "../../redux/configureStore";
import { removeItem, setAllCart, setCart } from "../Cart/CartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


function Cart() {
  useEffect(() => {
    const cart = localStorage.getItem("cart");

    if (cart) {
      const cartItems = JSON.parse(cart);
      lsCart(cartItems);
    }
  }, []);


  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const checkOut = () => {
    const user = localStorage.getItem("user");

    if(user)
    {
      return navigate(`/cart-check-out`);
    }
    else{
      toast("Please login to check out", {
        type: toast.TYPE.WARNING,
        autoClose: 5000,
      });
    }
  }

  const lsCart = async (data: CartProduct) => {
    const response = await HttpRequestHelper().post(
      "/api/cart/get-cart-item",
      data
    );
    dispatch(setAllCart(response));
  };

  const deleteItem = (productId: number) => {
    dispatch(removeItem(productId));
  };

  const updateProductCart = (productId: number, quantity: number) => {
    const data: CartProduct = {
      id: productId,
      quantity: quantity,
    };
    dispatch(setCart(data));
  };

  const {cartProduct} = useAppSelector(state => state.cart)

  return (
    <>
      <section className=" space">
        <table className="table">
          <thead className="thead-dark">
            <tr className="text-center color-table">
              <th scope="col">Product</th>
              <th scope="col">Price</th>
              <th style={{ width: "250px" }}>Quantity</th>
              <th style={{ width: "150px" }}>Total</th>
              <th style={{ width: "90px" }}>Action</th>
            </tr>
          </thead>
          {cartProduct.map((item, index) => (
            <tbody key={index}>
              <tr>
                <th>{item.name}</th>
                <td style={{ textAlign: "right" }}>{item.price}</td>
                <td className="text-center">
                  <div className="quantity">
                    <button className="quantity-minus qty-btn" onClick={() => updateProductCart(item.id, -1)}>
                      <i className="fal fa-minus"></i>
                    </button>
                    <input
                      type="number"
                      id="quantity"
                      className="qty-input"
                      step="1"
                      min="1"
                      max="100"
                      name="quantity"
                      value={item.quantity}
                      title="Qty"
                    />
                    <button className="quantity-plus qty-btn" onClick={() => updateProductCart(item.id, +1)}>
                      <i className="fal fa-plus"></i>
                    </button>
                  </div>
                </td>
                <td style={{ textAlign: "right" }}>
                  {(item.price ?? 0) * item.quantity}
                </td>
                <td className="text-center">
                  <img
                    src={iconRemove}
                    height={35}
                    onClick={() => deleteItem(item.id)}
                    className="cursor-pointer"
                  />
                </td>
              </tr>
            </tbody>
          ))}
        </table>
        <div className="col-auto">
                <div className="header-icons">
                <a href="#" className="vs-btn style12" onClick={() => checkOut()}>
                  CheckOut
                </a>
                </div>
              </div>
      </section>
    </>
  );
}

export default Cart;
