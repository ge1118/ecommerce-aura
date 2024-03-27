import React from 'react'
import MainBanner from '../components/homeComponents/MainBanner/MainBanner'
import Mission from '../components/homeComponents/Mission/Mission'
import Categories from '../components/homeComponents/Categories/Categories'
import Testimonials from '../components/homeComponents/Testimonials/Testimonials'
import MidBanner from '../components/homeComponents/MidBanner/MidBanner'
import ProductsList from '../components/sharedComponents/ProductsList/ProductsList'


const HomePage = () => {
    return (
        <div className='page'>
            <MainBanner />
            <Mission />
            <Categories />
            <ProductsList />
            <MidBanner />
            <Testimonials />
        </div>
    )
}

export default HomePage
