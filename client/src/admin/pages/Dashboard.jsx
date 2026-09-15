import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";

function Dashboard() {
    const [stats, setStats] = useState({
        staff: 0,
        services: 0,
        careers: 0,
        messages: 0,
        taxonomy: 0
    });

    useEffect(() => {
        async function loadStats() {
            try {
                const [
                    staffResponse,
                    servicesResponse,
                    careersResponse,
                    messagesResponse,
                    taxonomyResponse
                ] = await Promise.all([
                    fetch("http://localhost:3001/api/staff"),
                    fetch("http://localhost:3001/api/services"),
                    fetch("http://localhost:3001/api/careers"),
                    fetch("http://localhost:3001/api/contact"),
                    fetch("http://localhost:3001/api/building-taxonomy")
                ]);

                const [
                    staff,
                    services,
                    careers,
                    messages,
                    taxonomy
                ] = await Promise.all([
                    staffResponse.json(),
                    servicesResponse.json(),
                    careersResponse.json(),
                    messagesResponse.json(),
                    taxonomyResponse.json()
                ]);

                setStats({
                    staff: staff.length,
                    services: services.length,
                    careers: careers.length,
                    messages: messages.length,
                    taxonomy: taxonomy.length
                });

            } catch (error) {
                console.error("Failed to load dashboard:", error);
            }
        }

        loadStats();
    }, []);

    return (
        <div>

            <div className="admin-page-header">
                <div>
                    <h2>Welcome back, Admin</h2>
                    <p>
                        Manage your website content from one place.
                    </p>
                </div>
            </div>

            <div className="admin-stats">

                <StatCard
                    title="Professional Staff"
                    value={stats.staff}
                    icon="fa-users"
                />

                <StatCard
                    title="Services"
                    value={stats.services}
                    icon="fa-cogs"
                />

                <StatCard
                    title="Career Postings"
                    value={stats.careers}
                    icon="fa-briefcase"
                />

                <StatCard
                    title="Messages"
                    value={stats.messages}
                    icon="fa-envelope"
                />

                <StatCard
                    title="Taxonomy Items"
                    value={stats.taxonomy}
                    icon="fa-building"
                />

            </div>

        </div>
    );
}

export default Dashboard;