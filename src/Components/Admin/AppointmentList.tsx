import { useEffect, useState } from "react";
import HttpRequestHelper from "../../utilities/HttpRequestHelper";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import CommonHelper from "../../utilities/CommonHelper";

interface Appointment {
  id: number;
  userName: string;
  status: string;
  note: string;
  createdOn: Date;
}

function AppointmentList() {
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);

  useEffect(() => {
    getList(1);
  }, []);

  //show list Appointment
  const getList = async (pageIndex: number, pageSize: number = 10) => {
    setLoading(true);
    const response = await HttpRequestHelper().get(
      `/api/Appointment/get-list?page=${pageIndex}&per_page=${pageSize}`
    );
    setAppointment(response);
    setTotalRows(response.appointment);
    setLoading(false);
  };

  //event delete
  const deleteAppointment = async (id: number) => {
    const response = await HttpRequestHelper().delete(`/api/Appointment/${id}`);
  };
  //event edit
  const onEdit = (id: number) => {
    return navigate(`/admin/Appointment/${id}`);
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

  const addAppointment = () => {
    return navigate(`/admin/appointment-form`);
  };
  const columns = [
    {
      name: "Action",
      selector: (row: any) => (
        <>
          <button className="btn btn-primary btn-sm" onClick={() => deleteAppointment(row.id)}>Delete</button>&nbsp;
          <button className="btn btn-primary btn-sm" onClick={() => onEdit(row.id)}>Edit</button>
        </>
      ),
    },
    {
      name: "Username",
      selector: (row: any) => ( row.userName),
    },
    {
      name: "Note",
      selector: (row: any) => row.note,
    },
    {
        name: "Created On",
        selector: (row: any) => CommonHelper().formatDate(row.createdOn),
      },
    {
      name: "Status",
      selector: (row: any) => row.status,
    },
    
  ];

  return (
    <>
      <div className="row">
        <div className="col-12">
          <h3>Appointment List</h3>

          <button className="btn btn-primary btn-sm" onClick={() => addAppointment()}>Add Appointment</button>

          <DataTable
            columns={columns}
            data={appointment}
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

export default AppointmentList;
