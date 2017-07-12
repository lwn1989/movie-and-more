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
    var imageUrl
    if (this.type === 'mov') {
      fullInfoUrl = 'https://api.themoviedb.org/3/movie/' + this.itemId + '?api_key=' + this.apiKey + '&language=en-US&append_to_response=videos%2Creviews%2Crecommendations%2Ccredits%2Csimilar'
      imageUrl = 'https://api.themoviedb.org/3/movie/' + this.itemId + '/images?api_key=' + this.apiKey + '&language=en-US&include_image_language=en'
    } else {
      fullInfoUrl = 'https://api.themoviedb.org/3/tv/' + this.itemId + '?api_key=' + this.apiKey + '&language=en-US&append_to_response=recommendations%2Csimilar%2Ccredits%2Cvideos'
      imageUrl = 'https://api.themoviedb.org/3/tv/' + this.itemId + '/images?api_key=' + this.apiKey + '&language=en-US&include_image_language=en'
    }
    var tmpItem
    axios.get(fullInfoUrl).then((response) => {
      tmpItem = Object.assign({}, response.data)
      axios.get(imageUrl).then((response) => {
        tmpItem.images = Object.assign({}, response.data)
        this.fullInfo = Object.assign({}, tmpItem)
      }).catch((error) => {
        console.log('fetch images')
        console.log(error)
      })
    }).catch((error) => {
      console.log('fetch fullinfo')
      console.log(error)
    })
  }
}
