import InnerBanner from "./InnerBanner";

function InvestmentAnalysis() {
    return (
        <main>
            {/* Page Banner */}
            <InnerBanner title="Investment Analysis" />


            {/* Introduction */}
            <section className="container-fluid pt-5 pb-2 bg-light">
                <div className="service-heading">
                    <div className="service-label">
                        <span className="service-line"></span>
                        <span>Our Services</span>
                    </div>

                    <h3>
                        WHAT WE <span>DO</span>
                    </h3>

                    <p className="service-subtitle">
                        Real Estate Investment Analysis, Proforma, and
                        Sensitivity Analysis
                    </p>

                    <p className="service-description">
                        A prudent real estate investor completes an investment
                        analysis to examine a specific rental or income-producing
                        property's financial and operational performance, based
                        upon unique requirements of the investor, in order to
                        make the most sensible real estate investment decision.
                        At KAMSOL we provide highest quality investment analysis
                        and recommendations to our clients.
                    </p>
                </div>
            </section>


            {/* Investment Analysis */}
            <section className="container-fluid pt-5 pb-2">
                <div className="service-heading">
                    <div className="service-label">
                        <span className="service-line"></span>
                        <span>We offer</span>
                    </div>

                    <h3>
                        Investment <span>Analysis</span>
                    </h3>

                    <p className="service-description">
                        Investment analysis involves researching and evaluating
                        an investment opportunity to predict its future
                        performance and determine its suitability to a specific
                        investor&rsquo;s need.
                    </p>
                </div>
            </section>


            {/* Proforma Analysis */}
            <section className="container-fluid pt-5 pb-2 bg-gray">
                <div className="service-heading">
                    <div className="service-label">
                        <span className="service-line"></span>
                        <span>We offer</span>
                    </div>

                    <h3>
                        Proforma <span>Analysis</span>
                    </h3>

                    <p className="service-description">
                        Proforma Analysis is an analytical projection of the
                        potential financial position of an investment based on
                        a review of historical information, actual income,
                        market indices and operating expenses. The result will
                        be analysis of liabilities and cost of borrowing,
                        revenue projections of the business, and before-tax and
                        after-tax cash flows and income, by using realistic
                        market data and assumptions.
                    </p>
                </div>
            </section>


            {/* Sensitivity Analysis */}
            <section className="container-fluid pt-5 pb-2">
                <div className="service-heading">
                    <div className="service-label">
                        <span className="service-line"></span>
                        <span>We offer</span>
                    </div>

                    <h3>
                        Sensitivity <span>Analysis</span>
                    </h3>

                    <p className="service-description">
                        Sensitivity analysis involves changing one variable at
                        a time over a possible range of outcomes to evaluate
                        the effect of that change in financial modeling, under
                        certain specific conditions, for instance impact of
                        market volatility of mortgage interest rates on the
                        investment outcomes, based on investment horizon.
                    </p>
                </div>
            </section>
        </main>
    );
}

export default InvestmentAnalysis;