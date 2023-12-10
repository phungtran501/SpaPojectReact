import React, { useEffect, useState } from "react";
import leaf from "../assets/img/hero/hero-leaf-5.png";
import img1 from "../assets/img/service/img-service-page.jpg";
import HttpRequestHelper from "../utilities/HttpRequestHelper";
import { useNavigate } from "react-router-dom";
import img2 from "../assets/img/shape/price-shape-2.png";
import img3 from "../assets/img/shape/sec-shape-1.png";

interface Service {
  id: number;
  name: string;
  description: string;
  image: any;
}

interface Plan {
  id: number;
  planName: string;
  price: number;
  product?: PlanDetail[];
}

interface PlanDetail {
  productName: string;
}

const ServicePage = () => {
  const [services, setService] = useState<Service[]>([]);
  const navigate = useNavigate();
  const [plans, setPlan] = useState<Plan[]>([]);
  

  useEffect(() => {
    getService();
    getPlanDetail();
  }, []);

  const detailService = (id: number) => {
    return navigate(`/services/${id}`);
  };

  const getService = async () => {
    const services = await HttpRequestHelper().get(
      "/api/services/get-services"
    );
    setService(services);
  };

  const bookAppointment = (id: number) => {
    return navigate(`/appointment/${id}`);
  };

  const getPlanDetail = async () => {
    const plans = await HttpRequestHelper().get("/api/plan/get-plan-detail");
    setPlan(plans);
  };

  return (
    <>
      <section className=" space pb-3">
        <div className="title-area text-center">
          <span className="sec-subtitle">organizers</span>
          <h2 className="sec-title">Expert Organizers</h2>
        </div>
        <div className="service-inner1">
          <div
            className="shape-mockup jump d-none d-xxl-block"
            data-top="-10%"
            data-right="0"
          >
            <img src={leaf} alt="shape" />
          </div>
          <div className="container-xl">
            <div className="row justify-content-between align-items-center">
              <div className="col-md-6 col-lg-5 col-xxl-auto">
                {services.map((service, index) =>
                  index <= services.length / 2 - 1 ? (
                    <div className="service-style1 reverse" key={index}>
                      <div className="vs-icon">
                        <img
                          src={`${HttpRequestHelper().baseURL}/image/service/${
                            service.id
                          }.png`}
                          alt="icon"
                        />
                      </div>
                      <div className="service-content">
                        <h3 className="service-title">
                          <a
                            href="#"
                            className="text-inherit"
                            onClick={() => detailService(service.id)}
                          >
                            {service.name}
                          </a>
                        </h3>
                        <p className="service-text">{service.description}</p>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )
                )}
              </div>
              <div className="col col-xxl-auto text-center d-none d-lg-block">
                <img src={img1} alt="shape" className="mt-n4" />
              </div>
              <div className="col-md-6 col-lg-5 col-xxl-auto">
                {services.map((service, index) =>
                  index > services.length / 2 - 1 ? (
                    <div className="service-style1 reverse" key={index}>
                      <div className="vs-icon">
                        <img
                          src={`${HttpRequestHelper().baseURL}/image/service/${
                            service.id
                          }.png`}
                          alt="icon"
                        />
                      </div>
                      <div className="service-content">
                        <h3 className="service-title">
                          <a
                            href="service-details.html"
                            className="text-inherit"
                          >
                            {service.name}
                          </a>
                        </h3>
                        <p className="service-text">{service.description}</p>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className=" space-top space-extra-bottom pb-3 background-image-service-page">
        <div className="container">
          <div
            className="title-area text-center wow fadeInUp"
            data-wow-delay="0.2s"
          >
            <span className="sec-subtitle">andfaison pricing</span>
            <h2 className="sec-title">Our Exclusive Plan</h2>
            <div className="sec-shape">
              <img src={img3} alt="shape" />
            </div>
          </div>
          <div
            className="row vs-carousel wow fadeInUp"
            data-wow-delay="0.3s"
            data-slide-show="3"
            data-lg-slide-show="2"
            data-md-slide-show="2"
          >
            {plans.map((plan, index) => (
              <div className="col-xl-4" key={index}>
                <div className="package-style1">
                  <div className="package-top">
                    <div className="package-left">
                      <p className="package-price">
                        {plan.price}
                        <span className="currency">$</span>
                      </p>
                      <p className="package-duration">Billed Monthly</p>
                    </div>
                    <h3 className="package-name">{plan.planName}</h3>
                  </div>
                  <div className="package-shape">
                    <img src={img2} alt="shape" />
                  </div>
                  <div className="package-list">
                    <ul className="list-unstyled">
                      {plan?.product?.map((value, index) => (
                        <li key={index}>{value.productName}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="package-btn">
                    <a
                      href="#"
                      className="vs-btn style3"
                      onClick={() => bookAppointment(plan.id)}
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicePage;
