function StatCard({ title, value, icon }) {
    return (
        <div className="admin-stat-card">

            <div className="admin-stat-icon">
                <i className={`fa ${icon}`}></i>
            </div>

            <div>
                <span>{title}</span>
                <strong>{value}</strong>
            </div>

        </div>
    );
}

export default StatCard;