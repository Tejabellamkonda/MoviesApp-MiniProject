import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import FailureView from '../FailureView'
import Header from '../Header'
import Footer from '../Footer'
import PopularCard from './popularCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Popular extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    popularList: [],
  }

  componentDidMount() {
    this.getPopularVideos()
  }

  onClickRetry = () => {
    this.getPopularVideos()
  }

  getPopularVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    const apiUrl = 'https://apis.ccbp.in/movies-app/popular-movies'

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()

      const popularResults = data.results.map(eachItem => ({
        backdropPath: eachItem.backdrop_path,
        id: eachItem.id,
        overview: eachItem.overview,
        posterPath: eachItem.poster_path,
        title: eachItem.title,
      }))

      this.setState({
        apiStatus: apiStatusConstants.success,
        popularList: popularResults,
      })
    } else if (response.status === 400) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderApiSuccessView = () => {
    const {popularList} = this.state

    return (
      <ul className="ul-list">
        {popularList.map(item => (
          <PopularCard key={item.id} movie={item} />
        ))}
      </ul>
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

  renderPopularViews = () => {
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
    const {popularList} = this.state
    console.log(popularList)

    return (
      <div className="popular-body">
        <Header />
        <div className="items-container">{this.renderPopularViews()}</div>
        <Footer />
      </div>
    )
  }
}

export default Popular
