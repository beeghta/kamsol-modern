import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
    }

    return (
        <aside className="admin-sidebar">

            <div className="admin-logo">
                <div className="admin-logo-main">
                    KAMSOL
                </div>

                <div className="admin-logo-sub">
                    ELITE CONSULTANTS
                </div>
            </div>

            <nav className="admin-nav">

                <NavLink to="/admin" end>
                    <i className="fa fa-dashboard"></i>
                    Dashboard
                </NavLink>

                <div className="admin-nav-label">
                    CONTENT
                </div>

                <NavLink to="/admin/home">
                    <i className="fa fa-home"></i>
                    Home
                </NavLink>

                <NavLink to="/admin/services">
                    <i className="fa fa-cogs"></i>
                    Services
                </NavLink>

                <NavLink to="/admin/staff">
                    <i className="fa fa-users"></i>
                    Professional Staff
                </NavLink>

                <NavLink to="/admin/careers">
                    <i className="fa fa-briefcase"></i>
                    Careers
                </NavLink>

                <NavLink to="/admin/building-taxonomy">
                    <i className="fa fa-building"></i>
                    Building Taxonomy
                </NavLink>

                <div className="admin-nav-label">
                    MESSAGES
                </div>

                <NavLink to="/admin/contact">
                    <i className="fa fa-envelope"></i>
                    Contact Messages
                </NavLink>

                <div className="admin-nav-label">
                    SYSTEM
                </div>

                <button
                    type="button"
                    className="admin-logout"
                    onClick={handleLogout}
                >
                    <i className="fa fa-sign-out"></i>
                    Logout
                </button>

            </nav>

        </aside>
    );
}

export default Sidebar;