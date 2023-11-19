import React, { useEffect, useState } from "react";
import { css } from "@emotion/css";
import HttpRequestHelper from "../../utilities/HttpRequestHelper";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";

interface Account {
  id: string;
  username: string;
  fullname: string;
  email: string;
  phoneNumber: string;
  address: string;
  roleName: string;
  password: string;
  isActive: boolean;
  isSystem: boolean;
}

const errorInput = css`
  font-style: italic;
  color: red;
  font-size: 12px;
`;

function FormAccount() {
  const { id } = useParams<string>();
  const [roles, setRole] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Account>();

  useEffect(() => {
    getListRole();
    if (id) {
      getAccount(id);
    }
  }, [id]);

  const getAccount = async (id: string) => {
    try {
      const response = await HttpRequestHelper().get(
        `/api/account/${id}/detail`
      );
      setValue("id", response.id);
      setValue("roleName", response.roleName);
      setValue("username", response.username);
      setValue("fullname", response.fullname);
      setValue("email", response.email);
      setValue("phoneNumber", response.phoneNumber);
      setValue("address", response.address);
      setValue("isActive", response.isActive);
      setValue("isSystem", response.isSystem);
    } catch (error) {
      throw error;
    }
  };

  const getListRole = async () => {
    const roles = await HttpRequestHelper().get("/api/role");
    setRole(roles);
  };

  const onsubmit = async (data: Account) => {
    await HttpRequestHelper()
      .post("/api/account/save", data)
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
        <div className="container mt-4">
          <div className="col-lg-6">
            <div className="text-center text-lg-start">
              <h3 className="sec-title3 text-uppercase mb-xxl-2 pb-xxl-1">
                Account Form
              </h3>
            </div>
          </div>
          <div className="row ">
            <div className="col-lg-6">
              <form id="Service" onSubmit={handleSubmit(onsubmit)}>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">User Role</label>
                  <select className="form-control" {...register("roleName")}>
                    <option>Choose User Role</option>
                    {roles.map((role, index) => (
                      <option value={role} key={index}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">User Name</label>
                  <input type="hidden" {...register("id")}></input>
                  <input type="text" className="form-control" placeholder="Enter username"
                    {...register("username", {
                      required: "User Name service must be not empty",
                    })}
                  />
                  {errors.username && (<span className={errorInput}>{errors.username.message}</span>)}
                </div>
                {!id ? (
                  <div className="form-group">
                    <input type="password" placeholder="Password"
                      {...register("password", {
                        required: "Password must be not empty",
                        pattern: {
                          message: "Invalid password",
                          value: /[A-Za-z]+/i,
                        },
                      })}
                    />
                    {errors.password && (
                      <span className={errorInput}>
                        {errors.password.message}
                      </span>
                    )}
                  </div>
                ) : (
                  <></>
                )}
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">FullName</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("fullname", {
                      required: "FullName must be not empty",
                    })}
                    placeholder="Enter full name"
                  />
                  {errors.fullname && (
                    <span className={errorInput}>
                      {errors.fullname.message}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("email", {
                      required: "Email must be not empty",
                    })}
                    placeholder="Enter email"
                  />
                  {errors.email && (
                    <span className={errorInput}>{errors.email.message}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("address", {
                      required: "Address must be not empty",
                    })}
                    placeholder="Enter address"
                  />
                  {errors.address && (
                    <span className={errorInput}>{errors.address.message}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("phoneNumber", {
                      required: "PhoneNumber must be not empty",
                    })}
                    placeholder="Enter phone"
                  />
                  {errors.phoneNumber && (
                    <span className={errorInput}>
                      {errors.phoneNumber.message}
                    </span>
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
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    {...register("isSystem")}
                  />
                  <label className="form-check-label" htmlFor="isSystem">
                    Is System
                  </label>
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-outline-primary col-lg-3">
                    Submit
                  </button>&nbsp;
                  <Link to="/admin/accounts" className={"btn btn-outline-primary col-lg-3"}>
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

export default FormAccount;
