/**
 * 截取指定字节的字符串
 * @param str 要截取的字符穿
 * @param len 要截取的长度，根据字节计算
 * @param suffix 截取前len个后，其余的字符的替换字符，一般用“…”
 * @returns {*}
 */
function cutString(str, len, suffix) {
  if (!str) return "";
  if (len <= 0) return "";
  if (!suffix) suffix = "";
  var templen = 0;
  for (var i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 255) {
      templen += 2;
    } else {
      templen++
    }
    if (templen == len) {
      return str.substring(0, i + 1) + suffix;
    } else if (templen > len) {
      return str.substring(0, i) + suffix;
    }
  }
  return str;
}
// 千分位
function numberWithCommas(x = 0) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
/**
 * 判断微信浏览器
 * @returns {Boolean}
 */
function isWeiXin() {
  var ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  } else {
    return false;
  }
}

function getTimeFormat(time) {
  var date = new Date(parseInt(time) * 1000);
  var month, day, hour, min;
  parseInt(date.getMonth()) + 1 < 10 ? month = '0' + (parseInt(date.getMonth()) + 1) : month = parseInt(date.getMonth()) + 1;
  date.getDate() < 10 ? day = '0' + date.getDate() : day = date.getDate();
  date.getHours() < 10 ? hour = '0' + date.getHours() : hour = date.getHours();
  date.getMinutes() < 10 ? min = '0' + date.getMinutes() : min = date.getMinutes();
  return [month, day].join('-') + '  ' + hour + ':' + min
}

function getTimeFormatYMD(time) {
  var date = new Date(parseInt(time) * 1000);
  var year, month, day;
  year = date.getFullYear();
  parseInt(date.getMonth()) + 1 < 10 ? month = '0' + (parseInt(date.getMonth()) + 1) : month = parseInt(date.getMonth()) + 1;
  date.getDate() < 10 ? day = '0' + date.getDate() : day = date.getDate();
  return [year, month, day].join('-')
}

function getTimeFormatAll(time) {
  var date = new Date(parseInt(time) * 1000);
  var year, month, day, hour, min, second;
  year = date.getFullYear();
  parseInt(date.getMonth()) + 1 < 10 ? month = '0' + (parseInt(date.getMonth()) + 1) : month = parseInt(date.getMonth()) + 1;
  date.getDate() < 10 ? day = '0' + date.getDate() : day = date.getDate();
  date.getHours() < 10 ? hour = '0' + date.getHours() : hour = date.getHours();
  date.getMinutes() < 10 ? min = '0' + date.getMinutes() : min = date.getMinutes();
  date.getSeconds() < 10 ? second = '0' + date.getSeconds() : second = date.getSeconds();

  return [year, month, day].join('-') + '  ' + hour + ':' + min + ':' + second
}

/**
 * 获取字符串字节长度
 * @param {String}
 * @returns {Boolean}
 */
function checkLength(v) {
  var realLength = 0;
  var len = v.length;
  for (var i = 0; i < len; i++) {
    var charCode = v.charCodeAt(i);
    if (charCode >= 0 && charCode <= 128) realLength += 1;
    else realLength += 2;
  }
  return realLength;
}

/**
 * 对象克隆&深拷贝
 * @param obj
 * @returns {{}}
 */
function cloneObj(obj) {
  var newO = {};
  if (obj instanceof Array) {
    newO = [];
  }
  for (var key in obj) {
    var val = obj[key];
    newO[key] = typeof val === 'object' ? arguments.callee(val) : val;
  }
  return newO;
};

/**
 * 对象克隆&深拷贝
 * @param obj
 * @returns {{}}
 */
function clone(obj) {
  // Handle the 3 simple types, and null or undefined
  if (null == obj || "object" != typeof obj) return obj;
  // Handle Date
  if (obj instanceof Date) {
    var copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }
  // Handle Array
  if (obj instanceof Array) {
    var copy = [];
    for (var i = 0,
        len = obj.length; i < len; ++i) {
      copy[i] = clone(obj[i]);
    }
    return copy;
  }
  // Handle Object
  if (obj instanceof Object) {
    var copy = {};
    for (attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
    }
    return copy;
  }
  throw new Error("Unable to copy obj! Its type isn't supported.");
}

/**
 * 验证身份证号
 * @param el 号码输入input
 * @returns {boolean}
 */
function checkCardNo(el) {
  var txtval = el.value;
  var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return reg.test(txtval)
}

/**
 * URL有效性校验
 * @param str_url
 * @returns {boolean}
 */
function isURL(str_url) {
  // 验证url
  var strRegex = "^((https|http|ftp|rtsp|mms)?://)" + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //           
  ftp的user @ + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
    +
    "|" // 允许IP和DOMAIN（域名）
    +
    "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
    +
    "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
    +
    "[a-z]{2,6})" // first level domain- .com or .museum
    +
    "(:[0-9]{1,4})?" // 端口- :80
    +
    "((/?)|" // a slash isn't required if there is no file name
    +
    "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
  var re = new RegExp(strRegex);
  return re.test(str_url);
}
// 建议的正则
functionisURL(str) {
  return !!str.match(/(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g);
}

/**
 * 自定义封装jsonp方法
 * @param options
 */
jsonp = function (options) {
  options = options || {};
  if (!options.url || !options.callback) {
    throw new Error("参数不合法");
  }
  //创建 script 标签并加入到页面中
  var callbackName = ('jsonp_' + Math.random()).replace(".", "");
  var oHead = document.getElementsByTagName('head')[0];
  options.data[options.callback] = callbackName;
  var params = formatParams(options.data);
  var oS = document.createElement('script');
  oHead.appendChild(oS);
  //创建jsonp回调函数
  window[callbackName] = function (json) {
    oHead.removeChild(oS);
    clearTimeout(oS.timer);
    window[callbackName] = null;
    options.success && options.success(json);
  };
  //发送请求
  oS.src = options.url + '?' + params;
  //超时处理
  if (options.time) {
    oS.timer = setTimeout(function () {
        window[callbackName] = null;
        oHead.removeChild(oS);
        options.fail && options.fail({
          message: "超时"
        });
      },
      time);
  }
};
/**
 * 格式化参数
 * @param data
 * @returns {string}
 */
formatParams = function (data) {
  var arr = [];
  for (var name in data) {
    arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
  }
  return arr.join('&');
}

//写cookies
setCookie = function (name, value, time) {
  var strsec = getsec(time);
  var exp = new Date();
  exp.setTime(exp.getTime() + strsec * 1);
  document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
//cookie操作辅助函数
getsec = function (str) {
  var str1 = str.substring(1, str.length) * 1;
  var str2 = str.substring(0, 1);
  if (str2 == "s") {
    return str1 * 1000;
  } else if (str2 == "h") {
    return str1 * 60 * 60 * 1000;
  } else if (str2 == "d") {
    return str1 * 24 * 60 * 60 * 1000;
  }
}
//读取cookies
getCookie = function (name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg)) return (arr[2]);
  else return null;
}

//删除cookies
delCookie = function (name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

/**
 * 生成随机字符串(可指定长度)
 * @param len
 * @returns {string}
 */
randomString = function (len) {
  len = len || 8;
  var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  var maxPos = $chars.length;
  var pwd = '';
  for (var i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}

function parseUA() {
  var u = navigator.userAgent;
  var u2 = navigator.userAgent.toLowerCase();
  return { //移动终端浏览器版本信息
    trident: u.indexOf('Trident') > -1,
    //IE内核
    presto: u.indexOf('Presto') > -1,
    //opera内核
    webKit: u.indexOf('AppleWebKit') > -1,
    //苹果、谷歌内核
    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
    //火狐内核
    mobile: !!u.match(/AppleWebKit.*Mobile.*/),
    //是否为移动终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    //ios终端
    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
    //android终端或uc浏览器
    iPhone: u.indexOf('iPhone') > -1,
    //是否为iPhone或者QQHD浏览器
    iPad: u.indexOf('iPad') > -1,
    //是否iPad
    webApp: u.indexOf('Safari') == -1,
    //是否web应该程序，没有头部与底部
    iosv: u.substr(u.indexOf('iPhone OS') + 9, 3),
    weixin: u2.match(/MicroMessenger/i) == "micromessenger",
    ali: u.indexOf('AliApp') > -1,
  };
}
var ua = parseUA();
if (!ua.mobile) {
  location.href = './pc.html';
}


var rem = {
  baseRem: 40,
  // 基准字号，按照iphone6应该为20，此处扩大2倍，便于计算
  baseWidth: 750,
  // 基准尺寸宽，此处是按照ihpone6的尺寸
  rootEle: document.getElementsByTagName("html")[0],
  initHandle: function () {
    this.setRemHandle();
    this.resizeHandle();
  },
  setRemHandle: function () {
    var clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
    this.rootEle.style.fontSize = clientWidth * this.baseRem / this.baseWidth + "px";
  },
  resizeHandle: function () {
    var that = this;
    window.addEventListener("resize",
      function () {
        setTimeout(function () {
            that.setRemHandle();
          },
          300);
      });
  }
};
rem.initHandle();

function GetRequest() {
  var url = location.search; //获取url中"?"符后的字串
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
    }
  }
  return theRequest;
}

function loadScript(url, callback) {
  var script = document.createElement("script");
  script.type = "text/";
  if (typeof (callback) != "undefined") {
    if (script.readyState) {
      script.onreadystatechange = function () {
        if (script.readyState == "loaded" || script.readyState == "complete") {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      script.onload = function () {
        callback();
      };
    }
  }
  script.src = url;
  document.body.appendChild(script);
}

function loadScript(url, callback) {
  var script = document.createElement("script");
  script.type = "text/";
  if (typeof (callback) != "undefined") {
    if (script.readyState) {
      script.onreadystatechange = function () {
        if (script.readyState == "loaded" || script.readyState == "complete") {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      script.onload = function () {
        callback();
      };
    }
  }
  script.src = url;
  document.body.appendChild(script);
}

function getRandomColor() {
  const rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}
//防抖
const debounce = (fn, wait = 500) => {
  return function () {
    clearTimeout(fn.timer)
    fn.timer = setTimeout(fn.bind(this, ...arguments), wait)
  }
}