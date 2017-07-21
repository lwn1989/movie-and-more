import React from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import searchStore from '../../data/SearchStore.js'

export default class Nav extends React.Component {
  constructor () {
    super()
    this.state = {
      collapsed: true,
      redirectToSearch: 0
    }
    this.compareValue = 0
  }

  toggleClass () {
    const collapsed = !this.state.collapsed
    this.setState({collapsed})
  }

  readInput (event) {
    if ((event.charCode === 13 && event.type === 'keypress') || event.type === 'click') {
      var val = document.getElementById('search-key').value
      if (val !== '') {
        setTimeout(() => {
          this.compareValue++
        }, 500)
        searchStore.searchKey = val
        searchStore.getInfo()
        this.setState({redirectToSearch: this.state.redirectToSearch + 1})
      }
    }
  }

  render () {
    const { collapsed } = this.state
    const navClass = collapsed ? 'main-bar collapsed' : 'main-bar'
    return (
      <div>
        <div className='header'>
          <div className='site-name'>
            <NavLink className='navlink siteNameNav' to='/'>
              MOVIE <span>&</span> MORE
            </NavLink>
          </div>
          <a href='#' className='toggle-icon' onClick={this.toggleClass.bind(this)}>
            <i className='fa fa-bars' />
          </a>
          <nav className={navClass}>
            <ul>
              <li><NavLink className='navlink' exact to='/' onClick={this.toggleClass.bind(this)}>Movie</NavLink></li>
              <li><NavLink className='navlink' to='/tv' onClick={this.toggleClass.bind(this)}>TV Show</NavLink></li>
              <li><NavLink className='navlink' to='/collection' onClick={this.toggleClass.bind(this)}>Collection</NavLink></li>
              <li className='search-bar'><input type='search' placeholder='Search' id='search-key' onKeyPress={this.readInput.bind(this)} /><button onClick={this.readInput.bind(this)} className='fa fa-search btn-search' /></li>
            </ul>
          </nav>
        </div>
        { this.state.redirectToSearch > this.compareValue ? <Redirect to='/search' /> : null }
      </div>
    )
  }
}
