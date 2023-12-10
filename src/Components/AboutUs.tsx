import aboutus from "../assets/img/about/aboutus.jpg";

const AboutUs = () => {
  return (
    <>
      <section className=" space-top space-extra-bottom">
        <div className="container">
          <div className="row justify-content-between gx-0 ">
            <div className="col-md-10">
              <span className="sec-subtitle">welcome</span>
              <h2 className="h3 pe-xxl-5 me-xxl-5 mb-md-5 pb-xl-3">
                We think your skin should look and refshed matter Nourish your
                outer inner beauty with our essential oil infused beauty should
                products.
              </h2>
            </div>
            <div className="col-auto mb-5 mb-md-0">
              <div className="pt-1 mt-2">
                <div className="circle-btn style2">
                  <a href="service.html" className="btn-icon">
                    <i className="far fa-arrow-right"></i>
                  </a>
                  <div className="btn-text">
                    <svg viewBox="0 0 150 150">
                      <text>
                        <textPath href="#textPath">
                          to check our wellnez top rated services
                        </textPath>
                      </text>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="vs-carousel mb-30 pb-1 wow fadeInUp"
            data-wow-delay="0.2s"
            data-fade="true"
          >
            <div>
              <img src={aboutus} alt="about" className="w-100" />
            </div>
          </div>
          <p className="fs-22 font-title text-title mb-4 mb-lg-5">
            We think your skin should look and refshed matter Nourish your outer
            inner beauty with our essential infused Lorem Ipsum is simply dummy
            text of the printing and typesetting industry. Lorem Ipsum has been
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the
            leap intoun.
          </p>
          <div className="row justify-content-between">
            <div className="col-xl-4 mb-3 mb-xl-0">
              <h3 className="text-uppercase font-body mt-n1">
                DISCOVER <span className="text-theme">Wellnez</span> Service
              </h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
                velit, porro doloremque cupiditate sint, quam provident fugit
                facilis soluta eos quos ab laborum.
              </p>
            </div>
            <div
              className="col-md-6 col-xl-3 wow fadeInUp"
              data-wow-delay="0.2s"
            >
              <div className="row gx-60">
                <div className="col-auto">
                  <span className="about-number">01</span>
                </div>
                <div className="col">
                  <h4 className="fw-medium fs-26 font-body mt-n1 mb-lg-3 pb-lg-1">
                    Beauty Should Products
                  </h4>
                  <div className="list-style1">
                    <ul className="list-unstyled">
                      <li>Feature Support</li>
                      <li>Expeort Care</li>
                      <li>Brand Product</li>
                      <li>Quite Enviorment</li>
                      <li>Outstanding Look</li>
                      <li>Popular Service</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-md-6 col-xl-3 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <div className="row gx-60">
                <div className="col-auto">
                  <span className="about-number">02</span>
                </div>
                <div className="col">
                  <h4 className="fw-medium fs-26 font-body mt-n1 mb-lg-3 pb-lg-1">
                    Popular Skin Treatment
                  </h4>
                  <div className="list-style1">
                    <ul className="list-unstyled">
                      <li>Relax Mind</li>
                      <li>Face Oil Massage</li>
                      <li>Body Massage</li>
                      <li>Black Massage</li>
                      <li>Outstanding Support</li>
                      <li>Happy Customers</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
