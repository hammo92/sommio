import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { ToastContainer } from 'react-toastify'
import { Link } from 'gatsby'
import { Helmet } from 'react-helmet'
import useMoltinInventory from '../../hooks/useMoltinInventory'

import Header from './Header'

import 'react-toastify/dist/ReactToastify.css'
import '../../styles/main.scss'

const toastOptions = {
  position: 'bottom-center',
  draggable: false,
  toastClassName: 'text-xl bg-black text-white text-center p-3 shadow-none',
  progressClassName: 'bg-white opacity-25',
  closeButton: false
}

const Layout = ({ children }) => {
  const {
    site,
    categories,
    collections,
    allMoltin,
    allBuitlon
  } = useStaticQuery(categoriesQuery)

  const builtonProduct = allBuitlon.nodes.find(ele => {
    return ele.main_product === true
  })
  console.log('allBuitlon, builtonProduct => ', allBuitlon, builtonProduct)

  const product = allMoltin.nodes.find(element => {
    console.log('element => ', element)
    return element.relationships.parent === null
  })

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sommio Gatsby</title>
        <link
          rel="stylesheet"
          type="text/css"
          charset="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        <script src="https://x.klarnacdn.net/kp/lib/v1/api.js"></script>
      </Helmet>
      <Header
        siteTitle={site.siteMetadata.title}
        collections={collections}
        slug={product.slug}
        human_id={builtonProduct.human_id}
      />

      <main>{children}</main>
      <ToastContainer {...toastOptions} />
    </>
  )
}

const categoriesQuery = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }

    categories: allMoltinCategory {
      nodes {
        id
        name
        slug
      }
    }

    collections: allMoltinCollection {
      nodes {
        id
        name
        slug
      }
    }
    allMoltin: allMoltinProduct {
      nodes {
        slug
        id
        name
        relationships {
          parent {
            data {
              id
            }
          }
        }
      }
    }

    allBuitlon: allBuiltonProduct {
      nodes {
        id
        name
        human_id
        parents {
          _oid
        }
        main_product
      }
    }
  }
`

export default Layout
