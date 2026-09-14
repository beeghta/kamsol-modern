import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home/Home";
import Services from "./pages/Services/Services";

import RealEstateAppraisal from "./pages/Services/RealEstateAppraisal";
import BuildingConditionAssessments from "./pages/Services/BuildingConditionAssessments";
import InvestmentAnalysis from "./pages/Services/InvestmentAnalysis";
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
            </Routes>

            <Footer />
        </BrowserRouter>
    );
}

export default App;