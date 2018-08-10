<template>
  <div ref="wrapper" class="input-wrapper">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'InputWrapper',
    mounted () {
      const wrapper = this.$refs.wrapper
      let elems = Array.from(wrapper.querySelectorAll('input'))
        .concat(Array.from(wrapper.querySelectorAll('textarea')))
      this.keyBoardPopUp(wrapper, elems)()
    },
    methods: {
      keyBoardPopUp ($container, $elems) {
        const self = this

        function getHTMLHeight () {
          return window.innerHeight
        }

        let HTML_HEIGHT = getHTMLHeight()
        let cacheHeight = HTML_HEIGHT
        let isInput = false
        let needRestore = false

        const pageContainer = $container
        pageContainer.style.height = getHTMLHeight() + 'px'
        pageContainer.parentNode.style.height = getHTMLHeight() + 'px'
        document.body.style.height = getHTMLHeight() + 'px'

        let $focusElem = null
        return function () {
          if (self.isArray($elems)) {
            $elems.forEach(function ($elem) {
              $elem.addEventListener('focus', function () {
                isInput = true
                needRestore = true
                $focusElem = $elem
              })
              $elem.addEventListener('blur', function () {
                let handleRestore = function () {
                  setTimeout(function () {
                    pageContainer.style.transform = 'translateY(0)'
                    cacheHeight = currentHeight
                    needRestore = false
                    isInput = false
                  }, 500)
                }
                let currentHeight = getHTMLHeight()
                if (currentHeight - cacheHeight >= 0.2) {
                  handleRestore()
                } else if (!isInput && needRestore) {
                  handleRestore()
                }
              })
            })
          }

          function handleMoveUp () {
            if (isInput) {
              let currentHtmlHeight = getHTMLHeight()
              let offsetHeight = HTML_HEIGHT - currentHtmlHeight
              let focusOffsetTop = $focusElem.getBoundingClientRect().y
              let moveDist = -1 * Math.abs(focusOffsetTop - currentHtmlHeight)
              if (offsetHeight > 0 && Math.abs(focusOffsetTop - currentHtmlHeight) > 10) {
                pageContainer.style.transform = 'translateY(' + moveDist + 'px)'
                needRestore = true
              } else {
                pageContainer.style.transform = 'translateY(0)'
                needRestore = false
              }
              cacheHeight = currentHtmlHeight
            }
          }

          window.addEventListener('resize', handleMoveUp)
          if (/iPhone|mac|iPod|iPad/i.test(window.navigator.userAgent)) {
            window.removeEventListener('resize', handleMoveUp)
          }
        }
      },
      isArray: arr => Object.prototype.toString.call(arr) === '[object Array]'
    }
  }
</script>

<style scoped>
  .input-wrapper {
    position: relative;
    transition: transform 0.2s;
    overflow: auto;
  }
</style>
