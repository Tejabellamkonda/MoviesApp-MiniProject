import './index.css'

const HomePoster = props => {
  const {posters} = props
  const len = posters.length
  console.log(len)

  const random = Math.floor(Math.random() * len)

  const poster = posters[random]
  const {backdropPath, overview, title, posterPath} = poster
  console.log(poster)

  return (
    <div
      className="poster-container"
      style={{
        backgroundImage: `url(${posterPath})`,
        backgroundSize: '100% 100%',
      }}
    >
      <div className="poster-details-container">
        <h1 className="poster-title">{title}</h1>
        <p className="poster-overview">{overview}</p>
        <button type="button" className="play-btn">
          Play
        </button>
      </div>
    </div>
  )
}

export default HomePoster
