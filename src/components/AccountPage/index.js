import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import SavedContext from '../../Context'

import './index.css'

const AccountPage = props => (
  <SavedContext.Consumer>
    {value => {
      const {username, password} = value
      console.log(username, password)

      const {history} = props

      const userName = localStorage.getItem('username')
      const password1 = localStorage.getItem('password')

      console.log('*'.repeat(password.length))

      const onClickLogout = () => {
        localStorage.removeItem('username')
        localStorage.removeItem('password')
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      return (
        <>
          <div className="account-main-container">
            <Header />

            <div className="content">
              <h1 className="acc-text">Account</h1>
              <hr className="hr-line" />
              <div className="acc-membership">
                <p className="membership-text">Member ship</p>

                <div className="text-container">
                  <p className="user-text">{userName}</p>
                  <p className="user-password">
                    {' '}
                    Password:{'*'.repeat(password1.length)}
                  </p>
                </div>
              </div>
              <hr className="hr-line" />
              <div className="acc-membership">
                <p className="membership-text">Plan Details</p>
                <p className="user-text">Premium Ultra HD</p>
              </div>
              <hr className="hr-line" />
              <button
                type="submit"
                className="logout-btn"
                onClick={onClickLogout}
              >
                Logout
              </button>
            </div>

            <Footer />
          </div>
        </>
      )
    }}
  </SavedContext.Consumer>
)
export default withRouter(AccountPage)
