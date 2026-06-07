import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { RoomContext } from '../context/RoomContext'
import HomePagePresidential_suite from '../components/HomePagePresidential_suite'
import HomePageBusiness_suites from '../components/HomePageBusiness_suites'
import HomaPageMultipleRooms from '../components/HomaPageMultipleRooms'

export default function RoomsShowcase() {

  const { loading } = useContext(RoomContext)




  {/* LOADING STATE */ }
  {
    loading && (
      <tr>
        <td colSpan="5" className="p-6 text-center text-[#8c735d]">
          Loading roomstandard_rooms...
        </td>
      </tr>
    )
  }

  return (



    <section id="rooms-showcase" className="rooms-showcase section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Rooms</h2>
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row">
          <HomePagePresidential_suite />
          <HomePageBusiness_suites />
        </div>

        <div className="row mt-5">
          <HomaPageMultipleRooms />
        </div>

        <div className="text-center mt-5" data-aos="fade-up" data-aos-delay="600">
          <Link to="/rooms" className="discover-all-btn" >
            Discover All Accommodations
          </Link>
        </div>
      </div>
    </section>
  )
}

