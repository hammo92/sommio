const Builton = require('@builton/core-sdk')
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
    console.log('nodeContent => ', nodeContent)
    // console.log('nodeContent => ', nodeContent)

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
    console.log('nodeData => ', nodeData)
    console.log('nodeData.internal.type => ', nodeData.internal.type)
    console.log('nodeData.media => ', nodeData.media)
  }

  console.log('processProduct => ', processProduct)
  // console.log('nodeData.internal.type => ', nodeData.internal.type)
  // console.log('node.internal.type => ', node.internal.type)

  const productList = await builton.products.getAll()
  const products = productList.current
  console.log('productList => ', productList)
  console.log('products => ', products)
  // if (
  //   node.internal.type === "" &&
  //   node.frontmatter.featuredImgUrl !== null
  // ) {
  //   let fileNode = await createRemoteFileNode({
  //     url: node.frontmatter.featuredImgUrl, // string that points to the URL of the image
  //     parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
  //     createNode, // helper function in gatsby-node to generate the node
  //     createNodeId, // helper function in gatsby-node to generate the node id
  //     cache, // Gatsby's cache
  //     store, // Gatsby's redux store
  //   })
  //   // if the file was created, attach the new node to the parent node
  //   if (fileNode) {
  //     node.featuredImg___NODE = fileNode.id
  //   }
  // }
  return products.map(product => {
    const nodeData = processProduct(product)
    console.log('nodeData => ', nodeData)
    console.log('nodeData.internal.type => ', nodeData.internal.type)
    console.log('nodeData.media => ', nodeData.media)
    createNode(nodeData)
  })
}
