const Builton = require('@builton/core-sdk')
const { createRemoteFileNode } = require('gatsby-source-filesystem')

exports.sourceNodes = async ({ 
  actions, 
  createNodeId,
  createContentDigest,
  },
  { apiKey }
) => {
  const { createNode } = actions
  const builtonImageDomian = "https://d1vk7rtgnzzicy.cloudfront.net/"

  const builton = new Builton({
    apiKey
  })

  const processProduct = async product => {
    // console.log('product => ', product)

    const nodeData = Object.assign({}, product, {
      id: createNodeId(product.id),
      parent: null,
      children: [],
      internal: {
        type: `BuiltonProduct`,
        content: JSON.stringify(product),
        contentDigest: createContentDigest(product)
      }
    })

    return nodeData
  }

  const productList = await builton.products.getAll()
  
  const products = productList.current
  return products.map(async product => {
    //product.image_url = builtonImageDomian + product.image_url
    //console.log("product image: ", product.image_url)
    product.image_url && (product.image_url = builtonImageDomian + product.image_url)
    console.log("product image: ", product.image_url)
    const nodeData = await processProduct(product)
    createNode(nodeData)
  })
}


exports.onCreateNode = async ({ node, actions, store, cache }) => {
  if (node.internal.type !== 'BuiltonProduct') {
    return
  }

   //console.log('node => ', node.internal.type === 'BuiltonProduct' && node)

  const { createNode } = actions

  if (node.internal.type === 'BuiltonProduct' && (node.media.length ||  node.image_url) > 0) {
    await Promise.all(
      node.media &&
        node.media.map(async med => {
          let fileNode
          fileNode = await createRemoteFileNode({
            url: med.url,
            store,
            cache,
            createNode,
            createNodeId: id => `testId-${id}`
          })
          if (fileNode) {
            // console.log('In fileNode If condition')
            node.image___NODE = fileNode.id
            return med
          }
        })
    )
  }
}
