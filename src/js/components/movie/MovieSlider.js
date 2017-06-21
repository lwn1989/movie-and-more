import React from 'react'
import { observer } from 'mobx-react'
// import movieGenres from '../../data/MovieGenresList.json'
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
  vote (rate) {
    var fullStarCount = Math.floor(rate * 1.0 / 2)
    var halfStarCount = (rate * 1.0 / 2) - fullStarCount >= 0.5
    var greyStarCount
    var icons = []
    const greenStarStyle = {
      color: '#6df08c'
    }
    const greyStarStyle = {
      color: '#8c8c8c'
    }
    for (var i = 0; i < fullStarCount; i++) {
      icons.push(<i key={'h' + i} className='fa fa-star' style={greenStarStyle} />)
    }
    if (halfStarCount) {
      icons.push(<i key={'gr'} className='fa fa-star' style={greyStarStyle} />)
      icons.push(<i key={'hg'} className='fa fa-star-half fgIcon' />)
    }
    if (halfStarCount) {
      greyStarCount = 5 - fullStarCount - 1
    } else {
      greyStarCount = 5 - fullStarCount
    }
    if (greyStarCount !== 0) {
      for (var j = 0; j < greyStarCount; j++) {
        icons.push(<i key={'g' + j} className='fa fa-star' style={greyStarStyle} />)
      }
    }
    return icons
  }
  render () {
    const { movieInfo } = this.props
    const bkImage = {
      background: "linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)), url('https://image.tmdb.org/t/p/w1000" + movieInfo.backdrop_path + "')"
    }
    return (
      <div className='slider' style={bkImage}>
        <NavLink className='navLink poster-img' to={'/movie/' + movieInfo.id}>
          <img src={'https://image.tmdb.org/t/p/w500/' + movieInfo.poster_path} />
        </NavLink>
        <div className='intro'>
          <div className='title'>{movieInfo.title}</div>
          <div className='vote'>{this.vote(movieInfo.vote_average)}</div>
          <p className='overview'>{movieInfo.overview}</p>
        </div>
      </div>
    )
  }
}
