import './index.css'

const MovieCard = props => {
  const {movie} = props
  console.log(movie)
  const {title, overview, runtime, adult, genres} = movie
  const hours = Math.floor(runtime / 60)
  const minutes = runtime % 60
  const date = new Date(movie.release_date)
  const year = date.getFullYear()
  console.log(year)

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
            <h1 className="run-time">
              {hours}h {minutes}min
            </h1>
            <h1 className="adult-text text">{adult ? 'A' : 'U/A'}</h1>
            <h1 className="year-text">{year}</h1>
          </div>
          <p className="poster-overview">{overview}</p>
          <button type="button" className="play-btn">
            Play
          </button>
        </div>
      </div>
      <div className="more-details-container">
        <ul className="ul-container">
          <p className="li-head">Genre</p>
          {genres.map(each => (
            <li key={each.id} className="li-text">
              {each.name}
            </li>
          ))}
        </ul>
        <ul className="ul-container">
          <p className="li-head">Audio Available</p>
          {movie.spoken_languages.map(each => (
            <li key={each.id} className="li-text">
              {each.english_name}
            </li>
          ))}
        </ul>
        <ul className="ul-container">
          <p className="li-head">Rating Count</p>
          <p className="li-text">{movie.vote_count}</p>
          <p className="li-head">Rating Average</p>
          <p className="li-text">{movie.vote_average}</p>
        </ul>
        <ul className="ul-container">
          <p className="li-head">Rating Count</p>
          <p className="li-text">{movie.vote_count}</p>
          <p className="li-head">Rating Average</p>
          <p className="li-text">{movie.vote_average}</p>
        </ul>
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
