import axios from 'axios'
import { observable } from 'mobx'

class MovieStore {
  constructor () {
    this.apiKey = '93416e1b68a4d757c96e68f2cd22c215'
  }

  @observable popularMovies = []
  @observable playMovies = []
  @observable topMovies = []
  movieCollections = observable.map({})
  @observable pendingRequests = 0
  @observable searchResult = []

  getMovieList (opt) {
    const popUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=' + this.apiKey + '&language=en-US&page=1'
    const playUrl = 'https://api.themoviedb.org/3/movie/now_playing?api_key=' + this.apiKey + '&language=en-US&page=1'
    const topUrl = 'https://api.themoviedb.org/3/movie/top_rated?api_key=' + this.apiKey + '&language=en-US&page=1'
    var url
    switch (opt) {
      case 'pop':
        url = popUrl
        break
      case 'play':
        url = playUrl
        break
      case 'top':
        url = topUrl
        break
    }

    this.pendingRequests ++
    axios.get(url).then((response) => {
      this.pendingRequests --
      var tmpMovies = response.data.results.slice()
      if (opt === 'play') {
        this.playMovies = tmpMovies.slice()
      } else if (opt === 'top') {
        this.topMovies = tmpMovies.slice()
      } else {
        var tmp5Movies = tmpMovies.slice(0, 5)
        tmp5Movies.forEach((movie, index) => {
          const fullInfoUrl = 'https://api.themoviedb.org/3/movie/' + movie.id + '?api_key=' + this.apiKey + '&language=en-US'
          const castUrl = 'https://api.themoviedb.org/3/movie/' + movie.id + '/credits?api_key=' + this.apiKey
          this.pendingRequests ++
          axios.get(fullInfoUrl).then((response) => {
            movie.runtime = response.data.runtime
            axios.get(castUrl).then((response) => {
              this.pendingRequests --
              movie.cast = response.data.cast.slice(0, 10)
              if (index === 4) {
                this.popularMovies = tmp5Movies.slice()
                this.popularMovies = this.popularMovies.concat(tmpMovies.slice(5))
                console.log('index load finish')
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
      console.log('fetch popularMoivees')
      console.log(error)
    })
  }
}

var movieStore = window.store = new MovieStore()
const updateInfo = () => {
  movieStore.getMovieList('pop')
  movieStore.getMovieList('play')
  movieStore.getMovieList('top')
}
updateInfo()
setInterval(updateInfo, 300000)
export default movieStore
