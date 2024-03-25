import React, { useState } from 'react'
import './MainBanner.scss'
import { useNavigate } from 'react-router-dom'

const MainBanner = () => {

    const [banner, setBanner] = useState(1);
    const navigate = useNavigate();

    return (
        <div className='mainbanner'>
            {
                banner === 1 ?
                    <div className='mainbanner1'>
                        <div className='bannerslogan'>
                            <h1>The New Nudes</h1>
                            <h2>Bare your best self with our new shades</h2>

                            <button onClick={() => navigate('/products/makeup')}>Shop Makeup</button>
                        </div>
                    </div>
                    :
                    <div className='mainbanner2'>
                        <div className='bannerslogan'>
                            <h1>A Rose is a Rose</h1>
                            <h2>Discover the healing powers of aloe + rose clay</h2>

                            <button onClick={() => navigate('/products/bath+body/soap')}>View Collection</button>
                        </div>
                    </div>
            }

            <div className="arrow">
                <i className="fa-solid fa-angle-left" onClick={() => { banner === 1 ? setBanner(2) : setBanner(1) }} />
                <i className="fa-solid fa-angle-right" onClick={() => { banner === 1 ? setBanner(2) : setBanner(1) }} />
            </div>
        </div>
    )
}

export default MainBanner
