import { Link } from "react-router-dom";

export default function AboutHome() {
  return (
    <section id="about-home" className="about-home section">
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row align-items-center">
          <div className="col-lg-5" data-aos="fade-up" data-aos-delay="200">
            <div className="about-images">
              <div className="image-stack">
                <div className="image-main">
                  <img
                    src="https://bootstrapmade.com/content/demo/LuxuryHotel/assets/img/hotel/showcase-3.webp"
                    alt="Heritage Hotel Exterior"
                    className="img-fluid"
                  />
                </div>
                <div className="image-overlay">
                  <img
                    src="https://bootstrapmade.com/content/demo/LuxuryHotel/assets/img/hotel/room-8.webp"
                    alt="Elegant Room Interior"
                    className="img-fluid"
                  />
                </div>
              </div>
              <div className="floating-badge">
                <div className="badge-icon">
                  <i className="bi bi-award"></i>
                </div>
                <div className="badge-info">
                  <span className="badge-title">5-Star</span>
                  <span className="badge-subtitle">Luxury</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-7" data-aos="fade-up" data-aos-delay="300">
            <div className="about-content">
              <div className="section-header">
                <span className="subtitle">Heritage &amp; Excellence</span>
                <h2>Discover the Pinnacle of Hospitality</h2>
              </div>

              <p>
                Experience unparalleled luxury at Heritage Grand Hotel, where timeless elegance meets modern
                sophistication. For over four decades, we have crafted memorable experiences through exceptional
                service and attention to every detail.
              </p>

              <p>
                Our commitment to excellence has earned recognition from prestigious hospitality awards worldwide,
                making us the preferred choice for discerning guests seeking both comfort and distinction.
              </p>

              <div className="features-grid">
                <div className="feature-item">
                  <div className="feature-icon">
                    <i className="bi bi-building"></i>
                  </div>
                  <div className="feature-content">
                    <h4>Premium Suites</h4>
                    <p>Luxuriously appointed accommodations with panoramic city views</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <i className="bi bi-star-fill"></i>
                  </div>
                  <div className="feature-content">
                    <h4>Award-Winning Service</h4>
                    <p>Personalized hospitality that exceeds every expectation</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <i className="bi bi-geo-alt"></i>
                  </div>
                  <div className="feature-content">
                    <h4>Prime Location</h4>
                    <p>Situated in the heart of the city's cultural district</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <i className="bi bi-fork-knife"></i>
                  </div>
                  <div className="feature-content">
                    <h4>Michelin Dining</h4>
                    <p>Exceptional culinary experiences by renowned chefs</p>
                  </div>
                </div>
              </div>

              <div className="about-actions">
                <a href="#" className="btn-discover" onClick={(e) => e.preventDefault()}>
                  <Link to="/about">
                    <span>Discover Our Story</span>
                    <i className="bi bi-arrow-right"></i>
                  </Link>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

