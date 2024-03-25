import React from 'react'
import MainBanner from '../components/homeComponents/MainBanner/MainBanner'
import Mission from '../components/homeComponents/Mission/Mission'
import Categories from '../components/homeComponents/Categories/Categories'
import Details from '../components/sharedComponents/Details/Details'
import Testimonials from '../components/homeComponents/Testimonials/Testimonials'
import MidBanner from '../components/homeComponents/MidBanner/MidBanner'
import HomeProducts from '../components/homeComponents/HomeProducts/HomeProducts'


const HomePage = () => {
    return (
        <div className='page'>
            <MainBanner />
            <Mission />
            <Categories />
            <HomeProducts />
            {/* <Details /> */}
            <MidBanner />
            <Testimonials />
        </div>
    )
}

export default HomePage
