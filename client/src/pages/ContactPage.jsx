import Header from '../sections/Header.jsx'
import Footer from '../sections/Footer.jsx'
import PageTitle from '../components/PageTitle.jsx'
import ContactSection from '../sections/ContactSection.jsx'

export default function ContactPage() {
  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Contact', current: true }
  ]

  return (
    <>
      <Header />
      <main className="main">
        <PageTitle 
          title="Contact" 
          description="Esse dolorum voluptatum ullam est sint nemo et est ipsa porro placeat quibusdam quia assumenda numquam molestias."
          bgImage="https://bootstrapmade.com/content/demo/LuxuryHotel/assets/img/hotel/showcase-7.webp"
          breadcrumbs={breadcrumbs}
        />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
