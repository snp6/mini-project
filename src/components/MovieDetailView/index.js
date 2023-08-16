import Loader from 'react-loader-spinner'

import {Component} from 'react'

import Cookies from 'js-cookie'

import Footer from '../Footer'
import FailureView from '../FailureView'
import Header from '../Header'
import MovieDetail from '../MovieDetail'
import MovieItem from '../MovieItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MovieDetailView extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    movieDetails: {},
    genres: [],
    spokenLanguages: [],
    similarMovies: [],
  }

  componentDidMount() {
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const obj = data.movie_details
      const updatedData = {
        id: obj.id,
        backdropPath: obj.backdrop_path,
        budget: obj.budget,
        title: obj.title,
        overview: obj.overview,
        originalLanguage: obj.original_language,
        releaseDate: obj.release_date,
        count: obj.vote_count,
        rating: obj.vote_average,
        runtime: obj.runtime,
        posterPath: obj.poster_path,
      }

      const genresData = obj.genres.map(each => ({
        id: each.id,
        name: each.name,
      }))
      // console.log(genresData)
      const updatedSimilarData = obj.similar_movies.map(each => ({
        id: each.id,
        posterPath: each.poster_path,
        title: each.title,
      }))
      // console.log(updatedSimilarData)
      const updatedLanguagesData = obj.spoken_languages.map(each => ({
        id: each.id,
        language: each.english_name,
      }))
      this.setState({
        movieDetails: {...updatedData},
        genres: genresData,
        spokenLanguages: updatedLanguagesData,
        similarMovies: updatedSimilarData.slice(0, 6),
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onRetry = () => {
    this.getMovieDetails()
  }

  renderFailureView = () => <FailureView onRetry={this.onRetry} />

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" height={35} width={380} color=" #D81F26" />
    </div>
  )

  renderSuccessView = () => {
    const {movieDetails, genres, spokenLanguages, similarMovies} = this.state
    const {releaseDate, count, rating, budget} = movieDetails
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    const d = new Date(releaseDate)
    const monthName = months[d.getMonth()]
    const date = new Date(releaseDate)
    const year = date.getFullYear()
    const day = date.getDay().toString()
    let dateEndingWord
    if (day.endsWith('1')) {
      dateEndingWord = 'st'
    } else if (day.endsWith('2')) {
      dateEndingWord = 'nd'
    } else if (day.endsWith('3')) {
      dateEndingWord = 'rd'
    } else {
      dateEndingWord = 'th'
    }
    return (
      <>
        <div className="">
          <div className="">
            <MovieDetail movieDetails={movieDetails} key={movieDetails.id} />
          </div>
        </div>
        <div className="additional-movie-info-container additional-info-sm-container">
          <h1 className="movie-info-genre-heading">Genres</h1>
          <ul className="each-genre-ul-container">
            {genres.map(eachGenre => (
              <li className="movie-info-each-genre" key={eachGenre.id}>
                <p>{eachGenre.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="movie-info-genre-heading">Audio Available</h1>
          <ul className="each-genre-ul-container">
            {spokenLanguages.map(eachAudio => (
              <li className="movie-info-each-genre" key={eachAudio.id}>
                <p>{eachAudio.language}</p>
              </li>
            ))}
          </ul>

          <div className="each-genre-ul-container">
            <h1 className="movie-info-rating-count-heading">Rating Count</h1>
            <p className="movie-info-rating-count">{count}</p>

            <h1 className="movie-info-rating-avg-heading">Rating Average</h1>
            <p className="movie-info-rating">{rating}</p>
          </div>
          <div className="each-genre-ul-container">
            <h1 className="movie-info-budget-heading">Budget</h1>
            <p className="movie-info-budget">{budget}</p>

            <h1 className="movie-info-release-date">Release Date </h1>
            <p>
              <span className="movie-info-date">{day}</span>
              <span className="movie-info-date-end">{dateEndingWord}</span>
              <span className="movie-info-month-name">{monthName}</span>
              <span className=" movie-info-year">{year}</span>
            </p>
          </div>
        </div>
        <div className="similar-movies-container">
          <h1 className="more-like-this">More like this</h1>
          <ul className="popular-ul-container similar-ul-container">
            {similarMovies.map(each => (
              <MovieItem details={each} key={each.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderVideoDetailView = () => {
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
      <div className="dummy">
        <Header />
        <div className="root-container">
          <div className="video-details-view-container">
            {this.renderVideoDetailView()}
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
export default MovieDetailView
