import Header from '../sections/Header.jsx'
import Footer from '../sections/Footer.jsx'
import PageTitle from '../components/PageTitle.jsx'
import AboutSection from '../sections/AboutSection.jsx'
import RoomsShowcaseAbout from '../sections/RoomsShowcaseAbout.jsx'

export default function AboutPage() {
  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'About', current: true }
  ]

  return (
    <>
      <Header />
      <main className="main">
        <PageTitle 
          title="About" 
          description="Esse dolorum voluptatum ullam est sint nemo et est ipsa porro placeat quibusdam quia assumenda numquam molestias."
          bgImage="https://bootstrapmade.com/content/demo/LuxuryHotel/assets/img/hotel/showcase-7.webp"
          breadcrumbs={breadcrumbs}
        />
        <AboutSection />
        <RoomsShowcaseAbout />
      </main>
      <Footer />
    </>
  )
}
