import React from 'react'
import ContactMiddle from '../components/contact/ContactMiddle'
import ContactTop from '../components/contact/ContactTop'
import ContactEnd from '../components/contact/ContactEnd'
import MapSection from '../components/contact/MapLocation'

const Contact = () => {
  return (
    <div>
      <ContactTop/>
      <ContactMiddle/>
      <ContactEnd/>
      <MapSection/>
    </div>
  )
}

export default Contact
