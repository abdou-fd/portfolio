import React from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import Hero from '../sections/Hero'
import About from '../sections/About'
import Journey from '../sections/Journey'
import Experience from '../sections/Experience'
import VideoPortfolio from '../sections/VideoPortfolio'
import Projects from '../sections/Projects'
import Skills from '../sections/Skills'
import Certificates from '../sections/Certificates'
import Goal from '../sections/Goal'
import Contact from '../sections/Contact'

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Journey />
        <Experience />
        <VideoPortfolio />
        <Projects />
        <Skills />
        <Certificates />
        <Goal />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default Portfolio
