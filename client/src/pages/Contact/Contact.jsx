import InnerBanner from "../Services/InnerBanner";
import ContactSection from "../../components/ContactSection";

function Contact() {
    return (
        <main>
            <InnerBanner
                title="Contact Us"
                breadcrumb="Contact Us"
            />

            <ContactSection />
        </main>
    );
}

export default Contact;