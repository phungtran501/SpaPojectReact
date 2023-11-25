import treetment from "../assets/img/service/SkinTreetment.jpg";
import massage from "../assets/img/service/SpaMassage.jpg";
import icon from "../assets/img/icons/sec-bg-icon.svg";
import React, { useEffect, useState } from "react";
import HttpRequestHelper from "../utilities/HttpRequestHelper";
import icon1 from "../assets/img/icons/sr-7-4.svg";
import { useNavigate } from "react-router-dom";

interface Service {
  id: number;
  name: string;
  description: string;
  image: any;
}

function Home() {
  const [services, setService] = useState<Service[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getService();
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

  return (
    <div>
      <section className=" space-top space-extra-bottom">
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-6 col-lg-3 col-xl order-0 order-lg-0">
              <div className="about-avater">
                <div className="avater mega-hover">
                  <a href="service.html">
                    <img src={treetment} alt="Avater Image" className="img-about-us"/>
                  </a>
                </div>
                <h3 className="name h4">
                  <a href="service.html" className="text-inherit">
                    Skin Treetment
                  </a>
                </h3>
              </div>
            </div>
            <div className="col-lg-6 order-2 order-lg-1 col-xl-5 text-center">
              <div className="mb-30">
                <span className="sec-subtitle mb-4">About Us</span>
                <h2 className="sec-title">Wordclass Beauty Treentment</h2>
                <p className="mb-30 pb-lg-3">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Quis ipsum suspendisse ultrices gravida.
                </p>
                <a href="about.html" className="vs-btn style12">
                  Learn More
                </a>
              </div>
            </div>
            <div className="col-6 col-lg-3 col-xl order-1 order-lg-2">
              <div className="about-avater">
                <div className="avater mega-hover">
                  <a href="service.html">
                    <img
                      src={massage}
                      alt="Avater Image"
                      className="img-about-us"
                    />
                  </a>
                </div>
                <h3 className="name h4">
                  <a href="service.html" className="text-inherit">
                    Spa Massage
                  </a>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-light-4 space-top pb-5">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div
              className="col-md-9 col-lg-7 col-xl-6 wow fadeInUp "
              data-wow-delay="0.2s"
            >
              <div className="title-area">
                <h2 className="sec-title4">
                  Our Services <span className="inner-text">Relax Zone</span>
                </h2>
                <p className="sec-text">
                  Access to our fitness centre and pool is free to all our hotel
                  guests. For non-guests membership packages are available
                </p>
                <div className="sec-shape2">
                  <img src={icon} alt="icon" />
                </div>
              </div>
            </div>
          </div>
          <div
            className="row gx-2px gy-gx wow fadeInUp"
            data-wow-delay="0.2s"
          >
            {services.map((service, index) => (
              <div className="col-md-6 col-lg-4 col-xl-3" key={index}>
                <div className="service-style5">
                  <div className="service-icon">
                    <img src={`${HttpRequestHelper().baseURL}/image/service/${service.id}.png`} 
                      alt="icon" style={{height: "50px"}} />
                  </div>
                  <div className="service-content">
                    <h3 className="service-title h4">
                      <a className="text-inherit">{service.name}</a>
                    </h3>
                    {/* <p className="service-text">{service.description}</p> */}
                  </div>
                  <a
                    className="service-btn"
                    onClick={() => detailService(service.id)}
                  >
                    <i className="far fa-plus"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section>
        <div className="text-center space img-quote">
          <div className="d-inline-flex mb-4 pb-1">
            <div className="circle-btn style2">
              <a href="about.html" className="btn-icon">
                <i className="far fa-arrow-right"></i>
              </a>
              <div className="btn-text">
                <svg viewBox="0 0 150 150"></svg>
              </div>
            </div>
          </div>
          <h2 className="sec-title text-white text-uppercase mb-4 pb-2">
            Get a Free Quote
          </h2>
          <div className="d-inline-flex flex-wrap justify-content-center gap-3 align-items-center">
            <a href="appointment.html" className="vs-btn style7">
              appointment
            </a>
            <a href="tel:+4412589634" className="vs-btn style6">
              <i className="fal fa-headset"></i>make a call
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Home;
