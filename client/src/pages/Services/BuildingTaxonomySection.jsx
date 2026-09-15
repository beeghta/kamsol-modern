import { useEffect, useState } from "react";

import { buildingTaxonomyData } from "../../data/siteData";
import { fetchPublicData } from "../../api/publicApi";

function BuildingTaxonomySection() {
    const [taxonomy, setTaxonomy] = useState(
        buildingTaxonomyData
    );
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadTaxonomy() {
            const data = await fetchPublicData(
                "/building-taxonomy",
                buildingTaxonomyData
            );

            setTaxonomy(data);
        }

        loadTaxonomy();
    }, []);

    return (
        <>
            {/* Section Header */}
            <section className="taxonomy-header">
                <div className="taxonomy-heading">
                    <div className="taxonomy-label">
                        <span className="taxonomy-line"></span>
                        <span>We offer</span>
                    </div>

                    <h3>
                        Building <span>Taxonomy</span>
                    </h3>

                    <p>
                        Building taxonomy provides a systematic classification
                        of building elements and components. It helps organize
                        building information and supports the evaluation of
                        their theoretical useful life.
                    </p>
                </div>
            </section>

            {/* Taxonomy Items */}
            <section className="taxonomy-section">
                <div className="taxonomy-container">
                    {error && (
                        <p className="taxonomy-error">
                            {error}
                        </p>
                    )}

                    {!error &&
                        taxonomy.map((item) => (
                            <div
                                key={item.id}
                                className="taxonomy-item"
                            >
                                <div
                                    className="taxonomy-icon"
                                    data-code={item.code}
                                ></div>

                                <h5>
                                    {item.title.replace(
                                        "Uniformat",
                                        "UniFormat"
                                    )}
                                </h5>

                                <p>{item.description}</p>
                            </div>
                        ))}
                </div>
            </section>
        </>
    );
}

export default BuildingTaxonomySection;