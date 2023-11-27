import React, { useEffect, useState } from "react";
import leaf from "../assets/img/hero/hero-leaf-5.png";
import img1 from "../assets/img/service/img-service-page.jpg";
import HttpRequestHelper from "../utilities/HttpRequestHelper";

interface Service {
  id: number;
  name: string;
  description: string;
  image: any;
}

const ServicePage = () => {
  const [services, setService] = useState<Service[]>([]);

  useEffect(() => {
    getService();
  }, []);

  const getService = async () => {
    const services = await HttpRequestHelper().get(
      "/api/services/get-services"
    );
    setService(services);
  };

  return (
    <>
      <section className=" space">
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
              <div className="col col-xxl-auto text-center d-none d-lg-block">
                <img src={img1} alt="shape" className="mt-n4" />
              </div>
              <div className="col-md-6 col-lg-5 col-xxl-auto">
                {services.map((service, index) =>
                  index > (services.length / 2) - 1 ? (
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
    </>
  );
};

export default ServicePage;
