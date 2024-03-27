import React from 'react'
import Details from '../components/productComponents/Details/Details'
import Reviews from '../components/productComponents/Reviews/Reviews'
import DetailBanner from '../components/productComponents/DetailBanner/DetailBanner'
import Recommended from '../components/productComponents/Recommended/Recommended'

const ProductDetailsPage = () => {
    return (
        <div className='page'>
            <Details />
            <Reviews />
            <DetailBanner />
            {/* <Recommended /> */}
        </div>
    )
}

export default ProductDetailsPage
