import {Link} from 'react-router-dom'
import './index.css'

const MovieItem = props => {
  const {details} = props
  const {id, title, posterPath} = details

  return (
    <li className="popular-li-item">
      <Link to={`/movies/${id}`} target="blank">
        <img className="popular-poster" src={posterPath} alt={title} />
      </Link>
    </li>
  )
}

export default MovieItem
