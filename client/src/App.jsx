import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from "./pages/Contact/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./pages/About/About";
import Home from "./pages/Home/Home";
import Services from "./pages/Services/Services";
import RealEstateAppraisal from "./pages/Services/RealEstateAppraisal";
import BuildingConditionAssessments from "./pages/Services/BuildingConditionAssessments";
import InvestmentAnalysis from "./pages/Services/InvestmentAnalysis";
import Staff from "./pages/Staff/Staff";
import Careers from "./pages/Careers/Careers";

function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route
                    path="/services/real-estate-appraisal"
                    element={<RealEstateAppraisal />}
                />
                <Route
                    path="/services/building-condition-assessments"
                    element={<BuildingConditionAssessments />}
                />
                <Route
                    path="/services/investment-analysis"
                    element={<InvestmentAnalysis />}
                />
                <Route
                    path="/professional-staff"
                    element={<Staff />}
                />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/careers" element={<Careers />} />
            </Routes>

            <Footer />
        </BrowserRouter>
    );
}

export default App;