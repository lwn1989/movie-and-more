import React from 'react'
import { NavLink } from 'react-router-dom'
import { observer } from 'mobx-react'
import RateStars from './RateStars'
import movieGenres from '../../data/MovieGenresList.json'
import tvGenres from '../../data/TvGenresList.json'

@observer
export default class SingleList extends React.Component {
  constructor () {
    super()
    this.state = {toggled: true, text: 'Show More', width: 0, height: 0}
  }
  componentDidMount =() => {
    window.addEventListener('resize', this.updateDimensions)
  }
  componentWillUnmount= () => {
    window.removeEventListener('resize', this.updateDimensions)
  }
  updateDimensions= () => {
    this.setState({width: window.innerWidth, height: window.innerHeight})
  }
  toggleItems () {
    this.setState({
      toggled: !this.state.toggled,
      text: (this.state.text === 'Show More') ? 'Show Less' : 'Show More'
    })
  }
  showGenre (genresList) {
    var genresDb = this.props.mediaType === 'mov' ? movieGenres.genres : tvGenres.genres
    genresList = genresList.length > 2 ? genresList.slice(0, 2) : genresList
    var genresNames = genresList.map((genreId, index) => {
      var corrName = []
      corrName = genresDb.filter((singleGen) => {
        return singleGen.id === genreId
      })
      if (corrName.length === 0) {
        corrName = movieGenres.genres.filter((singleGen) => {
          return singleGen.id === genreId
        })
      }
      return corrName.length > 0 ? corrName[0].name : null
    })
    return genresNames
  }

  render () {
    const { listTitle, contents, opt } = this.props
    if (contents.length === 0) {
      return <div />
    } else {
      var tmpContents
      if (opt === 'pop') {
        if (this.state.toggled) {
          if (window.matchMedia('(max-width:767px)').matches) {
            tmpContents = contents.slice(5, 7)
          } else if (window.matchMedia('(max-width:991px)').matches) {
            tmpContents = contents.slice(5, 8)
          } else if (window.matchMedia('(max-width:1199px)').matches) {
            tmpContents = contents.slice(5, 9)
          } else {
            tmpContents = contents.slice(5, 11)
          }
        } else {
          tmpContents = contents.slice(5)
        }
      } else {
        if (this.state.toggled) {
          if (window.matchMedia('(max-width:767px)').matches) {
            tmpContents = contents.slice(0, 2)
          } else if (window.matchMedia('(max-width:991px)').matches) {
            tmpContents = contents.slice(0, 3)
          } else if (window.matchMedia('(max-width:1199px)').matches) {
            tmpContents = contents.slice(0, 4)
          } else {
            tmpContents = contents.slice(0, 6)
          }
        } else {
          tmpContents = contents.slice(0)
        }
      }

      return (
        <div className='singleList'>
          <p className='listTitle'>{listTitle}</p>
          <button onClick={this.toggleItems.bind(this)}>{this.state.text}</button>
          <ul className='itemList'>
            { tmpContents.map((mov, index) => {
              return (
                <li key={index} className='itemListItem'>
                  <NavLink className='navLink poster-img' to={this.props.mediaType === 'mov' ? '/movie/' + mov.id : '/tv/' + mov.id}>
                    <img src={'https://image.tmdb.org/t/p/w500/' + mov.poster_path} />
                    <p className='listItemTitle'>{this.props.mediaType === 'mov' ? mov.title : mov.name}</p>
                    <RateStars rate={mov.vote_average} />
                    <div className='genreContainer'>
                      { this.showGenre(mov.genre_ids).map((genreName, ind) => <span key={ind} className='genreNames'>{genreName}</span>)}
                    </div>
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </div>
      )
    }
  }
}
