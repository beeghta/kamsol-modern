function StaffCard({ member }) {
    return (
        <div className="col-lg-6 col-xs-12">
            <div className="col-lg-12 Professional-Staff">
                <div className="innerstaff text-justify text-dark-gray font-16">

                    <img
                        src={member.image}
                        alt={member.name}
                    />

                    <p className="text-center FrankRuhlLibre-Bold font-21 text-brown">
                        {member.name}
                    </p>

                    <p className="text-center FrankRuhlLibre font-14 text-gold pb-2">
                        {member.position}
                    </p>

                    <p className="FrankRuhlLibre-Regular">
                        {member.bio}
                    </p>

                    <div className="text-center pt-5">
                        <ul className="team-social">

                            <a
                                className="text-gray pl-2"
                                href={`mailto:${member.email}`}
                            >
                                <li>
                                    <i className="fa fa-envelope text-gold"></i>
                                </li>
                            </a>

                            <a
                                className="text-gray pl-2"
                                href={`tel:${member.phone}`}
                            >
                                <li>
                                    <i className="fa fa-phone text-gold"></i>
                                </li>
                            </a>

                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default StaffCard;