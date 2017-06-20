import React from 'react'
import { observer } from 'mobx-react'
// import SingleMovie from './SingleMovie.js'

@observer
export default class MovieList extends React.Component {
  render () {
    const { store } = this.props
    const { popularMovies } = store
    return (
      <ul>
        { popularMovies.map((mov, index) => {
          return (
            <li key={mov.id}>{mov.original_title}</li>
          )
        })
        }
      </ul>
    )
  }
}
