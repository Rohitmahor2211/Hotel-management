import React, { useContext } from 'react'
import { RoomContext } from '../context/RoomContext'
import { Link } from 'react-router-dom'
import { id } from 'zod/v4/locales'

const HomePageBusiness_suites = () => {

    const { roomCategories, loading } = useContext(RoomContext)

    const business_executive_suite = roomCategories["Executive Business Suite"]?.[0]
    const executive_suite = roomCategories["Executive Suite"]?.[0]
    const family_room = roomCategories["Family Room"]?.[0]


    return (
        <>
            <div className="col-lg-6">
                <div className="row" >
                    {[
                        {
                            id: business_executive_suite?._id,
                            img: business_executive_suite?.images?.[0],
                            alt: 'Executive Suite',
                            title: business_executive_suite?.title,
                            text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
                            f1: { icon: 'bi-briefcase', text: 'Work Desk' },
                            f2: { icon: 'bi-building', text: 'City View' },
                            price: `₹ ${business_executive_suite?.price}`
                        },
                        {
                            id: executive_suite?._id,
                            img: executive_suite?.images?.[0],
                            alt: 'Ocean View',
                            title: executive_suite?.title,
                            text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.',
                            f1: { icon: 'bi-water', text: 'Ocean View' },
                            f2: { icon: 'bi-tree', text: 'Balcony' },
                            price: `₹ ${executive_suite?.price}`
                        },
                        {
                            id: family_room?._id,
                            img: family_room?.images?.[0],
                            alt: 'Family Room',
                            title: family_room?.title,
                            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
                            f1: { icon: 'bi-door-open', text: 'Connected' },
                            f2: { icon: 'bi-controller', text: 'Entertainment' },
                            price: `₹ ${family_room?.price}`
                        }
                    ].map((c, idx) => (
                        <div
                            key={c.id || idx}
                            className="col-12 mb-4"
                            data-aos="slide-left"
                            data-aos-delay={250 + idx * 50}
                        >
                            <div className="room-showcase-card compact" >
                                <Link to={`/room-details/${c.id}`}>
                                    <div className="compact-image">
                                        <img
                                            src={`${c.img}`}
                                            alt={c.alt}
                                            className="img-fluid"
                                        />
                                        <div className="quick-view">
                                            <i className="bi bi-eye"></i>
                                        </div>
                                    </div>
                                </Link>
                                <div className="compact-content">
                                    <h4>{c.title}</h4>
                                    <p>{c.text}</p>
                                    <div className="compact-features">
                                        <span>
                                            <i className={`bi ${c.f1.icon}`}></i> {c.f1.text}
                                        </span>
                                        <span>
                                            <i className={`bi ${c.f2.icon}`}></i> {c.f2.text}
                                        </span>
                                    </div>
                                    <div className="compact-bottom">
                                        <span className="compact-price">
                                            {c.price}
                                            <small>/night</small>
                                        </span>
                                        <Link to={`/room-details/${c.id}`} className="quick-book" key={c.id}>
                                            Reserve
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div >

        </>
    )
}

export default HomePageBusiness_suites