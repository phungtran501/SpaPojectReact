import React, { useEffect, useState } from "react";
import HttpRequestHelper from "../../utilities/HttpRequestHelper";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import CommonHelper from "../../utilities/CommonHelper";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Product {
  name: string;
  decription: string;
  price: boolean;
  serviceName: string;
  createOn: Date;
}

function ProductList() {
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);

  useEffect(() => {
    getList(1);

  }, []);

  //show list account
  const getList = async (pageIndex: number, pageSize: number = 10) => {
    setLoading(true);
    const response = await HttpRequestHelper().get(
      `/api/product/get-list?page=${pageIndex}&per_page=${pageSize}`
    );
    setProduct(response);
    setTotalRows(response.product);
    setLoading(false);
  };

  //event delete account
  const deleteProduct = async (id: number) => {
    const response = await HttpRequestHelper().delete(`/api/product/${id}`);
    if(response){
      getList(1);
    }
  };
  //event edit account
  const onEdit = (id: number) => {
    return navigate(`/admin/product/${id}`);
  };
  /*
   * event change pageIndex
   */
  const handlePageChange = (page: any) => {
    getList(page);
  };

  /*
   * event change dropdownlist pageSize
   */
  const handlePerRowsChange = async (pageSize: number, pageIndex: number) => {
    getList(pageIndex, pageSize);
  };

  const addProduct = () => {
    return navigate(`/admin/product-form`);
  };
  const columns = [
    {
      name: "Action",
      selector: (row: any) => (
        <>
          <button className="btn btn-primary btn-sm" onClick={() => deleteProduct(row.id)}>Delete</button>&nbsp;
          <button className="btn btn-primary btn-sm" onClick={() => onEdit(row.id)}>Edit</button>
        </>
      ),
    },
    {
      name: "Service Name",
      selector: (row: any) => ( <span className="text-primary">{row.serviceName}</span>
        
        ),
    },
    {
      name: "Product Name",
      selector: (row: any) => row.name,
    },
    {
      name: "Description",
      selector: (row: any) => row.decription,
    },
    {
      name: "Price",
      selector: (row: any) => row.price,
    },
    {
      name: "Create On",
      selector: (row: any) => CommonHelper().formatDate(row.createOn),
    },
  ];

  return (
    <>
      <div className="row">
        <div className="col-12">
          <h3>Product List</h3>
          
          <button className="btn btn-primary btn-sm" onClick={() => addProduct()}>Add Product</button>

          <DataTable
            columns={columns}
            data={product}
            progressPending={loading}
            pagination
            paginationServer
            paginationTotalRows={totalRows}
            onChangeRowsPerPage={handlePerRowsChange}
            onChangePage={handlePageChange}
          />
        </div>
      </div>
    </>
  );
}

export default ProductList;
