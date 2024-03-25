import React from 'react'
import './Recommended.scss'
import Products from '../../sharedComponents/Product/Product'

const Recommended = () => {
    return (
        <div className='recommended'>
            <hr />
            <h1>You may also like</h1>
            <hr />

            <div className="recommended-products">
                {
                    [...Array(3).keys()].map((i) => (
                        <Products key={i} />
                    ))
                }
            </div>

        </div>
    )
}

export default Recommended
