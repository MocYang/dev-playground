/**
 * @Author: yangqixin
 * @TIME: 2021/12/9 16:24
 * @FILE: utils.js
 * @Email: 958292256@qq.com
 * @Description:
 */

let Utils

;(function () {
  class Vector2D {
    constructor(x, y) {
      this.x = x
      this.y = y
      this.length = Vector2D.getLength(this.x, this.y)
      this.dir = Vector2D.getDirection(this.x, this.y)
    }

    /**
     * 计算向量（x, y），与 x 轴的夹角
     * @param x
     * @param y
     * @returns {number} [-π， π]
     */
    static getDirection(x, y) {
      return Math.atan2(y, x)
    }

    /**
     * 计算当前向量的长
     * @param x
     * @param y
     * @returns {number}
     */
    static getLength(x, y) {
      return Math.hypot(x, y)
    }

    /**
     * 归一化
     * 线段归一化的结果是,转成方向不变，长度为 1 的向量
     */
    static unify(vector) {
      const { x, y, length } = vector

      return new Vector2D(x / length, y / length)
    }

    add(v) {
      const x = this.x
      const y = this.y
      return new Vector2D(v.x + x, v.y + y)
    }

    copy() {
      return new Vector2D(this.x, this.y)
    }

    /**
     * 将指定向量旋转一个给定角度
     * @param rad 单位是弧度
     * @returns {Vector2D}
     */
    rotate(rad) {
      const c = Math.cos(rad)
      const s = Math.sin(rad)
      const x = this.x
      const y = this.y

      /* 根据二角和差公式
    sin(a + b) = sina * cos b + cos a * sin b
    sin(a - b) = sin a * cos b - cos a * sin b
    cos(a + b) = cos a * cos b - sin a * sin b
    cos(a - b) = cos a * cos b + sin a * sin b
   */
      this.x = x * c + y * -s
      this.y = x * s + y * c
      return this
    }

    // 向量(x0, y0) 沿当前方向，平移指定长度 length 后的值
    scale(length) {
      const x0 = this.x
      const y0 = this.y
      const d = Utils.getVertexDistance(x0, y0)
      this.x = x0 / d * (d + length)
      this.y = y0 / d * (d + length)
      return this
    }
  }

  class Point extends Vector2D {

    constructor(config) {
      super(config.x, config.y)

      Object.assign(this,
        {
          stokeStyle: '#ffffff',
          fillStyle: '#000000',
          strokeWidth: 2,
          radius: 5
        },
        config,
        {
          x: this.x,
          y: this.y
        })
    }

    draw() {
      const { ctx, x, y, radius, stokeStyle, fillStyle, strokeWidth } = this
      if (!ctx) {
        return
      }
      ctx.save()
      ctx.strokeStyle = stokeStyle
      ctx.fillStyle = fillStyle
      ctx.beginPath()
      ctx.strokeWidth = strokeWidth
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()
      ctx.closePath()
      ctx.restore()

      return this
    }
  }

// 坐标轴线类，配置了轴线的样式等
  class Line {
    constructor(config) {
      // 如果直接传入[start, end]
      if (Array.isArray(config)) {
        config = {
          start: config[0],
          end: config[1]
        }
      }
      Object.assign(this, {
        lineColor: '#131313',
        lineWidth: 2,
        ctx: document.createElement('canvas').getContext('2d'),
        start: new Point(0, 0),
        end: new Point(10000, 10000)
      }, config)
    }

    draw() {
      const { ctx, lineColor, lineWidth, start, end } = this
      ctx.save()
      ctx.lineCap = 'round'
      ctx.strokeStyle = lineColor
      ctx.lineWidth = lineWidth
      ctx.beginPath()
      ctx.moveTo(start.x, start.y)
      ctx.lineTo(end.x, end.y)
      ctx.stroke()
      ctx.restore()
    }

    /**
     * 将线段转成对应的向量（即平移线段，直到起始点和原点重合，保持线段的长度和方向不变）
     */
    toVector() {
      const { start, end } = this
      return new Vector2D(end.x - start.x, end.y - start.y)
    }

    /**
     * 返回这条线段的线性方程中的参数:k,b
     * y = k * x + b
     * @returns {number[]}
     */
    getFormula() {
      const { start, end } = this
      const k = (start.x - end.x) !== 0 ? (start.y - end.y) / (start.x - end.x) : 1
      const b = k === 1 ? -start.x :start.y - k * start.x

      return [k, b]
    }
  }

// 坐标轴类
  class Axis {
    constructor(config) {
      Object.assign(this, {
        origin: new Point(0, 0),
        axisColor: '#131313',  // 轴线颜色
        splitLineColor: '#d9d9d9', // 分割线颜色
        splitLineStyle: 'line',
        //
        axisLabel: {
          color: '#131313'
        }
      }, config)
      this.origin = config.origin
    }
  }

// 创建单例
  const objectFactory = (fn) => {
    let ret = null

    return (...args) => {
      return (ret || (ret = fn.apply(null, args)))
    }
  }

  const internalEvent = `zoom`
  const WHEEL_DELTA_VALUE = 120  // 鼠标滚轮事件 wheelDelta 值

  Utils = {
    _canvas: null,
    _svg: null,
    _width: 300,
    _height: 300,
    _originX: 0,
    _originY: 0,
    _scaleX: 1,
    _scaleY: 1,
    _showOrigin: false,

    _scaleZ: 1,   // 缩放值

    // canvas 画布经过平移等变化后，原点的位置就不同了。这里显示的设置原点。以便在点击事件的回调中，处理坐标
    _setOrigin(x, y) {
      Utils._originX = x
      Utils._originY = y
    },

    _getOrigin() {
      return { x: Utils._originX, y: Utils._originY }
    },

    _setScale(scaleX, scaleY) {
      Utils._scaleX = scaleX
      Utils._scaleY = scaleY
    },

    _getScale() {
      return {
        scaleX: Utils._scaleX,
        scaleY: Utils._scaleY
      }
    },

    _setScaleZ(z) {
      Utils._scaleZ = z
    },

    _getScaleZ() {
      return Utils._scaleZ
    },

    createElement(config = { name: 'div', props: {}, type: 'SVG' }) {
      const { name, props, type } = config
      let $elem = null
      if (type === 'SVG') {
        $elem = document.createElementNS('http://www.w3.org/2000/svg', name)
      } else {
        $elem = document.createElement(name)
      }
      for (let k in props) {
        if (Object.prototype.hasOwnProperty.call(props, k)) {
          $elem.setAttribute(k, props[k])
        }
      }
      return $elem
    },

    initCanvas(config = { container: 'body' }) {
      const {
        container,
        width,
        height,
        showOrigin = false, // 是否画出原点坐标
        showAxis = true
      } = config
      let canvasElement = document.createElement('canvas')
      let $container = document.getElementById(container)
      if (container === 'body') {
        $container = document.body
      }

      let wrapperWidth = typeof width === 'string'
        ? parseFloat(width) / 100 * $container.clientWidth
        : (width || $container.clientWidth)
      let wrapperHeight = typeof height === 'string'
        ? parseFloat(height) / 100 * $container.clientHeight
        : (height || $container.clientHeight)

      canvasElement.width = wrapperWidth
      canvasElement.height = wrapperHeight

      Utils._canvas = canvasElement
      Utils._width = wrapperWidth
      Utils._height = wrapperHeight
      Utils._showOrigin = showOrigin

      // 默认把原点设置在中心点
      // Utils.translate(['center', 'center'])
      $container.appendChild(canvasElement)
      // Utils.initEvents($container)

      // 画轴线
      if (showAxis) {
        setTimeout((() => {
          let ctx = Utils.getContext2d()
          let xAxisPoints = [
            [0 - 500, 0],
            [wrapperWidth + 500, 0]
          ]
          let yAxisPoints = [
            [0, 0 - 500],
            [0, wrapperHeight + 500]
          ]
          let xAxis = new Utils.Line({
            ctx,
            lineWidth: 1,
            lineColor: '#000000',
            start: new Utils.Point({
              ctx,
              x: xAxisPoints[0][0],
              y: xAxisPoints[0][1]
            }),
            end: new Utils.Point({
              ctx,
              x: xAxisPoints[1][0],
              y: xAxisPoints[1][1]
            })
          })
          let yAxis = new Utils.Line({
            ctx,
            lineWidth: 1,
            lineColor: '#000000',
            start: new Utils.Point({
              ctx,
              x: yAxisPoints[0][0],
              y: yAxisPoints[0][1]
            }),
            end: new Utils.Point({
              ctx,
              x: yAxisPoints[1][0],
              y: yAxisPoints[1][1]
            })
          })
          xAxis.draw()
          yAxis.draw()
        }))
      }
      return $container
    },

    initSVG(wrapperId, viewBox = [0, 0, 300, 300]) {
      let container = document.getElementById(wrapperId)

      if (wrapperId === 'body') {
        container = document.body
      }

      let wrapperWidth = container.clientWidth
      let wrapperHeight = container.clientHeight

      let $svgElement = Utils.createElement({
        type: 'SVG',
        name: 'svg',
        props: {
          'version': '1.1',
          'viewBox': `${0 || viewBox[0]} ${0 || viewBox[1]} ${wrapperWidth || viewBox[2]} ${wrapperHeight || viewBox[3]}`
        }
      })

      Utils._width = wrapperWidth
      Utils._height = wrapperHeight
      Utils._svg = $svgElement
      container.appendChild($svgElement)
      return container
    },

    initEvents(target) {
      if (!Utils.isDomElement(target)) {
        return
      }

      // TODO
      // 鼠标缩放事件
      target.addEventListener('mousewheel', e => {
        const deltaOffset = e.wheelDelta / WHEEL_DELTA_VALUE

        console.log(deltaOffset)

        // 1 滚轮向上滚，视角缩小， -1 滚轮向下滚， 视角放大
        const sign = deltaOffset >= 0 ? 1 : -1

      })
    },

    getSvgElement() {
      if (!Utils._svg) {
        Utils.initSVG('body')
      }
      return Utils._svg
    },

    getCanvasElement() {
      return Utils._canvas
    },

    getContext2d() {
      return Utils._canvas.getContext('2d')
    },

    getContextWebGL() {
      return Utils._canvas.getContext('webgl')
    },

    getRect() {
      return [Utils._width, Utils._height]
    },

    translate(direction = ['center', 'center']) {
      const ctx = Utils.getContext2d()

      const [width, height] = Utils.getRect()
      const [xAxis, yAxis] = direction

      let originX = 0
      let originY = 0
      let scaleX = 1
      let scaleY = 1

      if (xAxis === 'center' && yAxis === 'center') {
        originX = width / 2
        originY = height / 2
        scaleX = 1
        scaleY = -1
      } else if (xAxis === 'left' && yAxis === 'top') {
        originX = 0
        originY = 0
        scaleX = 1
        scaleY = 1
      } else if (xAxis === 'left' && yAxis === 'bottom') {
        originX = 0
        originY = height
        scaleX = 1
        scaleY = -1
      } else if (xAxis === 'right' && yAxis === 'top') {
        originX = width
        originY = 0
        scaleX = -1
        scaleY = 1
      } else if (xAxis === 'right' && yAxis === 'bottom') {
        originX = width
        originY = height
        scaleX = -1
        scaleY = -1
      }

      ctx.translate(originX, originY)
      ctx.scale(scaleX, scaleY)
      Utils._setOrigin(originX, originY)
      Utils._setScale(scaleX, scaleY)

      if (Utils._showOrigin) {
        new Point({
          ctx,
          x: 0,
          y: 0,
          radius: 5
        }).draw()
      }
    },

    /**
     * 计算向量(x, y)，距离原点的距离
     * @param x
     * @param y
     * @returns {number}
     */
    getVertexDistance(x, y) {
      return Math.hypot(x, y)
    },

    /**
     * 获取向量(x, y)与 x 轴的夹角
     * @param y
     * @param x
     * @return atan2 方法返回一个 -pi 到 pi 之间的数值，表示点 (x, y) 对应的偏移角度。
     * 这是一个逆时针角度，以弧度为单位，正X轴和点 (x, y) 与原点连线 之间。
     */
    getVertexAngle(y, x) {
      return Math.atan2(x, y)
    },

    /**
     * 角度转弧度
     * @param {*} angle
     */
    angleToRad(angle) {
      return Math.PI / 180 * angle
    },

    /**
     * 弧度转角度
     * @param {*} rad
     */
    radToAngle(rad) {
      return 180 / Math.PI * rad
    },

    on(element, type, handler = () => null) {
      if (!Utils.isDomElement(element) || !Utils.isFunction(handler)) {
        return
      }
      const { x, y } = Utils._getOrigin()
      const { scaleX, scaleY } = Utils._getScale()
      element.addEventListener(type, e => {
        handler && handler({
          e,
          x: (e.x - x) * scaleX,
          y: (e.y - y) * scaleY
        })
      })
    },

    // 绘制相关

    // 工具函数
    isDomElement(domElement) {
      return typeof domElement === 'object' && domElement.nodeType === 1 && typeof domElement.nodeName === 'string'
    },

    isFunction(fn) {
      return typeof fn === 'function'
    }
  }

  Utils.Vector2D = Vector2D
  Utils.Line = Line
  Utils.Point = Point
  window.Utils = Utils
})();
