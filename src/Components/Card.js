import React from 'react'

function Card({films}) {
  return (
    <div className='card'>
      <img src={"https://image.tmdb.org/t/p/original/"+films.poster_path} className='img'/>
      <h1>{films.original_title}</h1>
    </div>
  )
}

export default Card

