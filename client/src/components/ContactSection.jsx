import ContactForm from "./ContactForm";

function ContactSection() {
    return (
        <section className="contentus container-fluid">

            <div className="col-lg-5">
                <h5 className="text-brown FrankRuhlLibre-Bold text-left float-left text-uppercase m-y-2 p-x-2">
                    it is easy to find us
                </h5>

                <p className="col-lg-12 m-y-2 p-x-2">
                    Have a question? Concern? Request? We&rsquo;d love to hear from you.
                    Fill out this short form and a member of our team will get back to you
                    within 24 hours.
                    Whenever you need us, we&rsquo;re here for you.
                </p>
            </div>

            <div className="col-lg-7">
                <h5 className="text-brown FrankRuhlLibre-Bold text-left float-left text-uppercase m-y-2 p-x-2">
                    contact form
                </h5>

                <ContactForm />
            </div>

        </section>
    );
}

export default ContactSection;