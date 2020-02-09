const path = require('path')

exports.createPages = async ({ page, graphql, actions: { createPage } }) => {
  const pages = await graphql(`
    {
      allProducts: allBuiltonProduct {
        edges {
          node {
            id
            human_id
          }
        }
      }

      contentfulCondition: allContentfulCondition {
        edges {
          node {
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
    }
  `)

  pages.data.allProducts.edges.forEach(({ node: { id, human_id } }) => {
    createPage({
      path: `/products/${human_id}`,
      component: path.resolve('./src/templates/ProductPageBuilton.js'),
      context: {
        id: id
      }
    })
  })
  pages.data.contentfulCondition.edges.forEach(({node}, index) => {
    const next = index !== pages.data.contentfulCondition.edges.length - 1
    ? pages.data.contentfulCondition.edges[index + 1].node
    : pages.data.contentfulCondition.edges[0].node
    createPage({
      path: `/readMore/${node.slug}`,
      component: path.resolve('./src/templates/ReadMorePage.js'),
      context: { 
        condition:node,   
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
