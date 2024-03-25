import React from 'react'
import './NewcomingProducts.scss'
import Product from '../../sharedComponents/Product/Product'

const NewcomingProducts = () => {
    return (
        <>
            {/* <AboutBanner
                imgurl='src/assets/images/aboutbannerbg2.webp'
                style={{ right: '10rem', alignItems: 'flex-end' }}
            >
                <h1>Pure. Clean. Beauty.</h1>
                <h2>Products we're crushing on this month</h2>
            </AboutBanner>
            <div className='newproducts'>
                {
                    [...Array(3).keys()].map((i) => (
                        <Product key={i} status='Coming Soon' color='#8b7569' />
                    ))
                }
            </div> */}
        </>
    )
}

export default NewcomingProducts
