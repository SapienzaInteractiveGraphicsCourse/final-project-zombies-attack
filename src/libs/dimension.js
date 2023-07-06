const getSize = parent => {
    const sizes = parent.getHierarchyBoundingVectors()
    const size = {
      x: sizes.max.x - sizes.min.x,
      y: sizes.max.y - sizes.min.y,
      z: sizes.max.z - sizes.min.z
    }
    return size
}

export { getSize }