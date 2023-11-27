import { useEffect, useState } from "react";
import HttpRequestHelper from "../../utilities/HttpRequestHelper";
import ReactPaginate from "react-paginate";
import ProductItems from "../Products/ProductItem";
import { Product } from "../Products/Model/ProductModel";

const ProductPage = () => {
  const [products, setProduct] = useState<Product[]>([]);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    listProduct(1);
  }, []);

  const listProduct = async (pageIndex: number) => {
    const response = await HttpRequestHelper().get(
      `/api/product/all-product?pageIndex=${pageIndex}`
    );
    setProduct(response.products);
    setTotalPage(response.totalPage);
  };

  const handlePageClick = (event: any) => {
    listProduct(event.selected + 1);
  };

  return (
    <>
      <section
        className="vs-product-wrapper  "
        data-bg-src="assets/img/bg/body-bg-1.jpg"
        id="container"
      >
        <div className="outer-wrap3">
          <div className="container">
            <div className="row gx-60">
              <div className="col-xl-12 wow fadeInUp" data-wow-delay="0.2s">
                <div className="vs-sort-bar">
                  <div className="row justify-content-between align-items-center"></div>
                </div>
                <div className="row">
                  <ProductItems sanpham={products} />

                  <ReactPaginate
                    className="pagination-tool"
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={totalPage}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductPage;
