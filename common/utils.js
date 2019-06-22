module.exports.findFocusedNode = function findFocusedNode(node) {
  if (node.focused) {
    return node
  }

  for (const next of node.children || []) {
    const result = findFocusedNode(next)
    if (result) {
      return result
    }
  }

  return null
}

module.exports.sleep = function(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
