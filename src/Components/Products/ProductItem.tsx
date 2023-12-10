import { useNavigate } from "react-router-dom";
import { Product } from "./Model/ProductModel";
import HttpRequestHelper from "../../utilities/HttpRequestHelper"
import FormatCurrency from "../../utilities/FormatCurrency";
import { useAppDispatch } from "../../redux/configureStore";
import { setCart } from "../Cart/CartSlice";

interface ProductItemsProps {
    sanpham: Product[]; 
}

const ProductItems: React.FC<ProductItemsProps> = ({sanpham}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const detailProduct = (id: number) => {
      return navigate(`/product/${id}`);
    };
  
    const detailService = (id: number) => {
      return navigate(`/services/${id}`);
    };

    const handleAddItem = (productId: number) => {
        dispatch(setCart(productId))
      }
    
    return (
      <>
        {sanpham.map((product: Product, index: number) => {
            return (
                <div className="col-md-6 col-xl-3" key={index}>
                    <div className="vs-product product-style2">
                        <div className="product-img">
                            <a href="shop-details.html">
                                <img
                                    src={`${HttpRequestHelper().baseURL}/image/product/${product.id}.png`}
                                    alt="product"
                                    className="w-100" style={{ width: "285px", height: "308px"}}/>
                            </a>
                            <div className="actions">
                                <a href="#" className="icon-btn">
                                    <i className="far fa-eye"></i>
                                </a>
                                <a href="#" className="icon-btn" onClick={() => handleAddItem(product.id)}>
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
                                <span className="currency"><FormatCurrency value={product?.price ?? 0}/></span>
                                
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