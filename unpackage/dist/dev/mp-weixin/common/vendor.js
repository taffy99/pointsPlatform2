(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 3);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 4));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var realAtob;

var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;

if (typeof atob !== 'function') {
  realAtob = function realAtob(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) {throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");}

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap;var result = '';var r1;var r2;var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 |
      (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));

      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) :
      r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) :
      String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  // 注意atob只能在全局对象上调用，例如：`const Base64 = {atob};Base64.atob('xxxx')`是错误的用法
  realAtob = atob;
}

function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0 };

  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}

function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {var _getCurrentUserInfo =


    getCurrentUserInfo(),role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {var _getCurrentUserInfo2 =


    getCurrentUserInfo(),permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {var _getCurrentUserInfo3 =


    getCurrentUserInfo(),tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

function sortObject(obj) {
  var sortObj = {};
  if (isPlainObject(obj)) {
    Object.keys(obj).sort().forEach(function (key) {
      sortObj[key] = obj[key];
    });
  }
  return !Object.keys(sortObj) ? obj : sortObj;
}

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale|invokePushCallback|getWindowInfo|getDeviceInfo|getAppBaseInfo|getSystemSetting|getAppAuthorizeSetting/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection', 'createPushMessage'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var LOCALE_ZH_HANS = 'zh-Hans';
var LOCALE_ZH_HANT = 'zh-Hant';
var LOCALE_EN = 'en';
var LOCALE_FR = 'fr';
var LOCALE_ES = 'es';

var messages = {};

var locale;

{
  locale = normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}

function initI18nMessages() {
  if (!isEnableLocale()) {
    return;
  }
  var localeKeys = Object.keys(__uniConfig.locales);
  if (localeKeys.length) {
    localeKeys.forEach(function (locale) {
      var curMessages = messages[locale];
      var userMessages = __uniConfig.locales[locale];
      if (curMessages) {
        Object.assign(curMessages, userMessages);
      } else {
        messages[locale] = userMessages;
      }
    });
  }
}

initI18nMessages();

var i18n = (0, _uniI18n.initVueI18n)(
locale,
{});

var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {var _this = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    } } };


var setLocale = i18n.setLocale;
var getLocale = i18n.getLocale;

function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale() });

  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {return watch(v);});
    } });

}

function isEnableLocale() {
  return typeof __uniConfig !== 'undefined' && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length;
}

function include(str, parts) {
  return !!parts.find(function (part) {return str.indexOf(part) !== -1;});
}

function startsWith(str, parts) {
  return parts.find(function (part) {return str.indexOf(part) === 0;});
}

function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === 'chinese') {
    // 支付宝
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}
// export function initI18n() {
//   const localeKeys = Object.keys(__uniConfig.locales || {})
//   if (localeKeys.length) {
//     localeKeys.forEach((locale) =>
//       i18n.add(locale, __uniConfig.locales[locale])
//     )
//   }
// }

function getLocale$1() {
  // 优先使用 $locale
  var app = getApp({
    allowDefault: true });

  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}

function setLocale$1(locale) {
  var app = getApp();
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {return fn({
        locale: locale });});

    return true;
  }
  return false;
}

var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}

if (typeof global !== 'undefined') {
  global.getLocale = getLocale$1;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale$1,
  setLocale: setLocale$1,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function useDeviceId(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.screenHeight - safeArea.bottom };

  }
}

function populateParameters(result) {var _result$brand =





  result.brand,brand = _result$brand === void 0 ? '' : _result$brand,_result$model = result.model,model = _result$model === void 0 ? '' : _result$model,_result$system = result.system,system = _result$system === void 0 ? '' : _result$system,_result$language = result.language,language = _result$language === void 0 ? '' : _result$language,theme = result.theme,version = result.version,platform = result.platform,fontSizeSetting = result.fontSizeSetting,SDKVersion = result.SDKVersion,pixelRatio = result.pixelRatio,deviceOrientation = result.deviceOrientation;
  // const isQuickApp = "mp-weixin".indexOf('quickapp-webview') !== -1

  // osName osVersion
  var osName = '';
  var osVersion = '';
  {
    osName = system.split(' ')[0] || '';
    osVersion = system.split(' ')[1] || '';
  }
  var hostVersion = version;

  // deviceType
  var deviceType = getGetDeviceType(result, model);

  // deviceModel
  var deviceBrand = getDeviceBrand(brand);

  // hostName
  var _hostName = getHostName(result);

  // deviceOrientation
  var _deviceOrientation = deviceOrientation; // 仅 微信 百度 支持

  // devicePixelRatio
  var _devicePixelRatio = pixelRatio;

  // SDKVersion
  var _SDKVersion = SDKVersion;

  // hostLanguage
  var hostLanguage = language.replace(/_/g, '-');

  // wx.getAccountInfoSync

  var parameters = {
    appId: "",
    appName: "lookme",
    appVersion: "1.0.0",
    appVersionCode: "100",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "3.6.5",
    uniRuntimeVersion: "3.6.5",
    uniPlatform: undefined || "mp-weixin",
    deviceBrand: deviceBrand,
    deviceModel: model,
    deviceType: deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName: osName.toLocaleLowerCase(),
    osVersion: osVersion,
    hostTheme: theme,
    hostVersion: hostVersion,
    hostLanguage: hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    // TODO
    osLanguage: undefined,
    osTheme: undefined,
    ua: undefined,
    hostPackageName: undefined,
    browserName: undefined,
    browserVersion: undefined };


  Object.assign(result, parameters);
}

function getGetDeviceType(result, model) {
  var deviceType = result.deviceType || 'phone';
  {
    var deviceTypeMaps = {
      ipad: 'pad',
      windows: 'pc',
      mac: 'pc' };

    var deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    var _model = model.toLocaleLowerCase();
    for (var index = 0; index < deviceTypeMapsKeys.length; index++) {
      var _m = deviceTypeMapsKeys[index];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  return deviceType;
}

function getDeviceBrand(brand) {
  var deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = brand.toLocaleLowerCase();
  }
  return deviceBrand;
}

function getAppLanguage(defaultLanguage) {
  return getLocale$1 ?
  getLocale$1() :
  defaultLanguage;
}

function getHostName(result) {
  var _platform = 'WeChat';
  var _hostName = result.hostName || _platform; // mp-jd
  {
    if (result.environment) {
      _hostName = result.environment;
    } else if (result.host && result.host.env) {
      _hostName = result.host.env;
    }
  }

  return _hostName;
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    useDeviceId(result);
    addSafeAreaInsets(result);
    populateParameters(result);
  } };


var showActionSheet = {
  args: function args(fromArgs) {
    if (typeof fromArgs === 'object') {
      fromArgs.alertText = fromArgs.title;
    }
  } };


var getAppBaseInfo = {
  returnValue: function returnValue(result) {var _result =
    result,version = _result.version,language = _result.language,SDKVersion = _result.SDKVersion,theme = _result.theme;

    var _hostName = getHostName(result);

    var hostLanguage = language.replace('_', '-');

    result = sortObject(Object.assign(result, {
      appId: "",
      appName: "lookme",
      appVersion: "1.0.0",
      appVersionCode: "100",
      appLanguage: getAppLanguage(hostLanguage),
      hostVersion: version,
      hostLanguage: hostLanguage,
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme }));

  } };


var getDeviceInfo = {
  returnValue: function returnValue(result) {var _result2 =
    result,brand = _result2.brand,model = _result2.model;
    var deviceType = getGetDeviceType(result, model);
    var deviceBrand = getDeviceBrand(brand);
    useDeviceId(result);

    result = sortObject(Object.assign(result, {
      deviceType: deviceType,
      deviceBrand: deviceBrand,
      deviceModel: model }));

  } };


var getWindowInfo = {
  returnValue: function returnValue(result) {
    addSafeAreaInsets(result);

    result = sortObject(Object.assign(result, {
      windowTop: 0,
      windowBottom: 0 }));

  } };


var getAppAuthorizeSetting = {
  returnValue: function returnValue(result) {var
    locationReducedAccuracy = result.locationReducedAccuracy;

    result.locationAccuracy = 'unsupported';
    if (locationReducedAccuracy === true) {
      result.locationAccuracy = 'reduced';
    } else if (locationReducedAccuracy === false) {
      result.locationAccuracy = 'full';
    }
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo,
  showActionSheet: showActionSheet,
  getAppBaseInfo: getAppBaseInfo,
  getDeviceInfo: getDeviceInfo,
  getWindowInfo: getWindowInfo,
  getAppAuthorizeSetting: getAppAuthorizeSetting };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


/**
                    * 框架内 try-catch
                    */
/**
                        * 开发者 try-catch
                        */
function tryCatch(fn) {
  return function () {
    try {
      return fn.apply(fn, arguments);
    } catch (e) {
      // TODO
      console.error(e);
    }
  };
}

function getApiCallbacks(params) {
  var apiCallbacks = {};
  for (var name in params) {
    var param = params[name];
    if (isFn(param)) {
      apiCallbacks[name] = tryCatch(param);
      delete params[name];
    }
  }
  return apiCallbacks;
}

var cid;
var cidErrMsg;
var enabled;

function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e) {}
  return message;
}

function invokePushCallback(
args)
{
  if (args.type === 'enabled') {
    enabled = true;
  } else if (args.type === 'clientId') {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === 'pushMsg') {
    var message = {
      type: 'receive',
      data: normalizePushMessage(args.message) };

    for (var i = 0; i < onPushMessageCallbacks.length; i++) {
      var callback = onPushMessageCallbacks[i];
      callback(message);
      // 该消息已被阻止
      if (message.stopped) {
        break;
      }
    }
  } else if (args.type === 'click') {
    onPushMessageCallbacks.forEach(function (callback) {
      callback({
        type: 'click',
        data: normalizePushMessage(args.message) });

    });
  }
}

var getPushCidCallbacks = [];

function invokeGetPushCidCallbacks(cid, errMsg) {
  getPushCidCallbacks.forEach(function (callback) {
    callback(cid, errMsg);
  });
  getPushCidCallbacks.length = 0;
}

function getPushClientId(args) {
  if (!isPlainObject(args)) {
    args = {};
  }var _getApiCallbacks =




  getApiCallbacks(args),success = _getApiCallbacks.success,fail = _getApiCallbacks.fail,complete = _getApiCallbacks.complete;
  var hasSuccess = isFn(success);
  var hasFail = isFn(fail);
  var hasComplete = isFn(complete);

  Promise.resolve().then(function () {
    if (typeof enabled === 'undefined') {
      enabled = false;
      cid = '';
      cidErrMsg = 'uniPush is not enabled';
    }
    getPushCidCallbacks.push(function (cid, errMsg) {
      var res;
      if (cid) {
        res = {
          errMsg: 'getPushClientId:ok',
          cid: cid };

        hasSuccess && success(res);
      } else {
        res = {
          errMsg: 'getPushClientId:fail' + (errMsg ? ' ' + errMsg : '') };

        hasFail && fail(res);
      }
      hasComplete && complete(res);
    });
    if (typeof cid !== 'undefined') {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
}

var onPushMessageCallbacks = [];
// 不使用 defineOnApi 实现，是因为 defineOnApi 依赖 UniServiceJSBridge ，该对象目前在小程序上未提供，故简单实现
var onPushMessage = function onPushMessage(fn) {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};

var offPushMessage = function offPushMessage(fn) {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    var index = onPushMessageCallbacks.indexOf(fn);
    if (index > -1) {
      onPushMessageCallbacks.splice(index, 1);
    }
  }
};

var api = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getPushClientId: getPushClientId,
  onPushMessage: onPushMessage,
  offPushMessage: offPushMessage,
  invokePushCallback: invokePushCallback });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  var newTriggerEvent = function newTriggerEvent(event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    // 事件名统一转驼峰格式，仅处理：当前组件为 vue 组件、当前组件为 vue 组件子组件
    if (this.$vm || this.dataset && this.dataset.comType) {
      event = customize(event);
    } else {
      // 针对微信/QQ小程序单独补充驼峰格式事件，以兼容历史项目
      var newEvent = customize(event);
      if (newEvent !== event) {
        oldTriggerEvent.apply(this, [newEvent].concat(args));
      }
    }
    return oldTriggerEvent.apply(this, [event].concat(args));
  };
  try {
    // 京东小程序 triggerEvent 为只读
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}

function initHook(name, options, isComponent) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initUnknownHooks(mpOptions, vueOptions) {var excludes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  findHooks(vueOptions).forEach(function (hook) {return initHook$1(mpOptions, hook, excludes);});
}

function findHooks(vueOptions) {var hooks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (vueOptions) {
    Object.keys(vueOptions).forEach(function (name) {
      if (name.indexOf('on') === 0 && isFn(vueOptions[name])) {
        hooks.push(name);
      }
    });
  }
  return hooks;
}

function initHook$1(mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn(mpOptions, hook)) {
    mpOptions[hook] = function (args) {
      return this.$vm && this.$vm.__call_hook(hook, args);
    };
  }
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"lookme","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';var options = arguments.length > 3 ? arguments[3] : undefined;
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    {
      if (options.virtualHost) {
        properties.virtualHostStyle = {
          type: null,
          value: '' };

        properties.virtualHostClass = {
          type: null,
          value: '' };

      }
    }
    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event, __args__) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            extraObj['$' + index] = event.detail ? event.detail.__args__ || __args__ : __args__;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象

  // fixed 用户直接触发 mpInstance.triggerEvent
  var __args__ = isPlainObject(event.detail) ?
  event.detail.__args__ || [event.detail] :
  [event.detail];

  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return __args__;
    }
  }

  var extraObj = processEventExtra(vm, extra, event, __args__);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this2 = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this2.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this2.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            var _type = _this2.$vm.mpType === 'page' ? 'Page' : 'Component';
            var path = _this2.route || _this2.is;
            throw new Error("".concat(_type, " \"").concat(path, "\" does not have a method \"").concat(methodName, "\""));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this2.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initAppLocale(_vue.default, vm, normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN);

  initHooks(appOptions, hooks);
  initUnknownHooks(appOptions, vm.$options);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file, options),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };
  {
    initUnknownHooks(pageOptions.methods, vuePageOptions, ['onReady']);
  }

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 11:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 18:
/*!************************************************!*\
  !*** D:/uniapp/lookme/static/home/home-bg.png ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/home/home-bg.png";

/***/ }),

/***/ 2:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 3:
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, global) {Object.defineProperty(exports, "__esModule", { value: true });exports.compileI18nJsonStr = compileI18nJsonStr;exports.hasI18nJson = hasI18nJson;exports.initVueI18n = initVueI18n;exports.isI18nStr = isI18nStr;exports.normalizeLocale = normalizeLocale;exports.parseI18nJson = parseI18nJson;exports.resolveLocale = resolveLocale;exports.isString = exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var isArray = Array.isArray;
var isObject = function isObject(val) {return val !== null && typeof val === 'object';};
var defaultDelimiters = ['{', '}'];var
BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {_classCallCheck(this, BaseFormatter);
    this._caches = Object.create(null);
  }_createClass(BaseFormatter, [{ key: "interpolate", value: function interpolate(
    message, values) {var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    } }]);return BaseFormatter;}();exports.Formatter = BaseFormatter;

var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {var _ref2 = _slicedToArray(_ref, 2),startDelimiter = _ref2[0],endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({ type: 'text', value: text });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ?
      'list' :
      isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ?
      'named' :
      'unknown';
      tokens.push({ value: sub, type: type });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
        text += char;
      }
  }
  text && tokens.push({ type: 'text', value: text });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = isArray(values) ?
  'list' :
  isObject(values) ?
  'named' :
  'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else
        {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;}

    index++;
  }
  return compiled;
}

var LOCALE_ZH_HANS = 'zh-Hans';exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {return hasOwnProperty.call(val, key);};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {return str.indexOf(part) !== -1;});
}
function startsWith(str, parts) {
  return parts.find(function (part) {return str.indexOf(part) === 0;});
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}var
I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {var locale = _ref3.locale,fallbackLocale = _ref3.fallbackLocale,messages = _ref3.messages,watcher = _ref3.watcher,formater = _ref3.formater;_classCallCheck(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }_createClass(I18n, [{ key: "setLocale", value: function setLocale(
    locale) {var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    } }, { key: "getLocale", value: function getLocale()
    {
      return this.locale;
    } }, { key: "watchLocale", value: function watchLocale(
    fn) {var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    } }, { key: "add", value: function add(
    locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else
        {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else
      {
        this.messages[locale] = message;
      }
    } }, { key: "f", value: function f(
    message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    } }, { key: "t", value: function t(
    key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else
      {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    } }]);return I18n;}();exports.I18n = I18n;


function watchAppLocale(appVm, i18n) {
  // 需要保证 watch 的触发在组件渲染之前
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale(function (newLocale) {
      i18n.setLocale(newLocale);
    });
  } else
  {
    appVm.$watch(function () {return appVm.$locale;}, function (newLocale) {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale();
  }
  // 小程序平台，uni 和 uni-i18n 互相引用，导致访问不到 uni，故在 global 上挂了 getLocale
  if (typeof global !== 'undefined' && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale) {var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {var _ref4 =
    [
    messages,
    locale];locale = _ref4[0];messages = _ref4[1];

  }
  if (typeof locale !== 'string') {
    // 因为小程序平台，uni-i18n 和 uni 互相引用，导致此时访问 uni 时，为 undefined
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale =
    typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale ||
    LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher });

  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else
    {
      var isWatchedAppLocale = false;
      _t = function t(key, values) {
        var appVm = getApp().$vm;
        // 可能$vm还不存在，比如在支付宝小程序中，组件定义较早，在props的default里使用了t()函数（如uni-goods-nav），此时app还未初始化
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // 触发响应式
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key, values);
      };
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    } };

}

var isString = function isString(val) {return typeof val === 'string';};exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else
    {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else
    {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {var locale = _ref5.locale,locales = _ref5.locales,delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name] });

    }
  });
  localeValues.unshift({ locale: locale, values: locales[locale] });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  }
  catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else
  {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else
  if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}

function resolveLocale(locales) {
  return function (locale) {
    if (!locale) {
      return locale;
    }
    locale = normalizeLocale(locale) || locale;
    return resolveLocaleChain(locale).find(function (locale) {return locales.indexOf(locale) > -1;});
  };
}
function resolveLocaleChain(locale) {
  var chain = [];
  var tokens = locale.split('-');
  while (tokens.length) {
    chain.push(tokens.join('-'));
    tokens.pop();
  }
  return chain;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 4:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2022 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou' || vm.mpHost === 'mp-xhs'){//百度、快手、小红书 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue !== pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_NAME":"lookme","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"lookme","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"lookme","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"lookme","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      var triggerEvent = this.$scope['_triggerEvent'] || this.$scope['triggerEvent'];
      if (triggerEvent) {
        triggerEvent.call(this.$scope, event, {
          __args__: toArray(arguments, 1)
        });
      }
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize',
    'onUploadDouyinVideo'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 41:
/*!*****************************************************!*\
  !*** D:/uniapp/lookme/static/home/user_default.png ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 42:
/*!*******************************************!*\
  !*** D:/uniapp/lookme/static/home/rz.png ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/home/rz.png";

/***/ }),

/***/ 43:
/*!**********************************************!*\
  !*** D:/uniapp/lookme/static/home/apply.png ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 44:
/*!********************************************!*\
  !*** D:/uniapp/lookme/static/home/pay.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 45:
/*!*********************************************!*\
  !*** D:/uniapp/lookme/static/home/rule.png ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 46:
/*!*********************************************!*\
  !*** D:/uniapp/lookme/static/home/shop.png ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 5:
/*!***********************************!*\
  !*** D:/uniapp/lookme/pages.json ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map