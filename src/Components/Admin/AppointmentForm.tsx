import { useEffect, useState } from "react";
import { css } from "@emotion/css";
import HttpRequestHelper from "../../utilities/HttpRequestHelper";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Appointment {
  id: number;
  userId: string;
  status: number;
  note: string;
  createdOn: Date;
}

interface User {
  id: string;
  username: string;
}

const errorInput = css`
  font-style: italic;
  color: red;
  font-size: 12px;
`;

function AppointmentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [users, setUser] = useState<User[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Appointment>();

  useEffect(() => {
    getListUser();
    if (id) {
      getAppointment(id);
    }
  }, [id]);

  const getAppointment = async (id: any) => {
    try {
      const response = await HttpRequestHelper().get(
        `/api/appointment/${id}/detail`
      );
      setValue("id", response.id);
      setValue("userId", response.userId);
      setValue("status", response.status);
      setValue("note", response.note);
    } catch (error) {
      throw error;
    }
  };

  const getListUser = async () => {
    const users = await HttpRequestHelper().get("/api/account/get-accounts");
    setUser(users);
  };

  const onsubmit = async (data: Appointment) => {
    data.id = !data.id ? 0 : data.id;

    const response = await HttpRequestHelper().post(
      "/api/appointment/save",
      data
    );

    if (response) {
      toast(response, { type: toast.TYPE.SUCCESS, autoClose: 5000 });

      setTimeout(() => {
        return navigate(`/admin/appointments`);
      },3000)

    } else {
      toast(response, { type: toast.TYPE.ERROR, autoClose: 5000 });
    }
  };
  return (
    <>
      <section>
        <div className="container">
          <div className="row ">
            <div className="col-lg-4 login-left-admin">
              <div className="text-center text-lg-start">
                <h2 className="sec-title3 h1 text-uppercase mb-xxl-2 pb-xxl-1">
                  Appointment Form
                </h2>
              </div>
              <ToastContainer />
              <form id="Service" onSubmit={handleSubmit(onsubmit)}>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Username</label>
                  <select className="form-control" {...register("userId")}>
                    <option>Choose User</option>
                    {users.map((user, index) => (
                      <option value={user.id} key={index}>
                        {user.username}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Note</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("note", {
                      required: "Note must be not empty",
                    })}
                    placeholder="Enter note"
                  />
                  {errors.note && (
                    <span className={errorInput}>{errors.note.message}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Status</label>
                  <input
                    type="number"
                    className="form-control"
                    {...register("status", {
                      required: "Status must be not empty",
                    })}
                    placeholder="Enter status"
                  />
                  {errors.status && (
                    <span className={errorInput}>{errors.status.message}</span>
                  )}
                </div>
                <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-outline-primary col-lg-3"
                    >
                      Submit
                    </button>&nbsp;
                    <Link
                      to="/admin/products"
                      className={
                        "btn btn-outline-primary col-lg-3"
                      }
                    >
                      Cancel
                    </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AppointmentForm;
