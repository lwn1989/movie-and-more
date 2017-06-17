import axios from 'axios'
import { computed, observable } from 'mobx'

class MovieStore {
  constructor () {
    this.apiKey = '93416e1b68a4d757c96e68f2cd22c215'
  }

  @observable popularMovies = []
  @observable movieCollections = []
  @observable pendingRequests = 0
  @observable searchResult = []

  @computed get getPopularMovies () {
    const popUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=' + this.apiKey + '&language=en-US&page=1'
    this.pendingRequests ++
    axios.get(popUrl).then((response) => {
      this.pendingRequests --
      this.popularMovies = response.results.slice()
      this.popularMovies.forEach((movie, index) => {
        const relatedUrl = 'https://api.themoviedb.org/3/movie/' + movie.id + '/similar?api_key=' + this.apiKey + '&language=en-US&page=1'
        const trailerUrl = 'https://api.themoviedb.org/3/movie/' + movie.id + '/videos?api_key=' + this.apiKey + '&language=en-US'

        this.pendingRequests ++
        axios.get(relatedUrl).then((response) => {
          this.popularMovies[index]['similarMovies'] = response.results
          axios.get(trailerUrl).then((response) => {
            this.pendingRequests --
            for (var i = 0; i < response.results.length; i++) {
              if (response.results[i].type === 'Trailer') {
                const youtubeUrl = 'https://www.youtube.com/watch?v=' + response.results[i].key
                this.popularMovies[index]['trailerUrl'] = youtubeUrl
                break
              }
            }
          }).catch((error) => { console.log(error) })
        }).catch((error) => { console.log(error) })
      })
    }).catch((error) => {
      console.log(error)
    })
  }
}

var movieStore = new MovieStore()
export default movieStore
