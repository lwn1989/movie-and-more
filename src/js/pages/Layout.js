import React from 'react'
import { Route } from 'react-router-dom'

import Footer from '../components/Layout/Footer'
import Nav from '../components/Layout/Nav'
// import Favorites from './Favorites'
// import Movie from './Movie'
// import TvShow from './TvShow'

const Layout = () => {
  return (
    <div>
      <Nav />
      <Route />
      <Footer />
    </div>
  )
}

export default Layout
