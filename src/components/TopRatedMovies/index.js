import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import FailureView from '../FailureView'
import SlickCard from '../SlickMovie'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TopRatedMovies extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    topRatedList: [],
  }

  componentDidMount() {
    this.getTopRatedVideos()
  }

  getTopRatedVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    const apiUrl = 'https://apis.ccbp.in/movies-app/top-rated-movies'

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()

      const topRatedResults = data.results.map(eachItem => ({
        backdropPath: eachItem.backdrop_path,
        id: eachItem.id,
        overview: eachItem.overview,
        posterPath: eachItem.poster_path,
        title: eachItem.title,
      }))

      this.setState({
        apiStatus: apiStatusConstants.success,
        topRatedList: topRatedResults,
      })
    } else if (response.status === 400) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickRetry = () => {
    this.getTopRatedVideos()
  }

  renderApiSuccessView = () => {
    const {topRatedList} = this.state
    return <SlickCard movies={topRatedList} />
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

  renderTopRatedViews = () => {
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
    const {topRatedList} = this.state
    console.log(topRatedList)

    return (
      <>
        <h1 className="heading">Top Rated</h1>
        <div className="trend-container">{this.renderTopRatedViews()}</div>
      </>
    )
  }
}

export default TopRatedMovies
