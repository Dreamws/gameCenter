(function (doc, win) {
  var docEl = doc.documentElement
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  var __BASE_WIDTH__ = win.__BASE_WIDTH__
  var __BASE_HEIGHT__ = win.__BASE_HEIGHT__
  var recalc = function () {
    var clientWidth = docEl.clientWidth
    if (!clientWidth) return
    docEl.style.fontSize = 100 * (clientWidth / __BASE_WIDTH__) + 'px'
  }
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  recalc()

  // 根据设计稿物理宽高比值动态设置#app元素宽高，主要作用适配宽高比值小于16/9情况下的高度撑满
  var writeStyle = function () {
    var scale = __BASE_WIDTH__ / __BASE_HEIGHT__
    var cssText = '#app {width: '.concat(__BASE_WIDTH__ / 100, 'rem;height: ').concat(scale > 16 / 9 ? __BASE_HEIGHT__ / 100 + 'rem' : '100%', ';}')
    var style = document.createElement('style')
    style.type = 'text/css'
    style.innerHTML = cssText
    doc.head.appendChild(style)
  }
  writeStyle()
})(document, window)
