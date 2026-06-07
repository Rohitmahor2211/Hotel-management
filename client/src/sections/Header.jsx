import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/rooms', label: 'Rooms' },
    { to: '/location', label: 'Location' },
    { to: '/contact', label: 'Contact' },
  ]

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <header id="header" className="header d-flex align-items-center fixed-top z-50">
      <div className="container position-relative d-flex align-items-center justify-content-between">
        <Link to="/" className="logo d-flex align-items-center me-auto me-xl-0">
          {/* Inline SVG copied from demo */}
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="#000000">
            <g strokeWidth="0"></g>
            <g strokeLinecap="round" strokeLinejoin="round"></g>
            <g>
              <g id="a"></g>
              <g id="b">
                <path
                  d="M21,4H11c-1.1046,0-2,.8954-2,2V28h4v-7c0-.5523,.4477-1,1-1h4c.5523,0,1,.4477,1,1v7h4V6c0-1.1046-.8954-2-2-2Z"
                  style={{ fill: '#f2ebe2' }}
                ></path>
                <path
                  d="M30.1416,10.0103l-6.1416-.8774v-3.1329c0-1.6543-1.3457-3-3-3H11c-1.6543,0-3,1.3457-3,3v3.1329l-6.1416,.8774c-.4922,.0703-.8584,.4922-.8584,.9897V28c0,.5522,.4473,1,1,1H30c.5527,0,1-.4478,1-1V11c0-.4976-.3662-.9194-.8584-.9897ZM11,5h10c.5518,0,1,.4487,1,1V27h-2v-6c0-1.103-.8975-2-2-2h-4c-1.1025,0-2,.897-2,2v6h-2V6c0-.5513,.4482-1,1-1Zm7,22h-4v-6h4v6ZM3,11.8672l5-.7144v15.8472H3V11.8672Zm26,15.1328h-5V11.1528l5,.7144v15.1328ZM15,15.5v-1c0-.2762,.2239-.5,.5-.5h1c.2761,0,.5,.2238,.5,.5v1c0,.2761-.2239,.5-.5,.5h-1c-.2761,0-.5-.2239-.5-.5Zm3-7v-1c0-.2762,.2239-.5,.5-.5h1c.2761,0,.5,.2238,.5,.5v1c0,.2761-.2239,.5-.5,.5h-1c-.2761,0-.5-.2239-.5-.5Zm7.5,7v-1c0-.2762,.2239-.5,.5-.5h1c.2761,0,.5,.2238,.5,.5v1c0,.2761-.2239,.5-.5,.5h-1c-.2761,0-.5-.2239-.5-.5Zm0,3v-1c0-.2762,.2239-.5,.5-.5h1c.2761,0,.5,.2238,.5,.5v1c0,.2761-.2239,.5-.5,.5h-1c-.2761,0-.5-.2239-.5-.5ZM6.5,14.5v1c0,.2761-.2239,.5-.5,.5h-1c-.2761,0-.5-.2239-.5-.5v-1c0-.2762,.2239-.5,.5-.5h1c.2761,0,.5,.2238,.5,.5Zm0,3v1c0,.2761-.2239,.5-.5,.5h-1c-.2761,0-.5-.2239-.5-.5v-1c0-.2762,.2239-.5,.5-.5h1c.2761,0,.5,.2238,.5,.5Zm5.5-2v-1c0-.2762,.2239-.5,.5-.5h1c.2761,0,.5,.2238,.5,.5v1c0,.2761-.2239,.5-.5,.5h-1c-.2761,0-.5-.2239-.5-.5Zm0-7v-1c0-.2762,.2239-.5,.5-.5h1c.2761,0,.5,.2238,.5,.5v1c0,.2761-.2239,.5-.5,.5h-1c-.2761,0-.5-.2239-.5-.5Zm3,0v-1c0-.2762,.2239-.5,.5-.5h1c.2761,0,.5,.2238,.5,.5v1c0,.2761-.2239,.5-.5,.5h-1c-.2761,0-.5-.2239-.5-.5Zm3,3.5v-1c0-.2762,.2239-.5,.5-.5h1c.2761,0,.5,.2238,.5,.5v1c0,.2761-.2239,.5-.5,.5h-1c-.2761,0-.5-.2239-.5-.5Zm-6,0v-1c0-.2762,.2239-.5,.5-.5h1c.2761,0,.5,.2238,.5,.5v1c0,.2761-.2239,.5-.5,.5h-1c-.2761,0-.5-.2239-.5-.5Zm3,0v-1c0-.2762,.2239-.5,.5-.5h1c.2761,0,.5,.2238,.5,.5v1c0,.2761-.2239,.5-.5,.5h-1c-.2761,0-.5-.2239-.5-.5Z"
                  style={{ fill: '#917a5a' }}
                ></path>
              </g>
            </g>
          </svg>
          <h1 className="sitename">LuxuryHotel</h1>
        </Link>

        {/* Keep template nav structure/classes so main.css + main.js behavior matches */}
        <nav id="navmenu" className="navmenu">
          <ul>
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={({ isActive }) => (isActive ? 'active' : '')}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <Link className="btn-getstarted d-none d-lg-block" to="/rooms">
          Book Now
        </Link>

        <div className='absolute right-2 d-lg-none'>
          <button
            type="button"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            className="site-mobile-menu-toggle d-xl-none"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <button
          type="button"
          aria-label="Close menu overlay"
          className="site-mobile-menu-backdrop d-xl-none"
          onClick={closeMobileMenu}
        />
      )}

      <aside className={`site-mobile-drawer d-xl-none ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="site-mobile-drawer-header">
          <Link to="/" className="site-mobile-brand" onClick={closeMobileMenu}>
            LuxuryHotel
          </Link>

          <button
            type="button"
            aria-label="Close menu"
            className="site-mobile-drawer-close"
            onClick={closeMobileMenu}
          >
            <X size={22} />
          </button>
        </div>

        <nav className="site-mobile-drawer-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={closeMobileMenu}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Link className="site-mobile-booking" to="/booking" onClick={closeMobileMenu}>
          Book Now
        </Link>
      </aside>
    </header>
  )
}
