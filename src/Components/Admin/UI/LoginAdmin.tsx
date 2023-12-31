import { ChangeEvent, useEffect, useState } from "react";
import { css } from "@emotion/css";
import HttpRequestHelper from "../../../utilities/HttpRequestHelper";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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

function LoginAdmin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const navigate = useNavigate();

  const [formLogin, setForm] = useState<LoginForm>({
    username: "",
    password: "",
  });

  useEffect(() => {}, []);

  function onChangeControl(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void {
    event.preventDefault();

    const newLogin = { ...formLogin, [event.target.name]: event.target.value };

    setForm(newLogin);
  }

  const onsubmit = async (data: LoginForm) => {
    const response = await HttpRequestHelper().post(
      "/api/authentication/login",
      data
    );

    if (response) {
      localStorage.setItem("token", response.accessToken);
      return navigate("/admin");
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
          <div className="row ">
            <div className="col-lg-4 login-left-admin">
              <div className="text-center text-lg-start">
                <h2 className="sec-title3 h1 text-uppercase mb-xxl-2 pb-xxl-1">
                  Login
                </h2>
              </div>
              <form id="loginForm" onSubmit={handleSubmit(onsubmit)}>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Username</label>
                  <input
                    type="text"
                    className="form-control"
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
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input
                    type="password"
                    className="form-control"
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

export default LoginAdmin;
