import React, { useEffect, useState } from "react";
import HttpRequestHelper from "../../utilities/HttpRequestHelper";
import DataTable, { Selector, TableColumn } from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import "../../assets/css/DataTable.css";


interface Service {
  action: string;
  name: string;
  description: string;
}

function ServiceList() {
  const navigate = useNavigate();
  const [service, setService] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);

  useEffect(() => {
    getList(1);
  }, []);

  const getList = async (pageIndex: number, pageSize: number = 10) => {
    setLoading(true);
    const response = await HttpRequestHelper().get(
      `/api/services/get-list?page=${pageIndex}&per_page=${pageSize}`
    );
    setService(response);
    setTotalRows(response.service);
    setLoading(false);
  };

  //event delete service
  const deleteService = async (id: any) => {
     await HttpRequestHelper().delete(`/api/services/${id}`);
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

  const onEdit = (id: number) => {
    return navigate(`/admin/service/${id}/detail`);
  };
  const addService = () => {
    return navigate(`/admin/service`);
  };
  const columns: any = [
    {
      name: "Action",
      selector: (row: any)=> (
        <>
          <span
            className="cursor-pointer"
            onClick={() => deleteService(row.id)}
          >
            <i className="bi bi-trash"></i>
          </span>
          &nbsp;
          <span className="cursor-pointer"
            
            onClick={() => onEdit(row.id)}
          >
            <i className="bi bi-pencil"></i>
          </span>
        </>
      ),
      width: '70px',
    },
    {
      name: "Name Service",
      selector: (row: any) => row.name,
      width: '250px'
    },
    {
      name: "Description",
      selector: (row: any) => row.description,
    },
  ];

  return (
    <>
      <div className="row">
        <div className="col-12">
          <h3>Service List</h3>

          <button
            className="btn btn-primary btn-sm"
            onClick={() => addService()}
          >
            Add Service
          </button>

          <DataTable
            columns={columns}
            data={service}
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

export default ServiceList;
