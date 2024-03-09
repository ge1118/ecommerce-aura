import React from 'react'

const Rating = ({ value, text, color }) => {
    return (
        <div className='rating'>
            {[1, 2, 3, 4, 5].map((num, i) => (
                <span key={i}>
                    <i style={{ color }} className={
                        value >= num
                            ? 'fas fa-star'
                            : value >= (num - 0.5)
                                ? 'fas fa-star-half-alt'
                                : 'far fa-star'
                    } />
                </span>
            ))}
            <span>{text && text}</span>
        </div>
    )
}

export default Rating
