import React from 'react'
import './Testimonials.scss'
import img1 from '../../../assets/images/img1.webp'
import img2 from '../../../assets/images/img2.webp'
import img3 from '../../../assets/images/img3.webp'
import img4 from '../../../assets/images/img4.webp'

const Testimonials = () => {
    return (
        <div className='testimonials'>
            <div className="images">
                <div>
                    <img src={img1} alt="" />
                    <img src={img2} alt="" />
                </div>
                <div>
                    <img src={img3} alt="" />
                    <img src={img4} alt="" />
                </div>
            </div>

            <hr />
            <h1>We have the best customers ❣</h1>
            <hr />

            <div className="reviews">
                <div className="review">
                    <p>
                        This is my one-stop shop for all my makeup, hair and skin products!
                        I am so stoked to have found a company whose values are in line with mine,
                        and will support them for a long time to come!!
                    </p>
                    <p>— Kaitlyn M.</p>
                </div>

                <div className="review">
                    <p>
                        I love all the products this shop carries,
                        but especially the lip tints and glazes from Clove + Hallow.
                        They make my lips look amazing and I feel good that there are no horrible chemicals in them!
                    </p>
                    <p>— Alex K.</p>
                </div>

                <div className="review">
                    <p>
                        Before I discovered this shop, I was always disappointed with drugstore makeup + skincare.
                        I am so glad I now have a go-to spot for organic,
                        natural cosmetics that are also against animal testing.
                    </p>
                    <p>— Kelly B.</p>
                </div>
            </div>
        </div>
    )
}

export default Testimonials
