import { useEffect, useState } from "react";
import InnerBanner from "../Services/InnerBanner";

function Careers() {
    const [career, setCareer] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchCareer() {
            try {
                const response = await fetch(
                    "http://localhost:3001/api/careers"
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch career");
                }

                const data = await response.json();

                if (data.length > 0) {
                    setCareer(data[0]);
                }
            } catch (error) {
                console.error(error);
                setError("Unable to load career information.");
            }
        }

        fetchCareer();
    }, []);

    return (
        <main>
            <InnerBanner
                title="Careers"
                breadcrumb="Careers"
            />

            {/* ثابت */}
            <section className="container pb-2 pt-5">

                <div className="service-heading">
                    <div className="service-label">
                        <span className="service-line"></span>
                        <span>Careers</span>
                    </div>

                    <h3>
                        We're <span>Hiring</span>
                    </h3>
                </div>

                {error && (
                    <p className="text-center text-danger">
                        {error}
                    </p>
                )}

                {!error && !career && (
                    <p className="text-center">
                        Loading...
                    </p>
                )}

                {career && (
                    <>
                        {/* اطلاعات آگهی */}
                        <div className="py-4">
                            <div className="row">

                                <h5 className="text-brown col-lg-12 FrankRuhlLibre-Bold">
                                    {career.title}
                                </h5>

                                <div className="col-lg-5 left-border-gold text-justify pl-5 font-14 m-y-2 text-dark-gray">

                                    <p>
                                        Contact Name: {career.contact_name}
                                    </p>

                                    <p>
                                        Posted:{" "}
                                        {career.posted_date?.slice(0, 10)}
                                    </p>

                                    <p>
                                        Member type: {career.member_type}
                                    </p>

                                    <p>
                                        Employment type:{" "}
                                        {career.employment_type}
                                    </p>

                                    <p>
                                        Travel: {career.travel}
                                    </p>

                                    <p>
                                        Closing Date:{" "}
                                        {career.closing_date?.slice(0, 10)}
                                    </p>

                                    <p>
                                        Website:{" "}
                                        <a
                                            href={career.website}
                                            className="text-gold"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {career.website}
                                        </a>
                                    </p>

                                    <p>
                                        Contact City:{" "}
                                        {career.contact_city}
                                    </p>

                                    <p>
                                        Contact Province:{" "}
                                        {career.contact_province}
                                    </p>

                                    <p>
                                        Contact Email:{" "}
                                        <a
                                            href={`mailto:${career.contact_email}`}
                                            className="text-gold"
                                        >
                                            {career.contact_email}
                                        </a>
                                    </p>

                                </div>

                                {/* Job Description */}
                                <div className="col-lg-6 left-border-gold text-justify pl-5 font-14 m-y-2 text-dark-gray bg-light p-y p-x-5">

                                    <h4 className="pb-2">
                                        Job Description
                                    </h4>

                                    <p>
                                        {career.job_description}
                                    </p>

                                </div>

                            </div>
                        </div>

                        {/* Apply Now */}
                        <div className="row text-center">

                            <div className="col-lg-12 col-xs-12">

                                <a
                                    href={`mailto:${career.contact_email}`}
                                    className="btn-kamsol"
                                >
                                    Apply Now
                                    <i className="fa fa-angle-right"></i>
                                </a>

                            </div>

                        </div>

                        {/* Competencies */}
                        <div className="row">

                            <div className="col-lg-12 left-border-gold text-justify pl-5 font-14 m-y-2 text-dark-gray pt-2">

                                <h4 className="pb-2">
                                    Competencies and other requirements
                                </h4>

                                <ul>
                                    {career.competencies?.map((item) => (
                                        <li
                                            key={item.id}
                                            className="col-lg-12"
                                        >
                                            <i className="fa fa-circle text-gold iwi"></i>

                                            <span className="text-dark-gray pl-2">
                                                {item.content}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                            </div>

                        </div>

                        {/* Job Tasks */}
                        <div className="row">

                            <div className="col-lg-6 left-border-gold text-justify pl-5 font-14 m-y-2 text-dark-gray p-y bg-light">

                                <h4 className="pb-2">
                                    Job Tasks
                                </h4>

                                <ul>
                                    {career.tasks?.map((item) => (
                                        <li
                                            key={item.id}
                                            className="col-lg-12"
                                        >
                                            <i className="fa fa-circle text-gold iwi"></i>

                                            <span className="text-dark-gray pl-2">
                                                {item.content}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                            </div>

                        </div>
                    </>
                )}

            </section>

            {/* ثابت */}
            <section className="container-fluid bg-gold p-x-5 p-y">

                <div className="row">

                    <h3 className="text-brown FrankRuhlLibre-Bold col-lg-6 col-xs-12">
                        Please forward resumes to company email.
                    </h3>

                    <h6 className="FrankRuhlLibre-Bold col-lg-6 col-xs-12 p-y inlineflex">

                        <i className="fa fa-envelope text-brown"></i>

                        <a
                            href="mailto:inquiries@kamsolappraisers.com"
                            className="text-white"
                        >
                            inquiries@kamsolappraisers.com
                        </a>

                    </h6>

                </div>

            </section>
        </main>
    );
}

export default Careers;