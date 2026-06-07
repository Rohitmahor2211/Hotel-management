export default function LocationCards() {
  return (
    <section id="location-cards" className="location-cards section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Location &amp; Activities</h2>
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4">
          {[
            {
              img: 'location-1.webp',
              alt: 'Local Attractions',
              icon: 'bi-geo-alt',
              title: 'Museums & Culture',
              text: 'Explore world-class museums and cultural landmarks just minutes from your doorstep. From contemporary art to historical exhibitions.',
              items: ['Metropolitan Museum - 0.8 miles', 'Art Gallery District - 1.2 miles', 'Cultural Center - 0.5 miles'],
              btn: 'Explore Area',
              delay: 200
            },
            {
              img: 'location-2.webp',
              alt: 'Shopping District',
              icon: 'bi-bag-check',
              title: 'Shopping & Dining',
              text: 'Indulge in premier shopping and culinary experiences. From boutique stores to award-winning restaurants in the entertainment district.',
              items: ['Grand Shopping Mall - 0.3 miles', 'Restaurant Row - 0.6 miles', 'Night Market - 0.9 miles'],
              btn: 'View Restaurants',
              delay: 300
            },
            {
              img: 'location-10.webp',
              alt: 'Business District',
              icon: 'bi-building',
              title: 'Business Hub',
              text: 'Strategically located in the heart of the financial district. Perfect for business travelers with easy access to corporate centers.',
              items: ['Convention Center - 0.4 miles', 'Financial District - 0.7 miles', 'Business Park - 1.1 miles'],
              btn: 'Business Services',
              delay: 400
            }
          ].map((l) => (
            <div key={l.title} className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={l.delay}>
              <div className="location-card">
                <img
                  src={`https://bootstrapmade.com/content/demo/LuxuryHotel/assets/img/hotel/${l.img}`}
                  alt={l.alt}
                  className="img-fluid location-image"
                />
                <div className="location-content">
                  <div className="location-icon">
                    <i className={`bi ${l.icon}`}></i>
                  </div>
                  <h4>{l.title}</h4>
                  <p>{l.text}</p>
                  <ul className="nearby-places">
                    {l.items.map((it) => (
                      <li key={it}>
                        <i className="bi bi-dot"></i> {it}
                      </li>
                    ))}
                  </ul>
                  <a href="#" className="explore-btn" onClick={(e) => e.preventDefault()}>
                    {l.btn}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

