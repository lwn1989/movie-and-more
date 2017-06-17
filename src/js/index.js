import '../styles/main.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'

import Layout from './pages/Layout'

const app = document.getElementById('app')

ReactDOM.render((
  <BrowserRouter>
    <Route path='/' component={Layout} />
  </BrowserRouter>
), app)
