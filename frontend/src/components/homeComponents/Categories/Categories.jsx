import React from 'react'
import './Categories.scss'
import makeup from '../../../assets/images/makeup.webp'
import hairnails from '../../../assets/images/hairnails.webp'
import organic from '../../../assets/images/organic.webp'
import { useNavigate } from 'react-router-dom'

const Categories = () => {

    const navigate = useNavigate();

    return (
        <div className='categories'>
            <div className="category" onClick={() => navigate('/products/makeup')}>
                <div className="hover">
                    <img src={makeup} alt="makeup" />
                    <p>Makeup Essentials</p>
                </div>
                <p>Everything you need for glowing skin</p>
            </div>

            <div className="category" onClick={() => navigate('/products/hair+nails')}>
                <div className="hover">
                    <img src={hairnails} alt="hair + nails" />
                    <p>Gorgeous Tresses</p></div>
                <p>Beautiful, healthy hair can be yours</p>
            </div>

            <div className="category" onClick={() => navigate('/products/wellness/edible-beauty')}>
                <div className="hover">
                    <img src={organic} alt="organic" />
                    <p>Everyday Organic</p></div>
                <p>Healthy ingredients, inside and out</p>
            </div>
        </div>
    )
}

export default Categories
