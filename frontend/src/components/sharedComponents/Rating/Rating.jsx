import React from 'react'

const Rating = ({ value, color, text }) => {
    return (
        <div>
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
            <span style={{ marginLeft: '0.6rem' }}>{text && text}</span>
        </div>
    )
}

export default Rating
