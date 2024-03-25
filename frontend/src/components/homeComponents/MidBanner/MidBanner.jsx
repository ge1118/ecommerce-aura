import React from 'react'
import { useNavigate } from 'react-router-dom'
import './MidBanner.scss'

const MidBanner = () => {

    const navigate = useNavigate();

    return (
        <div className='midbanner'>
            <div className="bannerslogan">
                <h1>Eco-friendly Brands</h1>
                <h2>Certified organic and cruelty-free</h2>

                <button onClick={() => navigate('/products')}>View Products</button>
            </div>
        </div>
    )
}

export default MidBanner
