import React, { useEffect, useState } from 'react'
import './favorite.css'
import Axios from 'axios'
import { Popover } from 'antd'
import { IMAGE_BASE_URL } from '../../Config'


function FavoritePage() {
    const [Favorites, setFavorites] = useState([])
    useEffect(() => {
        fetchFavorites()
    }, [])
    const fetchFavorites = () => {
        Axios.post('/api/favorite/getFavorites', { userFrom: localStorage.getItem('userId') })
            .then(res => {
                if (res.data.success) {
                    setFavorites(res.data.favorites)
                } else alert('영화 정보 가져오기 실패')
            })
    }
    const onClickDelete = (movieId, userFrom) => {
        const variable = { movieId, userFrom }
        Axios.post('/api/favorite/removeFromFavorite', variable)
            .then(res => {
                if (res.data.success) {
                    fetchFavorites()
                } else alert('리스트에서 삭제 실패')
            })
    }
    const renderCards = Favorites.map((fav, index) => {
        const content = (
            <div>
                {fav.moviePost ? <img src={`${IMAGE_BASE_URL}w500${fav.moviePost}`} /> : "no image"}
            </div>
        )
        return <tr key={index} >
            <Popover title={`${fav.movieTitle}`} content={content}><td>{fav.movieTitle}</td></Popover>
            <td>{fav.movieRunTime}(mins)</td>
            <td><button onClick={() => onClickDelete(fav.movieId, fav.userFrom)}>Remove</button></td>
        </tr>
    })
    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h2>Favorite Movies</h2>
            <hr />
            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie RunTime</th>
                        <th>Remove from Favorites</th>
                    </tr>
                </thead>
                <tbody>
                    {renderCards}
                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage