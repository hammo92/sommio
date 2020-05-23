import React, { useState, useContext, useEffect } from 'react'
import { ShippingAndUserDetailContext } from '../../context/ShippingAndUserDetailContext'
import PlushImages from '../../images/plush.jpg'
import { useStateValue } from '../../context/SiteContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRight,
  faArrowLeft,
  faArrowDown,
  faArrowUp
} from '@fortawesome/free-solid-svg-icons'
import { useStaticQuery, graphql } from 'gatsby'
import { CartContext } from '../../context/CartContext'
const AddToCart = ({ productId, onChangeSelectedProduct }) => {
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
  const { setVariation, setToggle } = useContext(ShippingAndUserDetailContext)
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
  const [currentIndex, setCurrentIndex] = useState(0)
  const [coverIndex, setCoverIndex] = useState(0)

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

  //compare function for sorting weights
  function compare(a, b) {
    const weightA = parseInt(a.name.split(' ')[0], 10)
    const weightB = parseInt(b.name.split(' ')[0], 10)
    let comparison = 0
    if (weightA > weightB) {
      comparison = 1
    } else if (weightA < weightB) {
      comparison = -1
    }
    return comparison
  }

  // set child data to category - weight or cover
  childData.map(sub => {
    if (sub.tags[0] === 'Weight' && productId === sub.parents[0]._oid) {
      weightSubProduct.push(sub)
    } else if (sub.tags[0] === 'Cover' && productId === sub.parents[0]._oid) {
      coverSubProduct.push(sub)
    }
  })

  // sort weight
  weightSubProduct.sort(compare)

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

  const updateVariations = (e, name, price, id) => {
    onChangeSelectedProduct(id)
    if (name === 'Weight') {
      setVariation(name, e, price)
      setWeight(e)
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

  const arrowUp = index => {
    setCurrentIndex(index)
    updateVariations(
      weightSubProduct[index].name,
      weightSubProduct[index].tags[0],
      weightSubProduct[index].price,
      weightSubProduct[index]._id._oid
    )
  }
  const arrowDown = index => {
    setCurrentIndex(index)
    updateVariations(
      weightSubProduct[index].name,
      weightSubProduct[index].tags[0],
      weightSubProduct[index].price,
      weightSubProduct[index]._id._oid
    )
  }
  const coverChange = index => {
    setCoverIndex(index)
    updateVariations(
      coverSubProduct[index].name,
      coverSubProduct[index].tags[0],
      coverSubProduct[index].price,
      coverSubProduct[index]._id._oid
    )
  }
  return (
    <div className="product-variation">
      <div className="blanket-boxs">
        <div className="size-boxs">
          <h4>Size:</h4>
          <p>Adult Single - 135 x 200 cm</p>
        </div>
      </div>

      <div className="weight-box">
        <div className="leftBox">
          <h2>Weight:</h2>
          <div>
            <p>Recommended for users who weigh between:</p>
            <h3>
              {weightSubProduct[currentIndex] &&
                weightSubProduct[currentIndex].short_description}
            </h3>
          </div>
        </div>
        <div className="rightBox weightChange">
          <div
            className={`arrowBox ${currentIndex === 0 && 'disabled'}`}
            onClick={() => arrowUp(currentIndex === 0 ? 0 : currentIndex - 1)}
          >
            <p>lighter</p> <FontAwesomeIcon icon={faArrowUp} />
          </div>
          <div className="weightBox">
            {weightSubProduct[currentIndex] &&
              weightSubProduct[currentIndex].name}
          </div>
          <div
            className={`arrowBox ${currentIndex ===
              weightSubProduct.length - 1 && 'disabled'}`}
            onClick={() =>
              arrowDown(
                currentIndex < weightSubProduct.length - 1
                  ? currentIndex + 1
                  : weightSubProduct.length - 1
              )
            }
          >
            <p>heavier</p> <FontAwesomeIcon icon={faArrowDown} />
          </div>
        </div>
      </div>

      {/* <div className="blanket-boxs">
        <div className="size-boxs">
          <h4>Blanket Weight</h4>
        </div>
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
      </div> */}

      <div className="blanket-boxs cover-box">
        <div className="leftBox">
          <h2>Cover:</h2>
          <div>
            <h3>{coverSubProduct[coverIndex].name}</h3>
            <p>{coverSubProduct[coverIndex].description}</p>
          </div>
        </div>
        <div className="rightBox coverChange">
          <div className="imageWrapper">
            <img src={PlushImages} alt="plushImages" />
          </div>
          <div
            className={`arrowBox ${coverIndex === 0 && 'disabled'}`}
            onClick={() => coverChange(coverIndex !== 0 && coverIndex - 1)}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </div>
          <div
            className={`arrowBox ${coverIndex === coverSubProduct.length - 1 &&
              'disabled'}`}
            onClick={() =>
              coverChange(coverIndex < coverSubProduct.length && coverIndex + 1)
            }
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
        </div>
        {/*} <Dropdown
          defaultValue={blanketCover}
          isOpen={dropdownOpen}
          toggle={toggleHandle}
        >
          <DropdownToggle caret>
            <div className="content ml-auto">
              <h2>Cover:</h2>
              <h3>{blanketCover}</h3>
              <p>A luxuriously soft faux fur cover</p>
            </div>
            <img src={PlushImages} alt="plushImages" />
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
                  onClick={() => setblanketCover(cover.name)}
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
        </Dropdown>*/}
      </div>

      <div className="price-main">
        <h4>
          <span>{Weight}</span> blanket with <span>{Cover}</span> cover
        </h4>
        <p className="delivery-text">
          Delivery tomorrow if ordered in the next 3h 45m{' '}
        </p>
        <div className="price-boxs">
          <span className="price">£{finalProductPrice} </span>
          <button className="btn btn-success" onClick={handleAddToCart}>
            Add to Basket
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddToCart
