import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { css } from "@emotion/css";
import HttpRequestHelper from "../../utilities/HttpRequestHelper";
import { set, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
interface Service {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
}
const errorInput = css`
  font-style: italic;
  color: red;
  font-size: 12px;
`;

function AddService() {

  const { id } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Service>();

  useEffect(() => {
    if(id){
      getService(id);
    }
    
  }, [id]);

  const getService = async (id: any) => {
    try {
      const response = await HttpRequestHelper().get(
        `/api/services/${id}/detail`
      );
      setValue("id", response.id);
      setValue("name", response.name);
      setValue("description", response.description);
      setValue("isActive", response.isActive);
    } catch (error) {
      throw error;
    }
  };

  const onsubmit = async (data: Service) => {

    await HttpRequestHelper()
      .post("/api/Services/save", data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        throw error;
      });
  };
  return (
    <>
      <section>
        <div className="container">
          <div className="row ">
            <div className="col-lg-4 login-left-admin">
              <div className="text-center text-lg-start">
                <h2 className="sec-title3 h1 text-uppercase mb-xxl-2 pb-xxl-1">
                  Service Form
                </h2>
              </div>
              <form id="Service" onSubmit={handleSubmit(onsubmit)}>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Service Name</label>
                  <input type="hidden" {...register("id")}></input>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={"name"}
                    {...register("name", {
                      required: "Name service must be not empty",
                    })}
                    placeholder="Enter service name"
                  />
                  {errors.name && (
                    <span className={errorInput}>{errors.name.message}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={"description"}
                    {...register("description", {
                      required: "Description service must be not empty",
                    })}
                    placeholder="Enter service name"
                  />
                  {errors.description && (
                    <span className={errorInput}>
                      {errors.description.message}
                    </span>
                  )}
                </div>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    defaultValue={"isActive"}
                    type="checkbox"
                    checked
                    {...register("isActive")}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexSwitchCheckChecked"
                  >
                    Is Active
                  </label>
                </div>
                <button
                  type="submit"
                  className="btn btn-outline-primary col-lg-3 btn-submit-login-admin"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AddService;
