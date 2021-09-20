import React from 'react'

function MainImage(props) {
    return (
        <div style={{
            background: `url('${props.image}'), #1c1c1c`,
            height: '600px',
            // backgroundSize: '100%, contain',
            // backgroundPosition: 'center, center',
            width: '100%',
            position: 'relative'
        }}>
            <div style={{ position: 'absolute', maxWidth: '500px', bottom: '2rem', marginLeft: '2rem' }}>
                <h2 style={{ color: 'white' }}>{props.title}</h2>
                <p style={{ color: 'white', fontSize: '1rem' }}>{props.text}</p>
            </div>
        </div>
    )
}

export default MainImage