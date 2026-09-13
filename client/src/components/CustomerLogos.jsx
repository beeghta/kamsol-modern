import { useEffect, useState } from "react";

import bmoLogo from "../img/Logos/bmo-blue-pride.svg";
import rbcLogo from "../img/Logos/rbc-logo-shield.svg";
import tdLogo from "../img/Logos/Toronto-Dominion_Bank_logo.svg.png";
import fctLogo from "../img/Logos/fct-logo-white.svg";
import fnfLogo from "../img/Logos/fnf-canada-logo-e1575050093678.png";
import rpsLogo from "../img/Logos/logo-rps-en.png";
import solidifiLogo from "../img/Logos/solidifi.svg";
import cq5damLogo from "../img/Logos/cq5dam.jpg";
import logoV1 from "../img/Logos/logo_V1.png";

function CustomerLogos() {
    const logos = [
        { name: "BMO", image: bmoLogo },
        { name: "RBC", image: rbcLogo },
        { name: "TD", image: tdLogo },
        { name: "FCT", image: fctLogo },
        { name: "FNF", image: fnfLogo },
        { name: "RPS", image: rpsLogo },
        { name: "Solidifi", image: solidifiLogo },
        { name: "Customer", image: cq5damLogo },
        { name: "Customer", image: logoV1 }
    ];

    return (
        <div className="customer-logos">
            <div className="customer-logos-track">

                {logos.map((logo, index) => (
                    <div className="customer-logo" key={`first-${index}`}>
                        <img
                            src={logo.image}
                            alt={logo.name}
                        />
                    </div>
                ))}

                {logos.map((logo, index) => (
                    <div className="customer-logo" key={`second-${index}`}>
                        <img
                            src={logo.image}
                            alt={logo.name}
                        />
                    </div>
                ))}

            </div>
        </div>
    );
}

export default CustomerLogos;