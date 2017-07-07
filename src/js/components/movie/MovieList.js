import React from 'react'
import { observer } from 'mobx-react'
import SingleList from './SingleList.js'

@observer
export default class MovieList extends React.Component {
  render () {
    const { store } = this.props
    const { popularMovies, playMovies, topMovies } = store
    return (
      <div className='movieList'>
        <SingleList mediaType={'mov'} listTitle={'Popular Movies'} contents={popularMovies.slice()} opt={'pop'} />
        <SingleList mediaType={'mov'} listTitle={'In Theaters'} contents={playMovies.slice()} opt={'play'} />
        <SingleList mediaType={'mov'} listTitle={'Top Rated'} contents={topMovies.slice()} opt={'top'} />
      </div>
    )
  }
}
