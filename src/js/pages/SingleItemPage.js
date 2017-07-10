import React from 'react'
import SingleItemStore from '../data/SingleItemStore.js'
import movieStore from '../data/MovieStore.js'
import tvStore from '../data/TvStore.js'
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
      console.log(fullInfo)
      return (
        <div className='singleItemPage'>
          { this.mediaType === 'mov' ? <SingleSlider mediaType={this.mediaType} store={movieStore} singleSlide movieInfo={fullInfo} />
          : <SingleSlider mediaType={this.mediaType} store={tvStore} singleSlide movieInfo={fullInfo} />}
        </div>
      )
    }
  }
}
