import Header from '../sections/Header.jsx'
import Footer from '../sections/Footer.jsx'
import PageTitle from '../components/PageTitle.jsx'
import RoomDetailsSection from '../sections/RoomDetailsSection.jsx'

export default function RoomDetailsPage() {
  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Rooms', path: '/rooms' },
    { label: 'Room Details', current: true }
  ]

  return (
    <>
      <Header />
      <main className="main">
        <PageTitle 
          title="Room Details" 
          description="Esse dolorum voluptatum ullam est sint nemo et est ipsa porro placeat quibusdam quia assumenda numquam molestias."
          bgImage="https://bootstrapmade.com/content/demo/LuxuryHotel/assets/img/hotel/showcase-7.webp"
          breadcrumbs={breadcrumbs}
        />
        <RoomDetailsSection />
      </main>
      <Footer />
    </>
  )
}
