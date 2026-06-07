import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { RoomContext } from '../context/RoomContext'




const HomePagePresidential_suite = () => {
    const { roomCategories, loading } = useContext(RoomContext)
    const presidential_suite = roomCategories["Presidential Suite"]?.[0]


    return (
        <>
            <div key={presidential_suite?._id} className="col-lg-6 mb-4" data-aos="zoom-in" data-aos-delay="200">
                <div className="room-showcase-card featured">
                    <div className="room-hero-image">
                        <img
                            src={presidential_suite?.images?.[0]}
                            alt="Presidential Suite"
                            className="img-fluid"
                        />
                        <div className="room-badge">Popular Choice</div>
                        <div className="room-icons">
                            <span className="icon-item">
                                <i className="bi bi-people"></i> {presidential_suite?.capacity}
                            </span>
                            <span className="icon-item">
                                <i className="bi bi-house"></i> Suite
                            </span>
                            <span className="icon-item">
                                <i className="bi bi-star"></i> Luxury
                            </span>
                        </div>
                    </div>
                    <div className="room-info">
                        <div className="room-header">
                            <h3>Luxury Presidential Suite</h3>
                            <div className="rating">
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                            </div>
                        </div>
                        <p className="room-excerpt">
                            Experience unmatched elegance in our Luxury Presidential Suite, designed for guests who expect the finest in comfort, style, and privacy. This spacious suite features a beautifully furnished master bedroom with a king-size bed, premium linens, and panoramic city or ocean views.
                        </p>
                        <div className="room-amenities">
                            <i className="bi bi-wifi"></i>
                            <i className="bi bi-tv"></i>
                            <i className="bi bi-cup-hot"></i>
                            <i className="bi bi-snow"></i>
                            <i className="bi bi-telephone"></i>
                            <i className="bi bi-safe"></i>
                        </div>
                        <div className="room-bottom">
                            <div className="pricing-info">
                                <span className="price-tag">₹{presidential_suite?.price}</span>
                                <span className="price-label">per night</span>
                            </div>
                            <Link to={`/room-details/${presidential_suite?._id}`} className="explore-btn">
                                Book Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePagePresidential_suite