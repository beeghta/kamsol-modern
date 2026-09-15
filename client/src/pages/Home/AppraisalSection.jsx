import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { homeSections } from "../../data/siteData";
import { fetchPublicData } from "../../api/publicApi";

function AppraisalSection() {
    const [content, setContent] = useState(homeSections.appraisal);

    useEffect(() => {
        async function loadContent() {
            const data = await fetchPublicData(
                "/home-sections/appraisal",
                homeSections.appraisal
            );

            setContent(data);
        }

        loadContent();
    }, []);

    return (
        <div
            className="container-fluid p-y"
            style={{ backgroundColor: "#1e1d1d" }}
        >
            <div className="col-lg-6 bg-black">
                <span className="col-lg-2 col-xs-4 middle">
                    <hr width="90" className="hr-gold" />
                </span>

                <span className="col-lg-3 col-xs-8 text-gold little-title">
                    {content.eyebrow}
                </span>

                <h2 className="text-white col-lg-12 col-xs-12 FrankRuhlLibre-Bold text-left float-left pb-5">
                    {content.title}{" "}
                    <span className="text-gold">
                        {content.title_highlight}
                    </span>
                </h2>

                <p className="col-lg-12 col-xs-12 left-border-gold text-justify pl-5 pr-5 font-14 text-white">
                    {content.description}
                </p>

                <div className="col-lg-12 col-xs-7 pt-5">
                    <Link
                        to={content.button_link}
                        className="btn-kamsol py-2 m-y-2"
                    >
                        {content.button_text}
                        <i className="fa fa-angle-right"></i>
                    </Link>
                </div>
            </div>

            <div className="col-lg-6 p-x-2">
                <img
                    src="/images/about-home.png"
                    width="87%"
                    alt="Kamsol Real Estate Appraisal"
                />
            </div>
        </div>
    );
}

export default AppraisalSection;