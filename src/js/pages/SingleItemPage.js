import React from 'react'
import SingleItemStore from '../data/SingleItemStore.js'
import movieStore from '../data/MovieStore.js'
import tvStore from '../data/TvStore.js'
import MainInfo from '../components/movie/MainInfo.js'
import { observer } from 'mobx-react'
import { SingleSlider } from '../components/movie/MovieSlider.js'

@observer
export default class SingleItemPage extends React.Component {
  constructor (props) {
    super()
    this.itemId = props.match.params.itemId
    this.mediaType = (props.match.url[1] === 'm') ? 'mov' : 'tv'
    this.itemStore = new SingleItemStore({ 'itemId': this.itemId, 'mediaType': this.mediaType })
    this.itemStore.getItemInfo()
    this.state = {itemId: this.itemId}
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.match.params.itemId !== this.itemId) {
      this.itemId = nextProps.match.params.itemId
      this.mediaType = (nextProps.match.url[1] === 'm') ? 'mov' : 'tv'
      this.itemStore = new SingleItemStore({ 'itemId': this.itemId, 'mediaType': this.mediaType })
      this.itemStore.getItemInfo()
      this.state = {itemId: this.itemId}
    }
  }

  checkObjEmpty (obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) { return false }
    }
    return true
  }

  render () {
    const { fullInfo } = this.itemStore

    if (this.checkObjEmpty(fullInfo)) {
      var status = this.itemStore.pendingRequests > 0 ? <marquee direction='right'>Loading...</marquee> : null
      return status
    } else {
      return (
        <div className='singleItemPage'>
          { this.mediaType === 'mov' ? <SingleSlider mediaType={this.mediaType} store={movieStore} singleSlide movieInfo={fullInfo} />
          : <SingleSlider mediaType={this.mediaType} store={tvStore} singleSlide movieInfo={fullInfo} />}
          { this.mediaType === 'mov' ? <MainInfo mediaType={this.mediaType} movieInfo={fullInfo} />
          : <MainInfo mediaType={this.mediaType} movieInfo={fullInfo} />}
        </div>
      )
    }
  }
}
