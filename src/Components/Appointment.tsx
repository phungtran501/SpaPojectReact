import img1 from "../assets/img/shape/leaf-1-5.png";
import img2 from "../assets/img/shape/b-s-1-3.png";
import img3 from "../assets/img/shape/b-s-1-2.png";

const Appointment = () => {
  return (
    <>
      <section className="bg-light-3 space shape-mockup-wrap">
        <div className="shape-mockup jump-img d-none d-xxl-block" data-right="4%" data-top="10%" style={{paddingLeft: "1260px"}}>
          <img src={img1} alt="shape" />
        </div>
        <div className="shape-mockup jump-reverse-img d-none d-xxl-block" data-left="0" data-bottom="4%">
          <img src={img3} alt="shape" />
        </div>
        <div className="container">
          <div className="row gx-60">
            <div className="col-xl-5 mb-40 mb-xl-0 pb-20 pb-xl-0 wow fadeInUp" data-wow-delay="0.2s">
              <form action="#" className="form-style2">
                <h2 className="form-title">Book Appointment</h2>
                <p className="form-label">Today For Free</p>
                <div className="form-group">
                  <input type="text" placeholder="Your Name" />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Email Address" />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control date-pick"
                    placeholder="Select Date"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control time-pick"
                    placeholder="Select Time"
                  />
                </div>
                <div className="form-group">
                  <button className="vs-btn" type="submit">
                    Make Appointment
                  </button>
                </div>
              </form>
            </div>
            <div className="col-xl-7 wow fadeInUp" data-wow-delay="0.3s">
              <div className="row">
                <div className="col-12 mb-5">
                  <h2 className="h3 mb-4 mt-n2">
                    Get Expert Health Consultation
                  </h2>
                  <p className="fs-md font-title mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat
                    xcepteur sint occaecat cupidatat non proident, sunt in culpa
                    qui officia deserunt mollit.
                  </p>
                  <div className="row gy-2">
                    <div className="col-auto">
                      <p className="vs-info">
                        <i className="fal fa-envelope"></i>
                        <a
                          href="mailto:example@info.com"
                          className="text-inherit"
                        >
                          example@info.com
                        </a>
                      </p>
                    </div>
                    <div className="col-auto">
                      <p className="vs-info">
                        <i className="fal fa-phone-alt"></i>
                        <a href="tel:+441233456789" className="text-inherit">
                          +441233456789
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-7 mb-30">
                  <img
                    src="assets/img/about/appoin-1-2.jpg"
                    alt="about"
                    className="w-100"
                  />
                </div>
                <div className="col-md-5 mb-30">
                  <img
                    src="assets/img/about/appoin-1-1.jpg"
                    alt="about"
                    className="w-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Appointment;
