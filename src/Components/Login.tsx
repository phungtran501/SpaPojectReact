import { css } from "@emotion/css";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import HttpRequestHelper from "../utilities/HttpRequestHelper";
import { toast } from "react-toastify";

const errorInput = css`
  font-style: italic;
  color: red;
  font-size: 12px;
`;

interface LoginForm {
  username: string;
  password: string;
}


function Login() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const navigate = useNavigate();

  useEffect(() => {}, []);

  const onsubmit = async (data: LoginForm) => {
    const response = await HttpRequestHelper().post(
      "/api/authentication/login",
      data
    );

    if (response) {

      const token = response.accessToken;
      localStorage.setItem("token", token);
      const username = JSON.parse(atob(token.split(".")[1]));
      localStorage.setItem("user", username.Username);
      return navigate("/");
    }
    toast("Login failed", {
      type: toast.TYPE.WARNING,
      autoClose: 5000,
    });
  };
  
  return (
    <>
      <section className="space">
        <div className="container">
          <div className="row gx-70">
            <div
              className="col-lg-6 mb-40 mb-lg-0 wow fadeInUp login-left"
              data-wow-delay="0.2s"
            >
              <div className="text-center text-lg-start">
                <h2 className="sec-title3 h1 text-uppercase mb-xxl-2 pb-xxl-1">
                  Login
                </h2>
              </div>
              <form
                action="mail.php"
                method="POST"
                className="ajax-contact form-style6"
                onSubmit={handleSubmit(onsubmit)}
              >
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Enter username"
                    {...register("username", {
                      required: "Username must be not empty",
                    })}
                  />
                  {errors.username && (
                    <span className={errorInput}>
                      {errors.username.message}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Password"
                    {...register("password", {
                      required: "Password must be not empty",
                      // pattern: {
                      //   message: "Username or password is invalid",
                      //   value: /[A-Za-z]+/i,
                      // },
                    })}
                  />
                  {errors.password && (
                    <span className={errorInput}>
                      {errors.password.message}
                    </span>
                  )}
                </div>
                <button className="vs-btn" type="submit">
                  Submit
                </button>
                <p className="form-messages"></p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
