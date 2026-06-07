import React, { useState } from 'react';
import axiosClient from '../api/axios';
import { toast } from 'react-hot-toast';

export default function ContactSection() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosClient.post('/api/contact', formData);
      if (response.data.success) {
        toast.success("Message sent successfully!");
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        toast.error(response.data.message || "Failed to send message.");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact section">
      <div className="container" data-aos="fade-up" data-aos-delay="100">

        {/* Contact Info Boxes */}
        <div className="row gy-4 mb-5">
          <div className="col-lg-4" data-aos="fade-up" data-aos-delay="100">
            <div className="contact-info-box">
              <div className="icon-box">
                <i className="bi bi-geo-alt"></i>
              </div>
              <div className="info-content">
                <h4>Our Address</h4>
                <p>Near Krishna Janmasthan, Mathura, Uttar Pradesh, India</p>
              </div>
            </div>
          </div>

          <div className="col-lg-4" data-aos="fade-up" data-aos-delay="200">
            <div className="contact-info-box">
              <div className="icon-box">
                <i className="bi bi-envelope"></i>
              </div>
              <div className="info-content">
                <h4>Contact Us</h4>
                <p><span>Email :- </span><a href="mailto:info@example.com">info@example.com</a></p>
                <p><span>Phone :- </span>1234567890</p>
              </div>
            </div>
          </div>

          <div className="col-lg-4" data-aos="fade-up" data-aos-delay="300">
            <div className="contact-info-box">
              <div className="icon-box">
                <i className="bi bi-headset"></i>
              </div>
              <div className="info-content">
                <h4>Hours of Operation</h4>
                <p>Sunday-Fri: 9 AM - 6 PM</p>
                <p>Saturday: 9 AM - 4 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Google Maps (Full Width) */}
      <div className="map-section" data-aos="fade-up" data-aos-delay="200">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113575.54760081394!2d77.589146197395!3d27.485122171542133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397371175dec4837%3A0x673998a1f81d11b2!2sMathura%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1717658742831!5m2!1sen!2sin"
          width="100%"
          height="500"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Contact Map"
        ></iframe>
      </div>

      {/* Contact Form Section (Overlapping) */}
      <div className="container form-container-overlap">
        <div className="row justify-content-center" data-aos="fade-up" data-aos-delay="300">
          <div className="col-lg-10">
            <div className="contact-form-wrapper">
              <h2 className="text-center mb-4">Get in Touch</h2>

              <form className="php-email-form" onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="input-with-icon">
                        <i className="bi bi-person"></i>
                        <input type="text" className="form-control" name="name" placeholder="First Name" required value={formData.name} onChange={handleChange} />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="input-with-icon">
                        <i className="bi bi-telephone"></i>
                        <input type="text" className="form-control" name="email" placeholder="Phone No." required value={formData.email} onChange={handleChange} />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group">
                      <div className="input-with-icon">
                        <i className="bi bi-text-left"></i>
                        <input type="text" className="form-control" name="subject" placeholder="Subject" required value={formData.subject} onChange={handleChange} />
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-group">
                      <div className="input-with-icon">
                        <i className="bi bi-chat-dots message-icon"></i>
                        <textarea className="form-control" name="message" placeholder="Write Message..." style={{ height: '180px' }} required value={formData.message} onChange={handleChange}></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 text-center">
                    <button type="submit" className="btn btn-primary btn-submit" disabled={loading}>
                      {loading ? 'SENDING...' : 'SEND MESSAGE'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
