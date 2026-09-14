import { Link } from "react-router-dom";
function InnerBanner({ title, breadcrumb }) {
    return (
        <section className="innerbanner" id="top">
            <div className="innerbannerimg"></div>

            <div className="status">
                <div className="container">
                    <div className="text-left inline-block">
                        <h4> {breadcrumb}</h4>

                        <span className="alink inlineflex">
                            <Link to="/">Home</Link>
                            <i className="fa fa-angle-double-right"></i>
                            {title}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default InnerBanner;