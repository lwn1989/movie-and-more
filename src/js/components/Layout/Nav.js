import React from 'react'
import { NavLink } from 'react-router-dom'

export default class Nav extends React.Component {
  constructor () {
    super()
    this.state = {
      collapsed: true
    }
  }

  toggleClass () {
    const collapsed = !this.state.collapsed
    this.setState({collapsed})
  }

  render () {
    const { collapsed } = this.state
    const navClass = collapsed ? 'main-bar collapsed' : 'main-bar'
    return (
      <div>
        <div className='header'>
          <div className='site-name'>
          MOVIE <span>&</span> MORE
          </div>
          <a href='#' className='toggle-icon' onClick={this.toggleClass.bind(this)}>
            <i className='fa fa-bars' />
          </a>
          <nav className={navClass}>
            <ul>
              <li><NavLink className='navlink' exact to='/' onClick={this.toggleClass.bind(this)}>Movie</NavLink></li>
              <li><NavLink className='navlink' to='/tv_show' onClick={this.toggleClass.bind(this)}>TV Show</NavLink></li>
              <li><NavLink className='navlink' to='/collection' onClick={this.toggleClass.bind(this)}>Collection</NavLink></li>
              <li className='search-bar'><input type='search' placeholder='Search' id='search-key' /><NavLink className='navlink' to='/search'><button onClick={this.toggleClass.bind(this)} className='fa fa-search' /></NavLink></li>
            </ul>
          </nav>
        </div>
        <div />
      </div>
    )
  }
}
