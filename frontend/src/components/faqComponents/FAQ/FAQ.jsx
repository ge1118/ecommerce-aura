import React, { useState } from 'react'
import './FAQ.scss'

const FAQ = () => {

    const [toggleExpand, setToggleExpand] = useState([]);

    const toggleHandler = (itemId) => {
        setToggleExpand((prevItems) => {
            if (toggleExpand.includes(itemId)) {
                return prevItems.filter(item => item !== itemId);
            } else {
                return [...prevItems, itemId];
            }
        });
    };

    return (
        <div className='faq'>
            <div className="faq-item">
                <button className="question" onClick={() => toggleHandler(1)}>
                    {
                        toggleExpand.includes(1) ?
                            <i className="fa-solid fa-minus"></i> :
                            <i className="fa-solid fa-plus"></i>
                    }
                    What is your return policy?
                </button>

                <span className={`answer ${toggleExpand.includes(1) ? 'visible' : ''}`}>
                    You have 21 days to make a return for an exchange or store credit. If your product was damaged, we will exchange the item for a non-damaged unit.
                    If we are unable to offer a replacement, we will issue a refund.
                </span>
            </div>

            <div className="faq-item">
                <button className="question" onClick={() => toggleHandler(2)}>
                    {
                        toggleExpand.includes(2) ?
                            <i className="fa-solid fa-minus"></i> :
                            <i className="fa-solid fa-plus"></i>
                    }
                    Do you include samples with orders?
                </button>

                <span className={`answer ${toggleExpand.includes(2) ? 'visible' : ''}`}>
                    Yes! We include samples with every order. The more you spend, the more you get!
                </span>
            </div>

            <div className="faq-item">
                <button className="question" onClick={() => toggleHandler(3)}>
                    {
                        toggleExpand.includes(3) ?
                            <i className="fa-solid fa-minus"></i> :
                            <i className="fa-solid fa-plus"></i>
                    }
                    I'm not sure what product to buy. Can you help?
                </button>

                <span className={`answer ${toggleExpand.includes(3) ? 'visible' : ''}`}>
                    Absolutely! Feel free to send us an email and we'd be happy to help you find what product is best for you.
                </span>
            </div>

            <div className="faq-item">
                <button className="question" onClick={() => toggleHandler(4)}>
                    {
                        toggleExpand.includes(4) ?
                            <i className="fa-solid fa-minus"></i> :
                            <i className="fa-solid fa-plus"></i>
                    }
                    I have opened the product and use it once. Can I return it?
                </button>

                <span className={`answer ${toggleExpand.includes(4) ? 'visible' : ''}`}>
                    Used or opened items* can be returned for a store credit in the full amount paid for the item.
                    <br />
                    <br />
                    *Some products may be final sale due to sanitary reasons - those products will have a note on the initial receipt.
                </span>
            </div>
        </div>
    )
}

export default FAQ
