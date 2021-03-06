import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import Seo from '../components/SEO'
import PageTitle from '../components/PageTitle'
import ProductGrid from '../components/ProductGrid'
import Layout from '../components/Layout/Layout'
import { TransitionState } from 'gatsby-plugin-transition-link'

const ProductsInner = ({ products }) => {
  // console.log('Index allBuiltonProduct =======>', products)

  const baseProductList =
    products &&
    products.nodes.filter(mainProduct => {
      return (
        mainProduct.parents.length < 1 && mainProduct.name !== 'Shipping cost'
      )
    })

  return (
    <Fragment>
      <Seo title="All Products" />
      <PageTitle>All Products</PageTitle>
      <ProductGrid products={baseProductList} />
    </Fragment>
  )
}

const ProductsPage = ({ data: { allBuiltonProduct } }) => {
  return (
    <TransitionState>
      {({ transitionStatus }) => (
        <Layout transitionStatus={transitionStatus}>
          <ProductsInner
            products={allBuiltonProduct}
            transitionStatus={transitionStatus}
          />
        </Layout>
      )}
    </TransitionState>
  )
}

export const query = graphql`
  query allProductsQuery {
    allBuiltonProduct {
      nodes {
        _id {
          _oid
        }
        name
        price
        media {
          human_id
          url
          image {
            childImageSharp {
              fluid {
                src
              }
            }
          }
        }
        human_id
        description
        main_product
        parents {
          _oid
        }
        _sub_products {
          _oid
        }
      }
    }
  }
`

export default ProductsPage
