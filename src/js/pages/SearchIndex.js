import React from 'react'
import searchStore from '../data/SearchStore.js'
import { NavLink } from 'react-router-dom'
import { observer } from 'mobx-react'

@observer
export default class SearchIndex extends React.Component {
  construtor () {
  }

  handleResult () {
    if (searchStore.searchResult.length === 0) {
      return <p className='fail'>Sorry, no result found</p>
    } else {
      var jsxItems
      jsxItems = searchStore.searchResult.map((res, ind) =>
      res.media_type === 'tv' || res.media_type === 'movie'
      ? (<li key={ind}>
        <NavLink className='result' to={res.media_type === 'tv' ? '/movieApp/tv/' + res.id : '/movieApp/movie/' + res.id}>
          {res.poster_path == null ? null : <img src={'https://image.tmdb.org/t/p/w500' + res.poster_path} alt='No poster image' />}
          <div className='intro'>
            <p className='name'>
              {res.hasOwnProperty('original_title') ? res.original_title : res.name}
            </p>
            <p className='mediaType'>Media Type: {res.media_type.toUpperCase()}</p>
            <p className='overview'>{res.overview}</p>
            <p className='date'>{res.hasOwnProperty('first_air_date') ? 'First air date: ' + res.first_air_date : 'Release date: ' + res.release_date}</p>
          </div>
        </NavLink>
      </li>) : null)
      return jsxItems
    }
  }

  render () {
    return (
      <div className='searchBlock'>
        <p className='pageTitle'>Search Results:</p>
        <ul className='resultList'>
          {this.handleResult()}
        </ul>
      </div>
    )
  }
}
