import React from 'react'

const Message = ({ bgcolor, txtcolor, children }) => {
    return (
        <div
            className='message'
            style={{
                backgroundColor: bgcolor,
                color: txtcolor,
                width: '100%',
                padding: '1.5rem',
                borderRadius: '3px',
            }}>
            {children}
        </div>
    )
}

export default Message
