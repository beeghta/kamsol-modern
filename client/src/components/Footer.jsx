function Footer() {
    return (
        <footer>
            <section className="row">

                <div className="col-lg-4 col-12">
                    <p>HEAD OFFICE</p>

                    <ul>
                        <li>
                            <a href="tel:+13068071133">
                                +1 (306) 807-1133
                            </a>
                        </li>

                        <li>
                            Monday &ndash; Friday: 8:00am &ndash; 5:00 pm
                        </li>

                        <br />

                        <li>
                            <a href="mailto:inquiries@kamsolappraisers.com">
                                inquiries@kamsolappraisers.com
                            </a>
                        </li>
                    </ul>
                </div>


                <div className="col-lg-4 col-12">
                    <p>PAGES</p>

                    <ul>
                        <li>
                            <a href="/about">
                                ABOUT US
                            </a>
                        </li>

                        <li>
                            <a href="/services">
                                OUR SERVICES
                            </a>
                        </li>

                        <li>
                            <a href="/careers">
                                CAREERS
                            </a>
                        </li>

                        <li>
                            <a href="/professional-staff">
                                PROFESSIONAL STAFF
                            </a>
                        </li>
                    </ul>
                </div>

            </section>


            <div className="row">
                <div className="last-section col-lg-12">

                    <a href="#top">
                        <i className="fa fa-angle-up fa-5x"></i>
                    </a>

                </div>
            </div>
        </footer>
    );
}

export default Footer;