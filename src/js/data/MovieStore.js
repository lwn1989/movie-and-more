import axios from 'axios'
import { observable, extendObservable } from 'mobx'

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
      this.popularMovies.forEach((movie, index) => {
        console.log(movie)
        const fullInfoUrl = 'https://api.themoviedb.org/3/movie/' + movie.id + '?api_key=' + this.apiKey + '&language=en-US'
        const castUrl = 'https://api.themoviedb.org/3/movie/' + movie.id + '/credits?api_key=' + this.apiKey
        this.pendingRequests ++
        axios.get(fullInfoUrl).then((response) => {
          extendObservable(this.popularMovies[index], {'runtime': response.data.runtime})
          if (index === 19) {
            console.log('update finish')
            console.log(this.popularmovies)
          }
          axios.get(castUrl).then((response) => {
            this.pendingRequests --
            extendObservable(this.popularMovies[index], {'cast': response.data.cast.slice(0, 10)})
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
