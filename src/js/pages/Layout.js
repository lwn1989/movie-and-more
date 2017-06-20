import React from 'react'
import Movie from '../components/movie/Movie'
import { Route } from 'react-router-dom'

import Footer from '../components/Layout/Footer'
import Nav from '../components/Layout/Nav'
// import movieStore from '../data/MovieStore.js'
// import Favorites from './Favorites'
// import Movie from './Movie'
// import TvShow from './TvShow'

const Layout = () => {
  return (
    <div>
      <Nav />
      <Route exact path='/' component={Movie} />
      <Footer />
    </div>
  )
}

export default Layout
