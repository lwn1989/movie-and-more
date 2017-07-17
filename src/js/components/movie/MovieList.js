import React from 'react'
import { observer } from 'mobx-react'
import SingleList from './SingleList.js'

@observer
export default class MovieList extends React.Component {
  render () {
    const { store } = this.props
    if (this.props.mediaType === 'mov') {
      const { popularMovies, playMovies, topMovies } = store
      return (
        <div className='movieList'>
          <SingleList mediaType={'mov'} listTitle={'Popular Movies'} contents={popularMovies.slice()} opt={'pop'} />
          <SingleList mediaType={'mov'} listTitle={'In Theaters'} contents={playMovies.slice()} opt={'play'} />
          <SingleList mediaType={'mov'} listTitle={'Top Rated'} contents={topMovies.slice()} opt={'top'} />
        </div>
      )
    } else {
      const { popularTvs, playTvs, topTvs } = store
      return (
        <div className='movieList'>
          <SingleList mediaType={'tv'} listTitle={'Popular TV shows'} contents={popularTvs.slice()} opt={'pop'} />
          <SingleList mediaType={'tv'} listTitle={'On the Air'} contents={playTvs.slice()} opt={'play'} />
          <SingleList mediaType={'tv'} listTitle={'Top Rated'} contents={topTvs.slice()} opt={'top'} />
        </div>
      )
    }
  }
}
