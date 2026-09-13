function ServiceCard({ service }) {
    return (
        <div className="col-md-6">
            <div className="innerstaff">
                <h2>{service.title}</h2>

                <p>{service.category}</p>

                <p>{service.description}</p>

                <a href="#" className="gold-btn">
                    Read More
                </a>
            </div>
        </div>
    );
}

export default ServiceCard;