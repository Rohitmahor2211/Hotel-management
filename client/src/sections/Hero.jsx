import { useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Hero() {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

  return (
    <section id="hotel-hero" className="hotel-hero section dark-background ">
      <div className="hero-content">
        <div className="hero-background">
          <video autoPlay muted loop preload="auto">
            <source src="https://bootstrapmade.com/content/demo/LuxuryHotel/assets/img/hotel/video-6.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay"></div>
        </div>

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="hero-text text-center" data-aos="fade-up" data-aos-delay="100">
                <h1>Discover Elegance and Comfort</h1>
                <p className="hero-subtitle">
                  Experience unparalleled luxury in the heart of the city with world-class amenities and personalized
                  service that exceeds every expectation.
                </p>

                <div className="hero-features" data-aos="fade-up" data-aos-delay="200">
                  <div className="feature-item">
                    <i className="bi bi-star-fill"></i>
                    <span>5-Star Luxury</span>
                  </div>
                  <div className="feature-item">
                    <i className="bi bi-geo-alt-fill"></i>
                    <span>Prime Location</span>
                  </div>
                  <div className="feature-item">
                    <i className="bi bi-award-fill"></i>
                    <span>Award Winning</span>
                  </div>
                </div>
              </div>

              <div className="booking-card" data-aos="fade-up" data-aos-delay="300">
                <div className="card">
                  <div className="card-body">
                    <form action="" method="post" onSubmit={(e) => e.preventDefault()}>
                      <div className="row g-3 items-end">
                        <div className="col-xl-2">
                          <label className="form-label">Check-in</label>
                          <DatePicker
                            selected={checkIn}
                            onChange={(date) => setCheckIn(date)}
                            className="form-control hero-date-input"
                            placeholderText="Check-in"
                            minDate={new Date()}
                            dateFormat="dd/MM/yyyy"
                            readOnly
                          />
                        </div>
                        <div className="col-xl-2">
                          <label className="form-label">Check-out</label>
                          <DatePicker
                            selected={checkOut}
                            onChange={(date) => setCheckOut(date)}
                            className="form-control hero-date-input"
                            placeholderText="Check-out"
                            minDate={checkIn || new Date()}
                            dateFormat="dd/MM/yyyy"
                          />
                        </div>
                        <div className="col-xl-2">
                          <label htmlFor="guests" className="form-label">
                            Guests
                          </label>
                          <select className="form-select" id="guests" name="guests" required defaultValue="">
                            <option value="">Select</option>
                            <option value="1">1 Guest</option>
                            <option value="2">2 Guests</option>
                            <option value="3">3 Guests</option>
                            <option value="4">4+ Guests</option>
                          </select>
                        </div>
                        <div className="col-xl-2">
                          <label htmlFor="rooms" className="form-label">
                            Rooms
                          </label>
                          <select className="form-select" id="rooms" name="rooms" required defaultValue="">
                            <option value="">Select</option>
                            <option value="1">1 Room</option>
                            <option value="2">2 Rooms</option>
                            <option value="3">3+ Rooms</option>
                          </select>
                        </div>
                        <div className="col-xl-4">
                          <label className="form-label d-block">&nbsp;</label>
                          <Link to="/rooms">
                            <button type="submit" className="btn btn-primary w-100">
                              <i className="bi bi-search"></i>
                              Search Available Rooms
                            </button>
                          </Link>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="hero-actions" data-aos="fade-up" data-aos-delay="400">
                <a href="#rooms-showcase" className="btn btn-light btn-lg">
                  <i className="bi bi-house-door"></i>
                  Explore Rooms
                </a>
                <a href="#amenities-cards" className="btn btn-outline-light btn-lg">
                  <i className="bi bi-star"></i>
                  View Amenities
                </a>
              </div>

              <div className="hero-stats" data-aos="fade-up" data-aos-delay="500">
                <div className="stat-item">
                  <div className="stat-number">
                    <span data-purecounter-start="0" data-purecounter-end="250" data-purecounter-duration="1" className="purecounter">
                      250
                    </span>
                    +
                  </div>
                  <div className="stat-label">Luxury Rooms</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">
                    <span data-purecounter-start="0" data-purecounter-end="15" data-purecounter-duration="1" className="purecounter">
                      15
                    </span>
                    +
                  </div>
                  <div className="stat-label">Years Experience</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">
                    <span data-purecounter-start="0" data-purecounter-end="98" data-purecounter-duration="1" className="purecounter">
                      98
                    </span>
                    %
                  </div>
                  <div className="stat-label">Guest Satisfaction</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">
                    <span data-purecounter-start="0" data-purecounter-end="24" data-purecounter-duration="1" className="purecounter">
                      24
                    </span>
                    /7
                  </div>
                  <div className="stat-label">Concierge Service</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

