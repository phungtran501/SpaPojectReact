import { useEffect, useState } from "react";
import HttpRequestHelper from "../../utilities/HttpRequestHelper";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import CommonHelper from "../../utilities/CommonHelper";

interface Role {
  id: string;
  name: string;
}

function RoleList() {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);

  useEffect(() => {
    getList(1);
  }, []);

  const getList = async (pageIndex: number, pageSize: number = 10) => {
    setLoading(true);
    const response = await HttpRequestHelper().get(
      `/api/role/get-list?page=${pageIndex}&per_page=${pageSize}`
    );
    setRole(response);
    setTotalRows(response.role);
    setLoading(false);
  };

  //event delete
  const deleteRole = async (id: string) => {
    await HttpRequestHelper().delete(`/api/role/${id}`);
  };
  //event edit
  const onEdit = (id: number) => {
    return navigate(`/admin/role/${id}`);
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

  const addRole = () => {
    return navigate(`/admin/role-form`);
  };
  const columns: any = [
    {
      name: "Action",
      selector: (row: any) => (
        <>
          <span className="cursor-pointer" onClick={() => deleteRole(row.id)}>
            <i className="bi bi-trash"></i>
          </span>
          &nbsp;
          <span className="cursor-pointer" onClick={() => onEdit(row.id)}>
            <i className="bi bi-pencil"></i>
          </span>
        </>
      ),
      width: "70px",
    },
    { name: "Name", selector: (row: any) => row.name },
  ];

  return (
    <>
      <div className="row">
        <div className="col-12">
          <h3>Role List</h3>
          <button className="btn btn-primary btn-sm" onClick={() => addRole()}>
            Add Role
          </button>
          <DataTable
            columns={columns}
            data={role}
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

export default RoleList;
