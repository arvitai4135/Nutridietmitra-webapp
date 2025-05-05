import React, { useState } from 'react';
import Appointment from '../form/Appointment';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    setFormData({
      name: '',
      phone: '',
      email: '',
      subject: '',
      message: ''
    });
    alert('Message sent successfully!');
  };

  const openAppointmentModal = () => {
    setIsAppointmentOpen(true);
  };

  const closeAppointmentModal = () => {
    setIsAppointmentOpen(false);
  };

  return (
    <div className="font-sans text-nutricare-text-dark w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-nutricare-primary-dark to-nutricare-primary-light py-16 sm:py-20 lg:py-24 w-full">
        <div className="absolute inset-0 opacity-10 bg-pattern"></div>
        <div className="container mx-auto px-3 sm:px-4 relative z-10">
          <div className="max-w-full sm:max-w-2xl lg:max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">Connect with Nutridietmitra</h1>
            <p className="text-lg sm:text-xl text-white opacity-90 mb-8">Reach out to Dt. Tanu Bhargava and her team for personalized nutrition guidance and support.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <a href="#contact-form" className="bg-nutricare-green hover:bg-nutricare-green-dark text-white font-medium py-3 px-8 rounded-full transition duration-300 inline-flex items-center">
                Send Message
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </a>
              <button
                onClick={openAppointmentModal}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-medium py-3 px-8 rounded-full transition duration-300 inline-flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                Book Free Consultation
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="#ffffff" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-white w-full">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Card 1 */}
            <div className="bg-nutricare-bg-light rounded-xl p-4 sm:p-6 lg:p-8 text-center transition-transform duration-300 hover:-translate-y-2 shadow-md hover:shadow-lg">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-nutricare-primary-light text-white rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-nutricare-primary-dark mb-4">Visit Us</h3>
              <p className="text-nutricare-text-gray text-sm sm:text-base mb-4">
                OM RESIDENCY 93/B2 Mauji Colony, Malviya Nagar, Jaipur, Rajasthan
              </p>
              <a href="https://maps.google.com/?q=OM+RESIDENCY+93/B2+Mauji+Colony,+Malviya+Nagar,+Jaipur,+Rajasthan" target="_blank" rel="noopener noreferrer" className="inline-block text-nutricare-primary-light hover:text-nutricare-primary-dark font-medium transition duration-300">
                Get Directions
              </a>
            </div>

            {/* Card 2 */}
            <div className="bg-nutricare-bg-light rounded-xl p-4 sm:p-6 lg:p-8 text-center transition-transform duration-300 hover:-translate-y-2 shadow-md hover:shadow-lg">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-nutricare-green text-white rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-nutricare-primary-dark mb-4">Email Us</h3>
              <p className="text-nutricare-text-gray text-sm sm:text-base mb-4">
                Reach out for nutrition guidance or inquiries<br />
                anytime
              </p>
              <a href="mailto:Nutridietmitra@gmail.com" className="inline-block text-nutricare-primary-light hover:text-nutricare-primary-dark font-medium transition duration-300">
                Nutridietmitra@gmail.com
              </a>
            </div>

            {/* Card 3 */}
            <div className="bg-nutricare-bg-light rounded-xl p-4 sm:p-6 lg:p-8 text-center transition-transform duration-300 hover:-translate-y-2 shadow-md hover:shadow-lg">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-nutricare-primary-dark text-white rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-nutricare-primary-dark mb-4">Call Us</h3>
              <p className="text-nutricare-text-gray text-sm sm:text-base mb-4">
                Mon-Sat from 9am to 6pm
              </p>
              <a href="tel:+917568153534" className="inline-block text-nutricare-primary-light hover:text-nutricare-primary-dark font-medium transition duration-300">
                +91-7568153534
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Department Contacts & Form Section */}
      <section className="py-12 sm:py-16 bg-gray-50 w-full" id="contact-form">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex flex-col lg:flex-row -mx-4">
            {/* Left Side */}
            <div className="w-full lg:w-1/2 px-4 mb-12 lg:mb-0">
              <div className="max-w-full sm:max-w-md lg:max-w-lg">
                <h2 className="text-2xl sm:text-3xl font-bold text-nutricare-primary-dark mb-4">Reach Our Team</h2>
                <p className="text-nutricare-text-gray text-sm sm:text-base mb-10">
                  Contact Dt. Tanu Bhargava directly for personalized nutrition plans or inquiries about our services.
                </p>
                
                <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6 lg:mb-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-6">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-nutricare-primary-light bg-opacity-10 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-nutricare-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-nutricare-primary-dark mb-2">Nutrition Consultations</h4>
                      <h5 className="text-base sm:text-lg font-medium mb-3">Dt. Tanu Bhargava</h5>
                      <ul className="space-y-2">
                        <li className="flex items-center text-nutricare-text-gray text-sm sm:text-base">
                          <svg className="w-4 h-4 mr-2 text-nutricare-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                          </svg>
                          <a href="tel:+917568153534" className="text-nutricare-text-gray hover:text-nutricare-primary-light transition duration-300">
                            +91-7568153534
                          </a>
                        </li>
                        <li className="flex items-center text-nutricare-text-gray text-sm sm:text-base">
                          <svg className="w-4 h-4 mr-2 text-nutricare-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                          </svg>
                          <a href="mailto:Nutridietmitra@gmail.com" className="text-nutricare-primary-light hover:underline">Nutridietmitra@gmail.com</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 lg:p-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-6">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-nutricare-green bg-opacity-10 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-nutricare-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-nutricare-primary-dark mb-2">Food Delivery Inquiries</h4>
                      <h5 className="text-base sm:text-lg font-medium mb-3">Nutridietmitra Team</h5>
                      <ul className="space-y-2">
                        <li className="flex items-center text-nutricare-text-gray text-sm sm:text-base">
                          <svg className="w-4 h-4 mr-2 text-nutricare-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                          </svg>
                          <a href="tel:+917568153534" className="text-nutricare-text-gray hover:text-nutricare-primary-light transition duration-300">
                            +91-7568153534
                          </a>
                        </li>
                        <li className="flex items-center text-nutricare-text-gray text-sm sm:text-base">
                          <svg className="w-4 h-4 mr-2 text-nutricare-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                          </svg>
                          <a href="mailto:Nutridietmitra@gmail.com" className="text-nutricare-primary-light hover:underline">Nutridietmitra@gmail.com</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 px-4">
              <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 lg:p-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-nutricare-primary-dark mb-6">Send Your Message</h2>
                <p className="text-nutricare-text-gray text-sm sm:text-base mb-8">
                  Have questions about our nutrition plans or food delivery? We're here to assist you!
                </p>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                    <div>
                      <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-nutricare-text-gray mb-2">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-nutricare-primary-light focus:border-transparent transition"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-nutricare-text-gray mb-2">Phone Number</label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-nutricare-primary-light focus:border-transparent transition"
                        placeholder="+91 123 456 7890"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4 sm:mb-6">
                    <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-nutricare-text-gray mb-2">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-nutricare-primary-light focus:border-transparent transition"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div className="mb-4 sm:mb-6">
                    <label htmlFor="subject" className="block text-xs sm:text-sm font-medium text-nutricare-text-gray mb-2">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-nutricare-primary-light focus:border-transparent transition"
                      placeholder="E.g., Nutrition Plan Inquiry"
                    />
                  </div>
                  
                  <div className="mb-6 sm:mb-8">
                    <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-nutricare-text-gray mb-2">Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4 sm:rows-5"
                      required
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-nutricare-primary-light focus:border-transparent transition"
                      placeholder="Tell us how we can assist you..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full py-3 px-8 bg-gradient-to-r from-nutricare-primary-dark to-nutricare-primary-light hover:from-nutricare-primary-light hover:to-nutricare-primary-dark text-white font-medium rounded-lg transition duration-300 flex items-center justify-center"
                  >
                    <span>Send Message</span>
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Appointment Modal */}
      {isAppointmentOpen && (
        <Appointment isOpen={isAppointmentOpen} onClose={closeAppointmentModal} />
      )}
    </div>
  );
};

export default ContactPage;