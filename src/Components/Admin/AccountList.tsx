import React, { useEffect, useState } from "react";
import HttpRequestHelper from "../../utilities/HttpRequestHelper";
import DataTable from "react-data-table-component";
import {useNavigate } from "react-router-dom";
interface Account {
  username: string;
  fullname: string;
  email: string;
  phoneNumber: string;
  address: string;
  roleName: string;
}

function AccountList() {
  const navigate = useNavigate();
  const [account, setAccount] = useState<Account[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);

  useEffect(() => {
    getList(1);
  }, []);

  //show list account
  const getList = async (pageIndex: number, pageSize: number = 10) => {
    setLoading(true);
    const response = await HttpRequestHelper().get(`/api/account/get-list?page=${pageIndex}&per_page=${pageSize}`);
    setAccount(response);
    setTotalRows(response.service);
    setLoading(false);
  };

    //event delete account
    const deleteAccount = async (id: string) => {
      const response = await HttpRequestHelper().delete(`/api/account/${id}`)
     
    }
    //event edit account
    const onEdit = (id: string)=>{
      return navigate(`/admin/account/${id}`);
    }
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

  const addAccount = ()=>{
    return navigate(`/admin/account-form`);
  }
  const columns = [
    {
      name:  "Action",
      selector: (row:any) => (
        <>
          <button onClick={() => deleteAccount(row.id)}>Delete</button>
          <button onClick={() => onEdit(row.id)}>Edit</button>
        </>
      ),
    },
    {
      name: "UserName",
      selector: (row: any) => row.username,
    },
    {
      name: "Role",
      selector: (row: any) => row.roleName,
    },
      {
        name: "FullName",
        selector: (row: any) => row.fullname,
      },
      {
        name: "Email",
        selector: (row: any) => row.email,
      },
      {
        name: "Phone Number",
        selector: (row: any) => row.phoneNumber,
      },
      {
        name: "Address",
        selector: (row: any) => row.address,
      },
  ];

  return (
    <>
      <div className="row">
        <div className="col-12">
          <h3>Account List</h3>

          <button onClick={() => addAccount()}>Add Account</button>

          
          <DataTable
            columns={columns}
            data={account}
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

export default AccountList;
