import { useEffect, useState } from "react";
import HttpRequestHelper from "../../utilities/HttpRequestHelper";
import DataTable, {  } from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import CommonHelper from "../../utilities/CommonHelper";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/css/DataTable.css";

interface Plan {
  name: string;
  description: string;
  price: boolean;
  createOn: Date;
}

function PlanList() {
  const navigate = useNavigate();
  const [plan, setPlan] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);

  useEffect(() => {
    getList(1);
  }, []);

  //show list account
  const getList = async (pageIndex: number, pageSize: number = 10) => {
    setLoading(true);
    const response = await HttpRequestHelper().get(
      `/api/plan/get-list?page=${pageIndex}&per_page=${pageSize}`
    );
    setPlan(response);
    setTotalRows(response.plan);
    setLoading(false);
  };

  const deletePlan = async (id: number) => {
    const response = await HttpRequestHelper().delete(`/api/plan/${id}`);
    if (response) {
      getList(1);
    }
  };
  const onEdit = (id: number) => {
    return navigate(`/admin/plan/${id}`);
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

  const addPlan = () => {
    return navigate(`/admin/plan-form`);
  };
  const columns: any = [
    {
      name: "Action",
      selector: (row: any) => (
        <>
          <span
            className="cursor-pointer"
            onClick={() => deletePlan(row.id)}
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
    { name: "Name", selector: (row: any) => row.name, width: '200px'},
    { name: "Price", selector: (row: any) => row.price, width: '150px'},
    { name: "Create On", selector: (row: any) => CommonHelper().formatDate(row.createOn), width: '150px'},
    { name: "Description", selector: (row: any) => row.description},
  ];

  return (
    <>
      <div className="row">
        <div className="col-12">
          <h3>Plan List</h3>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => addPlan()}
          >
            Add Plan
          </button>
          <DataTable
            columns={columns}
            data={plan}
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

export default PlanList;
