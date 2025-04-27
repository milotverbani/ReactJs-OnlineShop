import React from 'react'
import Navi from './Navi'
import Slider from './Slider'
import Products from './Products'
import Testimonials from './Testimonials'
import Footer from './Footer'


function Home() {
  return (
    <>
        <Navi/>
        <Slider/>
        <Products/>
        <Testimonials/>
        <Footer/>
    </>
  )
}

export default Home