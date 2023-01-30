import {Link} from 'react-router-dom'
import './index.css'

const PopularCard = props => {
  const {movie} = props

  return (
    <>
      <Link to={`/movies/${movie.id}`} className="link-item">
        <li className="li-item">
          <img src={movie.posterPath} className="poster" alt={movie.title} />
        </li>
      </Link>
    </>
  )
}

export default PopularCard
