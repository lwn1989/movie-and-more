import axios from 'axios'
import { observable } from 'mobx'

class TvStore {
  constructor () {
    this.apiKey = '93416e1b68a4d757c96e68f2cd22c215'
  }

  @observable popularTvs = []
  @observable playTvs = []
  @observable topTvs = []
  @observable tvCollections = []
  @observable pendingRequests = 0
  @observable searchResult = []

  getTvList (opt) {
    const popUrl = 'https://api.themoviedb.org/3/tv/popular?api_key=' + this.apiKey + '&language=en-US&page=1'
    const onAirUrl = 'https://api.themoviedb.org/3/tv/on_the_air?api_key=' + this.apiKey + '&language=en-US&page=1'
    const topUrl = 'https://api.themoviedb.org/3/tv/top_rated?api_key=' + this.apiKey + '&language=en-US&page=1'
    var url
    switch (opt) {
      case 'pop':
        url = popUrl
        break
      case 'air':
        url = onAirUrl
        break
      case 'top':
        url = topUrl
        break
    }

    this.pendingRequests ++
    axios.get(url).then((response) => {
      this.pendingRequests --
      var tmpTvs = response.data.results.slice()
      if (opt === 'air') {
        this.playTvs = tmpTvs.slice()
      } else if (opt === 'top') {
        this.topTvs = tmpTvs.slice()
      } else {
        var tmp5Tvs = tmpTvs.slice(0, 5)
        tmp5Tvs.forEach((tv, index) => {
          const fullInfoUrl = 'https://api.themoviedb.org/3/tv/' + tv.id + '?api_key=' + this.apiKey + '&language=en-US'
          const castUrl = 'https://api.themoviedb.org/3/tv/' + tv.id + '/credits?api_key=' + this.apiKey
          this.pendingRequests ++
          axios.get(fullInfoUrl).then((response) => {
            tv.runtime = response.data.runtime
            axios.get(castUrl).then((response) => {
              this.pendingRequests --
              tv.cast = response.data.cast.slice(0, 10)
              if (index === 4) {
                this.popularTvs = tmp5Tvs.slice()
                this.popularTvs = this.popularTvs.concat(tmpTvs.slice(5))
                console.log('tvStore load finish')
                console.log(this.popularTvs)
              }
            }).catch((error) => {
              console.log('fetch cast')
              console.log(error)
            })
          }).catch((error) => {
            console.log('fetch fullinfo')
            console.log(error)
          })
        })
      }
    }).catch((error) => {
      console.log('fetch popularTvs')
      console.log(error)
    })
  }
}

var tvStore = window.store = new TvStore()
tvStore.getTvList('pop')
tvStore.getTvList('air')
tvStore.getTvList('top')
export default tvStore
