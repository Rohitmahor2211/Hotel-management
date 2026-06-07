import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { RoomContext } from "../context/RoomContext"
import toast from 'react-hot-toast'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

export default function RoomDetailsSection() {
  const { rooms, createPaymentOrder, submitBooking, checkRoomAvailability } = useContext(RoomContext)
  const { id } = useParams()

  const selected_room = rooms.find((room) => {
    return room._id == id
  })


  const [formData, setFormData] = useState({
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    checkIn: null,
    checkOut: null,
    guests: 1
  });
  const [loading, setLoading] = useState(false);
  const [bookingStatus, setBookingStatus] = useState('idle');

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const collectPayment = async (orderData) => {
    if (orderData.order.gateway === "mock") {
      return {
        gateway: "mock",
        orderId: orderData.order.orderId,
        paymentId: `MOCK_PAY_${Date.now()}`,
        signature: "mock-signature"
      };
    }

    const loaded = await loadRazorpayScript();
    if (!loaded) {
      throw new Error("Payment gateway could not be loaded.");
    }

    return new Promise((resolve, reject) => {
      const razorpay = new window.Razorpay({
        key: orderData.order.keyId,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "LuxuryHotel",
        description: selected_room?.title,
        order_id: orderData.order.orderId,
        prefill: {
          name: formData.guestName,
          email: formData.guestEmail,
          contact: formData.guestPhone,
        },
        handler: (response) => {
          resolve({
            gateway: "razorpay",
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          });
        },
        modal: {
          ondismiss: () => reject(new Error("Payment cancelled.")),
        },
      });

      razorpay.open();
    });
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (bookingStatus === 'booked' || bookingStatus === 'invalid' || !formData.checkIn || !formData.checkOut) {
      if (!formData.checkIn || !formData.checkOut) {
        toast.error("Please select both Check-in and Check-out dates.");
      }
      return;
    }

    setLoading(true);
    try {
      const orderData = await createPaymentOrder({
        roomId: selected_room._id,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
      });

      if (!orderData.success) {
        toast.error(orderData.message || "Unable to start payment.");
        return;
      }

      const payment = await collectPayment(orderData);

      const data = await submitBooking({
        roomId: selected_room._id,
        guestName: formData.guestName,
        guestEmail: formData.guestEmail,
        guestPhone: formData.guestPhone,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        guests: formData.guests,
        totalPrice: selected_room.price,
        payment
      });

      if (data.success) {
        toast.success("Booking Successful! Check your email and SMS.");
        setBookingStatus('booked');
      } else {
        toast.error(data.message || "Failed to book room.");
      }
    } catch (error) {
      console.error(error);
      if (error.message !== "Payment cancelled.") {
        toast.error("Error booking room. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date, name) => {
    setFormData({ ...formData, [name]: date });
  };

  // Check date availability
  useEffect(() => {
    const checkAvailability = async () => {
      if (!formData.checkIn || !formData.checkOut || !selected_room) {
        setBookingStatus("idle");
        return;
      }

      if (new Date(formData.checkIn) >= new Date(formData.checkOut)) {
        setBookingStatus("invalid");
        return;
      }

      try {
        const data = await checkRoomAvailability(selected_room._id, formData.checkIn, formData.checkOut);
        if (data.success && data.isAvailable === false) {
          setBookingStatus('booked');
        } else {
          setBookingStatus('available');
        }
      } catch (err) {
        console.error("Availability check error", err);
      }
    };
    checkAvailability();
  }, [formData.checkIn, formData.checkOut, selected_room]);


  const [displayImage, setDisplayImage] = useState(0)

  const view = (index) => {
    setDisplayImage(index)
  }


  return (
    <section id="room-details" className="room-details section">
      {/* Premium Booking Animation Overlay */}
      {loading && (
        <div className="booking-loading-overlay">
          <div className="loader-content">
            <div className="loader-spinner"></div>
            <div className="loader-logo">
              <i className="bi bi-shield-check"></i>
            </div>
            <h3>Securing Your Stay</h3>
            <p>Please wait while we verify your booking and secure the payment gateway...</p>
            <div className="loader-progress"></div>
          </div>
          <style dangerouslySetInnerHTML={{ __html: `
            .booking-loading-overlay {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: rgba(255, 255, 255, 0.9);
              backdrop-filter: blur(8px);
              z-index: 9999;
              display: flex;
              align-items: center;
              justify-content: center;
              animation: fadeIn 0.3s ease-out;
            }
            .loader-content {
              text-align: center;
              max-width: 400px;
              padding: 40px;
              border-radius: 30px;
              background: #fff;
              box-shadow: 0 20px 50px rgba(0,0,0,0.1);
            }
            .loader-spinner {
              width: 80px;
              height: 80px;
              border: 5px solid #f3f3f3;
              border-top: 5px solid #6d4c35;
              border-radius: 50%;
              margin: 0 auto 20px;
              animation: spin 1s linear infinite;
            }
            .loader-logo {
              font-size: 40px;
              color: #28a745;
              margin-bottom: 20px;
              animation: pulse 1.5s infinite;
            }
            .loader-progress {
              height: 4px;
              width: 100%;
              background: #f0f0f0;
              border-radius: 2px;
              overflow: hidden;
              margin-top: 20px;
            }
            .loader-progress::after {
              content: '';
              display: block;
              height: 100%;
              width: 50%;
              background: #6d4c35;
              animation: progress 2s infinite linear;
            }
            @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            @keyframes pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.1); opacity: 0.7; } 100% { transform: scale(1); opacity: 1; } }
            @keyframes progress { 0% { margin-left: -50%; } 100% { margin-left: 100%; } }
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          `}} />
        </div>
      )}

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row">
          {/* Room Gallery */}
          <div className="col-lg-8">
            <div className="room-gallery">
              <div className="main-image-container image-zoom-container">
                <img id="main-product-image" src={selected_room?.images?.[displayImage]} alt="Presidential Suite" className="img-fluid main-room-image" data-zoom="https://bootstrapmade.com/content/demo/LuxuryHotel/assets/img/hotel/room-1.webp" />
                {/* <div className="image-nav-buttons">
                  <button className="image-nav-btn prev-image" type="button">
                    <i className="bi bi-chevron-left"></i>
                  </button>
                  <button className="image-nav-btn next-image" type="button">
                    <i className="bi bi-chevron-right"></i>
                  </button>
                </div> */}
              </div>
              <div className="thumbnail-gallery thumbnail-list">
                {/* <div className="thumbnail-item active" data-image="https://bootstrapmade.com/content/demo/LuxuryHotel/assets/img/hotel/room-1.webp">
                  <img src="https://bootstrapmade.com/content/demo/LuxuryHotel/assets/img/hotel/room-1.webp" alt="Presidential Suite" className="img-fluid" />
                </div>
                <div className="thumbnail-item" data-image="https://bootstrapmade.com/content/demo/LuxuryHotel/assets/img/hotel/room-3.webp">
                  <img src="https://bootstrapmade.com/content/demo/LuxuryHotel/assets/img/hotel/room-3.webp" alt="Bedroom View" className="img-fluid" />
                </div>
                <div className="thumbnail-item" data-image="https://bootstrapmade.com/content/demo/LuxuryHotel/assets/img/hotel/room-7.webp">
                  <img src="https://bootstrapmade.com/content/demo/LuxuryHotel/assets/img/hotel/room-7.webp" alt="Bathroom" className="img-fluid" />
                </div>
                <div className="thumbnail-item" data-image="https://bootstrapmade.com/content/demo/LuxuryHotel/assets/img/hotel/room-12.webp">
                  <img src="https://bootstrapmade.com/content/demo/LuxuryHotel/assets/img/hotel/room-12.webp" alt="City View" className="img-fluid" />
                </div>
                <div className="thumbnail-item" data-image="https://bootstrapmade.com/content/demo/LuxuryHotel/assets/img/hotel/room-15.webp">
                  <img src="https://bootstrapmade.com/content/demo/LuxuryHotel/assets/img/hotel/room-15.webp" alt="Living Area" className="img-fluid" /> 
              </div> */}

                {selected_room?.images?.map((img, index) => (
                  <div key={index} className={`thumbnail-item ${index === 0 ? 'active' : ''} max-w-40`} data-image={img}
                    onClick={() => { view(index) }}
                  >
                    <img src={img} alt={`${selected_room?.title} - ${index + 1}`} className="img-fluid " />
                  </div>
                ))}
              </div>
            </div>
          </div>{/* End Room Gallery */}

          {/* Room Details Sidebar */}
          <div className="col-lg-4">
            <div className="room-details-sidebar" data-aos="fade-left" data-aos-delay="200">
              <div className="room-header">
                <h2>{selected_room?.title}</h2>
                <div className="room-rating">
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <span className="rating-text">(4.9)</span>
                </div>
              </div>

              <div className="room-price">
                <div className="price-value">
                  <span className="currency">₹</span>
                  <span className="amount">{selected_room?.price}</span>
                  <span className="period">/night</span>
                </div>
                <p className="price-note">*Taxes and fees not included</p>
              </div>

              {bookingStatus === "booked" && (
                <div className="alert alert-danger">
                  This room is already booked for the selected dates. Please choose different dates.
                </div>
              )}

              {bookingStatus === "available" && (
                <div className="alert alert-success">
                  This room is available for the selected dates.
                </div>
              )}

              {bookingStatus === "invalid" && (
                <div className="alert alert-warning">
                  Check-out date must be after check-in date.
                </div>
              )}

              <div className="booking-form">
                <form onSubmit={handleBooking}>
                  <div className="row">
                    <div className="col-12 mb-3">
                      <label htmlFor="guestName" className="form-label">Full Name</label>
                      <input type="text" className="form-control" id="guestName" name="guestName" required value={formData.guestName} onChange={handleInputChange} />
                    </div>
                    <div className="col-12 mb-3">
                      <label htmlFor="guestEmail" className="form-label">Email Address</label>
                      <input type="email" className="form-control" id="guestEmail" name="guestEmail" required value={formData.guestEmail} onChange={handleInputChange} />
                    </div>
                    <div className="col-12 mb-3">
                      <label htmlFor="guestPhone" className="form-label">Phone Number (Mandatory)</label>
                      <input type="tel" className="form-control" id="guestPhone" name="guestPhone" required value={formData.guestPhone} onChange={handleInputChange} />
                    </div>
                    <div className="col-12 mb-3">
                      <label className="form-label">Check-in</label>
                      <DatePicker
                        selected={formData.checkIn}
                        onChange={(date) => handleDateChange(date, "checkIn")}
                        className="form-control"
                        placeholderText="Select Check-in Date"
                        minDate={new Date()}
                        dateFormat="dd/MM/yyyy"
                      />
                    </div>
                    <div className="col-12 mb-3">
                      <label className="form-label">Check-out</label>
                      <DatePicker
                        selected={formData.checkOut}
                        onChange={(date) => handleDateChange(date, "checkOut")}
                        className="form-control"
                        placeholderText="Select Check-out Date"
                        minDate={formData.checkIn || new Date()}
                        dateFormat="dd/MM/yyyy"
                      />
                    </div>
                    <div className="col-12 mb-3">
                      <label htmlFor="guests" className="form-label">Guests</label>
                      <select className="form-control" id="guests" name="guests" required value={formData.guests} onChange={handleInputChange}>
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4 Guests</option>
                      </select>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className={`btn btn-primary btn-book w-100 ${bookingStatus === 'booked' ? 'disabled' : ''}`}
                    disabled={bookingStatus === 'booked' || bookingStatus === 'invalid' || bookingStatus === 'idle' || loading}
                  >
                    <i className="bi bi-calendar-check me-2"></i>
                    {bookingStatus === 'booked'
                      ? 'Already Booked for these dates'
                      : bookingStatus === 'idle'
                        ? 'Select dates to book'
                        : bookingStatus === 'invalid'
                          ? 'Choose valid dates'
                          : loading
                            ? 'Processing...'
                            : 'Book Now'}
                  </button>
                </form>
              </div>

            </div>
          </div>{/* End Room Details Sidebar */}
        </div>

        <div className="row mt-5">
          <div className="col-12">
            <div className="room-info-tabs" data-aos="fade-up" data-aos-delay="300">
              <ul className="nav nav-tabs" id="roomTabs" role="tablist">
                <li className="nav-item" role="presentation">
                  <button className="nav-link active" id="overview-tab" data-bs-toggle="tab" data-bs-target="#room-details-overview" type="button" role="tab">Overview</button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="amenities-tab" data-bs-toggle="tab" data-bs-target="#room-details-amenities" type="button" role="tab">Amenities</button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="policies-tab" data-bs-toggle="tab" data-bs-target="#room-details-policies" type="button" role="tab">Policies</button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="reviews-tab" data-bs-toggle="tab" data-bs-target="#room-details-reviews" type="button" role="tab">Reviews</button>
                </li>
              </ul>

              <div className="tab-content mt-4" id="roomTabsContent">
                <div className="tab-pane fade show active" id="room-details-overview" role="tabpanel">
                  <div className="row">
                    <div className="col-lg-8">
                      <h3>Room Description</h3>
                      <p className="room-description">
                        {selected_room?.description.split("\n").map((para, index) => (
                          <p key={index}>{para}</p>
                        ))}
                      </p>
                      <div className="room-features-grid mt-4">
                        <div className="feature-item">
                          <i className="bi bi-people"></i>
                          <div className="feature-info">
                            <h5>Max Occupancy</h5>
                            <p>4 Guests</p>
                          </div>
                        </div>
                        <div className="feature-item">
                          <i className="bi bi-arrows-fullscreen"></i>
                          <div className="feature-info">
                            <h5>Room Size</h5>
                            <p>85 sqm</p>
                          </div>
                        </div>
                        <div className="feature-item">
                          <i className="bi bi-moon"></i>
                          <div className="feature-info">
                            <h5>Bed Type</h5>
                            <p>King Bed</p>
                          </div>
                        </div>
                        <div className="feature-item">
                          <i className="bi bi-eye"></i>
                          <div className="feature-info">
                            <h5>View</h5>
                            <p>City Skyline</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="room-stats">
                        <h4>Quick Stats</h4>
                        <div className="stat-item">
                          <span className="stat-label">Check-in:</span>
                          <span className="stat-value">3:00 PM</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-label">Check-out:</span>
                          <span className="stat-value">11:00 AM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="tab-pane fade" id="room-details-amenities" role="tabpanel">
                  <div className="amenities-section">
                    <div className="row">
                      <div className="col-md-6">
                        <h4>Bedroom &amp; Living</h4>
                        <ul className="amenities-list">
                          <li><i className="bi bi-check-circle-fill"></i> King-size bed with premium linens</li>
                          <li><i className="bi bi-check-circle-fill"></i> Separate living area</li>
                          <li><i className="bi bi-check-circle-fill"></i> Work desk with ergonomic chair</li>
                          <li><i className="bi bi-check-circle-fill"></i> Walk-in closet</li>
                          <li><i className="bi bi-check-circle-fill"></i> Blackout curtains</li>
                          <li><i className="bi bi-check-circle-fill"></i> Air conditioning control</li>
                        </ul>

                        <h4 className="mt-4">Entertainment</h4>
                        <ul className="amenities-list">
                          <li><i className="bi bi-check-circle-fill"></i> 65" Smart TV</li>
                          <li><i className="bi bi-check-circle-fill"></i> Premium cable channels</li>
                          <li><i className="bi bi-check-circle-fill"></i> Bluetooth sound system</li>
                          <li><i className="bi bi-check-circle-fill"></i> High-speed Wi-Fi</li>
                        </ul>
                      </div>
                      <div className="col-md-6">
                        <h4>Bathroom</h4>
                        <ul className="amenities-list">
                          <li><i className="bi bi-check-circle-fill"></i> Marble bathroom</li>
                          <li><i className="bi bi-check-circle-fill"></i> Deep soaking tub</li>
                          <li><i className="bi bi-check-circle-fill"></i> Separate rain shower</li>
                          <li><i className="bi bi-check-circle-fill"></i> Double vanity</li>
                          <li><i className="bi bi-check-circle-fill"></i> Luxury toiletries</li>
                          <li><i className="bi bi-check-circle-fill"></i> Heated floors</li>
                        </ul>

                        <h4 className="mt-4">Services &amp; Extras</h4>
                        <ul className="amenities-list">
                          <li><i className="bi bi-check-circle-fill"></i> 24/7 room service</li>
                          <li><i className="bi bi-check-circle-fill"></i> Daily housekeeping</li>
                          <li><i className="bi bi-check-circle-fill"></i> Concierge service</li>
                          <li><i className="bi bi-check-circle-fill"></i> Mini-bar</li>
                          <li><i className="bi bi-check-circle-fill"></i> Coffee maker</li>
                          <li><i className="bi bi-check-circle-fill"></i> Safe deposit box</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="tab-pane fade" id="room-details-policies" role="tabpanel">
                  <div className="policies-section">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="policy-group">
                          <h4>Check-in &amp; Check-out</h4>
                          <ul className="policy-list">
                            <li><strong>Check-in:</strong> 3:00 PM - 12:00 AM</li>
                            <li><strong>Check-out:</strong> 6:00 AM - 11:00 AM</li>
                            <li><strong>Early check-in:</strong> Subject to availability</li>
                            <li><strong>Late check-out:</strong> Additional charges may apply</li>
                          </ul>
                        </div>

                        <div className="policy-group">
                          <h4>Cancellation Policy</h4>
                          <ul className="policy-list">
                            <li>Free cancellation up to 48 hours before check-in</li>
                            <li>Cancellations within 48 hours: 1 night charge</li>
                            <li>No-show: Full charge for entire stay</li>
                            <li>Peak season: 7-day advance cancellation required</li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="policy-group">
                          <h4>House Rules</h4>
                          <ul className="policy-list">
                            <li>No smoking (designated areas available)</li>
                            <li>Pets allowed with additional fee</li>
                            <li>Maximum occupancy: 4 guests</li>
                            <li>Quiet hours: 10:00 PM - 8:00 AM</li>
                            <li>Valid ID required at check-in</li>
                          </ul>
                        </div>

                        <div className="policy-group">
                          <h4>Payment &amp; Fees</h4>
                          <ul className="policy-list">
                            <li>Credit card required for incidentals</li>
                            <li>City tax: $5 per night (not included)</li>
                            <li>Resort fee: $25 per night</li>
                            <li>Parking: $30 per night (valet only)</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="tab-pane fade" id="room-details-reviews" role="tabpanel">
                  <div className="reviews-section">
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="review-summary">
                          <div className="overall-rating">
                            <span className="rating-number">4.9</span>
                            <div className="rating-stars">
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                            </div>
                            <p className="review-count">Based on 247 reviews</p>
                          </div>

                          <div className="rating-breakdown">
                            <div className="rating-item">
                              <span className="rating-label">Cleanliness</span>
                              <div className="rating-bar">
                                <div className="rating-fill" style={{ width: '95%' }}></div>
                              </div>
                              <span className="rating-value">4.8</span>
                            </div>
                            <div className="rating-item">
                              <span className="rating-label">Comfort</span>
                              <div className="rating-bar">
                                <div className="rating-fill" style={{ width: '98%' }}></div>
                              </div>
                              <span className="rating-value">4.9</span>
                            </div>
                            <div className="rating-item">
                              <span className="rating-label">Service</span>
                              <div className="rating-bar">
                                <div className="rating-fill" style={{ width: '94%' }}></div>
                              </div>
                              <span className="rating-value">4.7</span>
                            </div>
                            <div className="rating-item">
                              <span className="rating-label">Location</span>
                              <div className="rating-bar">
                                <div className="rating-fill" style={{ width: '96%' }}></div>
                              </div>
                              <span className="rating-value">4.8</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-8">
                        <div className="reviews-list">
                          <div className="review-item">
                            <div className="reviewer-info">
                              <img src="https://bootstrapmade.com/content/demo/LuxuryHotel/assets/img/person/person-f-3.webp" alt="Sarah M." className="reviewer-avatar" />
                              <div className="reviewer-details">
                                <h5>Sarah M.</h5>
                                <div className="review-stars">
                                  <i className="bi bi-star-fill"></i>
                                  <i className="bi bi-star-fill"></i>
                                  <i className="bi bi-star-fill"></i>
                                  <i className="bi bi-star-fill"></i>
                                  <i className="bi bi-star-fill"></i>
                                </div>
                                <span className="review-date">March 15, 2024</span>
                              </div>
                            </div>
                            <p className="review-text">
                              "Absolutely stunning suite with breathtaking city views. The marble bathroom was luxurious and the bed incredibly comfortable. Service was impeccable throughout our stay."
                            </p>
                          </div>

                          <div className="review-item">
                            <div className="reviewer-info">
                              <img src="https://bootstrapmade.com/content/demo/LuxuryHotel/assets/img/person/person-m-7.webp" alt="Michael R." className="reviewer-avatar" />
                              <div className="reviewer-details">
                                <h5>Michael R.</h5>
                                <div className="review-stars">
                                  <i className="bi bi-star-fill"></i>
                                  <i className="bi bi-star-fill"></i>
                                  <i className="bi bi-star-fill"></i>
                                  <i className="bi bi-star-fill"></i>
                                  <i className="bi bi-star-fill"></i>
                                </div>
                                <span className="review-date">February 28, 2024</span>
                              </div>
                            </div>
                            <p className="review-text">
                              "Perfect for our anniversary celebration. The suite exceeded our expectations in every way. The private balcony was our favorite feature."
                            </p>
                          </div>

                          <div className="review-item">
                            <div className="reviewer-info">
                              <img src="https://bootstrapmade.com/content/demo/LuxuryHotel/assets/img/person/person-f-11.webp" alt="Jessica L." className="reviewer-avatar" />
                              <div className="reviewer-details">
                                <h5>Jessica L.</h5>
                                <div className="review-stars">
                                  <i className="bi bi-star-fill"></i>
                                  <i className="bi bi-star-fill"></i>
                                  <i className="bi bi-star-fill"></i>
                                  <i className="bi bi-star-fill"></i>
                                  <i className="bi bi-star"></i>
                                </div>
                                <span className="review-date">January 12, 2024</span>
                              </div>
                            </div>
                            <p className="review-text">
                              "Beautiful room with excellent amenities. The only minor issue was the check-in process took longer than expected, but the staff made up for it with exceptional service."
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section >
  )
}
