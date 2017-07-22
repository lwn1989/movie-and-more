import React from 'react'
import { Route, Switch } from 'react-router-dom'

import MovieIndex from './MovieIndex.js'
import SingleItemPage from './SingleItemPage.js'
import TvShow from './TvShow'
import Collection from './Collection.js'
import SearchIndex from './SearchIndex.js'
import Footer from '../components/Layout/Footer'
import Nav from '../components/Layout/Nav'

const Layout = (props) => {
  return (
    <div>
      <Nav />
      <Route exact path='/movieApp/' component={MovieIndex} />
      <Switch>
        <Route path='/movieApp/movie/:itemId' component={SingleItemPage} />
        <Route path='/movieApp/movie' component={MovieIndex} />
        <Route path='/movieApp/tv/:itemId' component={SingleItemPage} />
        <Route path='/movieApp/tv' component={TvShow} />
        <Route path='/movieApp/collection' component={Collection} />
        <Route path='/movieApp/search' component={SearchIndex} />
      </Switch>
      <Footer />
    </div>
  )
}

export default Layout
