export default function GalleryShowcase() {
  return (
    <section id="gallery-showcase" className="gallery-showcase section">
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="gallery-carousel swiper init-swiper" data-aos="fade-up" data-aos-delay="200">
          <script type="application/json" className="swiper-config">
            {JSON.stringify(
              {
                loop: true,
                speed: 600,
                autoplay: { delay: 3000 },
                slidesPerView: 1,
                spaceBetween: 20,
                centeredSlides: true,
                breakpoints: {
                  576: { slidesPerView: 2, centeredSlides: false },
                  768: { slidesPerView: 3, centeredSlides: false },
                  992: { slidesPerView: 4, centeredSlides: false },
                  1200: { slidesPerView: 5, centeredSlides: false }
                }
              },
              null,
              2
            )}
          </script>

          <div className="swiper-wrapper">
            {[
              'gallery-1.webp',
              'gallery-5.webp',
              'gallery-12.webp',
              'gallery-8.webp',
              'gallery-15.webp',
              'gallery-3.webp',
              'gallery-18.webp',
              'gallery-7.webp'
            ].map((img) => (
              <div key={img} className="swiper-slide">
                <div className="gallery-item">
                  <img
                    src={`https://bootstrapmade.com/content/demo/LuxuryHotel/assets/img/hotel/${img}`}
                    alt="Gallery"
                    className="img-fluid"
                    loading="lazy"
                  />
                  {/* <a
                    href={`https://bootstrapmade.com/content/demo/LuxuryHotel/assets/img/hotel/${img}`}
                    className="gallery-overlay glightbox"
                  >
                    <i className="bi bi-eye"></i>
                  </a> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

