import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import FailureView from '../FailureView'
import MovieCard from '../MovieDetailCard'
import Header from '../Header'
import Footer from '../Footer'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MovieItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    movieItemList: '',
  }

  componentDidMount() {
    this.getMovieItemDetails()
  }

  getMovieItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)

    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    const apiUrl = `https://apis.ccbp.in/movies-app/movies/${id}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()

      const movieItemResults = data.movie_details

      this.setState({
        apiStatus: apiStatusConstants.success,
        movieItemList: movieItemResults,
      })
    } else if (response.status === 400) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickRetry = () => {
    this.getMovieItemDetails()
  }

  renderApiSuccessView = () => {
    const {movieItemList} = this.state
    console.log(movieItemList)
    return (
      <>
        <MovieCard movie={movieItemList} />
      </>
    )
  }

  renderApiFailureView = () => <FailureView onRetry={this.onClickRetry} />

  renderApiLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader
        type="TailSpin"
        color="rgba(216, 31, 38, 1)"
        height="50"
        width="50"
      />
    </div>
  )

  renderMovieDetailViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderApiSuccessView()
      case apiStatusConstants.failure:
        return this.renderApiFailureView()
      case apiStatusConstants.inProgress:
        return this.renderApiLoadingView()
      default:
        return null
    }
  }

  render() {
    const {movieItemList} = this.state
    console.log(movieItemList)

    return (
      <div className="home-container">
        <Header />{' '}
        <div className="body-container">
          <div className="home-poster-container">
            {this.renderMovieDetailViews()}
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default MovieItemDetails
