import ScrollReveal from "../../components/ScrollReveal";

function HeroSection() {
    return (
        <section className="banner" id="top">

            <div className="bannerimg"></div>

            <div className="status">
                <div className="container">

                    <div className="text-center">

                        <ScrollReveal>
                            <h2>KAMSOL Elite</h2>
                        </ScrollReveal>

                        <ScrollReveal delay={300}>
                            <h3>Consultants Inc</h3>
                        </ScrollReveal>

                        <ScrollReveal delay={800}>
                            <a
                                href="tel:+13068071133"
                                className="gold-btn mt-2"
                            >
                                Let's get started
                                <i className="fa fa-angle-right py-2"></i>
                            </a>
                        </ScrollReveal>

                    </div>

                </div>
            </div>

        </section>
    );
}

export default HeroSection;