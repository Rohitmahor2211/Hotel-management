import { Link } from "react-router-dom";

export default function CallToAction() {
  return (
    <section id="call-to-action" className="call-to-action section light-background">
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="cta-content text-center">
              <div className="row align-items-center">
                <div className="col-lg-8">
                  <div className="text-content">
                    <h2>Experience Luxury Like Never Before</h2>
                    <p className="lead mb-0">
                      Book your dream getaway today and enjoy exclusive amenities, world-class service, and unforgettable
                      memories. Limited availability for our premium suites.
                    </p>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="cta-action" data-aos="zoom-in" data-aos-delay="200">
                    <a href="#" className="btn btn-cta" onClick={(e) => e.preventDefault()}>
                      <i className="bi bi-calendar-check me-2"></i>
                      <Link to="/rooms">
                        Book Now
                      </Link>
                    </a>
                    {/* <div className="offer-badge" data-aos="fade-up" data-aos-delay="300">
                      <span>Save up to 25%</span>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-5" data-aos="fade-up" data-aos-delay="200">
          {[
            { icon: 'bi-shield-check', title: 'Free Cancellation', text: 'Cancel up to 24 hours before check-in' },
            { icon: 'bi-award', title: 'Best Rate Guarantee', text: "We'll match any lower rate you find" },
            { icon: 'bi-headset', title: '24/7 Support', text: 'Round-the-clock customer assistance' },
            { icon: 'bi-lock', title: 'Secure Booking', text: 'Your payment information is protected' }
          ].map((f) => (
            <div key={f.title} className="col-lg-3 col-md-6 mb-4">
              <div className="feature-item text-center">
                <div className="icon-wrapper">
                  <i className={`bi ${f.icon}`}></i>
                </div>
                <h5>{f.title}</h5>
                <p>{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

