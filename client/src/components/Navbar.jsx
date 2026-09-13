import { useState } from "react";
import kamsolLogo from "../img/KAMSOL.jpg";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="navbar-top">
            <ul className={`exo-menu ${menuOpen ? "display" : ""}`}>

                <li className="logo">
                    <img
                        src={kamsolLogo}
                        width="100"
                        alt="Kamsol"
                    />
                </li>

                <li>
                    <a href="/">Home</a>
                </li>

                <li>
                    <a href="/about">About Us</a>
                </li>

                <li className="mega-drop-down">
                    <a href="#">Our Services</a>

                    <div className="animated fadeIn mega-menu">
                        <div className="mega-menu-wrap">
                            <div className="col-lg-12">
                                <ul className="stander">
                                    <li>
                                        <a
                                            className="link"
                                            href="/services/real-estate-appraisal"
                                        >
                                            Real Estate Appraisal
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            className="link"
                                            href="/services/building-condition-assessments"
                                        >
                                            Building Condition Assessments
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            className="link"
                                            href="/services/investment-analysis"
                                        >
                                            Real Estate Investment Analysis,
                                            Proforma, and Sensitivity Analysis
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </li>

                <li>
                    <a href="/careers">Careers</a>
                </li>

                <li>
                    <a href="/contact">Contact Us</a>
                </li>

                <li className="images-drop-down">
                    <a href="tel:+13068071133" className="Lotus">
                        <span className="circle-phone">
                            <i className="fa fa-phone"></i>
                        </span>
                        +1 (306) 807-1133
                    </a>
                </li>

                <li>
                    <a href="/professional-staff">
                        Professional Staff
                    </a>
                </li>

                <a
                    href="#"
                    className="toggle-menu visible-xs-block"
                    onClick={(event) => {
                        event.preventDefault();
                        setMenuOpen(!menuOpen);
                    }}
                >
                    |||
                </a>

            </ul>
        </nav>
    );
}

export default Navbar;