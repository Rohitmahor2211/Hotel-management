import React, { useContext } from 'react'
import { RoomContext } from '../context/RoomContext'
import { Link } from 'react-router-dom'


const HomaPageMultipleRooms = () => {

    const { roomCategories } = useContext(RoomContext)

    const standard_room = roomCategories["Standard Room"]?.[0]
    const deluxe_room = roomCategories["Deluxe Room"]?.[0]
    const twin_room = roomCategories["Twin Room"]?.[0]
    const junior_suite = roomCategories["Junior Suite"]?.[0]

    return (
        <>
            {[
                { id: standard_room?._id, title: standard_room?.title, img: standard_room?.images?.[0], price: `₹${standard_room?.price}` },
                { id: deluxe_room?._id, title: deluxe_room?.title, img: deluxe_room?.images?.[0], price: `₹${deluxe_room?.price}` },
                { id: twin_room?._id, title: twin_room?.title, img: twin_room?.images?.[0], price: `₹${twin_room?.price}` },
                { id: junior_suite?._id, title: junior_suite?.title, img: junior_suite?.images?.[0], price: `₹${junior_suite?.price}` }
            ].map((m, i) => (
                <div key={m.id || i} className="col-lg-3 col-md-6 mb-4" data-aos="fade-up" data-aos-delay={400 + i * 50}>
                    <div className="room-showcase-card mini">
                        <div className="mini-image">
                            <Link to={`/room-details/${m.id}`}>
                                <img
                                    src={`${m.img}`}
                                    alt={m.title}
                                    className="img-fluid"
                                />
                                <div className="mini-overlay">
                                    <i className="bi bi-arrow-right"></i>
                                </div>
                            </Link>
                        </div>
                        <div className="mini-content">
                            <h5>{m.title}</h5>
                            <div className="mini-price">
                                {m.price}
                                <span>/night</span>
                            </div>
                            <div className="mini-amenities">
                                <i className="bi bi-wifi"></i>
                                <i className="bi bi-tv"></i>
                                <i className="bi bi-telephone"></i>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default HomaPageMultipleRooms