import React, { useEffect, useState } from "react";
import { css } from "@emotion/css";
import HttpRequestHelper from "../../utilities/HttpRequestHelper";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  serviceId: number;
  createon: Date;
  isActive: boolean;
}

interface Services {
  id: number;
  name: string;
}

const errorInput = css`
  font-style: italic;
  color: red;
  font-size: 12px;
`;

function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [services, setService] = useState<Services[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Product>();

  useEffect(() => {
    getListService();
    if (id) {
      getProduct(parseInt(id));
    }
  }, [id]);

  const getProduct = async (id: number) => {
    try {
      const response = await HttpRequestHelper().get(
        `/api/product/${id}/detail`
      );
      setValue("id", response.id);
      setValue("serviceId", response.serviceId);
      setValue("name", response.name);
      setValue("description", response.description);
      setValue("price", response.price);
      setValue("isActive", response.isActive);
    } catch (error) {
      throw error;
    }
  };

  const getListService = async () => {
    const services = await HttpRequestHelper().get(
      "/api/services/get-services"
    );
    setService(services);
  };

  const onsubmit = async (data: Product) => {
    data.id = !data.id ? 0 : data.id;
    data.price = parseFloat(data.price.toString());
    data.serviceId = parseInt(data.serviceId.toString());

    const response = await HttpRequestHelper().post("/api/product/save", data);

    if (response) {
      toast(response, { type: toast.TYPE.SUCCESS, autoClose: 5000 });
      return navigate(`/admin/products`);
    } else {
      toast(response, { type: toast.TYPE.ERROR, autoClose: 5000 });
    }
  };
  return (
    <>
      <section>
        <div className="container mt-4">
          <div className="col-lg-6">
            <div className="text-center text-lg-start">
              <h3 className="sec-title3 text-uppercase mb-xxl-2 pb-xxl-1">
                Product Form
              </h3>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-lg-6">
              <ToastContainer />
              <form id="Service" onSubmit={handleSubmit(onsubmit)}>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Services Name</label>
                  <select className="form-control" {...register("serviceId")}>
                    <option>Choose Service</option>
                    {services.map((service, index) => (
                      <option value={service.id} key={index}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Product Name</label>
                  <input type="hidden" {...register("id")}></input>
                  <input
                    type="text"
                    className="form-control"
                    {...register("name", {
                      required: "Product Name service must be not empty",
                    })}
                    placeholder="Enter product name"
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
                  <Link to="/admin/products" className={"btn btn-outline-primary col-lg-3"}>
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

export default ProductForm;
