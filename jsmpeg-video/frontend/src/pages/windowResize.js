export default {
  init (cb) {
    this.resize()
    window.addEventListener('resize', () => {
      this.resize()
      cb && cb()
    })
  },
  resize () {
    let isLandscape = true
    let winWidth = window.innerWidth
    let winHeight = window.innerHeight
    let sizeMax = 603
    // 竖屏
    if (winWidth < winHeight) {
      winHeight = winHeight > sizeMax ? sizeMax : winHeight
      isLandscape = false
      document.body.style.width = '100vh'
      document.body.style.height = '100vw'
      document.documentElement.style.fontSize = winHeight / 10 + 'px'
      document.body.style.transform = 'rotate(90deg) translateY(-100vw)'
      document.body.style.transformOrigin = 'left top'

      // 横屏
    } else {
      winWidth = winWidth > sizeMax ? sizeMax : winWidth
      document.body.style.width = '100vw'
      document.body.style.height = '100vh'
      document.documentElement.style.fontSize = winWidth / 10 + 'px'
      document.body.style.transform = 'rotate(0deg)'
      document.body.style.transformOrigin = 'center'
      isLandscape = true
    }

    return isLandscape
  }
}
