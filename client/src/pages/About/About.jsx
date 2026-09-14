import InnerBanner from "../Services/InnerBanner";

function About() {
    return (
        <main>
            <InnerBanner
                title="About Us"
                breadcrumb="About Us"
            />

            <section className="container-fluid pt-5 pb-2 bg-light">
                <span className="text-center col-lg-6 col-lg-offset-3">
                    <span className="col-lg-2 col-xs-4 middle col-lg-offset-3">
                        <hr width="90" className="hr-gold" />
                    </span>

                    <span className="col-lg-4 col-xs-5 text-gold little-title">
                        We provide
                    </span>
                </span>

                <span className="col-lg-6 col-lg-offset-3 col-xs-12">
                    <h3
                        className="text-brown text-center col-lg-12 FrankRuhlLibre-Bold text-left float-left"
                        style={{ marginTop: "-10px" }}
                    >
                        Real Estate <span className="text-gold">Appraisal & </span>
                        <br />
                        Building Condition <span className="text-gold">Assessments</span>
                    </h3>

                    <p
                        className="col-lg-12 text-center font-14 mt-2 text-dark-gray"
                        style={{ fontFamily: "Lucida Sans Unicode" }}
                    >
                        KAMSOL Elite Consultants Inc is a Residential real estate
                        appraisal and consulting firm located in Regina,
                        Saskatchewan. The mission of our company is to offer
                        appraisal, review and consulting services to clients in a
                        professional and timely manner in covering all types of
                        residential appraisals. The commercial real estate
                        appraisal will be added to the company services in near
                        future.
                    </p>

                    <p
                        className="col-lg-12 text-center font-14 m-y-2 text-dark-gray"
                        style={{ fontFamily: "Lucida Sans Unicode" }}
                    >
                        The firm area of service is the Province of Saskatchewan
                        with near future’s plan to expand to the Province of
                        British Columbia.
                    </p>
                </span>
            </section>
        </main>
    );
}

export default About;