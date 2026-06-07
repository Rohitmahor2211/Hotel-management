export default function Testimonials() {
  return (
    <section id="testimonials" className="testimonials section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Testimonials</h2>
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="testimonial-slider swiper init-swiper">
          <script type="application/json" className="swiper-config">
            {JSON.stringify(
              {
                loop: true,
                speed: 600,
                autoplay: { delay: 4000 },
                slidesPerView: 1,
                spaceBetween: 30,
                navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
                breakpoints: { 768: { slidesPerView: 2 }, 1200: { slidesPerView: 3 } }
              },
              null,
              2
            )}
          </script>

          <div className="swiper-wrapper">
            {[
              {
                img: 'person-f-12.webp',
                text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit sed eiusmod tempor.',
                name: 'Jessica Martinez',
                role: 'UX Designer',
                delay: 200
              },
              {
                img: 'person-m-8.webp',
                text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa.',
                name: 'David Rodriguez',
                role: 'Software Engineer',
                delay: 300
              },
              {
                img: 'person-f-6.webp',
                text: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud.',
                name: 'Amanda Wilson',
                role: 'Creative Director',
                delay: 400
              },
              {
                img: 'person-m-12.webp',
                text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam eaque ipsa quae ab illo inventore veritatis.',
                name: 'Ryan Thompson',
                role: 'Business Analyst',
                delay: 500
              },
              {
                img: 'person-f-10.webp',
                text: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi.',
                name: 'Rachel Chen',
                role: 'Project Manager',
                delay: 600
              }
            ].map((t) => (
              <div key={t.name} className="swiper-slide">
                <div className="testimonial-item" data-aos="zoom-in" data-aos-delay={t.delay}>
                  <div className="testimonial-header">
                    <img
                      src={`https://bootstrapmade.com/content/demo/LuxuryHotel/assets/img/person/${t.img}`}
                      alt={t.name}
                      className="img-fluid"
                      loading="lazy"
                    />
                    <div className="rating">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                    </div>
                  </div>
                  <div className="testimonial-body">
                    <p>{t.text}</p>
                  </div>
                  <div className="testimonial-footer">
                    <h5>{t.name}</h5>
                    <span>{t.role}</span>
                    <div className="quote-icon">
                      <i className="bi bi-chat-quote-fill"></i>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="swiper-navigation">
            <div className="swiper-button-prev" role="button" aria-label="Previous slide"></div>
            <div className="swiper-button-next" role="button" aria-label="Next slide"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

