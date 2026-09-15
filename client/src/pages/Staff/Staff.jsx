import { useEffect, useState } from "react";
import InnerBanner from "../Services/InnerBanner";
import StaffCard from "./StaffCard";
import { staffData } from "../../data/siteData";
import { fetchPublicData } from "../../api/publicApi";

function Staff() {
    const [staff, setStaff] = useState(staffData);
    const [error, setError] = useState("");


    useEffect(() => {
        async function loadStaff() {
            const data = await fetchPublicData(
                "/staff",
                staffData
            );

            setStaff(data);
        }

        loadStaff();
    }, []);

    return (
        <main>
            <InnerBanner
                breadcrumb="Our Team"
                title="Professional Staff"
            />

            <section className="container pb-2">
                <div className="row">
                    {error && <p>{error}</p>}

                    {!error &&
                    {
                        staff.map((member) => (
                            <StaffCard
                                key={member.id}
                                member={member}
                            />
                        ))
                    }
}
                </div>
            </section>
        </main>
    );
}

export default Staff;