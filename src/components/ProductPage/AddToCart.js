import React, { useState, useContext, useEffect } from 'react'
import { ShippingAndUserDetailContext } from '../../context/ShippingAndUserDetailContext'
import PlushImages from '../../images/plush.png'
import SommioModal from '../modal.js'
import { useStateValue } from '../../context/SiteContext'

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import { useStaticQuery, Link } from 'gatsby'
import { CartContext } from '../../context/CartContext'
const AddToCart = ({ productId, tags, onChangeSelectedProduct }) => {
  const { allBuiltonProduct } = useStaticQuery(graphql`
    query {
      allBuiltonProduct {
        nodes {
          _id {
            _oid
          }
          tags
          short_description
          price
          final_price
          name
          currency
          parents {
            _oid
          }
          media {
            human_id
            url
          }
          main_product
          image_url
          id
          human_id
          description
          _sub_products {
            _oid
          }
        }
      }
    }
  `)
  const { setVariation, setToggle, toggle } = useContext(
    ShippingAndUserDetailContext
  )
  const {
    set_cart,
    setSubProductPrice,
    weightPrice,
    coverPrice,
    Weight,
    Cover
  } = useContext(CartContext)
  const [{ cart }, dispatch] = useStateValue()
  const [weight, setWeight] = useState(null)
  const [cover, setCover] = useState(null)

  console.log('[addtocart] Weight, Cover => ', Weight, Cover)

  let weightSubProduct = []
  let coverSubProduct = []
  let childData = []
  let parentData = []
  let shipmentProduct = []
  let mainProduct = []

  allBuiltonProduct.nodes.map(data => {
    if (productId !== data._id._oid && data.main_product === false) {
      childData.push(data)
    } else {
      parentData.push(data)
    }
  })

  parentData.filter(product => {
    if (product.name === 'Shipping cost') {
      shipmentProduct.push(product)
    } else {
      mainProduct.push(product)
    }
  })

  childData.map(sub => {
    if (sub.tags[0] === 'Weight' && productId === sub.parents[0]._oid) {
      weightSubProduct.push(sub)
    } else if (sub.tags[0] === 'Cover' && productId === sub.parents[0]._oid) {
      coverSubProduct.push(sub)
    }
  })

  console.log('[addtocart] local weight,cover => ', weight, cover)

  const selectedCover = coverSubProduct.filter(sub => {
    if (cover === null) {
      return sub.name === coverSubProduct[0].name
    } else {
      return sub.name === cover
    }
  })

  const selectedWeight = weightSubProduct.filter(sub => {
    if (weight === null) {
      return sub.name === weightSubProduct[0].name
    } else {
      return sub.name === weight
    }
  })
  useEffect(() => {
    setSubProductPrice(selectedWeight, selectedCover)
  }, [weight, cover])

  const [blancketCover, setBlancketCover] = useState(coverSubProduct[0].name)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  let i = 0

  const toggleHandle = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const updateVariations = (e, name, price, id) => {
    onChangeSelectedProduct(id)
    if (name === 'Weight') {
      setVariation(name, e.target.value, price)
      setWeight(e.target.value)
    } else if (name === 'Cover') {
      setVariation(name, e, price)
      setCover(e)
    } else {
      setVariation(name, 'Single', price)
    }
  }

  let selectedProduct
  mainProduct.filter(i => {
    if (productId === i._id._oid) {
      selectedProduct = i
    }
  })

  let selectedCoverPrice = selectedCover[0] && selectedCover[0].price
  let selectedWeightPrice = selectedWeight[0] && selectedWeight[0].price

  let finalProductPrice =
    selectedProduct &&
    selectedProduct.price + selectedCoverPrice + selectedWeightPrice

  console.log('[addtocart] finalProductPrice => ', finalProductPrice)

  let testCart = {
    type: 'cart_item_builton',
    main_product_id: selectedProduct._id._oid,
    coverId: selectedCover[0] && selectedCover[0]._id._oid,
    weightId: selectedWeight[0] && selectedWeight[0]._id._oid,
    coverName: selectedCover[0] && selectedCover[0].name,
    weightName: selectedWeight[0] && selectedWeight[0].name,
    id: selectedProduct.id,
    name: selectedProduct.name,
    quantityBuilton: 1,
    human_id: selectedProduct.human_id,
    description: selectedProduct.description,
    price: selectedProduct.price,
    final_price: finalProductPrice,
    main_product: selectedProduct.main_product,
    image_url: selectedProduct.image_url,
    media: selectedProduct.media,
    coverPrice: coverPrice,
    weightPrice: weightPrice,
    subProduct: { selectedWeight, selectedCover },
    isAddToCart: true,
    currency: selectedProduct.currency,
    shippingProductId: shipmentProduct[0]._id._oid
  }
  const handleAddToCart = () => {
    set_cart(testCart)
    setToggle()
    dispatch({
      type: 'setCart',
      setCart: { drawer: true }
    })
  }
  let price =
    selectedProduct && selectedProduct.price + weightPrice + coverPrice
  return (
    <div className="product-variation">
      <div className="blanket-boxs">
        <div className="size-boxs">
          <h4>Blanket Size</h4>
          <p>Single 130*120</p>
        </div>
        <SommioModal text="are other sizes available?">
          <p>Currently only the standard single size is available</p>
        </SommioModal>
      </div>
      <div className="blanket-boxs">
        <div className="size-boxs">
          <h4>Blanket Weight</h4>
        </div>
        <SommioModal text="Help me choose">
          <p>Currently only the standard single size is available</p>
        </SommioModal>

        <div className="radio-group">
          {weightSubProduct.map((weight, k) => (
            <div className="radio-boxs" key={weight._id._oid}>
              <input
                type="radio"
                name="weight"
                value={weight.name}
                id={weight.tags[0] + i}
                onChange={e =>
                  updateVariations(
                    e,
                    weight.tags[0],
                    weight.price,
                    weight._id._oid
                  )
                }
                defaultChecked={k === 0 ? true : false}
              />
              <label for={weight.tags[0] + i++}>
                <div className="title">{weight.name}</div>
                <div className="content">
                  <h4>Recommended for users who weigh between:</h4>
                  <span>{weight.short_description}</span>
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="blanket-boxs">
        <div className="size-boxs">
          <h4>Blanket Cover</h4>
        </div>
        <SommioModal text="Help me choose">
          <p>Currently only the standard single size is available</p>
        </SommioModal>
        <Dropdown
          defaultValue={blancketCover}
          isOpen={dropdownOpen}
          toggle={toggleHandle}
        >
          <DropdownToggle caret>
            <img src={PlushImages} alt="plushImages" />
            <div className="content ml-auto">
              <h3>{blancketCover}</h3>
              <p>A luxuriously soft faux fur cover</p>
            </div>
          </DropdownToggle>
          <DropdownMenu>
            {coverSubProduct.map((cover, i) => (
              <div
                onClick={e =>
                  updateVariations(
                    cover.name,
                    cover.tags[0],
                    cover.price,
                    cover._id._oid
                  )
                }
                key={i}
              >
                <DropdownItem
                  defaultValue={cover.name}
                  onClick={() => setBlancketCover(cover.name)}
                >
                  <img src={PlushImages} alt="plushImages" />
                  <div className="content ml-auto">
                    <h3>{cover.name}</h3>
                    <p>A luxuriously soft faux fur cover</p>
                  </div>
                </DropdownItem>
              </div>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="price-main">
        <h4>
          <span>{Weight}</span> blanket with <span>{Cover}</span> cover
        </h4>
        <div className="price-boxs">
          <span className="price">{finalProductPrice} </span>
          <p>Or 6 weekly Interest free payments from £ 21.12</p>
        </div>
        <button className="btn btn-success" onClick={handleAddToCart}>
          Add to Basket
        </button>
        <p className="delivery-text">
          Delivery tomorrow if ordered in the next 3h 45m{' '}
        </p>
      </div>
    </div>
  )
}

export default AddToCart
