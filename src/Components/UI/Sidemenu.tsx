function Sidemenu ()  {

    return (
        <div>
                    <div className="sidemenu-content">
            <button className="closeButton sideMenuCls"><i className="far fa-times"></i></button>
            <div className="widget  ">
                <div className="footer-logo">
                    <img src="assets/img/logo.svg" alt="logo"/>
                </div>
                <div className="info-media1">
                    <div className="media-icon"><i className="fal fa-map-marker-alt"></i></div>
                    <span className="media-label">Centerl Park West La, New York</span>
                </div>
            </div>
            <div className="widget  ">
                <h3 className="widget_title">Latest post</h3>
                <div className="recent-post-wrap">
                    <div className="recent-post">
                        <div className="media-img">
                            <a href="blog-details.html"><img src="assets/img/widget/recent-post-1-1.jpg" alt="Blog Image"/></a>
                        </div>
                        <div className="media-body">
                            <h4 className="post-title"><a className="text-inherit" href="blog-details.html">Skinscent Experience Oskarsson</a></h4>
                            <div className="recent-post-meta">
                                <a href="blog.html"><i className="fas fa-calendar-alt"></i>march 10, 2023</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Sidemenu