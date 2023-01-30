import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import SlickCard from '../SlickMovie'
import FailureView from '../FailureView'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Originals extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    originalList: [],
  }

  componentDidMount() {
    this.getOriginalVideos()
  }

  getOriginalVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
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

      const originalResults = data.results.map(eachItem => ({
        backdropPath: eachItem.backdrop_path,
        id: eachItem.id,
        overview: eachItem.overview,
        posterPath: eachItem.poster_path,
        title: eachItem.title,
      }))

      this.setState({
        apiStatus: apiStatusConstants.success,
        originalList: originalResults,
      })
    } else if (response.status === 400) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickRetry = () => {
    this.getOriginalVideos()
  }

  renderApiSuccessView = () => {
    const {originalList} = this.state
    return <SlickCard movies={originalList} />
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

  renderOriginalViews = () => {
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
    const {originalList} = this.state
    console.log(originalList)

    return (
      <>
        <h1 className="heading">Originals</h1>
        <div className="trend-container">{this.renderOriginalViews()}</div>
      </>
    )
  }
}

export default Originals
