import React from 'react'
import SingleItemStore from '../data/SingleItemStore.js'
import { observer } from 'mobx-react'

@observer
export default class SingleItemPage extends React.Component {
  constructor (props) {
    super()
    this.itemId = props.match.params.itemId
    this.mediaType = (props.match.url[1] === 'm') ? 'movie' : 'tvShow'
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
      console.log('hi')
      var status = this.itemStore.pendingRequests > 0 ? <marquee direction='right'>Loading...</marquee> : null
      return status
    } else {
      return (
        <div>
          {fullInfo.runtime}
        </div>
      )
    }
  }
}
