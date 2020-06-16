const Builton = require('@builton/core-sdk')
const { createRemoteFileNode } = require('gatsby-source-filesystem')

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest, store, cache },
  { apiKey }
) => {
  const { createNode } = actions

  const builton = new Builton({
    apiKey
  })

  const processProduct = async product => {
    // console.log('product => ', product)

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
  return products.map(async product => {
    const nodeData = await processProduct(product)
    createNode(nodeData)
  })
}
exports.onCreateNode = async ({ node, actions: {createNode}, store, cache, createNodeId }) => {
  const rootURL = "https://d1vk7rtgnzzicy.cloudfront.net/"
  if (node.internal.type !== 'BuiltonProduct') {
    return
  }
  const media = async () => {
    await Promise.all(
      node.media !== 0 && 
      node.media.map(async (med, i) => {
        let fileNode = await createRemoteFileNode({
          url: med.url,
          store,
          cache,
          createNode,
          createNodeId,
        })
        if (fileNode) {
          // console.log('In fileNode If condition')
          med.image___NODE = fileNode.id
          //return med
        }
      })
    )
  }
  const mainImage = async () => {
      if(node.image_url !== undefined)  {
      let fileNode = await createRemoteFileNode({
        url: rootURL + node.image_url,
        store,
        cache,
        createNode,
        createNodeId,
      })
      if (fileNode) {
        // console.log('In fileNode If condition')
        node.mainImage___NODE = fileNode.id
        //return med
      }
    }
  }
  await media()
  await mainImage()

       /* if (fileNode) {
          // console.log('In fileNode If condition')
          med.image___NODE = fileNode.id
          //return med
        }*/
    
  
}
/*exports.onCreateNode = async ({ node, actions: {createNode}, store, cache }) => {
  if (node.internal.type !== 'BuiltonProduct') {
    return
  }
  const rootURL = "https://d1vk7rtgnzzicy.cloudfront.net/"
  //console.log("node is: ", node)
  //console.log("type: ", typeof node )

  // console.log('node => ', node.internal.type === 'BuiltonProduct' && node)

  if (node.internal.type === 'BuiltonProduct' && node.image_url !== undefined) {

          let fileNode
          fileNode = await createRemoteFileNode({
            url: rootURL + node.image_url,
            store,
            cache,
            createNode,
            createNodeId: id => `testId-${id}`
          })
          if (fileNode) {
            // console.log('In fileNode If condition')
            node.image_url.image___NODE = fileNode.id
            return node.image_url
          }
         
    }
}*/