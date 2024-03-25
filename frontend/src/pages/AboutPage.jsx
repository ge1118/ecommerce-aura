import React from 'react'
import About from '../components/aboutComponents/About/About'
import NewcomingProducts from '../components/aboutComponents/NewcomingProducts/NewcomingProducts'
import AboutBanner from '../components/aboutComponents/AboutBanner/AboutBanner'

const AboutPage = () => {
    return (
        <div className='page'>
            <AboutBanner />
            <About />
            {/* <NewcomingProducts /> */}
        </div>
    )
}

export default AboutPage
