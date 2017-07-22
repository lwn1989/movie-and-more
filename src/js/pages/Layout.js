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
      <Route exact path='/' component={MovieIndex} />
      <Switch>
        <Route path='/movie/:itemId' component={SingleItemPage} />
        <Route path='/movie' component={MovieIndex} />
        <Route path='/tv/:itemId' component={SingleItemPage} />
        <Route path='/tv' component={TvShow} />
        <Route path='/collection' component={Collection} />
        <Route path='/search' component={SearchIndex} />
      </Switch>
      <Footer />
    </div>
  )
}

export default Layout
