import Header from '../sections/Header.jsx'
import Hero from '../sections/Hero.jsx'
import AboutHome from '../sections/AboutHome.jsx'
import RoomsShowcase from '../sections/RoomsShowcase.jsx'
import AmenitiesCards from '../sections/AmenitiesCards.jsx'
import Testimonials from '../sections/Testimonials.jsx'
import CallToAction from '../sections/CallToAction.jsx'
import GalleryShowcase from '../sections/GalleryShowcase.jsx'
import Footer from '../sections/Footer.jsx'

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="main">
        <Hero />
        <AboutHome />
        <RoomsShowcase />
        <AmenitiesCards />
        <Testimonials />
        <CallToAction />
        <GalleryShowcase />
      </main>
      <Footer />
      <a href="#" id="scroll-top" className="scroll-top d-flex align-items-center justify-content-center">
        <i className="bi bi-arrow-up-short"></i>
      </a>
    </>
  )
}

