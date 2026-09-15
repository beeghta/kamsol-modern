import { useEffect, useState } from "react";

import CustomerLogos from "../../components/CustomerLogos";
import { homeSections } from "../../data/siteData";
import { fetchPublicData } from "../../api/publicApi";

function ServicesSection() {

    const [content, setContent] = useState(homeSections.services);

    useEffect(() => {

        async function loadContent() {

            const data = await fetchPublicData(
                "/home-sections/services",
                homeSections.services
            );

            setContent(data);
        }

        loadContent();

    }, []);

    return (
        <section className="container-fluid bg-white p-y">

            <span className="text-center col-lg-6 col-lg-offset-3">

                <span className="col-lg-2 col-xs-4 middle col-lg-offset-3">
                    <hr width="90" className="hr-gold" />
                </span>

                <span className="col-lg-4 col-xs-5 text-gold little-title">
                    {content.eyebrow}
                </span>

            </span>

            <span className="col-lg-6 col-lg-offset-3 col-xs-12">

                <h3 className="text-brown text-center col-lg-12 FrankRuhlLibre-Bold h3top">

                    {content.title}{" "}

                    <span className="text-gold">
                        {content.title_highlight}
                    </span>

                </h3>

                <p className="col-lg-12 text-center font-14 m-y-2 text-dark-gray">
                    {content.description}
                </p>

            </span>

            <div className="col-lg-12">

                <CustomerLogos />

            </div>

        </section>
    );
}

export default ServicesSection;