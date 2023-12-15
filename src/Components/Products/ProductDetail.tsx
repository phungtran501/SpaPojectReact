import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HttpRequestHelper from "../../utilities/HttpRequestHelper";
import ProductItems from "./ProductItem";
import FormatCurrency from "../../utilities/FormatCurrency";
import { useAppDispatch } from "../../redux/configureStore";
import { setCart } from "../Cart/CartSlice";
import { CartProduct } from "../Cart/Model/CartProduct";

interface Product {
  id: number;
  name: string;
  decription: string;
  price: number;
  serviceId: number;
  serviceName: string;
  image: any;
}

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();
  const [products, setProducts] = useState<Product[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getProduct(id);
    randomProduct();
  }, []);

  //get service
  const getProduct = async (id: any) => {
    try {
      const response = await HttpRequestHelper().get(
        `/api/product/${id}/detail`
      );
      setProduct(response);
    } catch (error) {
      throw error;
    }
  };

  const handleAddItem = (productId: number) => {
    const data: CartProduct={
      id: productId,
      quantity: 1
    }
    dispatch(setCart(data));
  };

  const randomProduct = async () => {
    const products = await HttpRequestHelper().get(
      "/api/product/random-product"
    );
    setProducts(products);
  };

  return (
    <>
      <section className="vs-product-wrapper product-details space-top space-extra-bottom">
        <div className="container">
          <div className="row gx-60">
            <div className="col-lg-6">
              <div
                className="product-big-img vs-carousel"
                data-slide-show="1"
                data-fade="true"
                data-asnavfor=".product-thumb-slide"
              >
                <div className="img">
                  <img
                    src={`${HttpRequestHelper().baseURL}/image/product/${
                      product?.id
                    }.png`}
                    alt="icon"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6 align-self-center">
              <div className="product-about">
                <h2 className="product-title">{product?.name}</h2>
                {
                  <p className="product-price">
                    
                    {FormatCurrency(product?.price ?? 0)}
                  </p>
                }
                <p className="product-text">{product?.decription}.</p>
                <div className="actions">
                  {
                    <a
                      href="#"
                      className="vs-btn"
                      onClick={() => handleAddItem(product?.id ?? 0)}
                    >
                      Add To Card
                    </a>
                  }
                </div>
              </div>
            </div>
          </div>
          <section className="space">
            <h3 className="sec-subtitle3">Related Products</h3>
            <div className="row ">
              <ProductItems sanpham={products} />
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default ProductDetail;
