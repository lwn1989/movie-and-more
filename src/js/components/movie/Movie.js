import React from 'react'
import MovieList from './MovieList.js'
import movieStore from '../../data/MovieStore.js'
import MoveSlider from './MovieSlider.js'

export default class Movie extends React.Component {
  render () {
    return (
      <div>
        <MoveSlider store={movieStore} />
        <MovieList store={movieStore} />
      </div>
    )
  }
}
