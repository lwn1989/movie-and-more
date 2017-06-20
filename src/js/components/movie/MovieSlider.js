import React from 'react'
import { observer } from 'mobx-react'
import movieGenres from '../../data/MovieGenresList.json'
import { NavLink } from 'react-router-dom'

@observer
export default class MovieSlider extends React.Component {
  render () {
    const { store } = this.props
    const {popularMovies} = store
    var firstMovie = []
    popularMovies.forEach((movie, index) => {
      if (index === 0) {
        firstMovie.push(movie)
      }
    })
    console.log(firstMovie)
    return (
      <ul className='sliderList'>
        {firstMovie.map((movie, index) => <li key={index} className='most-pop'><SingleSlider movieInfo={movie} key={index} /></li>)
        }
      </ul>
    )
  }
}

@observer
export class SingleSlider extends React.Component {
  render () {
    const { movieInfo } = this.props
    const bkImage = {
      background: "linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)), url('https://image.tmdb.org/t/p/w1000" + movieInfo.backdrop_path + "'), no-repeat, center center, fixed"
    }
    return (
      <NavLink className='navLink' to={'/movie/' + movieInfo.id}>
        <div className='slider' style={bkImage}>
          <div className='poster-img'>
            <img src={'https://image.tmdb.org/t/p/w500/' + movieInfo.poster_path} />
          </div>
          <div className='intro'>
            <div className='title'>{movieInfo.title}</div>
          </div>
        </div>
      </NavLink>
    )
  }
}
