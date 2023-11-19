import { useParams } from "react-router-dom";
import HttpRequestHelper from "../utilities/HttpRequestHelper";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Service {
  id: number;
  name: string;
  description: string;
}
interface Product {
  id: number;
  name: string;
}

const ServicePage = () => {
  const { id } = useParams(); //useState, useEffect, useParams ---> hook
  const [service, setService] = useState<Service>();
  const [services, setServices] = useState<Service[]>([]);
  const [products, setProduct] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getService(id);
    getListService();
    getProducts(id);
  }, []);

  //get service
  const getService = async (id: any) => {
    try {
      const response = await HttpRequestHelper().get(
        `/api/services/${id}/detail`
      );
      setService(response);
    } catch (error) {
      throw error;
    }
  };

  //list service
  const getListService = async () => {
    const services = await HttpRequestHelper().get(
      "/api/services/get-services"
    );
    setServices(services);
  };

  // navidate detail service
  const detailService = (id: number) => {
    return navigate(`/services/${id}`);
  };

  //detailProduct
  const detailProduct = (id: number) => {
    return navigate(`/product/${id}`);
  };

  //list product
  const getProducts = async (id: any) => {
    try {
      const response = await HttpRequestHelper().get(
        `/api/product/product-by-service?id=${id}`
      );
      setProduct(response);
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <section className=" space-top space-extra-bottom">
        <div className="container">
          <div className="row flex-row-reverse gx-50">
            <div className="col-lg-8 col-xl mb-30 mb-lg-0">
              <div className="mb-30">
                <div className="mega-hover">
                  <img src="assets/img/service/s-d-1-1.jpg" alt="thumbnail" />
                </div>
              </div>
              <h2 className="text-uppercase">{service?.name}</h2>
              <p>{service?.description}.</p>
              <div className="list-style2">
                <ul className="list-unstyled">
                  {products.map((product, index) => (
                    <li key={index} onClick={() => detailProduct(product.id)}>
                      {product.name}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="row">
                <div className="col-6 mb-30">
                  <div className="mega-hover">
                    <img
                      src="assets/img/service/s-d-1-2.jpg"
                      alt="shape"
                      className="w-100"
                    />
                  </div>
                </div>
                <div className="col-6 mb-30">
                  <div className="mega-hover">
                    <img
                      src="assets/img/service/s-d-1-3.jpg"
                      alt="shape"
                      className="w-100"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-xl-auto">
              <aside>
                <div className="service-box">
                  <h3 className="box-title">All Services</h3>
                  <ul className="list-unstyled">
                    {services.map((service, index) => (
                      <li key={index} onClick={() => detailService(service.id)}>
                        {service.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicePage;
