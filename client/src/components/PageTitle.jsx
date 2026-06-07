import { Link } from 'react-router-dom'

export default function PageTitle({ title, description, bgImage, breadcrumbs }) {
  return (
    <div className="page-title dark-background" data-aos="fade" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="container position-relative">
        <h1>{title}</h1>
        <p>{description}</p>
        <nav className="breadcrumbs">
          <ol>
            {breadcrumbs.map((crumb, index) => (
              <li key={index} className={crumb.current ? 'current' : ''}>
                {crumb.path ? <Link to={crumb.path}>{crumb.label}</Link> : crumb.label}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  )
}
