import React from 'react'
import { Col } from 'antd'

function GridCard(props) {
    if (props.landingPage) {
        return (
            <Col lg={3} md={6} xs={12}>
                <div style={{ position: 'relative' }}>
                    <a href={`/movie/${props.movieId}`}>
                        <img style={{ width: '100%', height: '100%' }} src={props.image} alt={props.movieName} />
                    </a>
                </div>
            </Col>
        )
    } else {
        return (
            <Col lg={3} md={6} xs={12}>
                <div style={{ position: 'relative' }}>
                    {props.image ? <img style={{ width: '100%', height: '100%' }} src={props.image} alt={props.characterName} /> : props.characterName}
                </div>
            </Col>
        )
    }
}

export default GridCard
