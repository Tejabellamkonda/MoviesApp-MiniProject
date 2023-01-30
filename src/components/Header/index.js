import {Link, withRouter} from 'react-router-dom'
import {Component} from 'react'

import {HiOutlineSearch} from 'react-icons/hi'
import {MdMenuOpen} from 'react-icons/md'
import {ImCross} from 'react-icons/im'

import './index.css'

class Header extends Component {
  state = {
    showMenu: false,
  }

  onClickSearchIcon = () => {
    const {onClickSearchBtn} = this.props
    onClickSearchBtn()
  }

  onClickShowMenu = () => {
    this.setState({showMenu: true})
  }

  onClickHideMenu = () => {
    this.setState({showMenu: false})
  }

  onChangeSearchInput = event => {
    const {onSearch} = this.props
    onSearch(event.target.value)
  }

  render() {
    const {showMenu} = this.state
    const {match} = this.props
    const {path} = match
    let homeClassNameStyling
    let popularClassNameStyling
    let accountClassNameStyling
    let show = false

    switch (path) {
      case '/search':
        show = true
        break
      case '/popular':
        homeClassNameStyling = 'passive'
        popularClassNameStyling = 'active'
        accountClassNameStyling = 'passive'
        break
      case '/profile':
        homeClassNameStyling = 'passive'
        popularClassNameStyling = 'passive'
        accountClassNameStyling = 'active'
        break
      case '/':
        homeClassNameStyling = 'active'
        popularClassNameStyling = 'passive'
        accountClassNameStyling = 'passive'
        break
      default:
        break
    }

    return (
      <nav className="nav-container">
        <div className="nav-elements-container">
          <div className="nav-item3-container">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dyx9u0bif/image/upload/v1657426908/lg-devices-logo_rpfa68.png"
                className="app-logo"
                alt="website logo"
              />
            </Link>
            <ul className="nav-list-items">
              <Link to="/" className="nav-link">
                <li className={`popup-heading ${homeClassNameStyling}`}>
                  Home
                </li>
              </Link>
              <Link to="/popular" className="nav-link">
                <li className={`popup-heading ${popularClassNameStyling}`}>
                  Popular
                </li>
              </Link>
            </ul>
          </div>
          <div className="search-container">
            {show && (
              <>
                <input
                  type="search"
                  onChange={this.onChangeSearchInput}
                  placeholder="search"
                  className="search"
                />
                <button
                  type="button"
                  className="search-btn"
                  testid="searchButton"
                  onClick={this.onClickSearchIcon}
                >
                  <HiOutlineSearch color="white" testid="searchButton" />
                </button>
              </>
            )}

            <Link to="/search">
              <button
                type="button"
                className={`${show ? 'search-none' : 'icon-button'}`}
                testid="searchButton"
              >
                <HiOutlineSearch size={20} color="white" />
              </button>
            </Link>

            <Link to="/account">
              <img
                src="https://res.cloudinary.com/dyx9u0bif/image/upload/v1657426927/account-avatar_irmhck.png"
                className={`profile-logo ${accountClassNameStyling}`}
                alt="profile"
              />
            </Link>
            <MdMenuOpen
              size={25}
              color="white"
              className="menu-icon"
              onClick={this.onClickShowMenu}
            />
          </div>
        </div>
        {showMenu && (
          <div className="mbl-view">
            <ul className="list-mini">
              <Link to="/" className="nav-link">
                <li className={`popup-heading ${homeClassNameStyling}`}>
                  Home
                </li>
              </Link>
              <Link to="/popular" className="nav-link">
                <li className={`popup-heading ${popularClassNameStyling}`}>
                  Popular
                </li>
              </Link>

              <Link to="/profile" className="nav-link">
                <li className={`popup-heading ${accountClassNameStyling}`}>
                  Account
                </li>
              </Link>
              <ImCross
                size={10}
                color="#ffffff"
                onClick={this.onClickHideMenu}
                className="icon"
              />
            </ul>
          </div>
        )}
      </nav>
    )
  }
}

export default withRouter(Header)
