import axios from 'axios'
import { observable } from 'mobx'

export default class SingleItemStore {
  constructor (props) {
    this.apiKey = '93416e1b68a4d757c96e68f2cd22c215'
    this.type = props.mediaType
    this.itemId = props.itemId
  }
  @observable fullInfo = {}
  @observable pendingRequests = 0

  getItemInfo () {
    var fullInfoUrl
    if (this.type === 'mov') {
      fullInfoUrl = 'https://api.themoviedb.org/3/movie/' + this.itemId + '?api_key=' + this.apiKey + '&language=en-US&append_to_response=videos%2Creviews%2Crecommendations%2Ccredits'
    } else {
      fullInfoUrl = 'https://api.themoviedb.org/3/tv/' + this.itemId + '?api_key=' + this.apiKey + '&language=en-US'
    }

    axios.get(fullInfoUrl).then((response) => {
      this.fullInfo = Object.assign({}, response.data)
    }).catch((error) => {
      console.log('fetch fullinfo')
      console.log(error)
    })
  }
}
