import './index.css'

const MovieCard = props => {
  const {movie} = props
  console.log(movie)
  const {title, overview, runtime, adult, genres} = movie
  const hours = Math.floor(runtime / 60)
  const minutes = runtime % 60
  const date = new Date(movie.release_date)
  const year = date.getFullYear()

  return (
    <div className="movie-card-container">
      <div
        className="poster-container"
        style={{
          backgroundImage: `url(${movie.backdrop_path})`,
          backgroundSize: '100% 100%',
        }}
      >
        <div className="movie-details-container">
          <h1 className="poster-title">{title}</h1>
          <div className="runtime-cont">
            <p className="run-time">
              {hours}h {minutes}min
            </p>
            <p className="adult-text text">{adult ? 'A' : 'U/A'}</p>
            <p className="year-text">{year}</p>
          </div>
          <p className="poster-overview">{overview}</p>
          <button type="button" className="play-btn">
            Play
          </button>
        </div>
      </div>
      <div className="more-details-container">
        <div className="ul-container">
          <h1 className="li-head">Genres</h1>
          {genres.map(each => (
            <p key={each.id} className="li-text">
              {each.name}
            </p>
          ))}
        </div>
        <div className="ul-container">
          <h1 className="li-head">Audio Available</h1>
          {movie.spoken_languages.map(each => (
            <p key={each.id} className="li-text">
              {each.english_name}
            </p>
          ))}
        </div>
        <div className="ul-container">
          <h1 className="li-head">Rating Count</h1>
          <p className="li-text">{movie.vote_count}</p>
          <h1 className="li-head">Rating Average</h1>
          <p className="li-text">{movie.vote_average}</p>
        </div>
        <div className="ul-container">
          <h1 className="li-head">Budget</h1>
          <p className="li-text">{movie.budget}</p>
          <h1 className="li-head">Release Date</h1>
          <p className="li-text">{movie.release_date}</p>
        </div>
      </div>
      <h1 className="heading">More like this</h1>
      <ul className="ul-list">
        {movie.similar_movies.map(each => (
          <>
            <li className="li-item" key={each.id}>
              <img className="poster" src={each.poster_path} alt={each.title} />
            </li>
          </>
        ))}
      </ul>
    </div>
  )
}

export default MovieCard
