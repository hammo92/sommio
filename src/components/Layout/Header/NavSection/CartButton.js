import React, {useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons'
import {CartContext} from '../../../../context'
import { useStateValue } from '../../../../context/SiteContext'

const CartButton = () => {
    const { fetchCartDataFromStorage, count, isEmpty } = useContext(CartContext)
    const [{ cart }, dispatch] = useStateValue()
    /* show or hide cart drawer */
    const handleCart = () => {
        dispatch({
        type: 'setCart',
        setCart: { drawer: true }
        })
    }
    /****************************/
    return (
        <ul className="navbar-nav cart-boxs">
            <li className="nav-item">
                <button onClick={handleCart}>
                <FontAwesomeIcon icon={faShoppingBasket} />
                <span className="count-number">
                    {isEmpty && count === 0 ? 0 : count}
                </span>
                </button>
            </li>
        </ul>
)
}

export default CartButton