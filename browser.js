;(function(w) {
  if (!('WebSocket' in w && 2 === w.WebSocket.CLOSING)) {
    var d = document.createElement('div')
    d.className = 'browsehappy'
    d.innerHTML =
      '<div style="width:100%;height:100px;font-size:20px;line-height:100px;text-align:center;background-color:crimson;color:#fff;margin-bottom:40px;">浏览器版本过低,请使用最新的浏览器<a target="_blank" href="https://www.google.cn/chrome/" style="background-color:#31b0d5;margin-left:20px;border-color: #269abc;text-decoration: none;padding: 6px 12px;background-image: none;border: 1px solid transparent;border-radius: 4px;color:#FFEB3B;">点这试试</a></div>'
    var f = function() {
      var s = document.getElementsByTagName('body')[0]
      if ('undefined' == typeof s) {
        setTimeout(f, 10)
      } else {
        s.insertBefore(d, s.firstChild)
      }
    }
    f()
  }
})(window)
// const UA = window.navigator.userAgent.toLowerCase()
