import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { homeSections } from "../../data/siteData";
import { fetchPublicData } from "../../api/publicApi";

function BuildingAssessmentSection() {
    const [content, setContent] = useState(
        homeSections["building-assessment"]
    );

    useEffect(() => {
        async function loadContent() {
            const data = await fetchPublicData(
                "/home-sections/building-assessment",
                homeSections["building-assessment"]
            );

            setContent(data);
        }

        loadContent();
    }, []);

    return (
        <div className="container-fluid bg-pic">
            <span className="col-lg-6 col-xs-12 bg-black">
                <span className="col-lg-2 col-xs-4 middle">
                    <hr width="90" className="hr-gold" />
                </span>

                <span className="col-lg-4 col-xs-5 text-gold little-title">
                    {content.eyebrow}
                </span>

                <h3 className="text-white col-lg-12 col-xs-12 FrankRuhlLibre-Bold text-left float-left">
                    {content.title}{" "}
                    <span className="text-gold">
                        {content.title_highlight}
                    </span>
                </h3>
            </span>

            <span className="col-lg-6 col-xs-12 pt-5 p-x-9 hidexs">
                <p
                    className="col-lg-12 col-xs-12 left-border-gold text-justify pl-5 font-15 text-white py-2"
                    style={{ backgroundColor: "#5b5b5b57" }}
                >
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
            </span>
        </div>
    );
}

export default BuildingAssessmentSection;