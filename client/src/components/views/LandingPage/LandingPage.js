import React, { useEffect, useState } from 'react'
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../Config'
import { Row } from 'antd'

import MainImage from './Sections/MainImage'
import GridCard from '../commons/GridCard'

function LandingPage() {
    const [Movies, setMovies] = useState([])
    const [MainMovieImage, setMainMovieImage] = useState(null)
    const [CurrentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        fetchMovies(endpoint)
    }, [])
    const fetchMovies = (endpoint) => {
        fetch(endpoint).then(res => res.json()).then(res => {
            console.log(res.results)
            setMovies([...Movies, ...res.results])
            setMainMovieImage(res.results[0])
            setCurrentPage(res.page)
        })
    }
    const loadMoreItems = () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`
        fetchMovies(endpoint)
    }
    return (
        <div style={{ width: '100%', margin: '0' }}>
            {MainMovieImage &&
                <MainImage
                    image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
                    title={MainMovieImage.original_title}
                    text={MainMovieImage.overview}
                />
            }
            <div style={{ width: '85%', margin: '1rem auto' }}>
                <h2>Movies by Latest</h2>
                <hr />
                <Row gutter={[16, 16]}>
                    {Movies && Movies.map((movie, index) => (
                        <React.Fragment key={index}>
                            <GridCard
                                image={movie.poster_path ? `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                                movieId={movie.id}
                                movieName={movie.original_title}
                            />
                        </React.Fragment>
                    ))}
                </Row>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={loadMoreItems}>Load More</button>
            </div>
        </div >
    )
}

export default LandingPage
