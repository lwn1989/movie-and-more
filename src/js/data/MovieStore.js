import axios from 'axios'
import { observable } from 'mobx'

class MovieStore {
  constructor () {
    this.apiKey = '93416e1b68a4d757c96e68f2cd22c215'
  }

  @observable popularMovies = []
  @observable movieCollections = []
  @observable pendingRequests = 0
  @observable searchResult = []

  getPopularMovies () {
    const popUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=' + this.apiKey + '&language=en-US&page=1'
    this.pendingRequests ++
    axios.get(popUrl).then((response) => {
      this.pendingRequests --
      this.popularMovies = response.data.results.slice()
      var tmpPopularMovies = response.data.results.slice()
      tmpPopularMovies.forEach((movie, index) => {
        const fullInfoUrl = 'https://api.themoviedb.org/3/movie/' + movie.id + '?api_key=' + this.apiKey + '&language=en-US'
        const castUrl = 'https://api.themoviedb.org/3/movie/' + movie.id + '/credits?api_key=' + this.apiKey
        this.pendingRequests ++
        axios.get(fullInfoUrl).then((response) => {
          movie.runtime = response.data.runtime
          axios.get(castUrl).then((response) => {
            this.pendingRequests --
            if (index === 19) {
              console.log('update finish')
              this.popularMovies = tmpPopularMovies.slice()
              console.log(this.popularMovies)
            }
            movie.cast = response.data.cast.slice(0, 10)
          }).catch((error) => {
            console.log('fetch cast')
            console.log(error)
          })
        }).catch((error) => {
          console.log('fetch fullinfo')
          console.log(error)
        })
      })
    }).catch((error) => {
      console.log('fetch popularMoivees')
      console.log(error)
    })
  }
}

var movieStore = window.store = new MovieStore()
movieStore.getPopularMovies()
export default movieStore
