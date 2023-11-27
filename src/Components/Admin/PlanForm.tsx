import { useEffect, useState } from "react";
import { css } from "@emotion/css";
import HttpRequestHelper from "../../utilities/HttpRequestHelper";
import { useForm, useWatch } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Plan {
  id: number;
  name: string;
  description: string;
  price: number;
  createOn: Date;
  isActive: boolean;
  //detail?: PlanDetail[];
}

interface PlanDetail {
  id: number;
  note: string;
  productId: number;
}

const errorInput = css`
  font-style: italic;
  color: red;
  font-size: 12px;
`;

function PlanForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<Plan>();

  useEffect(() => {
    if (id) {
      getPlan(parseInt(id));
    }
    
  }, [id]);

  const getPlan = async (id: number) => {
    try {
      const response = await HttpRequestHelper().get(
        `/api/plan/${id}/detail`
      );
      setValue("id", response.id);
      setValue("name", response.name);
      setValue("description", response.description);
      setValue("price", response.price);
      setValue("isActive", response.isActive);
    } catch (error) {
      throw error;
    }
  };

  const onsubmit = async (data: Plan) => {
    data.id = !data.id ? 0 : data.id;
    data.price = parseFloat(data.price.toString());

    const response = await HttpRequestHelper().post("/api/plan/save",data);

    if (response.status) {
      toast(response.message, { type: toast.TYPE.SUCCESS, autoClose: 5000 });

      setTimeout(() => {
        return navigate(`/admin/plans`);
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
                Plan Form
              </h3>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-lg-6">
              <form id="Plan" onSubmit={handleSubmit(onsubmit)}>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Plan Name</label>
                  <input type="hidden" {...register("id")}></input>
                  <input
                    type="text"
                    className="form-control"
                    {...register("name", {
                      required: "Plan name must be not empty",
                    })}
                    placeholder="Enter plan name"
                  />
                  {errors.name && (
                    <span className={errorInput}>{errors.name.message}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Description</label>
                  <textarea
                    rows={5}
                    className="form-control"
                    {...register("description", {
                      required: "Description must be not empty",
                    })}
                    placeholder="Enter description"
                  />
                  {errors.description && (
                    <span className={errorInput}>
                      {errors.description.message}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    {...register("price", {
                      required: "Price must be not empty",
                    })}
                    placeholder="Enter price"
                  />
                  {errors.price && (
                    <span className={errorInput}>{errors.price.message}</span>
                  )}
                </div>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked
                    {...register("isActive")}
                  />
                  <label className="form-check-label" htmlFor="isActive">
                    Is Active
                  </label>
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-outline-primary col-lg-3">
                    Submit
                  </button>
                  &nbsp;
                  <Link to="/admin/plans" className={"btn btn-outline-primary col-lg-3"}>
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

export default PlanForm;
