import { useEffect, useState } from "react";
import { css } from "@emotion/css";
import HttpRequestHelper from "../../utilities/HttpRequestHelper";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Role {
  id: string;
  name: string;
}

const errorInput = css`
  font-style: italic;
  color: red;
  font-size: 12px;
`;

function RoleForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Role>();

  useEffect(() => {
    if (id) {
      getRole(id);
    }
  }, [id]);

  const getRole = async (id: string) => {
    try {
      const response = await HttpRequestHelper().get(`/api/role/${id}/detail`);
      setValue("id", response.id);
      setValue("name", response.name);
    } catch (error) {
      throw error;
    }
  };

  const onsubmit = async (data: Role) => {
    const response = await HttpRequestHelper().post("/api/role/save", data);

    if (response) {
      toast(response.message, { type: toast.TYPE.SUCCESS, autoClose: 5000 });

      setTimeout(() => {
        return navigate(`/admin/roles`);
      }, 3000);
    } else {
      toast(response.message, { type: toast.TYPE.ERROR, autoClose: 5000 });
    }
  };
  return (
    <>
      <section>
        <div className="container mt-4">
          <div className="col-lg-6">
            <div className="text-center text-lg-start">
              <h3 className="sec-title3 text-uppercase mb-xxl-2 pb-xxl-1">
                Role Form
              </h3>
            </div>
          </div>
          <div className="row ">
            <div className="col-lg-6">
              <form id="Service" onSubmit={handleSubmit(onsubmit)}>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Role Name</label>
                  <input type="hidden" {...register("id")}></input>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter name"
                    {...register("name", {
                      required: "Name must be not empty",
                    })}
                  />
                  {errors.name && (
                    <span className={errorInput}>{errors.name.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-outline-primary col-lg-3"
                  >
                    Submit
                  </button>
                  &nbsp;
                  <Link
                    to="/admin/appointments"
                    className={"btn btn-outline-primary col-lg-3"}
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

export default RoleForm;
