import { Link, NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer id="footer" className="footer position-relative dark-background">
      <div className="footer-top">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-4 col-md-6 footer-about">
              <a href="#" className="logo d-flex align-items-center" onClick={(e) => e.preventDefault()}>
                <span className="sitename">LuxuryHotel</span>
              </a>
              <div className="footer-contact pt-3">
                <p>A108 Adam Street</p>
                <p>New York, NY 535022</p>
                <p className="mt-3">
                  <strong>Phone:</strong> <span>+1 5589 55488 55</span>
                </p>
                <p>
                  <strong>Email:</strong> <span>info@example.com</span>
                </p>
              </div>
            </div>

            <div className="col-lg-2 col-md-3 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li>
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    About us
                  </a>
                </li>
                <li>
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    Terms of service
                  </a>
                </li>
                <li>
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    Privacy policy
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-lg-2 col-md-3 footer-links">
              <h4>Our Services</h4>
              <ul>
                <li>
                  <Link to="adminlogin" >
                    Admin
                  </Link>
                </li>
                <li>
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    Web Development
                  </a>
                </li>
                <li>
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    Product Management
                  </a>
                </li>
                <li>
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    Marketing
                  </a>
                </li>
                <li>
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    Graphic Design
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-lg-2 col-md-3 footer-links">
              <h4>Hic solutasetp</h4>
              <ul>
                <li>
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    Molestiae accusamus iure
                  </a>
                </li>
                <li>
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    Excepturi dignissimos
                  </a>
                </li>
                <li>
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    Suscipit distinctio
                  </a>
                </li>
                <li>
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    Dilecta
                  </a>
                </li>
                <li>
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    Sit quas consectetur
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-lg-2 col-md-3 footer-links">
              <h4>Nobis illum</h4>
              <ul>
                <li>
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    Ipsam
                  </a>
                </li>
                <li>
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    Laudantium dolorum
                  </a>
                </li>
                <li>
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    Dinera
                  </a>
                </li>
                <li>
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    Trodelas
                  </a>
                </li>
                <li>
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    Flexo
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="copyright text-center">
        <div className="container d-flex flex-column flex-lg-row justify-content-center justify-content-lg-between align-items-center">
          <div className="d-flex flex-column align-items-center align-items-lg-start">
            <div>
              © Copyright <strong><span>MyWebsite</span></strong>. All Rights Reserved
            </div>
            <div className="credits">
              Designed by{' '}
              <a href="https://bootstrapmade.com/" target="_blank" rel="noreferrer">
                BootstrapMade
              </a>
            </div>
          </div>

          <div className="social-links order-first order-lg-last mb-3 mb-lg-0">
            <a href="#" onClick={(e) => e.preventDefault()}>
              <i className="bi bi-twitter-x"></i>
            </a>
            <a href="#" onClick={(e) => e.preventDefault()}>
              <i className="bi bi-facebook"></i>
            </a>
            <a href="#" onClick={(e) => e.preventDefault()}>
              <i className="bi bi-instagram"></i>
            </a>
            <a href="#" onClick={(e) => e.preventDefault()}>
              <i className="bi bi-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

