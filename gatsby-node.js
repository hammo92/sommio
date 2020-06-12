const path = require('path')
const { createRemoteFileNode } = require('gatsby-source-filesystem')

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const pages = await graphql(`
    {
      allProducts: allBuiltonProduct {
          nodes {
            id
            human_id
            main_product
            name
            _sub_products {
              _oid
            }
          }
      }

      contentfulCondition: allContentfulCondition {
          nodes {
            slug
            id
            conditionName
            cardImage {
              fluid {
                src
                tracedSVG
              }
              file {
                url
              }
            }
            content {
              childMarkdownRemark {
                html
              }
            }
          }
      }
    }
  `)

  pages.data.allProducts.nodes.forEach(({ id, human_id, main_product  }) => {
    if (main_product){
      createPage({
        path: `/products/${human_id}`,
        component: path.resolve('./src/templates/ProductPage.js'),
        context: {
          id: id,
          human: human_id,
        }
      })
   }
  })

  pages.data.allProducts.nodes.forEach(( { id, human_id, name, main_product, _sub_products  } ) => {
    name = name.replace(/\s/g, '')
    let subProducts = []
    if (main_product){
      _sub_products.map((item, i) => {
        subProducts[i] = item._oid
      })
      //console.log("sub products =", subProducts )
     
      createPage({
        path: `/configure/${name}`,
        component: path.resolve('./src/templates/ProductBuyPage.js'),
        context: {
          id: id,
          human: human_id,
          subProducts: subProducts,
        }
      })
    }
  })


  pages.data.contentfulCondition.nodes.forEach(( node , index) => {
    const next =
      index !== pages.data.contentfulCondition.nodes.length - 1
        ? pages.data.contentfulCondition.nodes[index + 1]
        : pages.data.contentfulCondition.nodes[0]
    createPage({
      path: `/readMore/${node.slug}`,
      component: path.resolve('./src/templates/ReadMorePage.js'),
      context: {
        condition: node,
        slug: node.slug,
        nextSlug: next.slug,
        next: next
      }
    })
  })
}

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions
  if (page.path.match(/^\/order/)) {
    page.matchPath = `/order/*`

    createPage(page)
  }
}
