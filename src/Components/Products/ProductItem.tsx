import { useNavigate } from "react-router-dom";
import { Product } from "./Model/ProductModel";


function ProductItems(props:any) {
    const navigate = useNavigate();

    const detailProduct = (id: number) => {
      return navigate(`/product/${id}`);
    };
  
    const detailService = (id: number) => {
      return navigate(`/services/${id}`);
    };

    
    
    return (
      <>
        {props.products.map((product: Product, index: number) => {
            return (
                <div className="col-md-6 col-xl-3">
                    <div className="vs-product product-style2" key={index}>
                        <div className="product-img">
                            <a href="shop-details.html">
                                <img
                                    src="assets/img/product/p-2-1.png"
                                    alt="product"
                                    className="w-100" />
                            </a>
                            <div className="actions">
                                <a href="#" className="icon-btn">
                                    <i className="far fa-heart"></i>
                                </a>
                                <a href="#" className="icon-btn">
                                    <i className="far fa-eye"></i>
                                </a>
                                <a href="#" className="icon-btn">
                                    <i className="far fa-shopping-cart"></i>
                                </a>
                            </div>
                        </div>
                        <div className="product-body">
                            <div className="product-content">
                                <h3 className="product-title">
                                    <a
                                        className="text-inherit"
                                        href="#"
                                        onClick={() => detailProduct(product.id)}
                                    >
                                        {product.name}
                                    </a>
                                </h3>
                                <div className="product-category">
                                    <a
                                        href="#"
                                        onClick={() => detailService(product.serviceId)}
                                    >
                                        {product.serviceName}
                                    </a>
                                </div>
                            </div>
                            <span className="product-price">
                                <span className="currency">$</span>
                                {product.price}
                            </span>
                        </div>
                    </div>
                </div>
            );
        })}
      </>
    );
  }

  export default ProductItems;