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
    console.log('product => ', product)

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
exports.onCreateNode = async ({ node, actions, store, cache }) => {
  // if the node is not DogImage, we don't wanna do anything
  if (node.internal.type !== 'BuiltonProduct') {
    return
  }

  console.log('node => ', node.internal.type === 'BuiltonProduct' && node)

  const { createNode } = actions
  // download image and create a File node
  // with gatsby-transformer-sharp and gatsby-plugin-sharp
  // that node will become an ImageSharp
  let fileNode
  if (node.internal.type === 'BuiltonProduct') {
    node.media.map(async med => {
      return (fileNode = await createRemoteFileNode({
        url: med.url,
        store,
        cache,
        createNode,
        createNodeId: id => `testId-${id}`
      }))
    })
    if (fileNode) {
      // link File node to DogImage node
      // at field image
      node.image___NODE = fileNode.id
    }
  }
}
