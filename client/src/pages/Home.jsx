import React from 'react';
import { useState } from 'react';


import SmoothScroll from '../components/SmoothScroll';
import Hero from '../components/Hero'
import About from '../components/About'
import Work from '../components/Work';
import Footer from '../components/Footer';




function Home() {
  return (
    <> 
      <SmoothScroll>
      <div className="bg-white">
        <Hero />
        <About/>
        <Work/>
        <Footer />
      </div>
    </SmoothScroll>
    </>
  )
}

export default Home
