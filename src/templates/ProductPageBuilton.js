import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql, withPrefix } from 'gatsby'
import SEO from '../components/SEO'
import AddToCart from '../components/ProductPage/AddToCart'
import Noimage from '../images/no_img.jpg'
import ProductService from '../components/ProductPage/ProductService'
import ProductReview from '../components/ProductPage/ProductReview'
import ProductTitle from '../components/ProductPage/ProductTitle'
import HelpSlider from '../components/ProductPage/HelpSlider'
import FreeDelivery from '../components/ProductPage/FreeDelivery'
import ProductImage from '../components/ProductPage/ProductImage'
import ProductVideo from '../components/ProductPage/Video'

import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'



import styled from "styled-components"



const TitleContain = styled.div`
  margin:0 15px;
  padding-bottom:20px;

  h2{
    font-size:5em;
    color:
    #ACC7F0;
    font-weight: 900;
    margin: 0;
    line-height: 1;

    &:first-child{
      color:#ffffff
    }

  }
`

const DarkRow = styled(Row)`
margin: 20px 0 40px 0;


h3{
  width:100%;
}
`
const ImageGrid = styled.div`
  display:grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 50% 50%;
  width:100%;
  height:70vh;

  div{
    width:100%;
    display:flex;
    align-items:end;
    overflow:hidden;
    &:first-child{
      grid-row-start: 1;
      grid-row-end: 3;
    }
    img{width:100%}
  }
`

function ProductPage({ data: { product, contentful } }) {



  let CurrentProduct
  const ContentfulProduct = contentful.edges
  ContentfulProduct.slice(0).map(({ node: prod }) => (
          prod.moltinId === product.id ? CurrentProduct = prod : ''
  ))
  const Titles = ["Overview", "Materials","Learn","Usage","FAQ"]
  const Overview = CurrentProduct.overview
  const Faq = CurrentProduct.faqQuestions
  const Features = CurrentProduct.feature
  const FeatureSlides = CurrentProduct.featureSlide[0]
  let Headings = CurrentProduct.overviewHeading.split(" ")
  const LastWord = Headings.pop()
  Headings = Headings.join(" ")
  console.log(FeatureSlides);

const ProductPageBuilton = ({ data: { product } }) => {
  return (
    <div>
      <SEO
        type="product"
        title={product.short_description || product.name}
        description={product.meta_description || product.description}
        image={withPrefix(
          product && product.image_url ? product.image_url : Noimage
        )}
      />
      <div className="container-fluid">
        <div className="row no-gutters">
          <div className="col-12 col-lg-8">
            <ProductService />
            <ProductTitle title={product.name} />
          </div>
          <div className="col-12 col-lg-4">
            <ProductReview />
          </div>

          <div className="col-12">
            <div className="blanket-bg">
              <div className="row">
                <div className="col-12 col-lg-4">
                  <AddToCart productId={product.id} tags={product.tags} />
                </div>
                <div className="col-12 col-lg-8">
                  <ProductImage productId={product.id} />
                </div>
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
          <Container fluid>
            <Row>
              <TitleContain><h2 >{Headings}</h2><h2>{LastWord}</h2></TitleContain>

            </Row>
            <ProductVideo />
            <DarkRow>
              <Col md={12}>
              <h3>What is it?</h3>
              </Col>
              <Col md={9}>
                <div dangerouslySetInnerHTML={{
                      __html: Overview.childMarkdownRemark.html,
                    }}
                />
              </Col>
              <Col md={3} className="justify-content-md-center d-flex">
                <ul>
                {Features.map((element, index) => (
                  <li >{element.title}</li>
                ))}
                </ul>
              </Col>
            </DarkRow>

            </Container>
            <ImageGrid>
            <div><img src="https://cdn.shopify.com/s/files/1/0064/3262/0633/t/35/assets/sleepings.png?128218" /></div>
            <div><img src="https://cdn.shopify.com/s/files/1/0064/3262/0633/t/35/assets/sleeping-sheets-2.png?128218" /></div>
            <div><img src="https://cdn.shopify.com/s/files/1/0064/3262/0633/t/35/assets/pillow.png?128218" /></div>
            </ImageGrid>



          </Tab>
          <Tab eventKey="materials" title="Materials">
            <p>two</p>
          </Tab>
          <Tab eventKey="learn" title="Learn" >

              <HelpSlider />

          </Tab>
          <Tab eventKey="usage" title="Usage" >
            <HelpSlider />
          </Tab>
          <Tab eventKey="faq" title="Quick Help" >
            <h3>Quick Help</h3>
            <Accordion defaultActiveKey="0">
              {Faq.map((element, index) => (
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey={index}>
                    {element.question}
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={index}>
                    <Card.Body dangerouslySetInnerHTML={{
                          __html: element.answer.childMarkdownRemark.html,
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
<<<<<<< HEAD:src/templates/ProductPage.js
    </React.Fragment>

=======
    </div>
>>>>>>> 7f0bb8e9b8d51ddac195f61d1eacb41e3296b093:src/templates/ProductPageBuilton.js
  )
}
export const query = graphql`
  query($id: String!) {
    product: builtonProduct(id: { eq: $id }) {
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
    contentful: allContentfulProduct{
      edges{
        node{
          name
          moltinId
          overviewHeading
          overview{
            childMarkdownRemark {
            html
            }
          }
          feature{
            title
            description{
              childMarkdownRemark {
              html
              }
            }
            mainImage{
              fluid(maxWidth: 1800) {
                  ...GatsbyContentfulFluid_withWebp_noBase64
              }
            }
          }
          faqQuestions{
            question
            answer{
              childMarkdownRemark {
              html
              }
            }
          }
          featureSlide{
            title
            blanketImage {
              fluid(maxWidth: 1800) {
                  ...GatsbyContentfulFluid_withWebp_noBase64
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

    }
  }
`
export default ProductPageBuilton
