import InnerBanner from "./InnerBanner";

const appraisalItems = [
    "Buying or selling property",
    "Real Estate Foreclosure",
    "Market analysis and market rent studies",
    "Highest and best use of Real Estate",
    "Financing or refinancing property",
    "Making real estate investment decisions",
    "Reviewing property tax assessments",
    "Assessing capital gains",
    "Making a claim for insurance purposes and replacement cost",
    "Relocation valuation",
    "Determining or facing expropriation compensation",
    "Valuing property for matrimonial purposes, arbitration or other litigious matters",
    "Asset/portfolio management",
    "Business mergers, acquisitions or dissolutions involving real estate",
    "Reporting on property values to meet International Financial Reporting Standards (IFRS)",
    "Valuing machinery and equipment"
];

function RealEstateAppraisal() {
    return (
        <main>
            {/* Page Banner */}
            <InnerBanner title="Real Estate Appraisal" />


            {/* Introduction */}
            <section className="container-fluid pt-5 pb-5 bg-light">
                <div className="service-heading">
                    <div className="service-label">
                        <span className="service-line"></span>
                        <span>We offer</span>
                    </div>

                    <h3>
                        Real Estate <span>Appraisal</span>
                    </h3>

                    <p className="service-description">
                        KAMSOL Elite Consultants play an important role in the
                        real property market by providing unbiased appraisal,
                        review, consulting, and machinery and equipment
                        valuations. Opinions of market value are based on
                        comprehensive research and analysis and are critical to
                        the decision-making process of property owners,
                        businesses, investors, governments and other
                        professionals during real property portfolio planning
                        and transactions.
                    </p>

                    <p className="service-description">
                        Renovating or building, KAMSOL Elite Consultants are
                        engaged when a property owner needs an expert,
                        unbiased opinion on the value of real estate to make a
                        well-informed decision about real estate. KAMSOL Elite
                        Consultants are involved in:
                    </p>
                </div>


                {/* Appraisal Services */}
                <div className="appraisal-grid">
                    {appraisalItems.map((item, index) => (
                        <div
                            className="appraisal-item"
                            key={index}
                        >
                            <div className="appraisal-icon">
                                <i className="fa fa-home"></i>
                            </div>

                            <p>{item}</p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}

export default RealEstateAppraisal;