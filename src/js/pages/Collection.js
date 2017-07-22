import React from 'react'
import movieStore from '../data/MovieStore.js'
import tvStore from '../data/TvStore.js'
import { NavLink } from 'react-router-dom'

export default class Collection extends React.Component {
  constructor () {
    super()
    this.state = { change: 0 }
  }

  deleteLike (itemId, mediaType, e) {
    e.preventDefault()
    if (mediaType === 'mov') {
      movieStore.movieCollections.delete(itemId.toString())
    } else {
      tvStore.tvCollections.delete(itemId.toString())
    }
    this.setState({change: this.state.change++})
  }
  render () {
    const {movieCollections} = movieStore
    const {tvCollections} = tvStore
    var movieIdList = movieStore.movieCollections.keys()
    var tvIdList = tvStore.tvCollections.keys()
    var movieList
    var tvList, tmpLen, i
    if (movieIdList.length < 12) {
      tmpLen = movieIdList.length
      movieList = movieIdList.map((movieId, index) => 'https://image.tmdb.org/t/p/w500' + movieCollections.get(movieId).poster_path)
      for (i = 0; i < 12 - tmpLen; i++) {
        movieList.push('https://image.ibb.co/hhLEFF/aaa.png')
        movieIdList.push('-1')
      }
    } else {
      movieList = movieIdList.map((movieId, index) => 'https://image.tmdb.org/t/p/w500' + movieCollections.get(movieId).poster_path)
    }

    if (tvIdList.length < 12) {
      tmpLen = tvIdList.length
      tvList = tvIdList.map((tvId, index) => 'https://image.tmdb.org/t/p/w500' + tvCollections.get(tvId).poster_path)
      for (i = 0; i < 12 - tmpLen; i++) {
        tvList.push('https://image.ibb.co/hhLEFF/aaa.png')
        tvIdList.push('-1')
      }
    } else {
      tvList = tvIdList.map((tvId, index) => 'https://image.tmdb.org/t/p/w500' + tvCollections.get(tvId).poster_path)
    }

    return (
      <div className='Collections'>
        <div className='title'>
          Collection
        </div>
        <div className='container'>
          <div className='movieCollections'>
            <div className='collectionTitle'>
              <i className='titleIcon fa fa-film' aria-hidden='true' />
            Movie
            </div>
            <div className='collectionList'>
              { movieList.map((addr, index) => (movieIdList[index] === '-1' ? <NavLink key={index} to='/movieApp/'><img className='blankItem' key={index} src={addr} /></NavLink> : <NavLink className='eachItem' key={index} to={'/movieApp/movie/' + movieIdList[index]}><img key={index} src={addr} className='liked' /><button className='deleteLike' onClick={this.deleteLike.bind(this, movieIdList[index], 'mov')} ><i className='fa fa-trash' /></button></NavLink>)) }
            </div>
          </div>
          <div className='tvCollections'>
            <div className='collectionTitle'>
              <i className='titleIcon fa fa-television' aria-hidden='true' />
            TV Show
          </div>
            <div className='collectionList'>
              { tvList.map((addr, index) => (tvIdList[index] === '-1' ? <NavLink key={index} to='/movieApp/tv'><img className='blankItem' key={index} src={addr} /></NavLink> : <NavLink className='eachItem' key={index} to={'/movieApp/tv/' + tvIdList[index]}><img key={index} src={addr} className='liked' /><button className='deleteLike' onClick={this.deleteLike.bind(this, tvIdList[index], 'tv')}><i className='fa fa-trash' /></button></NavLink>)) }
            </div>
          </div>
        </div>
      </div>
    )
  }
}
