import React from 'react'
// import TopBar from '../components/TopBar'
import Hero from '../components/Hero'
import AboutUs from '../components/about/AboutUs'
import Work from '../components/Work'
import Service from '../components/Service'
import Testimonial from '../components/Testimonial'
// import Contact from './Contact'
// import Blog from './Blog'
import ContactMiddle from '../components/contact/ContactMiddle'
import BlogList from '../components/blog/BlogList'
// import Footer from '../components/Footer'


const Home = () => {
  return (
    // <TopBar/>
    // <h1>Header</h1>
    <>
    <Hero/>
    <AboutUs/>
    <Work/>
    <Service/>
    <Testimonial/>
    <ContactMiddle/>
    <BlogList/>
    
    </>
  )
}

export default Home