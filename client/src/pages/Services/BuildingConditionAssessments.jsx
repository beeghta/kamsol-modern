import InnerBanner from "./InnerBanner";
import BuildingConditionSection from "./BuildingConditionSection";
import BuildingTaxonomySection from "./BuildingTaxonomySection";

function Services() {
    return (
        <main>
            <InnerBanner title="Building Condition Assessments" />
            <BuildingConditionSection />
            <BuildingTaxonomySection />
        </main>
    );
}

export default Services;