import React, { useContext, useState, useEffect }  from 'react'
import firebase from "gatsby-plugin-firebase"
import { newFirebaseToken } from '../../../../utils/newFirebaseToken'
import { useAuthState } from 'react-firebase-hooks/auth';
import { ShippingAndUserDetailContext } from '../../../../context'
import Builton from '@builton/core-sdk'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Modal from 'react-bootstrap/Modal'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalBody from 'react-bootstrap/ModalBody'
import RegisterOrLogin from '../../../Checkout/RegisterOrLogin'


const AccountItem = () => {
    let newToken = newFirebaseToken()
    const [modal, setModal] = useState(false)
    const [user, loading, error] = useAuthState(firebase.auth());
    const [refresh, setRefresh] = useState(false)
    const { setUserBuilton } = useContext(ShippingAndUserDetailContext)
    const toggleModal = () => setModal(!modal)
    let token = localStorage.getItem('firebaseToken')
    let details = JSON.parse(localStorage.getItem('details'))
    const [dropdownOpen, setDropdownOpen] = useState(false)

    useEffect(() => {
    
        // If signed in disable modal
        user && setModal(false)
          
        !(firebase && firebase.auth().currentUser)
            ? setTimeout(() => setRefresh(true), 1000)
            : setRefresh(true)
        //})
    
        let dataFromStorage = sessionStorage.getItem('cartDetails')
        //let cartData = JSON.parse(dataFromStorage)
    
        
        var builton = new Builton({
          apiKey: process.env.GATSBY_BUILTON_API_KEY,
          bearerToken: token !== null ? token : newToken
        })
        setUserBuilton(details && details.email, builton)
      }, [])

      const handleLogout = () => {
        firebase.auth().signOut();
      }

    return (
        <>
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
        </>
    )
}
export default AccountItem