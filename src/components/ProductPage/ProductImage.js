import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Slider from 'react-slick'

function ProductImage({ productId }) {
  const { allBuiltonProduct } = useStaticQuery(
    graphql`
      query {
        allBuiltonProduct {
          nodes {
            id
            media {
              human_id
              url
            }
          }
        }
      }
    `
  )
  const mainProduct = allBuiltonProduct.nodes.filter(product => {
    return product.id === productId
  })

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  return (
    <div className="product-gallery">
      <Slider {...settings}>
        {mainProduct[0] &&
          mainProduct[0].media.map((img, i) => (
            <img src={img.url} alt="product-image" key={i} />
          ))}
      </Slider>
    </div>
  )
}
export default ProductImage
