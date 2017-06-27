import React from 'react'
import MovieList from '../components/movie/MovieList.js'
import movieStore from '../data/MovieStore.js'
import MoveSlider from '../components/movie/MovieSlider.js'

export default class MovieIndex extends React.Component {
  render () {
    return (
      <div>
        <MoveSlider store={movieStore} />
        <MovieList store={movieStore} />
      </div>
    )
  }
}
