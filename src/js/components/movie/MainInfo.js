import React from 'react'
import SingleList from './SingleList.js'
import { observer } from 'mobx-react'

@observer
export default class MainInfo extends React.Component {
  constructor () {
    super()
    this.state = {
      navContent: null
    }
    this.navContent = null
  }

  componentDidMount () {
    this.showCast()
  }

  showCast () {
    const { movieInfo } = this.props
    this.navContent = (
      <ul className='cast'>
        { movieInfo.credits.cast.length === 0 ? <li style={{fontSize: '1.5rem', width: '30rem', height: '2rem'}}>Sorry, No cast information</li> : movieInfo.credits.cast.slice(0, 10).map((cast, index) => (
          <li key={index}><a target='_blank' href={'https://de.wikipedia.org/wiki/' + cast.name.replace(/\s/g, '_')}><img src={cast.profile_path === null ? 'https://image.ibb.co/gbbuVF/no_user_profile_picture_whatsapp.jpg' : 'https://image.tmdb.org/t/p/w500' + cast.profile_path} /></a><span className='castName'>{cast.name}</span><span className='castChar'>{cast.character}</span></li>)) }
      </ul>
    )
    this.setState({navContent: 'cast'})
  }

  showReview () {
    const { movieInfo } = this.props
    this.navContent = (
      <ul className='review'>
        { movieInfo.reviews.results.length === 0 ? <li>No reviews yet</li> : movieInfo.reviews.results.map((review, index) => (
          <li key={index}><span className='reviewer'>{'Author:  ' + review.author}</span><span className='reviewContent'>{review.content}</span></li>
        )) }
      </ul>
    )
    this.setState({navContent: 'review'})
  }

  showImg () {
    const { movieInfo } = this.props
    this.navContent = (
      <ul className='image'>
        { movieInfo.images.posters.length === 0 && movieInfo.images.backdrops.length === 0 ? <li style={{fontSize: '1.5rem', width: '30rem', marginLeft: '3rem'}}>Sorry, No images</li> : movieInfo.images.posters.map((img, index) => (
          <li key={'p' + index}><a href={'https://image.tmdb.org/t/p/original' + img.file_path}><img src={'https://image.tmdb.org/t/p/w500' + img.file_path} /></a></li>
      )) }
        { movieInfo.images.backdrops.map((img, index) => (
          <li key={'b' + index}><a href={'https://image.tmdb.org/t/p/original' + img.file_path}><img src={'https://image.tmdb.org/t/p/w500' + img.file_path} /></a></li>
      )) }
      </ul>
    )
    this.setState({navContent: 'image'})
  }

  showVideo () {
    const {movieInfo} = this.props
    this.navContent = (
      <ul className='video'>
        { movieInfo.videos.results.length === 0 ? <li style={{fontSize: '1.5rem', width: '30rem', marginLeft: '3rem'}}>Sorry, No videos</li> : movieInfo.videos.results.map((video, index) => (<li key={index}><iframe allowFullScreen='allowFullScreen' width='670' height='450' src={'https://www.youtube.com/embed/' + video.key} /></li>))}
      </ul>
    )
    this.setState({navContent: 'video'})
  }
  render () {
    const { mediaType, movieInfo } = this.props
    return (
      <div className='MainInfo'>
        <ul className='secNav'>
          <li key='1' onClick={this.showCast.bind(this)}><a src='#'>Cast</a></li>
          { mediaType === 'mov' ? <li key='2' onClick={this.showReview.bind(this)}><a src='#'>Reviews</a></li> : null }
          <li key='3' onClick={this.showImg.bind(this)}><a src='#'>Images</a></li>
          <li key='4' onClick={this.showVideo.bind(this)}><a src='#'>Videos</a></li>
        </ul>
        <div className='navContent'>
          { this.navContent }
        </div>
        <SingleList mediaType={mediaType} listTitle={'Recommendations'} contents={movieInfo.recommendations.results.slice()} opt={'reco'} />
        <SingleList mediaType={mediaType} listTitle={mediaType === 'mov' ? 'Similar Movies' : 'Similar TV Shows'} contents={movieInfo.similar.results.slice()} opt={'simi'} />
      </div>
    )
  }
}
