/**
 * 获取随机字符串
 */
Math.random().toString(16),substring(2)


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
  var strRegex = "^((https|http|ftp|rtsp|mms)?://)" + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //  ftp的user @
   + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
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
function isURL(str) {
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
//void 运算符通常只用于获取 undefined的原始值，一般使用void(0)（等同于void 0）
function isUndefined(obj) {
  return obj === void 0;
}

//防抖（debounce）：空闲时间必须大于或等于一定值的时候，只会调用一,才会执行调用方法
function debounce(fn, delay) {
  var timer; // 定时器
  delay || (delay = 250); // 默认空闲时间250ms
  return function() {
      var context = this;
      var args = arguments;
      clearTimeout(timer); // 清除定时器
      timer = setTimeout(function() { // delay时间后，执行函数
          fn.apply(context, args);
      }, delay);
  };
}
//节流（throttle）：连续执行函数，每隔一定时间执行函数
function throttle(fn, delay) {
  var last; // 上次执行的时间
  var timer; // 定时器
  delay || (delay = 250); // 默认间隔为250ms
  return function() {
      var context = this;
      var args = arguments;
      var now = +new Date(); // 现在的时间
      if (last && now < last + delay) { // 当前距离上次执行的时间小于设置的时间间隔
          clearTimeout(timer); // 清除定时器
          timer = setTimeout(function() { // delay时间后，执行函数
              last = now;
              fn.apply(context, args);
          }, delay);
      } else { // 当前距离上次执行的时间大于等于设置的时间，直接执行函数
          last = now;
          fn.apply(context, args);
      }
  };
}

/*说明:
*该函数库为数据处理函数库
* */

//获取cookie值
function getCookie(name){
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}

//写入到Cookie
//c_name:cookie名称,value:cookie值,expiredays:过期天数
function setCookie(c_name,value,expiredays){
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie=c_name+ "=" +escape(value)+	((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}

// 去掉左右两边的空格（回车不替换）
function stringTrim(str) {
	if (str != null && str != "") {
		return str.replace(/(^[\s|　]*)|([\s|　]*$)/g, "");
	}
	else {
		return "";
	}
}

// 去掉左边的空格（回车不替换）
function stringLeftTrim(str) {
	if (str != null && str != "") {
		return str.replace(/(^[\s|　]*)/g, "");
	}
	else {
		return "";
	}
}

// 去掉右边的空格（回车不替换）
function stringRightTrim(str) {
	if (str != null && str != "") {
		 return str.replace(/([\s|　]*$)/g, "");
	}
	else {
		return "";
	}
}

// 清空所有空格
function stringClearSpace(str) {
	if (str != null && str != "") {
		 return str.replace(/ /g, "");
	}
	else {
		return "";
	}
}

// 取得一个字符串的长度（一个汉字为两个长度）
function getGBLength(str) {
	if (str == null || str == "") {
		return 0;
	}
	var cnstrCount = 0; 
	for (var i = 0; i < str.length; i++) {
		if (str.charCodeAt(i) > 255) {
			cnstrCount = cnstrCount + 1;
		}
	}
	len = str.length + cnstrCount;
	return len;
}

// 取得一个字符串左子串，长度为字节长度（一个汉字为两个长度）
// 不足长度时不补充
function getGBLeft(str, len) {
	if (str == null || str == "" || len == 0) {
		return "";
	}
	var cnstrCount = 0; 
	var curCharLen = 0;
	for (var i = 0; i < str.length; i++) {
		if (str.charCodeAt(i) > 255)
			curCharLen = 2;
		else 
			curCharLen = 1;
		if (cnstrCount + curCharLen == len) {
			cnstrCount = cnstrCount + curCharLen;
			i ++;
			break;
		}
		else {
			if (cnstrCount + curCharLen > len) {
				break;
			}
			else {
				cnstrCount = cnstrCount + curCharLen;
			}
		}
	}
	return str.substr(0,i);
}

// 取得一个字符串等长子串，长度为字节长度（一个汉字为两个长度）
// 不足长度时用 padStr 补充
function getGBRpad(str, len, padStr) {
	if (str == null || str == "") {
		return getReapeatString(padStr, len);
	}
	if (len == 0) {
		return "";
	}
	var cnstrCount = 0; 
	var curCharLen = 0;
	var i = 0;
	for (i = 0; i < str.length; i++) {
		if (str.charCodeAt(i) > 255)
			curCharLen = 2;
		else 
			curCharLen = 1;
		if (cnstrCount + curCharLen == len) {
			cnstrCount = cnstrCount + curCharLen;
			i ++;
			break;
		}
		else {
			if (cnstrCount + curCharLen > len) {
				break;
			}
			else {
				cnstrCount = cnstrCount + curCharLen;
			}
		}
	}
	var rpadStr = str.substr(0, i);
	if (cnstrCount < len) {
		rpadStr = rpadStr + getReapeatString(padStr, len - cnstrCount);
	}
	return rpadStr;
}

// 取得一个字符的重复字符串
function getReapeatString(repChar, repTimes) {
	var reapeatStr = "";
	for (var i = 1; i <= repTimes; i++) {
		reapeatStr = reapeatStr + repChar; 
	}
	return reapeatStr;
}

// 全角转成半角
function charSet_fullToHalf(str) { 
	var result = "";
	if (str != "") {
		for (var i = 0; i < str.length; i++) {
			var charCode = str.charCodeAt(i);
			if (charCode == 12288) {
				result += String.fromCharCode(charCode - 12256);
				continue;
			} 
			if (charCode > 65280 && charCode < 65375) {
				result += String.fromCharCode(charCode - 65248);
			}
			else {
				result += str.substr(i, 1);
			}
		} 
	}
	return result;
} 

// 全角转成半角小写
function charSet_fullToHalfLower(str) {
	var result = "";
	if (str != "") {
		result = charSet_fullToHalf(str);
		result = result.toLowerCase();
	}
	return result;
}

// 全角转成半角大写
function charSet_fullToHalfUpper(str) {
	var result = "";
	if (str != "") {
		result = charSet_fullToHalf(str);
		result = result.toUpperCase();
	}
	return result;
}

// 半角转成全角
function charSet_halfToFull(str) { 
	var result = "";
	if (str != "") {
		for (var i = 0; i < str.length; i++) {
			var charCode = str.charCodeAt(i);
			if (charCode == 13 || charCode == 10) {
				result += str.substr(i, 1);
				continue;
			} else if (charCode == 32) {
				result += String.fromCharCode(12288);
				continue;
			} 
			if (charCode < 127) {
				result += String.fromCharCode(charCode + 65248);
			}
			else {
				result += String.fromCharCode(charCode);
			}
		} 
	}
	return result;
} 

// 半角转成全角小写
function charSet_halfToFullLower(str) {
	var result = "";
	if (str != "") {
		result = str.toLowerCase();
		result = charSet_halfToFull(result);
	}
	return result;
}

// 半角转成全角大写
function charSet_halfToFullUpper(str) {
	var result = "";
	if (str != "") {
		result = str.toUpperCase();
		result = charSet_halfToFull(result);
	}
	return result;
}

// 转成小写
function charSet_lower(str) {
	var result = "";
	if (str != "") {
		result = str.toLowerCase();
	}
	return result;
}

// 转成大写
function charSet_upper(str) {
	var result = "";
	if (str != "") {
		result = str.toUpperCase();
	}
	return result;
}

// JS 实现 StringBuffer
function StringBuffer(str) {
	this.append = function(str) {
		if (str) {
			this.stringArray.push(str);
		}
	}

	this.clear = function() {
		this.stringArray.length = 1;
	}

	this.toString = function() {
		return this.stringArray.join("");
	}

	this.stringArray = new Array("");
	this.append(str);
}

// 取得人民币大写金额
// money	金额数字字符串
function getChineseMoney(money) {
	if (money == null || money == "") {
		return "";
	}
	var moneyFloat = parseFloat(money); 
	if (isNaN(moneyFloat)) {
		return "";
	}
	else {
		if (moneyFloat == 0) {
			return "零元整";
		}
		var chinaDigital = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖");
		var chinaUnit = new Array("仟", "佰", "拾", "万", "仟", "佰", "拾", "亿", "仟", "佰", "拾", "万", "仟", "佰", "拾", "", "元", "角", "分");
		var moneyStr = "" + moneyFloat;
		var indexPoint = moneyStr.indexOf(".");
		if (indexPoint != -1) {
			moneyStr += "00";
			moneyStr = moneyStr.substring(0, indexPoint + 3);
		}
		else {
			moneyStr += ".00";
		}
		var moneyLength = moneyStr.length;
		if (moneyLength > 18) {  // 数字太大
			return "";
		}
		var tempChar = "";
		var tempInt = 0;
		var tempAtArray = 0;
		var zeroCount = 0; 
		var lastZero = false;
		var returnValue = "";
		for (var i = 0; i < moneyLength; i++) {
			tempChar = moneyStr.substring(i, i + 1);
			if (tempChar == ".") {
				if (moneyFloat >= 1) {
					returnValue += "元";
				}
			} 
			else {
				tempInt = parseInt(tempChar);
				tempAtArray = 19 - moneyLength + i;
				if (tempInt == 0) { // 为零的处理
					lastZero = true;
					zeroCount++;
					if (tempAtArray == 7 || (tempAtArray % 4 == 3 && zeroCount < 4)) { // 亿必需出现
						returnValue += chinaUnit[tempAtArray];
						zeroCount = 0;
					}
				}
				else {
					zeroCount = 0;
					if (lastZero) {
						if (moneyFloat >= 1) {
							returnValue += chinaDigital[0];
						}
					}
					returnValue += chinaDigital[tempInt];
					returnValue += chinaUnit[tempAtArray];
					lastZero = false;
				}
			}
		}
		if (moneyStr.lastIndexOf("0") == moneyLength - 1) {
			returnValue += "整";
		}
		return returnValue;
	}
}


// 取得用人民币大写金额表示的整数
// money	金额数字字符串
function getChineseNumberAsMoney(money) {
	if (money == null || money == "") {
		return "";
	}
	var moneyFloat = parseFloat(money); 
	if (isNaN(moneyFloat)) {
		return "";
	}
	else {
		if (moneyFloat == 0) {
			return "";
		}
		var chinaDigital = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖");
		var chinaUnit = new Array("仟", "佰", "拾", "万", "仟", "佰", "拾", "亿", "仟", "佰", "拾", "万", "仟", "佰", "拾", "", "", "", "");
		var moneyStr = "" + moneyFloat;
		var indexPoint = moneyStr.indexOf(".");
		if (indexPoint != -1) {
			moneyStr = moneyStr.substring(0, indexPoint) + ".00";
		}
		else {
			moneyStr += ".00";
		}
		var moneyLength = moneyStr.length;
		if (moneyLength > 18) {  // 数字太大
			return "";
		}
		var tempChar = "";
		var tempInt = 0;
		var tempAtArray = 0;
		var zeroCount = 0; 
		var lastZero = false;
		var returnValue = "";
		for (var i = 0; i < moneyLength; i++) {
			tempChar = moneyStr.substring(i, i + 1);
			if (tempChar == ".") {
				if (moneyFloat >= 1) {
					//returnValue += "元";
				}
			} 
			else {
				tempInt = parseInt(tempChar);
				tempAtArray = 19 - moneyLength + i;
				if (tempInt == 0) { // 为零的处理
					lastZero = true;
					zeroCount++;
					if (tempAtArray == 7 || (tempAtArray % 4 == 3 && zeroCount < 4)) { // 亿必需出现
						returnValue += chinaUnit[tempAtArray];
						zeroCount = 0;
					}
				} 
				else {
					zeroCount = 0;
					if (lastZero) {
						if (moneyFloat >= 1) {
							returnValue += chinaDigital[0];
						}
					}
					returnValue += chinaDigital[tempInt];
					returnValue += chinaUnit[tempAtArray];
					lastZero = false;
				}
			}
		}
		return returnValue;
	}
}

// 取得数字中文字符串（如：法律文书条款）
// numberStr	整数字符串
function getChineseNumber(numberStr) {
	if (numberStr == null || numberStr == "") {
		return "";
	}
	var numberLong = parseFloat(numberStr); 
	if (isNaN(numberLong)) {
		return "";
	}
	else {
		numberLong = Math.floor(numberLong);
		if (numberLong == 0) {
			return "零";
		}
		var chinaDigital = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九");
		var chinaUnit = new Array("亿", "千", "百", "十", "万", "千", "百", "十", "");
		var tempStr = "" + numberLong;
		var numberLength = tempStr.length;
		if (numberLength > 9) {  // 数字太大
			return "";
		}
		var tempChar = "";
		var tempInt = 0;
		var tempAtArray = 0;
		var zeroCount = 0; 
		var lastZero = false;
		var returnValue = "";
		for (var i = 0; i < numberLength; i++) {
			tempChar = tempStr.substring(i, i + 1);
			tempInt = parseInt(tempChar);
			tempAtArray = 9 - numberLength + i;
			if (tempInt == 0) { // 为零的处理
				lastZero = true;
				zeroCount++;
				if (tempAtArray == 0 || (tempAtArray % 4 == 0 && zeroCount < 4)) { // 亿必需出现
					returnValue += chinaUnit[tempAtArray];
					zeroCount = 0;
				}
			} 
			else {
				zeroCount = 0;
				if (lastZero) {
					if (numberLong >= 1) {
						returnValue += chinaDigital[0];
					}
				}
				returnValue += chinaDigital[tempInt];
				returnValue += chinaUnit[tempAtArray];
				lastZero = false;
			}
		}
		return returnValue;
	}
}

// 取得日期中文字符串
// dateString	日期字符串格式，如: (2008-05-12 14:28:36)
// resultFormat 返回结果的格式（字符型）
// resultFormat = 1 ：2008年5月12日
// resultFormat = 2 ：2008年5月12日14时
// resultFormat = 3 ：2008年5月12日14时28分
// resultFormat = 4 ：二○○八年五月十二日

function getChineseDate(dateString, resultFormat) {
	if (dateString == null || dateString == "") {
		return "";
	}
	if (resultFormat == null || resultFormat == "") {
		resultFormat = "1";
	}
	var chineseDate = "";
	try {
		var tempYear = dateString.substring(0, 4);
		var tempMonth = dateString.substring(5, 7);
		var tempDay = dateString.substring(8, 10);
		var tempHour = dateString.substring(11, 13);
		var tempMinute = dateString.substring(14, 16);
		var tempSecond = dateString.substring(17);
		switch (resultFormat) {
			case "1" :
				chineseDate = tempYear + "年" + tempMonth.replace(/(^0*)/g, "") + "月" + tempDay.replace(/(^0*)/g, "") + "日";
				break;
			case "2" : 
				var hourString = tempHour.replace(/(^0*)/g, "");
				if (hourString == "") {
					hourString = "0";
				}
				chineseDate = tempYear + "年" + tempMonth.replace(/(^0*)/g, "") + "月" + tempDay.replace(/(^0*)/g, "") + "日" + hourString + "时";
				break;
			case "3" :  
				var hourString = tempHour.replace(/(^0*)/g, "");
				if (hourString == "") {
					hourString = "0";
				}
				var minuteString = tempMinute.replace(/(^0*)/g, "")
				if (minuteString == "") {
					minuteString = "0";
				}
				chineseDate = tempYear + "年" + tempMonth.replace(/(^0*)/g, "") + "月" + tempDay.replace(/(^0*)/g, "") + "日" + hourString + "时" + minuteString + "分";
				break;
			case "4" :  
				var chinaNumber = new Array(10);
				chinaNumber[0] = "○"; // 0
				chinaNumber[1] = "一";
				chinaNumber[2] = "二";
				chinaNumber[3] = "三";
				chinaNumber[4] = "四";
				chinaNumber[5] = "五";
				chinaNumber[6] = "六";
				chinaNumber[7] = "七";
				chinaNumber[8] = "八";
				chinaNumber[9] = "九";

				for (var i = 0; i < tempYear.length; i++) {
					var cn = parseInt(tempYear.substring(i, i + 1));
					chineseDate += chinaNumber[cn];
				}
				chineseDate += "年";
				for (var i = 0; i < tempMonth.length; i++) {
					var cn = parseInt(tempMonth.substring(i, i + 1));
					if (i == 0) {
						if (cn == 1) {
							chineseDate += "十";
						}
					} 
					else {
						if (cn > 0) {
							chineseDate += chinaNumber[cn];
						}
					}
				}
				chineseDate += "月";
				for (var i = 0; i < tempDay.length; i++) {
					var cn = parseInt(tempDay.substring(i, i + 1));
					if (i == 0) {
						switch (cn) {
							case 0:
								break;
							case 1:
								chineseDate += "十";
								break;
							default:
								chineseDate += chinaNumber[cn] + "十";
								break;
						}
					} 
					else {
						if (cn > 0) {
							chineseDate += chinaNumber[cn];
						}
					}
				}
				chineseDate += "日";
				break;
			}
	}
	catch (err) {
		chineseDate = "";
	}
	return chineseDate;
}

// 15位身份证号码转成18位
function getSfzh18(sfzh15) {
	var tempSfzh = sfzh15;
	if (("undefined" != typeof sfzh15) && (sfzh15 != "")) {
		if (sfzh15.length == 15) {
			var tempStr = sfzh15.substring(0, 6) + "19" + sfzh15.substring(6);
			var lastAt = 0;
			for (var i = 0; i < 17; i++) {
				var bitInt = parseInt(tempStr.substring(i, i + 1));
				var bitIntTemp = 1;
				for (var j = 0; j < 17 - i; j++) {
					bitIntTemp = (bitIntTemp * 2) % 11;
				}
				lastAt += bitInt * bitIntTemp;
			}
			lastAt %= 11;
			tempSfzh = tempStr + "10X98765432".substring(lastAt, lastAt + 1);
		}
	}
	return tempSfzh;
}

// 判断是否为正确的身份证号码
// 验证通过返回true,否则返回false
function isCorrectSfzh(sfzh18) {
	if (sfzh18 != "" && sfzh18.length == 18) {
		for (var i = 0; i < 17; i++) {
			var bitChar = sfzh18.substring(i, i + 1);
			if (bitChar < "0" || bitChar > "9") {
				return false;
			}
		}
		var birthday = sfzh18.substring(6, 14);
		return (isValidDate(birthday, 0) && checkSfzh18Bit(sfzh18));
	}
	return false;
}

// 18位身份证号码校验位检查
// 验证通过返回true,否则返回false
function checkSfzh18Bit(sfzh18) {
	try {
		var tempStr = sfzh18;
		var lastAt = 0;
		for (var i = 0; i < 17; i++) {
			var bitInt = parseInt(tempStr.substring(i, i + 1));
			var bitIntTemp = 1;
			for (var j = 0; j < 17 - i; j++) {
				bitIntTemp = (bitIntTemp * 2) % 11;
			}
			lastAt += bitInt * bitIntTemp;
		}
		lastAt %= 11;
		if ("10X98765432".substring(lastAt, lastAt + 1) == sfzh18.substring(17)) { 
			return true;
		}
		else {
			return false;
		}
	}
	catch (err) {
		return false;
	}
}

// 判断是否为一个有效的日期
// curDate 日期字符串，格式如：2008-05-12，也可以校验紧凑型日期格式：20080512
// splitLength 分隔符（日期时间分隔符长度，只能为 1）
// 验证通过返回true,否则返回false
function isValidDate(curDate, splitLength) {
	var valid = false;
	if (("undefined" != typeof splitLength) && (splitLength == 1)) {
		if (curDate.length == 10) {
			valid = checkDate(curDate.substring(0, 4), curDate.substring(5, 7), curDate.substring(8));
		}
	}
	else {
		if (curDate.length == 8) {
			valid = checkDate(curDate.substring(0, 4), curDate.substring(4, 6), curDate.substring(6));
		}
	}
	return valid;
}

// 日期检查
// year 年字符串，month 月字符串，day 日字符串
// 年月日可以有0的前缀
function checkDate(year, month, day) {
	try {
		year = year.replace(/(^0*)/g, "");
		month = month.replace(/(^0*)/g, "");
		day = day.replace(/(^0*)/g, "");
		var regExp = new RegExp("^\\d+$");
		if (!regExp.test(year) || !regExp.test(month) || !regExp.test(day)) {
			return false;
		}
		var yearInt = parseInt(year);
		var monthInt = parseInt(month);
		var dayInt = parseInt(day);
		if ((yearInt < 1900 || yearInt > 3000) || (monthInt < 1 || monthInt > 12) || (dayInt < 1 || dayInt > 31)) {
			return false;
		}
		if (dayInt == 31 && (monthInt==4 || monthInt==6 || monthInt==9 || monthInt==11)) {
			return false;
		}
		if (monthInt == 2) {
			if ((yearInt % 4 == 0 && yearInt % 100 != 0) || yearInt % 400 == 0) {
				if (dayInt > 29) {
					return false;
				}
			} 
			else {
				if (dayInt > 28) {
					return false;
				}
			} 
		} 
	}
	catch (err) {
		return false;
	}
	return true;
}

// 判断是否为一个有效的日期时间
// curDate 日期时间字符串，格式如：2008-05-12 14:28:20 ，也可以校验紧凑型日期时间格式：20080512142820
// splitLength 分隔符（日期时间分隔符长度，只能为 1）
// 验证通过返回true,否则返回false
function isValidDateTime(curDate, splitLength) {
	var valid = false;
	if (("undefined" != typeof splitLength) && (splitLength == 1)) {
		if (curDate.length == 19) {
			valid = checkDateTime(curDate.substring(0, 4), curDate.substring(5, 7), curDate.substring(8, 10), curDate.substring(11, 13), curDate.substring(14, 16), curDate.substring(17));
		}
	}
	else {
		if (curDate.length == 14) {
			valid = checkDateTime(curDate.substring(0, 4), curDate.substring(4, 6), curDate.substring(6, 8), curDate.substring(8, 10), curDate.substring(10, 12), curDate.substring(12));
		}
	}
	return valid;
}

// 日期时间检查
// year 年字符串，month 月字符串，day 日字符串，hour 小时字符串，minute 分字符串，second 秒字符串
// 年月日时分秒可以有0的前缀
function checkDateTime(year, month, day, hour, minute, second) {
	try {
		year = year.replace(/(^0*)/g, "");
		month = month.replace(/(^0*)/g, "");
		day = day.replace(/(^0*)/g, "");
		var regExp = new RegExp("^\\d+$");
		if (!regExp.test(year) || !regExp.test(month) || !regExp.test(day)) {
			return false;
		}
		var yearInt = parseInt(year);
		var monthInt = parseInt(month);
		var dayInt = parseInt(day);
		if ((yearInt < 1900 || yearInt > 3000) || (monthInt < 1 || monthInt > 12) || (dayInt < 1 || dayInt > 31)) {
			return false;
		}
		if (dayInt == 31 && (monthInt==4 || monthInt==6 || monthInt==9 || monthInt==11)) {
			return false;
		}
		if (monthInt == 2) {
			if ((yearInt % 4 == 0 && yearInt % 100 != 0) || yearInt % 400 == 0) {
				if (dayInt > 29) {
					return false;
				}
			} 
			else {
				if (dayInt > 28) {
					return false;
				}
			} 
		}
		hour = hour.replace(/(^0{1})/g, "");
		minute = minute.replace(/(^0{1})/g, "");
		second = second.replace(/(^0{1})/g, "");
		if (!regExp.test(hour) || !regExp.test(minute) || !regExp.test(second)) {
			return false;
		}
		var hourInt = parseInt(hour);
		var minuteInt = parseInt(minute);
		var secondInt = parseInt(second);
		if ((hourInt < 0 || hourInt > 23) || (minuteInt < 0 || minuteInt > 59) || (secondInt < 0 || secondInt > 59)) {
			return false;
		}
	}
	catch (err) {
		return false;
	}
	return true;
}

// 兼容模式下取浏览器页面有效高度（去除上下菜单、边框等）
// 返回值中：
//   width：页面可视宽度;
//   height：页面可视高度;
//   scrollWidth：页面内容宽度;
//   scrollHeight：页面内容高度;
function getDocumentSize() { 
	var _pageWidth = window.innerWidth;
	var _pageHeight = window.innerHeight;
	var _scrollWidth = 0;
	var _scrollHeight = 0;
	if (typeof _pageWidth != "number"){ 
		if(document.compatMode == "number"){ 
			_pageWidth = document.documentElement.clientWidth; 
			_pageHeight = document.documentElement.clientHeight; 
		}
		else{ 
			_pageWidth = document.body.clientWidth; 
			_pageHeight = document.body.clientHeight; 
		} 
	}
	if (document.documentElement && document.documentElement.scrollHeight) {
		_scrollWidth = document.documentElement.scrollWidth;
		_scrollHeight = document.documentElement.scrollHeight;
	}
	else {
		_scrollWidth = document.body.scrollWidth;
		_scrollHeight = document.body.scrollHeight;
	}
	return {width: _pageWidth, height: _pageHeight, scrollWidth: _scrollWidth, scrollHeight: _scrollHeight};
}

// iframe 重置大小，铺满当前页面
function iframeResize(iframeID) {
	var iframeObject = document.getElementById(iframeID);
	if (iframeObject != null) {
		var documentSize = getDocumentSize();
		document.getElementById(iframeID).style.width = documentSize.width;
		document.getElementById(iframeID).style.height = documentSize.height;
	}
}

// iframe 显示
function iframeShow(iframeID, iframeURL) {
	var iframeObject = document.getElementById(iframeID);
	if (iframeObject != null) {
		document.getElementById(iframeID).style.display = "";
		if (iframeURL) {
			document.getElementById(iframeID).src = iframeURL;
		}
	}
}

// iframe 隐藏
function iframeHide(iframeID) {
	var iframeObject = document.getElementById(iframeID);
	if (iframeObject != null) {
		document.getElementById(iframeID).style.display = "none";
		document.getElementById(iframeID).src = "";
	}
}

