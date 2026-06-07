export default function LocationSection() {
  return (
    <section id="hotel-location" className="hotel-location section">
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row">
          {/* Map Section */}
          <div className="col-lg-8 mb-5 mb-lg-0" data-aos="fade-right" data-aos-delay="200">
            <div className="map-wrapper" style={{ height: '100%' }}>
              <iframe
                style={{ height: '100%', width: '100%' }}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113575.54760081394!2d77.589146197395!3d27.485122171542133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397371175dec4837%3A0x673998a1f81d11b2!2sMathura%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1717658742831!5m2!1sen!2sin"
                frameBorder="0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              ></iframe>
              <div className="location-pin">
                <i className="bi bi-geo-alt-fill"></i>
                <span>Grand Plaza Hotel</span>
              </div>
            </div>
          </div>

          {/* Location Info */}
          <div className="col-lg-4" data-aos="fade-left" data-aos-delay="300">
            <div className="location-info">
              <h3>Prime Downtown Location</h3>
              <p className="location-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>

              <div className="address-block">
                <h5><i className="bi bi-geo-alt"></i> Address</h5>
                <p>Krishna Janmabhoomi Complex<br />Mathura, UP 281001<br />India</p>
              </div>

              <div className="transport-info">
                <h5><i className="bi bi-airplane"></i> Airport Distance</h5>
                <p>IGI Airport (DEL) - 3 hours by car</p>
                <p>Agra Airport (AGR) - 1.5 hours by car</p>
              </div>

              <div className="contact-info">
                <h5><i className="bi bi-telephone"></i> Contact</h5>
                <p>Phone: +91 565 234 5678</p>
                <p>Email: <a href="mailto:info@luxuryhotelmathura.com">info@luxuryhotelmathura.com</a></p>
              </div>

              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=Shri+Krishna+Janmasthan+Temple+Mathura" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>

        {/* Nearby Attractions */}
        <div className="row nearby-attractions" data-aos="fade-up" data-aos-delay="400">
          <div className="col-12">
            <h3 className="attractions-title">What's Nearby</h3>
            <p className="attractions-subtitle">Discover the sacred landmarks and cultural gems near our hotel</p>
          </div>

          <div className="col-lg-6 col-md-6 mb-4" data-aos="zoom-in" data-aos-delay="500">
            <div className="attraction-card">
              <div className="attraction-image">
                <img src="https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&q=80&w=800" alt="Prem Mandir" className="img-fluid" />
              </div>
              <div className="attraction-content">
                <h5>Prem Mandir, Vrindavan</h5>
                <p className="distance"><i className="bi bi-geo-alt"></i> 12 km - 25 min drive</p>
                <p>A spiritual complex dedicated to Shri Krishna. Famous for its intricate white marble architecture and light shows.</p>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-6 mb-4" data-aos="zoom-in" data-aos-delay="600">
            <div className="attraction-card">
              <div className="attraction-image">
                <img src="https://images.unsplash.com/photo-1590050752117-23a9d7fc217d?auto=format&fit=crop&q=80&w=800" alt="Banke Bihari" className="img-fluid" />
              </div>
              <div className="attraction-content">
                <h5>Banke Bihari Temple</h5>
                <p className="distance"><i className="bi bi-geo-alt"></i> 11 km - 20 min drive</p>
                <p>One of the most sacred Hindu temples in Vrindavan, dedicated to Lord Krishna in his Banke Bihari form.</p>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-6 mb-4" data-aos="zoom-in" data-aos-delay="700">
            <div className="attraction-card">
              <div className="attraction-image">
                <img src="https://images.unsplash.com/photo-1621213459146-f9085ec30113?auto=format&fit=crop&q=80&w=800" alt="Vishram Ghat" className="img-fluid" />
              </div>
              <div className="attraction-content">
                <h5>Vishram Ghat</h5>
                <p className="distance"><i className="bi bi-geo-alt"></i> 2.5 km - 10 min drive</p>
                <p>The main ghat of Mathura where according to legend, Lord Krishna took rest after killing Kansa.</p>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-6 mb-4" data-aos="zoom-in" data-aos-delay="800">
            <div className="attraction-card">
              <div className="attraction-image">
                <img src="https://images.unsplash.com/photo-1603566276856-f648fb7a3c30?auto=format&fit=crop&q=80&w=800" alt="Dwarkadhish Temple" className="img-fluid" />
              </div>
              <div className="attraction-content">
                <h5>Dwarkadhish Temple</h5>
                <p className="distance"><i className="bi bi-geo-alt"></i> 2.8 km - 12 min drive</p>
                <p>One of the oldest and largest temples in Mathura, built in 1814 for the Lord of Dwarka.</p>
              </div>
            </div>
          </div>
        </div>{/* End Nearby Attractions */}

        {/* Transportation Options */}
        <div className="row transportation-section" data-aos="fade-up" data-aos-delay="900">
          <div className="col-12">
            <h3 className="transport-title">How to Get Here</h3>
          </div>

          <div className="col-lg-3 col-md-6 mb-4" data-aos="fade-up" data-aos-delay="1000">
            <div className="transport-option">
              <div className="transport-icon">
                <i className="bi bi-car-front"></i>
              </div>
              <h5>By Car</h5>
              <p>Valet parking available. Self-parking garage located 2 blocks away with special hotel rates.</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mb-4" data-aos="fade-up" data-aos-delay="1100">
            <div className="transport-option">
              <div className="transport-icon">
                <i className="bi bi-train-front"></i>
              </div>
              <h5>By Subway</h5>
              <p>Union Square Station is 3 blocks away. Multiple lines including 4, 5, 6, L, N, Q, R, and W.</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mb-4" data-aos="fade-up" data-aos-delay="1200">
            <div className="transport-option">
              <div className="transport-icon">
                <i className="bi bi-bus-front"></i>
              </div>
              <h5>By Bus</h5>
              <p>Several bus routes stop within 2 blocks. Express bus service to airports available nearby.</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mb-4" data-aos="fade-up" data-aos-delay="1300">
            <div className="transport-option">
              <div className="transport-icon">
                <i className="bi bi-taxi-front"></i>
              </div>
              <h5>By Taxi/Uber</h5>
              <p>Easy pickup and drop-off access. Taxi stands located on both sides of the building entrance.</p>
            </div>
          </div>
        </div>{/* End Transportation Section */}

      </div>
    </section>
  )
}
