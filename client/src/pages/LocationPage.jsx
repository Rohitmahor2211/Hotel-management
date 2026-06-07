import Header from '../sections/Header.jsx'
import Footer from '../sections/Footer.jsx'
import PageTitle from '../components/PageTitle.jsx'
import LocationSection from '../sections/LocationSection.jsx'

export default function LocationPage() {
  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Location', current: true }
  ]

  return (
    <>
      <Header />
      <main className="main">
        <PageTitle 
          title="Location" 
          description="Esse dolorum voluptatum ullam est sint nemo et est ipsa porro placeat quibusdam quia assumenda numquam molestias."
          bgImage="https://bootstrapmade.com/content/demo/LuxuryHotel/assets/img/hotel/showcase-7.webp"
          breadcrumbs={breadcrumbs}
        />
        <LocationSection />
      </main>
      <Footer />
    </>
  )
}
