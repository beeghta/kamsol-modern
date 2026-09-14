import InnerBanner from "./InnerBanner";
import LifeCycleSection from "./LifeCycleSection";
import BuildingConditionSection from "./BuildingConditionSection";
import BuildingTaxonomySection from "./BuildingTaxonomySection";

function Services() {
    return (
        <main>
            <InnerBanner title="Our Services" />
            <LifeCycleSection />
            <BuildingConditionSection />
            <BuildingTaxonomySection />
        </main>
    );
}

export default Services;