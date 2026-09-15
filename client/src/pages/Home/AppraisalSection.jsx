import { useEffect, useState } from "react";

import aboutHome from "../../img/about-home.png";
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
        <section className="container-fluid p-y home-appraisal">

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

                    <a
                        href={content.button_link}
                        className="btn-kamsol py-2 m-y-2"
                    >
                        {content.button_text}
                        <i className="fa fa-angle-right"></i>
                    </a>

                </div>

            </div>

            <div className="col-lg-6 p-x-2">

                <img
                    src={aboutHome}
                    width="87%"
                    alt={content.title}
                />

            </div>

        </section>
    );
}

export default AppraisalSection;