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
    var fullInfoUrl, castUrl, tmpItem, videoUrl, recommandUrl
    if (this.type === 'movie') {
      fullInfoUrl = 'https://api.themoviedb.org/3/movie/' + this.itemId + '?api_key=' + this.apiKey + '&language=en-US'
      castUrl = 'https://api.themoviedb.org/3/movie/' + this.itemId + '/credits?api_key=' + this.apiKey
      videoUrl = 'https://api.themoviedb.org/3/movie/' + this.itemId + '/videos?api_key=' + this.apiKey
      recommandUrl = 'https://api.themoviedb.org/3/movie/' + this.itemId + '/recommendations?api_key=' + this.apiKey
    } else {
      fullInfoUrl = 'https://api.themoviedb.org/3/tv/' + this.itemId + '?api_key=' + this.apiKey + '&language=en-US'
      castUrl = 'https://api.themoviedb.org/3/tv/' + this.itemId + '/credits?api_key=' + this.apiKey
      videoUrl = 'https://api.themoviedb.org/3/tv/' + this.itemId + '/videos?api_key=' + this.apiKey
    }

    axios.get(fullInfoUrl).then((response) => {
      tmpItem = Object.assign({}, response.data)
      axios.get(castUrl).then((response) => {
        tmpItem.cast = response.data.cast.slice(0, 10)
        tmpItem.videos = []
        axios.get(videoUrl).then((response) => {
          const tmpVideoList = response.data.results.slice(0)
          tmpVideoList.forEach((movie) => {
            tmpItem.videos.push(movie.key)
          })
          axios.get(recommandUrl).then((response) => {
            tmpItem.recommand = response.data.results.slice(0)
            console.log('fetch finish')
            this.fullInfo = Object.assign({}, tmpItem)
            console.log(this.fullInfo)
          }).catch((error) => {
            console.log('fetch recommand')
            console.log(error)
          })
        }).catch((error) => {
          console.log('fetch videos')
          console.log(error)
        })
      }).catch((error) => {
        console.log('fetch cast')
        console.log(error)
      })
    }).catch((error) => {
      console.log('fetch fullinfo')
      console.log(error)
    })
  }
}
