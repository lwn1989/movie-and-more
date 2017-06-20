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
    console.log(popUrl)
    axios.get(popUrl).then((response) => {
      console.log(response)
      this.pendingRequests --
      this.popularMovies = response.data.results.slice()
      // this.popularMovies.forEach((movie, index) => {
      //  const relatedUrl = 'https://api.themoviedb.org/3/movie/' + movie.id + '/similar?api_key=' + this.apiKey + '&language=en-US&page=1'
      //  // const trailerUrl = 'https://api.themoviedb.org/3/movie/' + movie.id + '/videos?api_key=' + this.apiKey + '&language=en-US'

      //  this.pendingRequests ++
      //  axios.get(relatedUrl).then((response) => {
      //    this.popularMovies[index]['similarMovies'] = response.data.results
      //    this.pendingRequests --
      //    if (index === 19) {
      //      console.log('update finish')
      //    }
      //    // axios.get(trailerUrl).then((response) => {
      //    //  this.pendingRequests --
      //    //  for (var i = 0; i < response.data.results.length; i++) {
      //    //    if (response.data.results[i].type === 'Trailer') {
      //    //      const youtubeUrl = 'https://www.youtube.com/watch?v=' + response.data.results[i].key
      //    //      this.popularMovies[index]['trailerUrl'] = youtubeUrl
      //    //      break
      //    //    }
      //    //  }
      //    // }).catch((error) => {
      //    //  console.log('fetch Trailer')
      //    //  console.log(error)
      //    // })
      //  }).catch((error) => {
      //    console.log('fetch SimilarMovies')
      //    console.log(error)
      //  })
      // })
    }).catch((error) => {
      console.log('fetch popularMoivees')
      console.log(error)
    })
  }
}

var movieStore = new MovieStore()
movieStore.getPopularMovies()
export default movieStore
