import React, { useEffect, Fragment } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { ToastContainer } from 'react-toastify'
import { Link } from 'gatsby'
import { Helmet } from 'react-helmet'

import Header from './Header/Header'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'

import '../../styles/main.scss'
import Cart from '../CartButton/Cart'

const toastOptions = {
  position: 'bottom-center',
  draggable: false,
  toastClassName: 'text-xl bg-black text-white text-center p-3 shadow-none',
  progressClassName: 'bg-white opacity-25',
  closeButton: false
}

const Layout = ({ children, transitionStatus }) => {
  const { site, allBuilton } = useStaticQuery(categoriesQuery)
  const builtonProduct = allBuilton.nodes.find(ele => {
    return ele.main_product === true && ele.tags.length > 0
  })

  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sommio Gatsby</title>
      </Helmet>
      <Header
        siteTitle={site.siteMetadata.title}
        human_id={builtonProduct.human_id}
        transitionStatus={transitionStatus}
      />
      <Cart />
      <main>{children}</main>
      <ToastContainer {...toastOptions} />
    </Fragment>
  )
}

const categoriesQuery = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }

    allBuilton: allBuiltonProduct {
      nodes {
        id
        name
        human_id
        tags
        parents {
          _oid
        }
        main_product
      }
    }
  }
`

export default Layout
