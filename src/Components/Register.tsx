import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { css } from "@emotion/css";
import HttpRequestHelper from "../utilities/HttpRequestHelper";
import { useForm } from "react-hook-form";

const errorInput = css`
  font-style: italic;
  color: red;
  font-size: 12px;
`;

interface RegisterForm {
  userName: string;
  fullName: string;
  email: string;
  phoneNumber: number;
  password: string;
}

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>();

  const [formRegister, setForm] = useState<RegisterForm>({
    userName: "",
    fullName: "",
    email: "",
    phoneNumber: 0,
    password: "",
  });

  useEffect(() => {}, []);

  function onChangeControl(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void {
    event.preventDefault();

    const newAccount = {
      ...formRegister,
      [event.target.name]: event.target.value,
    };

    setForm(newAccount);
  }

  const onsubmit = async (data: RegisterForm) => {
    await HttpRequestHelper()
      .post("/api/user/register", formRegister)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        throw error;
      });
  };

  return (
    <>
      <section className=" space">
        <div className="container">
          <div className="row gx-70">
            <div
              className="col-lg-6 mb-40 mb-lg-0 wow fadeInUp login-left"
              data-wow-delay="0.2s"
            >
              <div className="text-center text-lg-start">
                <h2 className="sec-title3 h1 text-uppercase mb-xxl-2 pb-xxl-1">
                  Register
                </h2>
              </div>
              <form
                id="registerForm"
                onSubmit={handleSubmit(onsubmit)}
                noValidate
                className="ajax-contact form-style6"
              >
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Username"
                    {...register("userName", {
                      required: "Username must be not empty",
                    })}
                  />
                  {errors.userName && (
                    <span className={errorInput}>
                      {errors.userName.message}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Fullname"
                    {...register("fullName", {
                      required: "Fullname must be not empty",
                    })}
                  />
                  {errors.fullName && (
                    <span className={errorInput}>
                      {errors.fullName.message}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Email"
                    {...register("email", {
                      required: "Email must be not empty",
                      pattern: {
                        message: "Invalid email",
                        value:
                          /@"^[\w!#$%&'*+\-/=?\^_`{|}~]+(\.[\w!#$%&'*+\-/=?\^_`{|}~]+)*@((([\-\w]+\.)+[a-zA-Z]{2,4})|(([0-9]{1,3}\.){3}[0-9]{1,3}))\z"/,
                      },
                    })}
                  />
                  {errors.email && (
                    <span className={errorInput}>{errors.email.message}</span>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="number"
                    placeholder="Phone"
                    {...register("phoneNumber", {
                      required: "PhoneNumber must be not empty",
                    })}
                  />
                  {errors.phoneNumber && (
                    <span className={errorInput}>
                      {errors.phoneNumber.message}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Password"
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

export default Register;
