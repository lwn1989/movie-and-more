import React from 'react'
import MovieList from '../components/movie/MovieList.js'
import tvStore from '../data/TvStore.js'
import MovieSlider from '../components/movie/MovieSlider.js'

export default class MovieIndex extends React.Component {
  render () {
    return (
      <div>
        <MovieSlider store={tvStore} />
        <MovieList mediaType='tv' store={tvStore} />
      </div>
    )
  }
}
