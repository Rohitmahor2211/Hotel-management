export default function AmenitiesCards() {
  return (
    <section id="amenities-cards" className="amenities-cards section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Amenities</h2>
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-5">
          {[
            // { icon: 'bi-water', title: 'Rooftop Pool & Terrace', delay: 200, tags: ['24/7 Access', 'Pool Bar'] },
            // { icon: 'bi-heart-pulse', title: 'Luxury Spa Center', delay: 300, tags: ['Massage', 'Sauna'] },
            { icon: 'bi-cup-hot', title: 'Gourmet Restaurant', delay: 400, tags: ['Room Service', 'Live Music'] },
            { icon: 'bi-bicycle', title: 'Modern Fitness Studio', delay: 500, tags: ['Personal Training', 'Yoga Classes'] },
            { icon: 'bi-wifi', title: 'High-Speed Internet', delay: 200, tags: ['Business Center', 'Conference Rooms'] },
            { icon: 'bi-shield-check', title: '24/7 Security Service', delay: 300, tags: ['Concierge', 'Valet Parking'] }
          ].map((a, idx) => (
            <div key={a.title} className="col-lg-6" data-aos="zoom-in" data-aos-delay={a.delay}>
              <div className="amenity-card">
                <div className="card-header">
                  <div className="amenity-icon">
                    <i className={`bi ${a.icon}`}></i>
                  </div>
                  <h4>{a.title}</h4>
                </div>
                <div className="amenity-content">
                  <p>
                    {idx === 0 &&
                      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione.'}
                    {idx === 1 &&
                      'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi.'}
                    {idx === 2 &&
                      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.'}
                    {idx === 3 &&
                      'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae.'}
                    {idx === 4 &&
                      'Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque.'}
                    {idx === 5 &&
                      'Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis.'}
                  </p>
                  <div className="amenity-features">
                    {a.tags.map((t) => (
                      <span key={t} className="feature-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="amenities-cta text-center mt-5" data-aos="fade-up" data-aos-delay="600">
          <div className="cta-content">
            <h5>Experience Premium Comfort</h5>
            <p className="mb-4">Discover all the exceptional facilities we offer to make your stay unforgettable</p>
            <a href="#" className="btn-explore" onClick={(e) => e.preventDefault()}>
              Explore All Amenities
            </a>
          </div>
        </div> */}
      </div>
    </section>
  )
}

