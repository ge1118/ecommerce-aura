import React from 'react'
import './About.scss'
import aboutimg from '../../../assets/images/aboutimg.webp'

const About = () => {
    return (
        <div className='about'>
            <div className="about-img">
                <img src={aboutimg} alt="" />
            </div>

            <div className="aboutus">
                <h3 className="title">What we believe. Values we live by.</h3>
                <hr />

                <p>
                    We strongly believe that using natural, eco-friendly products is the safest and most effective way to look and feel your best.
                    Increasing studies link chemicals in traditional cosmetics, skincare, and other personal care products to health conditions such as allergies,
                    hormonal disruptions, reproductive issues, cancer, and many others. The only cosmetic ingredients regulated by the FDA are color additives meaning almost
                    anything can go into cosmetics. This makes it very hard for consumers to know which products are potentially harmful.
                    <br />
                    <br />
                    Our mission is to provide our customers with convenience, quality and peace of mind in selecting beauty, personal care and nutritional products.
                    We do this by carrying the highest quality natural products that contain only the purest, non-toxic ingredients.
                </p>
            </div>
        </div>
    )
}

export default About
