import {Switch, Route, Redirect} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import Popular from './components/Popular'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import MovieDetails from './components/MovieDetailView'
import SearchFilter from './components/SearchFilter'
import Account from './components/Account'

import './App.css'

const App = () => (
  <div className="bg">
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/popular" component={Popular} />
      <ProtectedRoute exact path="/movies/:id" component={MovieDetails} />
      <ProtectedRoute exact path="/search" component={SearchFilter} />
      <ProtectedRoute exact path="/account" component={Account} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  </div>
)

export default App
