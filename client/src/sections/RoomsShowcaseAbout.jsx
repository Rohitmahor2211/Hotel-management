import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { RoomContext } from '../context/RoomContext'

export default function RoomsShowcaseAbout() {

  const { roomCategories } = useContext(RoomContext);

  const executive_suite = roomCategories["Executive Suite"]?.[1]
  const business_executive_suite = roomCategories["Executive Business Suite"]?.[1]
  const family_room = roomCategories["Family Room"]?.[0]


  return (
    <section id="rooms-showcase-about" className="rooms-showcase-about section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Rooms</h2>
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row">

          <div className="col-lg-4 col-md-6 mb-4" data-aos="fade-up" data-aos-delay="200">
            <div className="room-card">
              <div className="room-image">
                <img src={executive_suite?.images?.[0]} alt="Deluxe Room" className="img-fluid" />
                <div className="room-overlay">
                  <Link to={`/room-details/${executive_suite?._id}`} className="btn-explore">Explore Room</Link>
                </div>
              </div>
              <div className="room-content">
                <h4>{executive_suite?.title}</h4>
                <p className="room-description">Spacious room with modern amenities, city view, and luxurious king-size bed for ultimate comfort.</p>
                <div className="room-features">
                  <span className="feature-item"><i className="bi bi-people"></i> {executive_suite?.capacity} Guests</span>
                  <span className="feature-item"><i className="bi bi-tv"></i> Smart TV</span>
                  <span className="feature-item"><i className="bi bi-wifi"></i> Free WiFi</span>
                </div>
                <div className="room-footer">
                  <div className="room-price">
                    <span className="price-from">From</span>
                    <span className="price-amount">₹{executive_suite?.price}</span>
                    <span className="price-period">/night</span>
                  </div>
                  <Link to={`/room-details/${executive_suite?._id}`} className="btn-view-details" >View Details</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mb-4" data-aos="fade-up" data-aos-delay="250">
            <div className="room-card">
              <div className="room-image">
                <img src={business_executive_suite?.images?.[0]} alt="Executive Suite" className="img-fluid" />
                <div className="room-overlay">
                  <Link to={`/room-details/${business_executive_suite?._id}`} className="btn-explore" >Explore Room</Link>
                </div>
              </div>
              <div className="room-content">
                <h4>{business_executive_suite?.title}</h4>
                <p className="room-description">Elegant suite featuring separate living area, premium furnishings, and panoramic views of the city skyline.</p>
                <div className="room-features">
                  <span className="feature-item"><i className="bi bi-people"></i> {business_executive_suite?.capacity} Guests</span>
                  <span className="feature-item"><i className="bi bi-cup-hot"></i> Coffee Machine</span>
                  <span className="feature-item"><i className="bi bi-building"></i> City View</span>
                </div>
                <div className="room-footer">
                  <div className="room-price">
                    <span className="price-from">From</span>
                    <span className="price-amount">₹{business_executive_suite?.price}</span>
                    <span className="price-period">/night</span>
                  </div>
                  <Link to={`/room-details/${business_executive_suite?._id}`} className="btn-view-details">View Details</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mb-4" data-aos="fade-up" data-aos-delay="300">
            <div className="room-card">
              <div className="room-image">
                <img src={family_room?.images?.[0]} alt="Family Room" className="img-fluid" />
                <div className="room-overlay">
                  <Link to={`/room-details/${family_room?._id}`} className="btn-explore" key={family_room?._id}>Explore Room</Link>
                </div>
              </div>
              <div className="room-content">
                <h4>{family_room?.title}</h4>
                <p className="room-description">Perfect for families with connecting rooms, extra space, and child-friendly amenities for a comfortable stay.</p>
                <div className="room-features">
                  <span className="feature-item"><i className="bi bi-people"></i> {family_room?.capacity} Guests</span>
                  <span className="feature-item"><i className="bi bi-door-open"></i> Connecting Rooms</span>
                  <span className="feature-item"><i className="bi bi-controller"></i> Games Console</span>
                </div>
                <div className="room-footer">
                  <div className="room-price">
                    <span className="price-from">From</span>
                    <span className="price-amount">₹{family_room?.price}</span>
                    <span className="price-period">/night</span>
                  </div>
                  <Link to={`/room-details/${family_room?._id}`} className="btn-view-details" key={family_room?._id}>View Details</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mb-4" data-aos="fade-up" data-aos-delay="200">
            <div className="room-card">
              <div className="room-image">
                <img src={executive_suite?.images?.[0]} alt="Deluxe Room" className="img-fluid" />
                <div className="room-overlay">
                  <Link to={`/room-details/${executive_suite?._id}`} className="btn-explore">Explore Room</Link>
                </div>
              </div>
              <div className="room-content">
                <h4>{executive_suite?.title}</h4>
                <p className="room-description">Spacious room with modern amenities, city view, and luxurious king-size bed for ultimate comfort.</p>
                <div className="room-features">
                  <span className="feature-item"><i className="bi bi-people"></i> {executive_suite?.capacity} Guests</span>
                  <span className="feature-item"><i className="bi bi-tv"></i> Smart TV</span>
                  <span className="feature-item"><i className="bi bi-wifi"></i> Free WiFi</span>
                </div>
                <div className="room-footer">
                  <div className="room-price">
                    <span className="price-from">From</span>
                    <span className="price-amount">₹{executive_suite?.price}</span>
                    <span className="price-period">/night</span>
                  </div>
                  <Link to={`/room-details/${executive_suite?._id}`} className="btn-view-details" >View Details</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mb-4" data-aos="fade-up" data-aos-delay="250">
            <div className="room-card">
              <div className="room-image">
                <img src={business_executive_suite?.images?.[0]} alt="Executive Suite" className="img-fluid" />
                <div className="room-overlay">
                  <Link to={`/room-details/${executive_suite?._id}`} className="btn-explore" >Explore Room</Link>
                </div>
              </div>
              <div className="room-content">
                <h4>{business_executive_suite?.title}</h4>
                <p className="room-description">Elegant suite featuring separate living area, premium furnishings, and panoramic views of the city skyline.</p>
                <div className="room-features">
                  <span className="feature-item"><i className="bi bi-people"></i> {business_executive_suite?.capacity} Guests</span>
                  <span className="feature-item"><i className="bi bi-cup-hot"></i> Coffee Machine</span>
                  <span className="feature-item"><i className="bi bi-building"></i> City View</span>
                </div>
                <div className="room-footer">
                  <div className="room-price">
                    <span className="price-from">From</span>
                    <span className="price-amount">₹{business_executive_suite?.price}</span>
                    <span className="price-period">/night</span>
                  </div>
                  <Link to={`/room-details/${executive_suite?._id}`} className="btn-view-details">View Details</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mb-4" data-aos="fade-up" data-aos-delay="300">
            <div className="room-card">
              <div className="room-image">
                <img src={family_room?.images?.[0]} alt="Family Room" className="img-fluid" />
                <div className="room-overlay">
                  <Link to={`/room-details/${family_room?._id}`} className="btn-explore" key={family_room?._id}>Explore Room</Link>
                </div>
              </div>
              <div className="room-content">
                <h4>{family_room?.title}</h4>
                <p className="room-description">Perfect for families with connecting rooms, extra space, and child-friendly amenities for a comfortable stay.</p>
                <div className="room-features">
                  <span className="feature-item"><i className="bi bi-people"></i> {family_room?.capacity} Guests</span>
                  <span className="feature-item"><i className="bi bi-door-open"></i> Connecting Rooms</span>
                  <span className="feature-item"><i className="bi bi-controller"></i> Games Console</span>
                </div>
                <div className="room-footer">
                  <div className="room-price">
                    <span className="price-from">From</span>
                    <span className="price-amount">₹{family_room?.price}</span>
                    <span className="price-period">/night</span>
                  </div>
                  <Link to={`/room-details/${family_room?._id}`} className="btn-view-details" key={family_room?._id}>View Details</Link>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="text-center mt-5" data-aos="fade-up" data-aos-delay="500">
          <Link to="/rooms" className="btn-view-all-rooms">View All Rooms &amp; Suites</Link>
        </div>
      </div>
    </section>
  )
}
