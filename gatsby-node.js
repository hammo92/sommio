const path = require('path')
const { createRemoteFileNode } = require('gatsby-source-filesystem')

exports.createPages = async ({ graphql, actions: { createPage } }) => {
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
      component: path.resolve('./src/templates/ProductPage.js'),
      context: {
        id: id,
        human: human_id
      }
    })
  })
  pages.data.contentfulCondition.edges.forEach(({ node }, index) => {
    const next =
      index !== pages.data.contentfulCondition.edges.length - 1
        ? pages.data.contentfulCondition.edges[index + 1].node
        : pages.data.contentfulCondition.edges[0].node
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

// exports.onCreateNode = async ({
//   node,
//   actions: { createNode },
//   store,
//   cache,
//   createNodeId
// }) => {
//   // For all MarkdownRemark nodes that have a featured image url, call createRemoteFileNode
//   console.log('node onCreateNode => ', node)
//   console.log('node.internal.type => ', node.internal.type)
//   console.log('node.url___NODE => ', node.url___NODE)
//   console.log('___NODE => ', ___NODE)
//   console.log('node.url => ', node.url)

//   console.log('node.media => ', node.media)

// if (
//   node.internal.type === 'allBuiltonProduct' &&
//   node.media &&
//   node.media.length > 0
// ) {
// console.log('Hiiiii ==>')
// let fileNode
// node.internal.type === 'allBuiltonProduct' &&
//   node.media.map(img => {
//     console.log('img => ', img)
//     try {
//       fileNode = createRemoteFileNode({
//         url: img.url, // string that points to the URL of the image
//         parentNodeId: img.human_id, // id of the parent node of the fileNode you are going to create
//         createNode, // helper function in gatsby-node to generate the node
//         createNodeId, // helper function in gatsby-node to generate the node id
//         cache, // Gatsby's cache
//         store // Gatsby's redux store
//       })
//     } catch (er) {
//       console.log('err => ', er)
//     }
//     console.log('Byyee')
//   })
// console.log('fileNode => ', fileNode)

// if (
//   node.internal.type === 'allBuiltonProduct' &&
//   node.media &&
//   node.media.length > 0
// ) {
//   console.log('In if condition !!')

//   for (const img of node.media) {
//     console.log('img => ', img)
//     try {
//       fileNode = createRemoteFileNode({
//         url: img.url, // string that points to the URL of the image
//         parentNodeId: img.human_id, // id of the parent node of the fileNode you are going to create
//         createNode, // helper function in gatsby-node to generate the node
//         createNodeId, // helper function in gatsby-node to generate the node id
//         cache, // Gatsby's cache
//         store // Gatsby's redux store
//       })
//     } catch (er) {
//       console.log('err => ', er)
//     }
//   }
// } else {
//   console.log('In else ')
// }

// if (
//   node.internal.type === 'BuiltonProduct' &&
//   node.media &&
//   node.media.length > 0
// ) {
//   console.log('In if condition second !!')

//   for (const img of node.media) {
//     console.log('img second => ', img)
//     try {
//       fileNode = createRemoteFileNode({
//         url: img.url, // string that points to the URL of the image
//         parentNodeId: img.human_id, // id of the parent node of the fileNode you are going to create
//         createNode, // helper function in gatsby-node to generate the node
//         createNodeId, // helper function in gatsby-node to generate the node id
//         cache, // Gatsby's cache
//         store // Gatsby's redux store
//       })
//     } catch (er) {
//       console.log('err => ', er)
//     }
//   }
// } else {
//   console.log('In else second')
// }
// let fileNode
// for (const photo of node.media) {
//   console.log('photo => ', photo)
//   try {
//     fileNode = await createRemoteFileNode({
//       url: photo.url,
//       store,
//       cache,
//       createNode,
//       createNodeId: id => `projectPhoto-${photo.human_id}`
//     })
//   } catch (err) {
//     console.log('err => ', err)
//   }
// }

// if the file was created, attach the new node to the parent node
// if (fileNode) {
//   console.log('if fileNode => ', fileNode)

//   // node.url = fileNode.id

//   node.url___NODE = fileNode.id
// }
// }
// }
