import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HttpRequestHelper from "../../utilities/HttpRequestHelper";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  serviceId: number;
  serviceName: string;
}

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();
  const [products, setProducts] = useState<Product[]>([]);

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

  //list product
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
                    src="assets/img/product/p-d-1-1.png"
                    alt="Product Image"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6 align-self-center">
              <div className="product-about">
                <h2 className="product-title">{product?.name}</h2>
                <p className="product-price">{product?.price}</p>
                <p className="product-text">{product?.description}.</p>
                <div className="actions">
                  <div className="quantity">
                    <label htmlFor="quantity" className="screen-reader-text">
                      Quantity:
                    </label>
                    <button className="quantity-minus qty-btn">
                      <i className="fal fa-minus"></i>
                    </button>
                    <button className="quantity-plus qty-btn">
                      <i className="fal fa-plus"></i>
                    </button>
                  </div>
                  <a href="#" className="vs-btn">
                    Add to Cart
                  </a>
                </div>
              </div>
            </div>
          </div>
          <section className="space">
            <h3 className="sec-subtitle3">Related Products</h3>
            <div className="row ">
              {products.map((product, index) => (
                <div className="col-md-3">
                  <div className="product-img">
                    <a href="shop-details.html">
                      <img
                        src="assets/img/product/p-2-1.png"
                        alt="product"
                        className="w-100"
                      />
                    </a>
                    <div className="actions">
                      <a href="#" className="icon-btn">
                        <i className="far fa-shopping-cart"></i>
                      </a>
                    </div>
                  </div>
                  <div className="product-body">
                    <div className="product-content">
                      <h3 className="product-title">
                        <a className="text-inherit" href="shop-details.html">
                          {product.name}
                        </a>
                      </h3>
                      <div className="product-category">
                        <a href="#">{product.serviceName}</a>
                      </div>
                    </div>
                    <span className="product-price">
                      <span className="currency">$</span>
                      {product.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default ProductDetail;
