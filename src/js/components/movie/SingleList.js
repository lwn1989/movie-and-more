import React from 'react'
import { NavLink } from 'react-router-dom'
import { observer } from 'mobx-react'
import RateStars from './RateStars'

@observer
export default class SingleList extends React.Component {
  constructor () {
    super()
    this.state = {toggled: true, text: 'Show More'}
  }
  toggleItems () {
    this.setState({
      toggled: !this.state.toggled,
      text: (this.state.text === 'Show More') ? 'Show Less' : 'Show More'
    })
  }
  render () {
    const { listTitle, contents, opt } = this.props
    if (contents.length === 0) {
      return <div />
    } else {
      var tmpContents
      if (opt === 'pop') {
        if (this.state.toggled) {
          if (window.matchMedia('(max-width:767px)').matches) {
            tmpContents = contents.slice(5, 7)
          } else if (window.matchMedia('(max-width:991px)').matches) {
            tmpContents = contents.slice(5, 8)
          } else if (window.matchMedia('(max-width:1199px)').matches) {
            tmpContents = contents.slice(5, 9)
          } else {
            tmpContents = contents.slice(5, 11)
          }
        } else {
          tmpContents = contents.slice(5)
        }
      } else {
        if (this.state.toggled) {
          if (window.matchMedia('(max-width:767px)').matches) {
            tmpContents = contents.slice(0, 2)
          } else if (window.matchMedia('(max-width:991px)').matches) {
            tmpContents = contents.slice(0, 3)
          } else if (window.matchMedia('(max-width:1199px)').matches) {
            tmpContents = contents.slice(0, 4)
          } else {
            tmpContents = contents.slice(0, 6)
          }
        } else {
          tmpContents = contents.slice(0)
        }
      }

      return (
        <div className='singleList'>
          <p className='listTitle'>{listTitle}</p>
          <button onClick={this.toggleItems.bind(this)}>{this.state.text}</button>
          <ul className='itemList'>
            { tmpContents.map((mov, index) => {
              return (
                <li key={index} className='itemListItem'>
                  <NavLink className='navLink poster-img' to={'/movie/' + mov.id}>
                    <img src={'https://image.tmdb.org/t/p/w500/' + mov.poster_path} />
                    <p className='listItemTitle'>{mov.title}</p>
                    <RateStars rate={mov.vote_average} />
                    <p>{mov.runtime.toString() + 'MIN | ' + mov.original_language.toUpperCase()}</p>
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </div>
      )
    }
  }
}
