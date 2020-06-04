import React from 'react'



export const MainNav = () => {
    return (
        <header>
          <div className="container-fluid">
            <div className="navbar navbar-expand-lg">
              <Link className="navbar-brand" to="/">
                <img src={Logo} className="logofull" />
                <img src={logoCheckout} className="logosymbol" />
              </Link>
              <div className={`${classOne}`} id="navbarSupportedContent">
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
                  <li className="nav-item nav-account">
                    {refresh && firebase && firebase.auth().currentUser ? (
                      <DropdownButton
                        title={
                          firebase &&
                          firebase.auth() &&
                          firebase.auth().currentUser &&
                          firebase.auth().currentUser.email
                        }
                        id={'accountDropdown'}
                      >
                        <Dropdown.Item href="/myAccount">
                          My Orders
                        </Dropdown.Item>
                        <Dropdown.Item onClick={handleLogout}>
                          Log Out
                        </Dropdown.Item>
                      </DropdownButton>
                    ) : (
                      <div>
                        <button onClick={toggleModal}>My Account</button>
                      </div>
                    )}
                  </li>
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
          <Modal
            show={modal}
            toggle={toggleModal}
            className="Login-modal"
            onHide={toggleModal}
          >
            <ModalHeader toggle={toggleModal} closeButton>
              User Account
            </ModalHeader>
            <ModalBody>
              <RegisterOrLogin
                isModal={true}
                toggleModal={toggleModal}
                setDropdownOpen={setDropdownOpen}
              />
            </ModalBody>
          </Modal>
        </header>
    )
}
