export default {
  create ($container, useRetina = true) {
    const rect = $container.getBoundingClientRect()
    const containerWidth = rect.width
    const containerHeight = rect.height

    const canvas = document.createElement('canvas')
    canvas.id = 'scale-canvas'
    const ctx = canvas.getContext('2d')
    ctx.imageSmoothingEnabled = false

    canvas.width = containerWidth
    canvas.height = containerHeight
    // 画布stage，canvas的所有内容都应该这个范围内
    canvas.stage = {
      width: rect.width,
      height: rect.height,
      x: rect.x,
      y: rect.y,
      left: rect.left,
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom
    }
    $container.innerHTML = ''
    $container.appendChild(canvas)

    if (useRetina) {
      // 高清适配
      this.use(canvas)
    }
    return canvas
  },
  use (canvas) {
    const ctx = canvas.getContext('2d')
    const devicePixelRatio = window.devicePixelRatio || 1
    const width = canvas.width
    const height = canvas.height
    canvas.width = width * devicePixelRatio
    canvas.height = height * devicePixelRatio

    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx.scale(devicePixelRatio, devicePixelRatio)
  }
}
