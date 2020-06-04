import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { graphql, withPrefix } from 'gatsby'
import SEO from '../components/SEO'
import AddToCart from '../components/ProductPage/AddToCart'
import Noimage from '../images/no_img.jpg'
import ProductService from '../components/ProductPage/ProductService'

import ProductTitle from '../components/ProductPage/ProductTitle'
import FreeDelivery from '../components/ProductPage/FreeDelivery'
import ProductImage from '../components/ProductPage/ProductImage'
import ProductVideo from '../components/ProductPage/Video'
import Layout from '../components/Layout/Layout'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import TransitionLink, { TransitionState } from 'gatsby-plugin-transition-link'
import { animated, useSpring } from 'react-spring'
import AniText from '../components/AnimatedText/AniText'
import Carousel from '../components/Carousel/Carousel'

import styled from 'styled-components'
import inHand from '../images/inHand.jpg'
import { Clearfix } from 'react-bootstrap'

const DarkRow = styled(Row)`
  margin: 20px 0 40px 0;

  h3 {
    width: 100%;
  }
`


const ProductPageInner = ({
  transitionStatus,
  data: { product, contentfulProduct, allContentfulReview }
}) => {
  let mount = ['entering', 'entered'].includes(transitionStatus)


  const fadeUp = useSpring({
    opacity: mount ? 1 : 0
  })


  const Titles = ['Overview', 'Materials', 'Learn', 'Usage', 'FAQ']
  const Overview = contentfulProduct && contentfulProduct.overview
  const Faq = contentfulProduct && contentfulProduct.faqQuestions
  const Features = contentfulProduct && contentfulProduct.feature

  const [selectedVariationId, setSelectedVariationId] = useState(
    product._id._oid
  )
  const onChangeSelectedProduct = id => {
    setSelectedVariationId(id)
  }
  return (
    <animated.div style={fadeUp}>
      <SEO
        type="product"
        title={product.short_description || product.name}
        description={product.meta_description || product.description}
        image={withPrefix(
          product && product.image_url ? product.image_url : Noimage
        )}
      />
      <div className="container-fluid productHead">
        
        <div className="row no-gutters">
          <div className="col-12 col-lg-7 col-xl-8">
            {/*<ProductService />*/}
            {/*<div className="product-images">
              <img src={inHand} alt="" />
            </div>*/}
            <ProductTitle title={product.name} />
            
          </div>
          <div className="col-12 col-lg-5 col-xl-4">
            <Carousel contents={allContentfulReview.nodes} slides={[1,1,1]} type={"reviews"} title={"Reviews"}/>
          </div>

        </div>
      </div>
      <div className="container-fluid">
        <div className="row no-gutters">
          

          <div className="col-12">
            <div className="blanket-bg">
              <div className="row no-gutters productMain">
                <div className="col-12 col-lg-5 col-xl-4">
                  <AddToCart
                    onChangeSelectedProduct={onChangeSelectedProduct}
                    productId={product._id._oid}
                    tags={product.tags}
                  />
                </div>
                <ProductImage
                  selectedVariationId={selectedVariationId}
                  productId={product.id}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <section>
        <div className="product-tabs">
          <div className="container-fluid">
            <Tabs defaultActiveKey="overview" id="uncontrolled-tab-example">
              <Tab eventKey="overview" title="Overview">
                <Row noGutters>
                  <AniText
                    type={"h2"}
                    head={
                      contentfulProduct && contentfulProduct.overviewHeading
                    }
                  />
                </Row>
                <DarkRow>
                  <Col md={7}>
                    {
                      <div
                        dangerouslySetInnerHTML={{
                          __html: Overview && Overview.childMarkdownRemark.html
                        }}
                      />
                    }
                  </Col>
                  <Col md={5} className="justify-content-md-center d-flex">
                    <ul>
                      {Features &&
                        Features.map((element, index) => (
                          <li key={index * Math.random()}>{element.title}</li>
                        ))}
                    </ul>
                  </Col>
                </DarkRow>
                <Row
                  noGutters
                  className="justify-content-md-center backgroundPurple colorA videoWrap"
                >
                  <Col md={6}>
                    <AniText type={"h3"}>Look Inside</AniText>
                    <AniText type={"p"}>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </AniText>
                  </Col>

                  <ProductVideo />
                </Row>

              </Tab>

              <Tab eventKey="learn" title="Learn">

              </Tab>
              <Tab eventKey="usage" title="Usage">

              </Tab>
              <Tab eventKey="faq" title="Quick Help">
                <h3>Quick Help</h3>
                <Accordion defaultActiveKey="0">
                  {Faq &&
                    Faq.map((element, index) => (
                      <Card>
                        <Accordion.Toggle as={Card.Header} eventKey={index}>
                          {element.question}
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={index}>
                          <Card.Body
                            dangerouslySetInnerHTML={{
                              __html: element.answer.childMarkdownRemark.html
                            }}
                          />
                        </Accordion.Collapse>
                      </Card>
                    ))}
                </Accordion>
              </Tab>
            </Tabs>
          </div>
        </div>
      </section>

      <FreeDelivery />
    </animated.div>
  )
}

const ProductPageBuilton = ({ data }) => {
  console.log("product page data =>", data)
  return (
    <TransitionState>
      {({ transitionStatus }) => (
        <Layout transitionStatus={transitionStatus}>
          {console.log('transitionStatus', transitionStatus)}
          <ProductPageInner transitionStatus={transitionStatus} data={data} />
        </Layout>
      )}
    </TransitionState>
  )
}

export const query = graphql`
  query($id: String!, $human: String!) {
    allContentfulReview {
      nodes {
        reviewTitle
        reviewerName
        reviewScore
        reviewDate
        location
        content {
          childMarkdownRemark {
            html
          }
        }
      }
    }
    product: builtonProduct(id: { eq: $id }) {
      _id {
        _oid
      }
      id
      name
      price
      main_product
      human_id
      description
      image_url
      short_description
      tags
      media {
        url
      }
    }
    contentfulProduct: contentfulProduct(builtonId: { eq: $human }) {
      name
      builtonId
      overviewHeading
      overview {
        childMarkdownRemark {
          html
        }
      }
      feature {
        title
        description {
          childMarkdownRemark {
            html
          }
        }
        mainImage {
          fluid(maxWidth: 1800) {
            src
          }
        }
      }
      faqQuestions {
        question
        answer {
          childMarkdownRemark {
            html
          }
        }
      }
      featureSlide {
        title
        blanketImage {
          fluid(maxWidth: 1800) {
            src
          }
        }
        description {
          childMarkdownRemark {
            html
            excerpt(pruneLength: 80)
          }
        }
      }
    }
  }
`
export default ProductPageBuilton
