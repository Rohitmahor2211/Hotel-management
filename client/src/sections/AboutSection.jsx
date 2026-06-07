export default function AboutSection() {
  return (
    <section id="about" className="about section">
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4">
          <div className="col-lg-6">
            <div className="about-content">
              <h3>Luxury Redefined in the Heart of Paradise</h3>
              <p>
                Nestled along the pristine coastline, our boutique hotel has been welcoming discerning travelers since 1892. What began as a charming seaside retreat has evolved into one of the region's most beloved luxury destinations, seamlessly blending timeless elegance with modern sophistication.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>

              <div className="stats-grid">
                <div className="stat-item" data-aos="fade-up" data-aos-delay="200">
                  <div className="stat-number">
                    <span data-purecounter-start="0" data-purecounter-end="132" data-purecounter-duration="1" className="purecounter">132</span>
                  </div>
                  <div className="stat-label">Luxury Rooms</div>
                </div>
                <div className="stat-item" data-aos="fade-up" data-aos-delay="250">
                  <div className="stat-number">
                    <span data-purecounter-start="0" data-purecounter-end="98" data-purecounter-duration="1" className="purecounter">98</span>%
                  </div>
                  <div className="stat-label">Guest Satisfaction</div>
                </div>
                <div className="stat-item" data-aos="fade-up" data-aos-delay="300">
                  <div className="stat-number">
                    <span data-purecounter-start="1800" data-purecounter-end="1892" data-purecounter-duration="2" className="purecounter">1892</span>
                  </div>
                  <div className="stat-label">Established</div>
                </div>
                <div className="stat-item" data-aos="fade-up" data-aos-delay="350">
                  <div className="stat-number">
                    <span data-purecounter-start="0" data-purecounter-end="27" data-purecounter-duration="1" className="purecounter">27</span>
                  </div>
                  <div className="stat-label">Awards Won</div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="about-visuals">
              <div className="main-image" data-aos="zoom-in" data-aos-delay="200">
                <img src="https://bootstrapmade.com/content/demo/LuxuryHotel/assets/img/hotel/showcase-3.webp" alt="Hotel Luxury Suite" className="img-fluid" />
                {/* <div className="image-overlay">
                  <a href="https://www.youtube.com/watch?v=Y7f98aduVJ8" className="glightbox">
                    <div className="play-button">
                      <i className="bi bi-play-circle"></i>
                    </div>
                  </a>
                </div> */}
              </div>

              <div className="features-grid">
                <div className="feature-item" data-aos="fade-up" data-aos-delay="300">
                  <div className="feature-icon">
                    <i className="bi bi-wifi"></i>
                  </div>
                  <h5>Free Wi-Fi</h5>
                  <p>High-speed internet throughout the property</p>
                </div>
                <div className="feature-item" data-aos="fade-up" data-aos-delay="350">
                  <div className="feature-icon">
                    <i className="bi bi-car-front"></i>
                  </div>
                  <h5>Valet Parking</h5>
                  <p>Complimentary parking with professional service</p>
                </div>
                <div className="feature-item" data-aos="fade-up" data-aos-delay="400">
                  <div className="feature-icon">
                    <i className="bi bi-cup-hot"></i>
                  </div>
                  <h5>24/7 Room Service</h5>
                  <p>Gourmet dining delivered to your door</p>
                </div>
                <div className="feature-item" data-aos="fade-up" data-aos-delay="450">
                  <div className="feature-icon">
                    <i className="bi bi-gem"></i>
                  </div>
                  <h5>Concierge Service</h5>
                  <p>Personal assistance for all your needs</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row awards-section">
          <div className="col-12">
            <div className="section-header text-center" data-aos="fade-up" data-aos-delay="100">
              <h4>Awards &amp; Recognition</h4>
              <p>Celebrating excellence in hospitality and service</p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-3 col-md-6">
            <div className="award-item" data-aos="fade-up" data-aos-delay="200">
              <div className="award-icon">
                <i className="bi bi-award"></i>
              </div>
              <h6>Best Luxury Hotel</h6>
              <span>Travel Excellence Awards 2023</span>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="award-item" data-aos="fade-up" data-aos-delay="250">
              <div className="award-icon">
                <i className="bi bi-star-fill"></i>
              </div>
              <h6>5-Star Rating</h6>
              <span>International Hotel Guide</span>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="award-item" data-aos="fade-up" data-aos-delay="300">
              <div className="award-icon">
                <i className="bi bi-heart-fill"></i>
              </div>
              <h6>Guest's Choice</h6>
              <span>TripAdvisor 2023</span>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="award-item" data-aos="fade-up" data-aos-delay="350">
              <div className="award-icon">
                <i className="bi bi-tree"></i>
              </div>
              <h6>Eco-Friendly Hotel</h6>
              <span>Green Tourism Certification</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
