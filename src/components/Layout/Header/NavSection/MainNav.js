import React from 'react'
import AccountItem from './AccountItem'
import { Link } from 'gatsby'


const MainNav = () => {
    return (
      <div id="navbarSupportedContent">
        <ul className="navbar-nav ml-md-auto menu-list">
          <li className="nav-item">
            <Link to="/products/DEWR3J">Shop</Link>
          </li>
          <li className="nav-item">
            <Link to="/learn">Learn</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact">Contact us</Link>
          </li>
          <AccountItem />
        </ul>
      </div>
    )
}

export default MainNav