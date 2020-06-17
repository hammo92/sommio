import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { graphql, withPrefix } from 'gatsby'
import SEO from '../components/SEO'
import AddToCart from '../components/ProductPage/AddToCart'
import Noimage from '../images/no_img.jpg'
import ProductService from '../components/ProductPage/ProductService'


import ProductImage from '../components/ProductPage/ProductImage'
import Layout from '../components/Layout/Layout'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import TransitionLink, { TransitionState } from 'gatsby-plugin-transition-link'
import { animated, useSpring } from 'react-spring'
import AniText from '../components/AnimatedText/AniText'
import Carousel from '../components/Carousel/Carousel'

import styled from 'styled-components'
import Configure from '../components/BuyPage/Configure'



const BuyInner = ({
  transitionStatus,
  data
}) => {
  let mount = ['entering', 'entered'].includes(transitionStatus)


  const fadeUp = useSpring({
    opacity: mount ? 1 : 0
  })

  return (
    <animated.div style={fadeUp}>
      <SEO
        type="product"
        title="title"
      />
      <Configure product={data}/>

      
    </animated.div>
  )
}

const BuyPage = ({ data }) => {
  return (
    <TransitionState>
      {({ transitionStatus }) => (
        <Layout transitionStatus={transitionStatus}>
          <BuyInner transitionStatus={transitionStatus} data={data} />
        </Layout>
      )}
    </TransitionState>
  )
}

export const query = graphql`
  fragment productDetails on BuiltonProduct {
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
      mainImage {
        childImageSharp {
          fluid {
            src
          }
        }
      }
      id
      human_id
      description
      _sub_products {
        _oid
      }
  }
  query($id: String!, $subProducts: [String]) {
    product: allBuiltonProduct(filter: {id: { eq: $id }}) {
      nodes{...productDetails}
    }
    covers: allBuiltonProduct(filter: {_id: {_oid: {in: $subProducts}}, attributes: {CoverSubProduct: {eq: true}}}){
      nodes{...productDetails}
    }
    weights: allBuiltonProduct(filter: {_id: {_oid: {in: $subProducts}}, attributes: {WeightSubProduct: {eq: true}}}){
      nodes{...productDetails}
    }
    sizes: allBuiltonProduct(filter: {_id: {_oid: {in: $subProducts}}, attributes: {SizeSubProduct: {eq: true}}}){
      nodes{...productDetails}
    }
  }
`
export default BuyPage
