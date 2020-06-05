import React from 'react'
import AccountItem from './AccountItem'
import Logo from '../Logo'

export const MainNav = () => {
    return (
        <header>
          <div className="container-fluid">
            <div className="navbar navbar-expand-lg">
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
              <ul className="navbar-nav cart-boxs">
                <li className="nav-item">
                  <button onClick={handleCart}>
                    <img src={CartIcon} />
                    <span className="count-number">
                      {isEmpty && count === 0 ? 0 : count}
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </header>
    )
}
