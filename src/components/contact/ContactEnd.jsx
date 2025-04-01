import React, { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

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

  return (
    <div className="font-sans text-nutricare-text-dark">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-nutricare-primary-dark to-nutricare-primary-light py-24">
        <div className="absolute inset-0 opacity-10 bg-pattern"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Get in Touch</h1>
            <p className="text-white text-xl opacity-90 mb-8">We're here to help and answer any questions you might have</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#contact-form" className="bg-nutricare-green hover:bg-nutricare-green-dark text-white font-medium py-3 px-8 rounded-full transition duration-300 inline-flex items-center">
                Send Message
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </a>
              <a href="tel:+0598756543" className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-medium py-3 px-8 rounded-full transition duration-300 inline-flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                Call Us
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#ffffff" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-nutricare-bg-light rounded-xl p-8 text-center transition-transform duration-300 hover:-translate-y-2 shadow-md hover:shadow-lg">
              <div className="w-16 h-16 bg-nutricare-primary-light text-white rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-nutricare-primary-dark mb-4">Visit Us</h3>
              <p className="text-nutricare-text-gray mb-4">
                DE 198 Tech Road <br />
                Bridge Str, Newyork 10026 <br />
                United States
              </p>
              <a href="#" className="inline-block text-nutricare-primary-light hover:text-nutricare-primary-dark font-medium transition duration-300">
                Get Directions
              </a>
            </div>

            {/* Card 2 */}
            <div className="bg-nutricare-bg-light rounded-xl p-8 text-center transition-transform duration-300 hover:-translate-y-2 shadow-md hover:shadow-lg">
              <div className="w-16 h-16 bg-nutricare-green text-white rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-nutricare-primary-dark mb-4">Email Us</h3>
              <p className="text-nutricare-text-gray mb-4">
                Feel free to reach out to us<br />
                via email anytime
              </p>
              <a href="mailto:info@example.com" className="inline-block text-nutricare-primary-light hover:text-nutricare-primary-dark font-medium transition duration-300">
                info@example.com
              </a>
            </div>

            {/* Card 3 */}
            <div className="bg-nutricare-bg-light rounded-xl p-8 text-center transition-transform duration-300 hover:-translate-y-2 shadow-md hover:shadow-lg">
              <div className="w-16 h-16 bg-nutricare-primary-dark text-white rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-nutricare-primary-dark mb-4">Call Us</h3>
              <p className="text-nutricare-text-gray mb-4">
                Mon-Fri from 9am to 6pm
              </p>
              <a href="tel:+0598756543" className="inline-block text-nutricare-primary-light hover:text-nutricare-primary-dark font-medium transition duration-300">
                +05 9875 654 32
              </a>
              <br />
              <a href="tel:1234567890" className="inline-block text-nutricare-primary-light hover:text-nutricare-primary-dark font-medium transition duration-300">
                123 456 7890
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Department Contacts & Form Section */}
      <section className="py-16 bg-gray-50" id="contact-form">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4">
            {/* Left Side */}
            <div className="w-full lg:w-1/2 px-4 mb-12 lg:mb-0">
              <div className="max-w-lg">
                <h2 className="text-3xl font-bold text-nutricare-primary-dark mb-4">Department Contacts</h2>
                <p className="text-nutricare-text-gray mb-10">
                  For specific inquiries, please contact the relevant department directly.
                </p>
                
                <div className="bg-white rounded-xl shadow-md p-8 mb-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-6">
                      <div className="w-14 h-14 bg-nutricare-primary-light bg-opacity-10 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-nutricare-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-nutricare-primary-dark mb-2">Career Inquiries</h4>
                      <h5 className="text-lg font-medium mb-3">Alex Hardy</h5>
                      <ul className="space-y-2">
                        <li className="flex items-center text-nutricare-text-gray">
                          <svg className="w-4 h-4 mr-2 text-nutricare-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                          </svg>
                          (+01) 123 456 7899
                        </li>
                        <li className="flex items-center text-nutricare-text-gray">
                          <svg className="w-4 h-4 mr-2 text-nutricare-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                          </svg>
                          <a href="mailto:info@example.com" className="text-nutricare-primary-light hover:underline">info@example.com</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-md p-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-6">
                      <div className="w-14 h-14 bg-nutricare-green bg-opacity-10 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-nutricare-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-nutricare-primary-dark mb-2">Marketing Department</h4>
                      <h5 className="text-lg font-medium mb-3">John Martin</h5>
                      <ul className="space-y-2">
                        <li className="flex items-center text-nutricare-text-gray">
                          <svg className="w-4 h-4 mr-2 text-nutricare-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                          </svg>
                          (+01) 123 456 7899
                        </li>
                        <li className="flex items-center text-nutricare-text-gray">
                          <svg className="w-4 h-4 mr-2 text-nutricare-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                          </svg>
                          <a href="mailto:info@example.com" className="text-nutricare-primary-light hover:underline">info@example.com</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 px-4">
              <div className="bg-white rounded-xl shadow-lg p-8 lg:p-10">
                <h2 className="text-3xl font-bold text-nutricare-primary-dark mb-6">Send Your Message</h2>
                <p className="text-nutricare-text-gray mb-8">
                  Don't hesitate to reach out. Our team is here to help you 24/7.
                </p>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-nutricare-text-gray mb-2">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-nutricare-primary-light focus:border-transparent transition"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-nutricare-text-gray mb-2">Phone Number</label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-nutricare-primary-light focus:border-transparent transition"
                        placeholder="(123) 456-7890"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-medium text-nutricare-text-gray mb-2">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-nutricare-primary-light focus:border-transparent transition"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-sm font-medium text-nutricare-text-gray mb-2">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-nutricare-primary-light focus:border-transparent transition"
                      placeholder="How can we help you?"
                    />
                  </div>
                  
                  <div className="mb-8">
                    <label htmlFor="message" className="block text-sm font-medium text-nutricare-text-gray mb-2">Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-nutricare-primary-light focus:border-transparent transition"
                      placeholder="Tell us about your business needs..."
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


      {/* <a 
        href="#" 
        className="fixed bottom-8 right-8 bg-nutricare-green hover:bg-nutricare-green-dark w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg transition duration-300"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
        </svg>
      </a> */}
    </div>
  );
};

export default ContactPage;