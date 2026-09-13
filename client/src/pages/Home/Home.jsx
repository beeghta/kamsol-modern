import HeroSection from "./HeroSection";
import AppraisalSection from "./AppraisalSection";
import BuildingAssessmentSection from "./BuildingAssessmentSection";
import ServicesSection from "./ServicesSection";
import CTASection from "./CTASection";
import ContactSection from "../../components/ContactSection";

function Home() {
    return (
        <main>
            <HeroSection />
            <AppraisalSection />
            <BuildingAssessmentSection />
            <ServicesSection />
            <CTASection />
            <ContactSection />
            

        </main>
    );
}

export default Home;