import React from 'react'
import { observer } from 'mobx-react'
import movieGenres from '../../data/MovieGenresList.json'
import { NavLink } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel'

@observer
export default class MovieSlider extends React.Component {
  render () {
    const { store } = this.props
    const {popularMovies} = store
    var mostPopMovies = (popularMovies == null) ? [[], [], [], [], []] : popularMovies.slice(0, 5)
    return (
      <div className='sliderList'>
        <Carousel showThumbs={false} interval={6000} stopOnHover={false} transitionTime={1000} showStatus={false} autoPlay emulateTouch infiniteLoop>
          <div>
            <SingleSlider movieInfo={mostPopMovies[0]} />
          </div>
          <div>
            <SingleSlider movieInfo={mostPopMovies[1]} />
          </div>
          <div>
            <SingleSlider movieInfo={mostPopMovies[2]} />
          </div>
          <div>
            <SingleSlider movieInfo={mostPopMovies[3]} />
          </div>
          <div>
            <SingleSlider movieInfo={mostPopMovies[4]} />
          </div>
        </Carousel>
        {store.pendingRequests > 0 ? <marquee direction='right'>Loading...</marquee> : null}
        <ArrowDown />
      </div>
    )
  }
}

export class ArrowDown extends React.Component {
  constructor () {
    super()
    this.state = {arrow1: 'fa fa-angle-down', arrow2: 'fa fa-angle-down', arrow3: 'fa fa-angle-down'}
  }

  componentWillMount () {
    this.toggleArrowSelect()
  }

  toggleArrowSelect () {
    var counter = 0
    setInterval(() => {
      var arrowNum = (counter % 3) + 1
      this.setState({
        arrow1: (arrowNum === 1) ? 'fa fa-angle-down select' : 'fa fa-angle-down',
        arrow2: (arrowNum === 2) ? 'fa fa-angle-down select' : 'fa fa-angle-down',
        arrow3: (arrowNum === 3) ? 'fa fa-angle-down select' : 'fa fa-angle-down'
      })
      counter++
    }, 500)
  }

  render () {
    return (
      <div className='arrowDown'>
        <i className={this.state.arrow1} id='arrow1' />
        <i className={this.state.arrow2} id='arrow2' />
        <i className={this.state.arrow3} id='arrow3' />
      </div>
    )
  }
}

@observer
export class SingleSlider extends React.Component {
  showGenre (genreList) {
    genreList = (genreList == null) ? [] : genreList
    var genreName = []
    for (var z = 0; z < genreList.length - 1; z++) {
      var temp = movieGenres.genres.filter((item, index) => {
        return (item.id === genreList[z])
      })
      genreName.push(temp[0].name)
    }

    return genreName.map((name, index) => <span className='genreName' key={index}>{name}</span>)
  }

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
  showTop3Cast (castList) {
    console.log(castList)
    var top3Cast = []
    if (castList != null) {
      for (var y = 0; y < 3; y++) {
        top3Cast.push(<span key={y}>{castList[y].name}</span>)
      }
      return top3Cast
    } else {
      return top3Cast
    }
  }
  showDate (date) {
    const Month = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.']
    var dateList = date.split('-')
    var year = dateList[0]
    var monthAbb = Month[parseInt(dateList[1])]
    var day = dateList[2]
    return (day + ' ' + monthAbb + ' ' + year)
  }

  render () {
    const { movieInfo } = this.props
    if (movieInfo == null) {
      return (<div />)
    } else {
      const bkImage = {
        background: "linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)), url('https://image.tmdb.org/t/p/w1000" + movieInfo.backdrop_path + "')"
      }
      return (
        <div className='sliderSp' style={bkImage}>
          <NavLink className='navLink poster-img' to={'/movie/' + movieInfo.id}>
            <img src={'https://image.tmdb.org/t/p/w500/' + movieInfo.poster_path} />
          </NavLink>
          <div className='intro'>
            <div className='title'>{movieInfo.title}</div>
            <div className='vote'>{this.vote(movieInfo.vote_average)}</div>
            <p className='cast'>{this.showTop3Cast(movieInfo.cast)}</p>
            <p className='overview'>{movieInfo.overview}</p>
            <p className='genres'>{this.showGenre(movieInfo.genre_ids)}</p>
            <p className='runtime'>{movieInfo.runtime}</p>
            <p className='language'>{movieInfo.original_language.toUpperCase()}</p>
            <p className='date'>{this.showDate(movieInfo.release_date)}</p>
          </div>
        </div>
      )
    }
  }
}
