import { useState } from "react";
import kamsolLogo from "../img/KAMSOL.jpg";
import { Link } from "react-router-dom";
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
                    <Link to="/">Home</Link>
                </li>

                <li>
                    <Link to="/about">About Us</Link>
                </li>

                <li className="mega-drop-down">
                    <Link to="/services">Our Services</Link>

                    <div className="animated fadeIn mega-menu">
                        <div className="mega-menu-wrap">
                            <div className="col-lg-12">
                                <ul className="stander">
                                    <li>
                                        <Link className="link" to="/services/real-estate-appraisal">Real Estate Appraisal</Link>
                                    </li>

                                    <li>
                                        <Link className="link" to="/services/building-condition-assessments">Building Condition Assessments</Link>
                                    </li>

                                    <li>
                                        <Link className="link" to="/services/investment-analysis">Real Estate Investment Analysis,
                                            Proforma, and Sensitivity Analysis</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </li>

                <li>
                    <Link to="/careers">Careers</Link>
                </li>

                <li>
                    <Link to="/contact">Contact Us</Link>
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
                    <Link to="/professional-staff">Professional Staff</Link>
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