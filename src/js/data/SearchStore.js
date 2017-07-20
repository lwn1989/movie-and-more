import axios from 'axios'
import { observable } from 'mobx'

class SearchStore {
  constructor (props) {
    this.apiKey = '93416e1b68a4d757c96e68f2cd22c215'
  }

  @observable searchResult = {}
  @observable searchKey = null

  getInfo () {
    var searchUrl = 'https://api.themoviedb.org/3/search/multi?' + this.apiKey + '&language=en-US&query=' + encodeURI(this.searchKey) + '&page=1&include_adult=false'
    axios.get(searchUrl).then((response) => {
      this.searchResult = Object.assign({}, response.results)
    }).catch((error) => {
      console.log(error)
    })
  }
}

var searchStore = window.searchStore = new SearchStore()
export default searchStore
