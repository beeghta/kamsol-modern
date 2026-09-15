import { useEffect, useState } from "react";

import serviceImage from "../../img/services.png";

import { buildingConditionServices } from "../../data/siteData";
import { fetchPublicData } from "../../api/publicApi";

function BuildingConditionSection() {

    const [services, setServices] = useState(
        buildingConditionServices
    );

    useEffect(() => {

        async function loadServices() {

            const data = await fetchPublicData(
                "/services",
                buildingConditionServices
            );

            setServices(data);
        }

        loadServices();

    }, []);

    return (
        <>
            <section className="container-fluid pt-5 pb-2">

                <span className="text-center col-lg-6 col-lg-offset-3">

                    <span className="col-lg-2 col-xs-4 middle col-lg-offset-3">
                        <hr width="90" className="hr-gold" />
                    </span>

                    <span className="col-lg-4 col-xs-5 text-gold little-title">
                        Our Services
                    </span>

                </span>

                <span className="col-lg-6 col-lg-offset-3 col-xs-12">

                    <h3 className="text-brown text-center col-lg-12 FrankRuhlLibre-Bold">

                        Building Condition{" "}

                        <span className="text-gold">
                            Assessments
                        </span>

                    </h3>

                    <p
                        className="col-lg-12 text-center font-14 m-y-2 text-dark-gray"
                        style={{ fontFamily: "Lucida Sans Unicode" }}
                    >
                        KAMSOL Elite Consultants has years of experience in
                        completing building condition assessments; in order to
                        help building owners or building users to calculate
                        their buildings deferred maintenance requirements. We
                        offer following Building Condition Assessment (BCA)
                        services:
                    </p>

                </span>

            </section>


            <section className="container pb-5">

                <div className="col-lg-4">

                    <span className="block-icon">
                        <span className="block-iconinner">
                            <i className="fa fa-home"></i>
                        </span>
                    </span>

                    <p
                        className="p-x-5 text-dark-gray"
                        style={{
                            fontStyle: "italic",
                            fontSize: "16px",
                        }}
                    >
                        {services[0]?.description}
                    </p>

                </div>


                <div className="col-lg-4 text-center">

                    <img
                        src={serviceImage}
                        width="60%"
                        className="service-logo"
                        alt="Building condition assessment"
                    />

                </div>


                <div className="col-lg-4">

                    <span className="block-icon">
                        <span className="block-iconinner">
                            <i className="fa fa-home"></i>
                        </span>
                    </span>

                    <p
                        className="p-x-5 text-dark-gray"
                        style={{
                            fontStyle: "italic",
                            fontSize: "16px",
                        }}
                    >
                        {services[1]?.description}
                    </p>

                </div>

            </section>
        </>
    );
}

export default BuildingConditionSection;