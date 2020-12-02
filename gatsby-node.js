exports.createPages = async ({ actions: { createPage }, graphql }) => {
  const products = await graphql(`
    {
      allProductsJson {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)

  products.data.allProductsJson.edges.forEach(edge => {
    const product = edge.node
    createPage({
      path: `/products/${product.slug}/`,
      component: require.resolve("./src/templates/product.js"),
      context: {
        slug: product.slug,
      },
    })
  })
}
