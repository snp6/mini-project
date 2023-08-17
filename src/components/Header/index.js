import {Link, withRouter} from 'react-router-dom'
import {Component} from 'react'

import {HiOutlineSearch} from 'react-icons/hi'
import {MdMenuOpen} from 'react-icons/md'
import {ImCross} from 'react-icons/im'

import './index.css'

class Header extends Component {
  state = {
    showMenu: false,
    showSearchBar: false,
    search: '',
  }

  onClickShowMenu = () => {
    this.setState({showMenu: true})
  }

  onClickHideMenu = () => {
    this.setState({showMenu: false})
  }

  showResults = () => {
    const {searchInput} = this.props
    const {search} = this.state
    searchInput(search)
  }

  onChangeSearchInput = event => {
    if (event.key === 'Enter') {
      this.setState({search: event.target.value}, this.showResults)
    }
    this.setState({search: event.target.value})
  }

  renderSearchBar = () => {
    const {showSearchBar} = this.state
    console.log(showSearchBar)
    const name = showSearchBar ? 'show-search' : 'search-bar'
    return (
      <div>
        {showSearchBar && (
          <input
            type="search"
            onKeyDown={this.onChangeSearchInput}
            className={name}
            placeholder="search"
          />
        )}
      </div>
    )
  }

  onChangeSearch = () => {
    this.setState({showSearchBar: true})
  }

  render() {
    const {showMenu} = this.state
    const {match} = this.props
    const {path} = match
    let homeClassNameStyling
    let popularClassNameStyling
    let accountClassNameStyling

    switch (path) {
      case '/popular':
        homeClassNameStyling = 'passive'
        popularClassNameStyling = 'active'
        accountClassNameStyling = 'passive'
        break
      case '/account':
        homeClassNameStyling = 'passive'
        popularClassNameStyling = 'passive'
        accountClassNameStyling = 'active'
        break
      default:
        homeClassNameStyling = 'active'
        popularClassNameStyling = 'passive'
        accountClassNameStyling = 'passive'
        break
    }
    return (
      <nav className="nav-container">
        <div className="nav-elements-container">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dyx9u0bif/image/upload/v1657426908/lg-devices-logo_rpfa68.png"
              className="header-logo"
              alt="website logo"
            />
          </Link>
          <div className="nav-list-items">
            <Link to="/" className="nav-link">
              <p className={`popup-heading ${homeClassNameStyling}`}>Home</p>
            </Link>

            <Link to="/popular" className="nav-link">
              <p className={`popup-heading ${popularClassNameStyling}`}>
                Popular
              </p>
            </Link>
          </div>
          <div className="actions-container">
            <div className="icons-container">
              {this.renderSearchBar()}

              <button
                type="button"
                className="icon-button"
                onClick={this.onChangeSearch}
                testid="searchButton"
              >
                <Link to="/search">
                  <HiOutlineSearch size={25} color="white" />
                </Link>
              </button>
            </div>
            <Link to="/account">
              <img
                src="https://res.cloudinary.com/dyx9u0bif/image/upload/v1657426927/account-avatar_irmhck.png"
                className={`profile-logo ${accountClassNameStyling}`}
                alt="profile"
              />
            </Link>
          </div>
        </div>
        <div className="search-container">
          <MdMenuOpen
            size={25}
            color="white"
            className="menu-icon"
            onClick={this.onClickShowMenu}
          />
          <div>
            {showMenu && (
              <div className="list-mini">
                <Link to="/" className="nav-link">
                  <p className={`popup-heading ${homeClassNameStyling}`}>
                    Home
                  </p>
                </Link>
                <Link to="/popular" className="nav-link">
                  <p className={`popup-heading ${popularClassNameStyling}`}>
                    Popular
                  </p>
                </Link>

                <Link to="/account" className="nav-link">
                  <p className={`popup-heading ${accountClassNameStyling}`}>
                    Account
                  </p>
                </Link>
                <ImCross
                  size={10}
                  color="#ffffff"
                  onClick={this.onClickHideMenu}
                  className="icon"
                />
              </div>
            )}
          </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(Header)
