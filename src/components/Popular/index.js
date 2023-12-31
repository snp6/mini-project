import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import FailureView from '../FailureView'
import Header from '../Header'
import Footer from '../Footer'
import MovieItem from '../MovieItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Popular extends Component {
  state = {
    popularMovies: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/movies-app/popular-movies'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      // console.log(data)
      const updatedData = data.results.map(each => ({
        posterPath: each.poster_path,
        backdropPath: each.backdrop_path,
        id: each.id,
        overview: each.overview,
        title: each.title,
      }))
      // console.log(updatedData)
      this.setState({
        popularMovies: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onRetry = () => {
    this.getPopularMovies()
  }

  renderFailureView = () => <FailureView onRetry={this.onRetry} />

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" height={35} width={380} color=" #D81F26" />
    </div>
  )

  renderSuccessView = () => {
    const {popularMovies} = this.state
    return (
      <div>
        <h1 className="explore-movies-here">Explore the Popular Movies Here</h1>
        <ul className="popular-ul-container">
          {popularMovies.map(each => (
            <MovieItem details={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderPopularMovies = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()

      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="popular-result-container">
          {this.renderPopularMovies()}
        </div>
        <Footer />
      </div>
    )
  }
}
export default Popular
