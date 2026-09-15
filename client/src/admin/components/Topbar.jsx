import { useLocation } from "react-router-dom";

function Topbar() {
    const location = useLocation();

    const pageTitles = {
        "/admin": "Dashboard",
        "/admin/home": "Home",
        "/admin/services": "Services",
        "/admin/staff": "Professional Staff",
        "/admin/careers": "Careers",
        "/admin/contact": "Contact Messages",
        "/admin/building-taxonomy": "Building Taxonomy"
    };

    const title = pageTitles[location.pathname] || "Admin";

    return (
        <header className="admin-topbar">

            <div>
                <h1>{title}</h1>
                <p>Manage your KAMSOL website</p>
            </div>

            <div className="admin-user">
                <div className="admin-avatar">
                    A
                </div>

                <div>
                    <strong>Administrator</strong>
                    <span>Admin</span>
                </div>
            </div>

        </header>
    );
}

export default Topbar;