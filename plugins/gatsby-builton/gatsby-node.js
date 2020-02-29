const Builton = require('@builton/core-sdk')
const { createRemoteFileNode } = require('gatsby-source-filesystem')

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  { apiKey }
) => {
  const { createNode } = actions

  const builton = new Builton({
    apiKey
  })

  const processProduct = product => {
    const nodeId = createNodeId(product.id)
    const nodeContent = JSON.stringify(product)

    const nodeData = Object.assign({}, product, {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: `BuiltonProduct`,
        content: nodeContent,
        contentDigest: createContentDigest(product)
      }
    })

    return nodeData
  }
  const productList = await builton.products.getAll()
  const products = productList.current
  return products.map(product => {
    const nodeData = processProduct(product)
    createNode(nodeData)
  })
}

// exports.onCreateNode = async ({
//   node,
//   actions: { createNode },
//   store,
//   cache,
//   createNodeId
// }) => {
//   if (node.internal.type === 'BuiltonProduct' && node.media.length > 0) {
//     console.log('node.internal.type => ', node.internal.type)

//     // if the file was created, attach the new node to the parent node

//     let fileNode = await node.media.map(async res => {
//       return await createRemoteFileNode({
//         url: res.url, // string that points to the URL of the image
//         parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
//         createNode, // helper function in gatsby-node to generate the node
//         createNodeId, // helper function in gatsby-node to generate the node id
//         cache, // Gatsby's cache
//         store // Gatsby's redux store
//       })
//     })

//     // console.log('fileNode => ', fileNode)
//     // Promise.all(fileNode).then(d => {
//     //   console.log('d => ', d)
//     //   node.media___NODE = d.id
//     // })
//     // if (fileNode.length > 0) {
//     //   fileNode.map(f => {
//     //     console.log('f => ', f)
//     //     node.media___NODE = f.id
//     //   })
//     // }
//   }
// }

// exports.createSchemaCustomization = ({ actions }) => {
//   const { createTypes } = actions
//   createTypes(`
//     type MarkdownRemark implements Node {
//       frontmatter: Frontmatter
//     }
//     type Frontmatter {
//       title: String!
//       featuredImgUrl: String
//       featuredImgAlt: String
//     }
//   `)
// }
// exports.onCreateNode = async ({
//   node,
//   actions: { createNode },
//   store,
//   cache,
//   createNodeId
// }) => {
//   console.log('node => ', node)

//   // For all MarkdownRemark nodes that have a featured image url, call createRemoteFileNode
//   if (
//     node.internal.type === 'MarkdownRemark' &&
//     node.frontmatter.featuredImgUrl !== null
//   ) {
//     let fileNode = await createRemoteFileNode({
//       url: node.frontmatter.featuredImgUrl, // string that points to the URL of the image
//       parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
//       createNode, // helper function in gatsby-node to generate the node
//       createNodeId, // helper function in gatsby-node to generate the node id
//       cache, // Gatsby's cache
//       store // Gatsby's redux store
//     })
//     // if the file was created, attach the new node to the parent node
//     if (fileNode) {
//       node.featuredImg___NODE = fileNode.id
//     }
//   }
// }
