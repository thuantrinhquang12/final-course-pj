export const shortenLink = (link) => {
  const indexName = link.lastIndexOf('/')
  return link.slice(indexName + 1, link.length)
}
