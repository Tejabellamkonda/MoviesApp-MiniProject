import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import PopularCard from '../Popular/popularCard'
import FailureView from '../FailureView'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Search extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    searchList: '',
    searchText: '',
  }

  searchInput = searchValue => {
    this.setState({
      searchText: searchValue,
    })
  }

  onClickSearch = () => {
    this.getSearchVideos()
  }

  getSearchVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchText} = this.state
    console.log(searchText)

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = ` https://apis.ccbp.in/movies-app/movies-search?search=${searchText}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()

      const searchResults = data.results.map(eachItem => ({
        backdropPath: eachItem.backdrop_path,
        id: eachItem.id,
        overview: eachItem.overview,
        posterPath: eachItem.poster_path,
        title: eachItem.title,
      }))

      this.setState({
        apiStatus: apiStatusConstants.success,
        searchList: searchResults,
      })
    } else if (response.status === 400) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickRetry = () => {
    this.getSearchVideos()
  }

  renderApiSuccessView = () => {
    const {searchList, searchText} = this.state
    if (searchList.length !== 0) {
      return (
        <>
          <ul className="ul-list">
            {searchList.map(item => (
              <PopularCard key={item.id} movie={item} />
            ))}
          </ul>
        </>
      )
    }
    return (
      <div className="novideos-container">
        <img
          src="https://res.cloudinary.com/dyx9u0bif/image/upload/v1657092588/Group_7394_jzwy1v.png"
          alt="no movies"
          className="not-found-image"
        />
        <h1 className="not-found-text">
          Your search for {searchText} did not find any matches.
        </h1>
      </div>
    )
  }

  renderApiFailureView = () => <FailureView onRetry={this.onClickRetry()} />

  renderApiLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader
        type="TailSpin"
        color="rgba(216, 31, 38, 1)"
        height="50"
        width="50"
        testid="loader"
      />
    </div>
  )

  renderSearchResult = () => {
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
    return (
      <div className="popular-body search-body">
        <Header
          onSearch={this.searchInput}
          onClickSearchBtn={this.onClickSearch}
        />
        <div className="items-container">{this.renderSearchResult()}</div>
      </div>
    )
  }
}

export default Search
