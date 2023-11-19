function Login() {
  return (
    <>
      <section className="space">
        <div className="container">
          <div className="row gx-70">
            <div
              className="col-lg-6 mb-40 mb-lg-0 wow fadeInUp login-left"
              data-wow-delay="0.2s"
            >
              <div className="text-center text-lg-start">
                <h2 className="sec-title3 h1 text-uppercase mb-xxl-2 pb-xxl-1">
                  Login
                </h2>
              </div>
              <form
                action="mail.php"
                method="POST"
                className="ajax-contact form-style6"
              >
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Username"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                  />
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

export default Login;
