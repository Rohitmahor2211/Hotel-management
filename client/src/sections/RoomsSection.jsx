import { Link } from 'react-router-dom'
import React, { useContext, useState } from 'react'
import { RoomContext } from '../context/RoomContext'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

export default function RoomsSection() {
  const { rooms, loading, fetchAvailableRoomsList } = useContext(RoomContext)
  const [currentPage, setCurrentPage] = useState(1)
  const roomsPerPage = 10
  const [dateFilter, setDateFilter] = useState({ checkIn: null, checkOut: null })
  const [filteredRoomIds, setFilteredRoomIds] = useState(null)
  const [priceRange, setPriceRange] = useState("")
  const [capacity, setCapacity] = useState("")

  const fetchAvailableRooms = async () => {
    if (!dateFilter.checkIn || !dateFilter.checkOut) {
      setFilteredRoomIds(null);
      return;
    }
    try {
      const data = await fetchAvailableRoomsList(dateFilter);
      if (data.success) {
        setFilteredRoomIds(data.data.map(room => room._id));
        setCurrentPage(1);
      }
    } catch (err) {
      console.error("Error fetching available rooms:", err);
    }
  };

  const handleDateChange = (date, name) => {
    setDateFilter({ ...dateFilter, [name]: date });
  };

  const displayRooms = rooms.filter(room => {
    // 1. Filter by availability (if date search was performed)
    if (filteredRoomIds !== null && !filteredRoomIds.includes(room._id)) return false;

    // 2. Filter by Price Range
    if (priceRange === "budget" && (room.price < 1000 || room.price > 2000)) return false;
    if (priceRange === "mid" && (room.price < 2000 || room.price > 4000)) return false;
    if (priceRange === "luxury" && room.price <= 4000) return false;

    // 3. Filter by Capacity
    if (capacity === "1-2" && room.capacity > 2) return false;
    if (capacity === "3-4" && (room.capacity < 3 || room.capacity > 4)) return false;
    if (capacity === "5+" && room.capacity < 5) return false;

    return true;
  });

  // Pagination Logic
  const indexOfLastRoom = currentPage * roomsPerPage
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage
  const currentRooms = displayRooms.slice(indexOfFirstRoom, indexOfLastRoom)
  const totalPages = Math.ceil(displayRooms.length / roomsPerPage)

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
    // Optional: scroll to top of section or page
    const section = document.getElementById('rooms-2')
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const nextPage = (e) => {
    e.preventDefault()
    if (currentPage < totalPages) paginate(currentPage + 1)
  }

  const prevPage = (e) => {
    e.preventDefault()
    if (currentPage > 1) paginate(currentPage - 1)
  }

  return (
    <section id="rooms-2" className="rooms-2 section">
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row">
          <div className="col-lg-3 col-md-4">
            <div className="room-filters" data-aos="fade-right" data-aos-delay="100">
              <h5>Filter Rooms</h5>

              <div className="filter-group mb-4">
                <label className="fw-bold mb-2">Check Availability</label>
                <div className="mb-2">
                  <span className="small text-muted d-block mb-1">Check-in</span>
                  <DatePicker
                    selected={dateFilter.checkIn}
                    onChange={(date) => handleDateChange(date, "checkIn")}
                    className="form-control"
                    placeholderText="Check-in Date"
                    minDate={new Date()}
                    dateFormat="dd/MM/yyyy"
                  />
                </div>
                <div className="mb-3">
                  <span className="small text-muted d-block mb-1">Check-out</span>
                  <DatePicker
                    selected={dateFilter.checkOut}
                    onChange={(date) => handleDateChange(date, "checkOut")}
                    className="form-control"
                    placeholderText="Check-out Date"
                    minDate={dateFilter.checkIn || new Date()}
                    dateFormat="dd/MM/yyyy"
                  />
                </div>
                <button type="button" className="btn btn-primary w-100 mt-2" onClick={fetchAvailableRooms}>
                  Check Dates
                </button>
              </div>

              <div className="filter-group">
                <label>Price Range</label>
                <select className="form-select" value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
                  <option value="">All Prices</option>
                  <option value="budget">₹1000 - ₹2000</option>
                  <option value="mid">₹2000 - ₹4000</option>
                  <option value="luxury">₹4000+</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Room Capacity</label>
                <select className="form-select" value={capacity} onChange={(e) => setCapacity(e.target.value)}>
                  <option value="">Any Capacity</option>
                  <option value="1-2">1-2 Guests</option>
                  <option value="3-4">3-4 Guests</option>
                  <option value="5+">5+ Guests</option>
                </select>
              </div>

              <button type="button" className="btn btn-primary w-100" onClick={() => { setFilteredRoomIds(null); setDateFilter({ checkIn: "", checkOut: "" }); setPriceRange(""); setCapacity(""); }}>Reset Filters</button>
            </div>
          </div>

          <div className="col-lg-9 col-md-8">
            <div className="rooms-header d-flex justify-content-between align-items-center mb-4" data-aos="fade-left" data-aos-delay="150">
              <div className="results-count">
                <span>Showing {displayRooms.length > 0 ? `${indexOfFirstRoom + 1}-${Math.min(indexOfLastRoom, displayRooms.length)} of ${displayRooms.length}` : '0'} rooms</span>
              </div>
              {/* <div className="sort-options">
                <select className="form-select">
                  <option value="featured">Sort by: Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Guest Rating</option>
                </select>
              </div> */}
            </div>

            <div className="row gy-4">
              {loading ? (
                <div className="col-12 text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2 text-muted">Fetching our finest rooms...</p>
                </div>
              ) : currentRooms.length > 0 ? (
                currentRooms.map((room, index) => (
                  <div className="col-lg-6" key={room._id} data-aos="fade-up" data-aos-delay={200 + (index % 5) * 50}>
                    <div className="room-card">
                      <div className="room-image">
                        <img src={room.images?.[0] || 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800'} alt={room.title} className="img-fluid" />
                        <div className="room-price">
                          <span className="price">₹{room.price}</span>
                          <span className="period">/ night</span>
                        </div>
                      </div>
                      <div className="room-content">
                        <h4>{room.title}</h4>
                        <p>{room.description ? (room.description.length > 120 ? room.description.substring(0, 117) + '...' : room.description) : 'No description available for this luxury room.'}</p>
                        <div className="room-features">
                          <span><i className="bi bi-people"></i> {room.capacity} Guests</span>
                          <span><i className="bi bi-wifi"></i> Free Wi-Fi</span>
                          <span><i className="bi bi-door-open"></i> Room No: {room.room_no}</span>
                        </div>
                        <div className="room-actions">
                          <Link to={`/room-details/${room._id}`} className="btn btn-primary">View Details</Link>
                          <Link to={`/room-details/${room._id}`} className="btn btn-outline-primary">Book Now</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center py-5">
                  <h3>No rooms found</h3>
                  <p className="text-muted">Try adjusting your filters or check back later.</p>
                </div>
              )}
            </div>

            {totalPages > 1 && (
              <div className="pagination-wrapper mt-5" data-aos="fade-up" data-aos-delay="500">
                <nav aria-label="Room listings pagination">
                  <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <a className="page-link" href="#" onClick={prevPage}>Previous</a>
                    </li>

                    {[...Array(totalPages)].map((_, i) => (
                      <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                        <a className="page-link" href="#" onClick={(e) => { e.preventDefault(); paginate(i + 1); }}>
                          {i + 1}
                        </a>
                      </li>
                    ))}

                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <a className="page-link" href="#" onClick={nextPage}>Next</a>
                    </li>
                  </ul>
                </nav>
              </div>
            )}

          </div>

        </div>

      </div>

    </section>
  )
}
