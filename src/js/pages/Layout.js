import React from 'react'
import { Route, Switch } from 'react-router-dom'

import MovieIndex from './MovieIndex.js'
import SingleItemPage from './SingleItemPage.js'
import TvShow from './TvShow'
import Footer from '../components/Layout/Footer'
import Nav from '../components/Layout/Nav'
// import movieStore from '../data/MovieStore.js'
// import Favorites from './Favorites'
// import Movie from './Movie'
// import TvShow from './TvShow'

const Layout = (props) => {
  return (
    <div>
      <Nav />
      <Route exact path='/' component={MovieIndex} />
      <Switch>
        <Route path='/movie/:itemId' component={SingleItemPage} />
        <Route path='/movie' component={MovieIndex} />
      </Switch>
      <Route path='/tvShow' component={TvShow} />
      <Footer />
    </div>
  )
}

export default Layout
