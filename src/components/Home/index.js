import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import Header from '../Header'
import HomePoster from '../HomePoster'

import FailureView from '../FailureView'
import TrendingNow from '../TrendingNow'
import Originals from '../Originals'
import Footer from '../Footer'
import TopRated from '../TopRated'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    initialPoster: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getHomePagePoster()
  }

  getHomePagePoster = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/movies-app/originals'
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
      const fetchedDataLength = data.results.length
      const randomPoster =
        data.results[Math.floor(Math.random() * fetchedDataLength)]
      const updatedData = {
        id: randomPoster.id,
        backdropPath: randomPoster.backdrop_path,
        title: randomPoster.title,
        overview: randomPoster.overview,
        posterPath: randomPoster.poster_path,
      }

      this.setState({
        initialPoster: {...updatedData},
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onRetry = () => {
    this.getHomePagePoster()
  }

  renderFailureView = () => <FailureView onRetry={this.onRetry} />

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" height="50" width="50" color="#D81F26" />
    </div>
  )

  renderSuccessView = () => {
    const {initialPoster} = this.state
    return <HomePoster poster={initialPoster} key={initialPoster.id} />
  }

  renderHomePoster = () => {
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
        <div className="home-sizes-container">{this.renderHomePoster()}</div>

        <div>
          <h1 className="trending-now-heading">Trending Now</h1>
          <TrendingNow />
        </div>

        <div>
          <h1 className="originals-heading">Top Rated</h1>
          <TopRated />
        </div>

        <div>
          <h1 className="originals-heading">Originals</h1>
          <Originals />
        </div>
        <Footer />
      </div>
    )
  }
}
export default Home
