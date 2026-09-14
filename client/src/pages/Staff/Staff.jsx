import { useEffect, useState } from "react";
import InnerBanner from "../Services/InnerBanner";
import StaffCard from "./StaffCard";

function Staff() {
    const [staff, setStaff] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchStaff() {
            try {
                const response = await fetch(
                    "http://localhost:3001/api/staff"
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch staff");
                }

                const data = await response.json();
                setStaff(data);
            } catch (error) {
                console.error(error);
                setError("Unable to load professional staff.");
            }
        }

        fetchStaff();
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
                        staff.map((member) => (
                            <StaffCard
                                key={member.id}
                                member={member}
                            />
                        ))}
                </div>
            </section>
        </main>
    );
}

export default Staff;