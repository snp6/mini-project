import {Link} from 'react-router-dom'
import './index.css'

const MovieItem = props => {
  const {details} = props
  const {id, title, posterPath} = details

  return (
    <Link to={`/movies/${id}`} target="blank">
      <li className="popular-li-item">
        <img className="popular-poster" src={posterPath} alt={title} />
      </li>
    </Link>
  )
}

export default MovieItem
