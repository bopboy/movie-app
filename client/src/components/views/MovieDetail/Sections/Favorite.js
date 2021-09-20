import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Button } from 'antd'

function Favorite(props) {
    const { movieId, userFrom } = props
    const { title, backdrop_path, runtime } = props.movieInfo
    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)
    const variable = { userFrom, movieId, movieTitle: title, moviePost: backdrop_path, movieRunTime: runtime }

    useEffect(() => {
        Axios.post('/api/favorite/favoriteNumber', variable)
            .then(res => {
                if (res.data.success) {
                    setFavoriteNumber(res.data.favoriteNumber)
                } else alert('정보 가져오기 실패')
            })
        Axios.post('/api/favorite/favorited', variable)
            .then(res => {
                if (res.data.success) {
                    setFavorited(res.data.favorited)
                } else alert('정보 가져오기 실패')
            })
    }, [])
    const onClickFavorite = () => {
        if (Favorited) {
            Axios.post('/api/favorite/removeFromFavorite', variable)
                .then(res => {
                    if (res.data.success) {
                        setFavorited(!Favorited)
                        setFavoriteNumber(FavoriteNumber - 1)
                    } else alert('Favorite 리스트에서 삭제 실패')
                })
        } else {
            Axios.post('/api/favorite/addToFavorite', variable)
                .then(res => {
                    if (res.data.success) {
                        setFavorited(!Favorited)
                        setFavoriteNumber(FavoriteNumber + 1)
                    } else alert('Favorite 리스트에 추가 실패')
                })
        }
    }
    return (
        <div>
            <Button onClick={onClickFavorite}>{Favorited ? "Not Favorite" : "Add to Favorite "} {FavoriteNumber} </Button>
        </div>
    )
}

export default Favorite
