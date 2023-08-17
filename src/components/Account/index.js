import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const Account = props => {
  const username = localStorage.getItem('username')
  const password = localStorage.getItem('password')

  const symbol = '*'
  const pass = symbol.repeat(password.length)

  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <>
      <div>
        <Header />
        <div className="account-details-container" testid="account">
          <h1 className="account-heading">Account</h1>
          <hr className="hr-line" />
          <div className="member-details-container">
            <p className="membership-heading">Membership</p>
            <div>
              <p className="membership-email">{username}@gmail.com</p>
              <p className="membership-password">Password:{pass}</p>
            </div>
          </div>
          <hr className="hr-line" />
          <div className="membership-container">
            <p className="plan-details">Plan Details</p>
            <p className="membership-premium">Premium</p>
            <p className="ultra-hd">Ultra HD</p>
          </div>
          <hr className="hr-line" />
          <div className="account-logout-container">
            <button
              onClick={onClickLogout}
              className="account-logout"
              type="button"
            >
              Logout
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Account
