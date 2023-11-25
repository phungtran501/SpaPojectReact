import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { css } from "@emotion/css";
import HttpRequestHelper from "../../utilities/HttpRequestHelper";
import { set, useForm, useWatch } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
interface Service {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  image: any;
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
    control,
    formState: { errors, isSubmitting },
  } = useForm<Service>();

  const [previewUrl, setPreviewUrl] = useState("");

  const imageInput = useWatch({
    control,
    name: 'image',
  });

  useEffect(() => {
    if (id) {
      getService(id);
    }
  }, [id]);

  useEffect(() => {
    if(imageInput)
      handleFileChange(imageInput);
  }, [imageInput]);

  const handleFileChange = (files: any) => {
    const selectedFile = files[0];

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const getService = async (id: any) => {
    try {
      const response = await HttpRequestHelper().get(
        `/api/services/${id}/detail`
      );
      setValue("id", response.id);
      setValue("name", response.name);
      setValue("description", response.description);
      setValue("isActive", response.isActive);
      setValue("image", response.image);
      setPreviewUrl(`${HttpRequestHelper().baseURL}/image/service/${response.id}.png`);
    } catch (error) {
      throw error;
    }
  };

  const onsubmit = async (data: Service) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("isActive", data.isActive.toString());
    formData.append("id", data.id ? data.id.toString() : "0");

    await HttpRequestHelper()
      .postWithFile("/api/services/save", formData)
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
                Service Form
              </h3>
            </div>
          </div>
          <div className="row ">
            <div className="col-lg-6">
              <form id="Service" onSubmit={handleSubmit(onsubmit)}>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Service Name</label>
                  <input type="hidden" {...register("id")}></input>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter service name"
                    {...register("name", {
                      required: "Name service must be not empty",
                    })}
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
                    placeholder="Enter service name"
                    {...register("description", {
                      required: "Description service must be not empty",
                    })}
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
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Image</label>
                  <input
                    type="file"
                    {...register("image")}
                  />
                  {previewUrl && (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      style={{ maxWidth: "100%", maxHeight: "150px", marginTop: "15px"}}
                    />
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
                    to="/admin/services"
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

export default AddService;
