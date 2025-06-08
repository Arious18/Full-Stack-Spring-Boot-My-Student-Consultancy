import {
  D,
  X,
  cn,
  j,
  require_baseEach,
  require_baseIteratee,
  require_uniqBy,
  z
} from "./chunk-2PVEFPLL.js";
import {
  $r,
  Ai,
  Bi,
  Bt,
  Dt,
  Et,
  Fi,
  Gi,
  H,
  Hi,
  Ht,
  Jt,
  Ti,
  We,
  X as X2,
  Zr,
  _i,
  animated,
  k,
  li,
  ni,
  oi,
  pr,
  require_Stack,
  require_Symbol,
  require_arrayFilter,
  require_arrayMap,
  require_arrayPush,
  require_assignValue,
  require_baseGet,
  require_baseGetAllKeys,
  require_baseGetTag,
  require_baseUnary,
  require_castPath,
  require_cloneArrayBuffer,
  require_cloneBuffer,
  require_cloneTypedArray,
  require_copyArray,
  require_copyObject,
  require_flatRest,
  require_getAllKeys,
  require_getPrototype,
  require_getSymbols,
  require_getTag,
  require_initCloneObject,
  require_isArray,
  require_isBuffer,
  require_isObject,
  require_isObjectLike,
  require_isPlainObject,
  require_keys,
  require_keysIn,
  require_last,
  require_nodeUtil,
  require_stubArray,
  require_toKey,
  si,
  to,
  useSpring,
  useTransition,
  w
} from "./chunk-BQN4OYG4.js";
import {
  require_jsx_runtime
} from "./chunk-ZEUX6AFY.js";
import "./chunk-JUWM2LYA.js";
import {
  require_react
} from "./chunk-W4EHDCLL.js";
import {
  __commonJS,
  __toESM
} from "./chunk-EWTE5DHJ.js";

// node_modules/lodash/_baseFilter.js
var require_baseFilter = __commonJS({
  "node_modules/lodash/_baseFilter.js"(exports, module) {
    var baseEach = require_baseEach();
    function baseFilter(collection, predicate) {
      var result = [];
      baseEach(collection, function(value, index, collection2) {
        if (predicate(value, index, collection2)) {
          result.push(value);
        }
      });
      return result;
    }
    module.exports = baseFilter;
  }
});

// node_modules/lodash/filter.js
var require_filter = __commonJS({
  "node_modules/lodash/filter.js"(exports, module) {
    var arrayFilter = require_arrayFilter();
    var baseFilter = require_baseFilter();
    var baseIteratee = require_baseIteratee();
    var isArray = require_isArray();
    function filter(collection, predicate) {
      var func = isArray(collection) ? arrayFilter : baseFilter;
      return func(collection, baseIteratee(predicate, 3));
    }
    module.exports = filter;
  }
});

// node_modules/lodash/isNumber.js
var require_isNumber = __commonJS({
  "node_modules/lodash/isNumber.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isObjectLike = require_isObjectLike();
    var numberTag = "[object Number]";
    function isNumber(value) {
      return typeof value == "number" || isObjectLike(value) && baseGetTag(value) == numberTag;
    }
    module.exports = isNumber;
  }
});

// node_modules/lodash/_arrayEach.js
var require_arrayEach = __commonJS({
  "node_modules/lodash/_arrayEach.js"(exports, module) {
    function arrayEach(array, iteratee) {
      var index = -1, length = array == null ? 0 : array.length;
      while (++index < length) {
        if (iteratee(array[index], index, array) === false) {
          break;
        }
      }
      return array;
    }
    module.exports = arrayEach;
  }
});

// node_modules/lodash/_baseAssign.js
var require_baseAssign = __commonJS({
  "node_modules/lodash/_baseAssign.js"(exports, module) {
    var copyObject = require_copyObject();
    var keys = require_keys();
    function baseAssign(object, source) {
      return object && copyObject(source, keys(source), object);
    }
    module.exports = baseAssign;
  }
});

// node_modules/lodash/_baseAssignIn.js
var require_baseAssignIn = __commonJS({
  "node_modules/lodash/_baseAssignIn.js"(exports, module) {
    var copyObject = require_copyObject();
    var keysIn = require_keysIn();
    function baseAssignIn(object, source) {
      return object && copyObject(source, keysIn(source), object);
    }
    module.exports = baseAssignIn;
  }
});

// node_modules/lodash/_copySymbols.js
var require_copySymbols = __commonJS({
  "node_modules/lodash/_copySymbols.js"(exports, module) {
    var copyObject = require_copyObject();
    var getSymbols = require_getSymbols();
    function copySymbols(source, object) {
      return copyObject(source, getSymbols(source), object);
    }
    module.exports = copySymbols;
  }
});

// node_modules/lodash/_getSymbolsIn.js
var require_getSymbolsIn = __commonJS({
  "node_modules/lodash/_getSymbolsIn.js"(exports, module) {
    var arrayPush = require_arrayPush();
    var getPrototype = require_getPrototype();
    var getSymbols = require_getSymbols();
    var stubArray = require_stubArray();
    var nativeGetSymbols = Object.getOwnPropertySymbols;
    var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
      var result = [];
      while (object) {
        arrayPush(result, getSymbols(object));
        object = getPrototype(object);
      }
      return result;
    };
    module.exports = getSymbolsIn;
  }
});

// node_modules/lodash/_copySymbolsIn.js
var require_copySymbolsIn = __commonJS({
  "node_modules/lodash/_copySymbolsIn.js"(exports, module) {
    var copyObject = require_copyObject();
    var getSymbolsIn = require_getSymbolsIn();
    function copySymbolsIn(source, object) {
      return copyObject(source, getSymbolsIn(source), object);
    }
    module.exports = copySymbolsIn;
  }
});

// node_modules/lodash/_getAllKeysIn.js
var require_getAllKeysIn = __commonJS({
  "node_modules/lodash/_getAllKeysIn.js"(exports, module) {
    var baseGetAllKeys = require_baseGetAllKeys();
    var getSymbolsIn = require_getSymbolsIn();
    var keysIn = require_keysIn();
    function getAllKeysIn(object) {
      return baseGetAllKeys(object, keysIn, getSymbolsIn);
    }
    module.exports = getAllKeysIn;
  }
});

// node_modules/lodash/_initCloneArray.js
var require_initCloneArray = __commonJS({
  "node_modules/lodash/_initCloneArray.js"(exports, module) {
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function initCloneArray(array) {
      var length = array.length, result = new array.constructor(length);
      if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
        result.index = array.index;
        result.input = array.input;
      }
      return result;
    }
    module.exports = initCloneArray;
  }
});

// node_modules/lodash/_cloneDataView.js
var require_cloneDataView = __commonJS({
  "node_modules/lodash/_cloneDataView.js"(exports, module) {
    var cloneArrayBuffer = require_cloneArrayBuffer();
    function cloneDataView(dataView, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
      return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
    }
    module.exports = cloneDataView;
  }
});

// node_modules/lodash/_cloneRegExp.js
var require_cloneRegExp = __commonJS({
  "node_modules/lodash/_cloneRegExp.js"(exports, module) {
    var reFlags = /\w*$/;
    function cloneRegExp(regexp) {
      var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
      result.lastIndex = regexp.lastIndex;
      return result;
    }
    module.exports = cloneRegExp;
  }
});

// node_modules/lodash/_cloneSymbol.js
var require_cloneSymbol = __commonJS({
  "node_modules/lodash/_cloneSymbol.js"(exports, module) {
    var Symbol = require_Symbol();
    var symbolProto = Symbol ? Symbol.prototype : void 0;
    var symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
    function cloneSymbol(symbol) {
      return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
    }
    module.exports = cloneSymbol;
  }
});

// node_modules/lodash/_initCloneByTag.js
var require_initCloneByTag = __commonJS({
  "node_modules/lodash/_initCloneByTag.js"(exports, module) {
    var cloneArrayBuffer = require_cloneArrayBuffer();
    var cloneDataView = require_cloneDataView();
    var cloneRegExp = require_cloneRegExp();
    var cloneSymbol = require_cloneSymbol();
    var cloneTypedArray = require_cloneTypedArray();
    var boolTag = "[object Boolean]";
    var dateTag = "[object Date]";
    var mapTag = "[object Map]";
    var numberTag = "[object Number]";
    var regexpTag = "[object RegExp]";
    var setTag = "[object Set]";
    var stringTag = "[object String]";
    var symbolTag = "[object Symbol]";
    var arrayBufferTag = "[object ArrayBuffer]";
    var dataViewTag = "[object DataView]";
    var float32Tag = "[object Float32Array]";
    var float64Tag = "[object Float64Array]";
    var int8Tag = "[object Int8Array]";
    var int16Tag = "[object Int16Array]";
    var int32Tag = "[object Int32Array]";
    var uint8Tag = "[object Uint8Array]";
    var uint8ClampedTag = "[object Uint8ClampedArray]";
    var uint16Tag = "[object Uint16Array]";
    var uint32Tag = "[object Uint32Array]";
    function initCloneByTag(object, tag, isDeep) {
      var Ctor = object.constructor;
      switch (tag) {
        case arrayBufferTag:
          return cloneArrayBuffer(object);
        case boolTag:
        case dateTag:
          return new Ctor(+object);
        case dataViewTag:
          return cloneDataView(object, isDeep);
        case float32Tag:
        case float64Tag:
        case int8Tag:
        case int16Tag:
        case int32Tag:
        case uint8Tag:
        case uint8ClampedTag:
        case uint16Tag:
        case uint32Tag:
          return cloneTypedArray(object, isDeep);
        case mapTag:
          return new Ctor();
        case numberTag:
        case stringTag:
          return new Ctor(object);
        case regexpTag:
          return cloneRegExp(object);
        case setTag:
          return new Ctor();
        case symbolTag:
          return cloneSymbol(object);
      }
    }
    module.exports = initCloneByTag;
  }
});

// node_modules/lodash/_baseIsMap.js
var require_baseIsMap = __commonJS({
  "node_modules/lodash/_baseIsMap.js"(exports, module) {
    var getTag = require_getTag();
    var isObjectLike = require_isObjectLike();
    var mapTag = "[object Map]";
    function baseIsMap(value) {
      return isObjectLike(value) && getTag(value) == mapTag;
    }
    module.exports = baseIsMap;
  }
});

// node_modules/lodash/isMap.js
var require_isMap = __commonJS({
  "node_modules/lodash/isMap.js"(exports, module) {
    var baseIsMap = require_baseIsMap();
    var baseUnary = require_baseUnary();
    var nodeUtil = require_nodeUtil();
    var nodeIsMap = nodeUtil && nodeUtil.isMap;
    var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
    module.exports = isMap;
  }
});

// node_modules/lodash/_baseIsSet.js
var require_baseIsSet = __commonJS({
  "node_modules/lodash/_baseIsSet.js"(exports, module) {
    var getTag = require_getTag();
    var isObjectLike = require_isObjectLike();
    var setTag = "[object Set]";
    function baseIsSet(value) {
      return isObjectLike(value) && getTag(value) == setTag;
    }
    module.exports = baseIsSet;
  }
});

// node_modules/lodash/isSet.js
var require_isSet = __commonJS({
  "node_modules/lodash/isSet.js"(exports, module) {
    var baseIsSet = require_baseIsSet();
    var baseUnary = require_baseUnary();
    var nodeUtil = require_nodeUtil();
    var nodeIsSet = nodeUtil && nodeUtil.isSet;
    var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
    module.exports = isSet;
  }
});

// node_modules/lodash/_baseClone.js
var require_baseClone = __commonJS({
  "node_modules/lodash/_baseClone.js"(exports, module) {
    var Stack = require_Stack();
    var arrayEach = require_arrayEach();
    var assignValue = require_assignValue();
    var baseAssign = require_baseAssign();
    var baseAssignIn = require_baseAssignIn();
    var cloneBuffer = require_cloneBuffer();
    var copyArray = require_copyArray();
    var copySymbols = require_copySymbols();
    var copySymbolsIn = require_copySymbolsIn();
    var getAllKeys = require_getAllKeys();
    var getAllKeysIn = require_getAllKeysIn();
    var getTag = require_getTag();
    var initCloneArray = require_initCloneArray();
    var initCloneByTag = require_initCloneByTag();
    var initCloneObject = require_initCloneObject();
    var isArray = require_isArray();
    var isBuffer = require_isBuffer();
    var isMap = require_isMap();
    var isObject = require_isObject();
    var isSet = require_isSet();
    var keys = require_keys();
    var keysIn = require_keysIn();
    var CLONE_DEEP_FLAG = 1;
    var CLONE_FLAT_FLAG = 2;
    var CLONE_SYMBOLS_FLAG = 4;
    var argsTag = "[object Arguments]";
    var arrayTag = "[object Array]";
    var boolTag = "[object Boolean]";
    var dateTag = "[object Date]";
    var errorTag = "[object Error]";
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var mapTag = "[object Map]";
    var numberTag = "[object Number]";
    var objectTag = "[object Object]";
    var regexpTag = "[object RegExp]";
    var setTag = "[object Set]";
    var stringTag = "[object String]";
    var symbolTag = "[object Symbol]";
    var weakMapTag = "[object WeakMap]";
    var arrayBufferTag = "[object ArrayBuffer]";
    var dataViewTag = "[object DataView]";
    var float32Tag = "[object Float32Array]";
    var float64Tag = "[object Float64Array]";
    var int8Tag = "[object Int8Array]";
    var int16Tag = "[object Int16Array]";
    var int32Tag = "[object Int32Array]";
    var uint8Tag = "[object Uint8Array]";
    var uint8ClampedTag = "[object Uint8ClampedArray]";
    var uint16Tag = "[object Uint16Array]";
    var uint32Tag = "[object Uint32Array]";
    var cloneableTags = {};
    cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
    cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
    function baseClone(value, bitmask, customizer, key, object, stack) {
      var result, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
      if (customizer) {
        result = object ? customizer(value, key, object, stack) : customizer(value);
      }
      if (result !== void 0) {
        return result;
      }
      if (!isObject(value)) {
        return value;
      }
      var isArr = isArray(value);
      if (isArr) {
        result = initCloneArray(value);
        if (!isDeep) {
          return copyArray(value, result);
        }
      } else {
        var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
        if (isBuffer(value)) {
          return cloneBuffer(value, isDeep);
        }
        if (tag == objectTag || tag == argsTag || isFunc && !object) {
          result = isFlat || isFunc ? {} : initCloneObject(value);
          if (!isDeep) {
            return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
          }
        } else {
          if (!cloneableTags[tag]) {
            return object ? value : {};
          }
          result = initCloneByTag(value, tag, isDeep);
        }
      }
      stack || (stack = new Stack());
      var stacked = stack.get(value);
      if (stacked) {
        return stacked;
      }
      stack.set(value, result);
      if (isSet(value)) {
        value.forEach(function(subValue) {
          result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
        });
      } else if (isMap(value)) {
        value.forEach(function(subValue, key2) {
          result.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
        });
      }
      var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
      var props = isArr ? void 0 : keysFunc(value);
      arrayEach(props || value, function(subValue, key2) {
        if (props) {
          key2 = subValue;
          subValue = value[key2];
        }
        assignValue(result, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
      });
      return result;
    }
    module.exports = baseClone;
  }
});

// node_modules/lodash/_baseSlice.js
var require_baseSlice = __commonJS({
  "node_modules/lodash/_baseSlice.js"(exports, module) {
    function baseSlice(array, start, end) {
      var index = -1, length = array.length;
      if (start < 0) {
        start = -start > length ? 0 : length + start;
      }
      end = end > length ? length : end;
      if (end < 0) {
        end += length;
      }
      length = start > end ? 0 : end - start >>> 0;
      start >>>= 0;
      var result = Array(length);
      while (++index < length) {
        result[index] = array[index + start];
      }
      return result;
    }
    module.exports = baseSlice;
  }
});

// node_modules/lodash/_parent.js
var require_parent = __commonJS({
  "node_modules/lodash/_parent.js"(exports, module) {
    var baseGet = require_baseGet();
    var baseSlice = require_baseSlice();
    function parent(object, path2) {
      return path2.length < 2 ? object : baseGet(object, baseSlice(path2, 0, -1));
    }
    module.exports = parent;
  }
});

// node_modules/lodash/_baseUnset.js
var require_baseUnset = __commonJS({
  "node_modules/lodash/_baseUnset.js"(exports, module) {
    var castPath = require_castPath();
    var last = require_last();
    var parent = require_parent();
    var toKey = require_toKey();
    function baseUnset(object, path2) {
      path2 = castPath(path2, object);
      object = parent(object, path2);
      return object == null || delete object[toKey(last(path2))];
    }
    module.exports = baseUnset;
  }
});

// node_modules/lodash/_customOmitClone.js
var require_customOmitClone = __commonJS({
  "node_modules/lodash/_customOmitClone.js"(exports, module) {
    var isPlainObject = require_isPlainObject();
    function customOmitClone(value) {
      return isPlainObject(value) ? void 0 : value;
    }
    module.exports = customOmitClone;
  }
});

// node_modules/lodash/omit.js
var require_omit = __commonJS({
  "node_modules/lodash/omit.js"(exports, module) {
    var arrayMap = require_arrayMap();
    var baseClone = require_baseClone();
    var baseUnset = require_baseUnset();
    var castPath = require_castPath();
    var copyObject = require_copyObject();
    var customOmitClone = require_customOmitClone();
    var flatRest = require_flatRest();
    var getAllKeysIn = require_getAllKeysIn();
    var CLONE_DEEP_FLAG = 1;
    var CLONE_FLAT_FLAG = 2;
    var CLONE_SYMBOLS_FLAG = 4;
    var omit = flatRest(function(object, paths) {
      var result = {};
      if (object == null) {
        return result;
      }
      var isDeep = false;
      paths = arrayMap(paths, function(path2) {
        path2 = castPath(path2, object);
        isDeep || (isDeep = path2.length > 1);
        return path2;
      });
      copyObject(object, getAllKeysIn(object), result);
      if (isDeep) {
        result = baseClone(result, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
      }
      var length = paths.length;
      while (length--) {
        baseUnset(result, paths[length]);
      }
      return result;
    });
    module.exports = omit;
  }
});

// node_modules/@nivo/annotations/dist/nivo-annotations.es.js
var import_react = __toESM(require_react());
var import_filter = __toESM(require_filter());
var import_isNumber = __toESM(require_isNumber());
var import_omit = __toESM(require_omit());
var import_jsx_runtime = __toESM(require_jsx_runtime());
function g() {
  return g = Object.assign ? Object.assign.bind() : function(t2) {
    for (var n2 = 1; n2 < arguments.length; n2++) {
      var i2 = arguments[n2];
      for (var o2 in i2) Object.prototype.hasOwnProperty.call(i2, o2) && (t2[o2] = i2[o2]);
    }
    return t2;
  }, g.apply(this, arguments);
}
var k2 = { dotSize: 4, noteWidth: 120, noteTextOffset: 8, animate: true };
var W = function(n2) {
  var i2 = typeof n2;
  return (0, import_react.isValidElement)(n2) || "string" === i2 || "function" === i2 || "object" === i2;
};
var v = function(t2) {
  var n2 = typeof t2;
  return "string" === n2 || "function" === n2;
};
var b = function(t2) {
  return "circle" === t2.type;
};
var w2 = function(t2) {
  return "dot" === t2.type;
};
var z2 = function(t2) {
  return "rect" === t2.type;
};
var P = function(t2) {
  var n2 = t2.data, i2 = t2.annotations, e3 = t2.getPosition, r = t2.getDimensions;
  return i2.reduce(function(t3, i3) {
    var s2 = i3.offset || 0;
    return [].concat(t3, (0, import_filter.default)(n2, i3.match).map(function(t4) {
      var n3 = e3(t4), o2 = r(t4);
      return (b(i3) || z2(i3)) && (o2.size = o2.size + 2 * s2, o2.width = o2.width + 2 * s2, o2.height = o2.height + 2 * s2), g({}, (0, import_omit.default)(i3, ["match", "offset"]), n3, o2, { size: i3.size || o2.size, datum: t4 });
    }));
  }, []);
};
var C = function(t2, n2, i2, o2) {
  var e3 = Math.atan2(o2 - n2, i2 - t2);
  return si(oi(e3));
};
var O = function(t2) {
  var n2, i2, o2 = t2.x, a3 = t2.y, r = t2.noteX, s2 = t2.noteY, h = t2.noteWidth, d2 = void 0 === h ? k2.noteWidth : h, c2 = t2.noteTextOffset, f = void 0 === c2 ? k2.noteTextOffset : c2;
  if ((0, import_isNumber.default)(r)) n2 = o2 + r;
  else {
    if (void 0 === r.abs) throw new Error("noteX should be either a number or an object containing an 'abs' property");
    n2 = r.abs;
  }
  if ((0, import_isNumber.default)(s2)) i2 = a3 + s2;
  else {
    if (void 0 === s2.abs) throw new Error("noteY should be either a number or an object containing an 'abs' property");
    i2 = s2.abs;
  }
  var y2 = o2, x3 = a3, m2 = C(o2, a3, n2, i2);
  if (b(t2)) {
    var p2 = li(ni(m2), t2.size / 2);
    y2 += p2.x, x3 += p2.y;
  }
  if (z2(t2)) {
    var g2 = Math.round((m2 + 90) / 45) % 8;
    0 === g2 && (x3 -= t2.height / 2), 1 === g2 && (y2 += t2.width / 2, x3 -= t2.height / 2), 2 === g2 && (y2 += t2.width / 2), 3 === g2 && (y2 += t2.width / 2, x3 += t2.height / 2), 4 === g2 && (x3 += t2.height / 2), 5 === g2 && (y2 -= t2.width / 2, x3 += t2.height / 2), 6 === g2 && (y2 -= t2.width / 2), 7 === g2 && (y2 -= t2.width / 2, x3 -= t2.height / 2);
  }
  var W3 = n2, v2 = n2;
  return (m2 + 90) % 360 > 180 ? (W3 -= d2, v2 -= d2) : v2 += d2, { points: [[y2, x3], [n2, i2], [v2, i2]], text: [W3, i2 - f], angle: m2 + 90 };
};
var S = function(t2) {
  var i2 = t2.data, o2 = t2.annotations, e3 = t2.getPosition, a3 = t2.getDimensions;
  return (0, import_react.useMemo)(function() {
    return P({ data: i2, annotations: o2, getPosition: e3, getDimensions: a3 });
  }, [i2, o2, e3, a3]);
};
var j2 = function(t2) {
  var i2 = t2.annotations;
  return (0, import_react.useMemo)(function() {
    return i2.map(function(t3) {
      return g({}, t3, { computed: O(g({}, t3)) });
    });
  }, [i2]);
};
var M = function(t2) {
  return (0, import_react.useMemo)(function() {
    return O(t2);
  }, [t2]);
};
var T = function(t2) {
  var n2 = t2.datum, o2 = t2.x, e3 = t2.y, r = t2.note, s2 = Et(), l = Zr(), u2 = l.animate, c2 = l.config, k4 = useSpring({ x: o2, y: e3, config: c2, immediate: !u2 });
  return "function" == typeof r ? (0, import_react.createElement)(r, { x: o2, y: e3, datum: n2 }) : (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [s2.annotations.text.outlineWidth > 0 && (0, import_jsx_runtime.jsx)(animated.text, { x: k4.x, y: k4.y, style: g({}, s2.annotations.text, { strokeLinejoin: "round", strokeWidth: 2 * s2.annotations.text.outlineWidth, stroke: s2.annotations.text.outlineColor }), children: r }), (0, import_jsx_runtime.jsx)(animated.text, { x: k4.x, y: k4.y, style: (0, import_omit.default)(s2.annotations.text, ["outlineWidth", "outlineColor"]), children: r })] });
};
var E = function(t2) {
  var i2 = t2.points, o2 = t2.isOutline, e3 = void 0 !== o2 && o2, a3 = Et(), r = (0, import_react.useMemo)(function() {
    var t3 = i2[0];
    return i2.slice(1).reduce(function(t4, n2) {
      return t4 + " L" + n2[0] + "," + n2[1];
    }, "M" + t3[0] + "," + t3[1]);
  }, [i2]), s2 = $r(r);
  if (e3 && a3.annotations.link.outlineWidth <= 0) return null;
  var l = g({}, a3.annotations.link);
  return e3 && (l.strokeLinecap = "square", l.strokeWidth = a3.annotations.link.strokeWidth + 2 * a3.annotations.link.outlineWidth, l.stroke = a3.annotations.link.outlineColor, l.opacity = a3.annotations.link.outlineOpacity), (0, import_jsx_runtime.jsx)(animated.path, { fill: "none", d: s2, style: l });
};
var I = function(t2) {
  var n2 = t2.x, i2 = t2.y, o2 = t2.size, e3 = Et(), a3 = Zr(), r = a3.animate, s2 = a3.config, l = useSpring({ x: n2, y: i2, radius: o2 / 2, config: s2, immediate: !r });
  return (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [e3.annotations.outline.outlineWidth > 0 && (0, import_jsx_runtime.jsx)(animated.circle, { cx: l.x, cy: l.y, r: l.radius, style: g({}, e3.annotations.outline, { fill: "none", strokeWidth: e3.annotations.outline.strokeWidth + 2 * e3.annotations.outline.outlineWidth, stroke: e3.annotations.outline.outlineColor, opacity: e3.annotations.outline.outlineOpacity }) }), (0, import_jsx_runtime.jsx)(animated.circle, { cx: l.x, cy: l.y, r: l.radius, style: e3.annotations.outline })] });
};
var D2 = function(t2) {
  var n2 = t2.x, i2 = t2.y, o2 = t2.size, e3 = void 0 === o2 ? k2.dotSize : o2, a3 = Et(), r = Zr(), s2 = r.animate, l = r.config, u2 = useSpring({ x: n2, y: i2, radius: e3 / 2, config: l, immediate: !s2 });
  return (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [a3.annotations.outline.outlineWidth > 0 && (0, import_jsx_runtime.jsx)(animated.circle, { cx: u2.x, cy: u2.y, r: u2.radius, style: g({}, a3.annotations.outline, { fill: "none", strokeWidth: 2 * a3.annotations.outline.outlineWidth, stroke: a3.annotations.outline.outlineColor, opacity: a3.annotations.outline.outlineOpacity }) }), (0, import_jsx_runtime.jsx)(animated.circle, { cx: u2.x, cy: u2.y, r: u2.radius, style: a3.annotations.symbol })] });
};
var L = function(t2) {
  var n2 = t2.x, i2 = t2.y, o2 = t2.width, e3 = t2.height, a3 = t2.borderRadius, r = void 0 === a3 ? 6 : a3, s2 = Et(), l = Zr(), u2 = l.animate, c2 = l.config, k4 = useSpring({ x: n2 - o2 / 2, y: i2 - e3 / 2, width: o2, height: e3, config: c2, immediate: !u2 });
  return (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [s2.annotations.outline.outlineWidth > 0 && (0, import_jsx_runtime.jsx)(animated.rect, { x: k4.x, y: k4.y, rx: r, ry: r, width: k4.width, height: k4.height, style: g({}, s2.annotations.outline, { fill: "none", strokeWidth: s2.annotations.outline.strokeWidth + 2 * s2.annotations.outline.outlineWidth, stroke: s2.annotations.outline.outlineColor, opacity: s2.annotations.outline.outlineOpacity }) }), (0, import_jsx_runtime.jsx)(animated.rect, { x: k4.x, y: k4.y, rx: r, ry: r, width: k4.width, height: k4.height, style: s2.annotations.outline })] });
};
var R = function(t2) {
  var n2 = t2.datum, i2 = t2.x, o2 = t2.y, e3 = t2.note, a3 = M(t2);
  if (!W(e3)) throw new Error("note should be a valid react element");
  return (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [(0, import_jsx_runtime.jsx)(E, { points: a3.points, isOutline: true }), b(t2) && (0, import_jsx_runtime.jsx)(I, { x: i2, y: o2, size: t2.size }), w2(t2) && (0, import_jsx_runtime.jsx)(D2, { x: i2, y: o2, size: t2.size }), z2(t2) && (0, import_jsx_runtime.jsx)(L, { x: i2, y: o2, width: t2.width, height: t2.height, borderRadius: t2.borderRadius }), (0, import_jsx_runtime.jsx)(E, { points: a3.points }), (0, import_jsx_runtime.jsx)(T, { datum: n2, x: a3.text[0], y: a3.text[1], note: e3 })] });
};
var q = function(t2, n2) {
  n2.forEach(function(n3, i2) {
    var o2 = n3[0], e3 = n3[1];
    0 === i2 ? t2.moveTo(o2, e3) : t2.lineTo(o2, e3);
  });
};
var J = function(t2, n2) {
  var i2 = n2.annotations, o2 = n2.theme;
  0 !== i2.length && (t2.save(), i2.forEach(function(n3) {
    if (!v(n3.note)) throw new Error("note is invalid for canvas implementation");
    o2.annotations.link.outlineWidth > 0 && (t2.lineCap = "square", t2.strokeStyle = o2.annotations.link.outlineColor, t2.lineWidth = o2.annotations.link.strokeWidth + 2 * o2.annotations.link.outlineWidth, t2.beginPath(), q(t2, n3.computed.points), t2.stroke(), t2.lineCap = "butt"), b(n3) && o2.annotations.outline.outlineWidth > 0 && (t2.strokeStyle = o2.annotations.outline.outlineColor, t2.lineWidth = o2.annotations.outline.strokeWidth + 2 * o2.annotations.outline.outlineWidth, t2.beginPath(), t2.arc(n3.x, n3.y, n3.size / 2, 0, 2 * Math.PI), t2.stroke()), w2(n3) && o2.annotations.symbol.outlineWidth > 0 && (t2.strokeStyle = o2.annotations.symbol.outlineColor, t2.lineWidth = 2 * o2.annotations.symbol.outlineWidth, t2.beginPath(), t2.arc(n3.x, n3.y, n3.size / 2, 0, 2 * Math.PI), t2.stroke()), z2(n3) && o2.annotations.outline.outlineWidth > 0 && (t2.strokeStyle = o2.annotations.outline.outlineColor, t2.lineWidth = o2.annotations.outline.strokeWidth + 2 * o2.annotations.outline.outlineWidth, t2.beginPath(), t2.rect(n3.x - n3.width / 2, n3.y - n3.height / 2, n3.width, n3.height), t2.stroke()), t2.strokeStyle = o2.annotations.link.stroke, t2.lineWidth = o2.annotations.link.strokeWidth, t2.beginPath(), q(t2, n3.computed.points), t2.stroke(), b(n3) && (t2.strokeStyle = o2.annotations.outline.stroke, t2.lineWidth = o2.annotations.outline.strokeWidth, t2.beginPath(), t2.arc(n3.x, n3.y, n3.size / 2, 0, 2 * Math.PI), t2.stroke()), w2(n3) && (t2.fillStyle = o2.annotations.symbol.fill, t2.beginPath(), t2.arc(n3.x, n3.y, n3.size / 2, 0, 2 * Math.PI), t2.fill()), z2(n3) && (t2.strokeStyle = o2.annotations.outline.stroke, t2.lineWidth = o2.annotations.outline.strokeWidth, t2.beginPath(), t2.rect(n3.x - n3.width / 2, n3.y - n3.height / 2, n3.width, n3.height), t2.stroke()), "function" == typeof n3.note ? n3.note(t2, { datum: n3.datum, x: n3.computed.text[0], y: n3.computed.text[1], theme: o2 }) : (t2.font = o2.annotations.text.fontSize + "px " + o2.annotations.text.fontFamily, t2.textAlign = "left", t2.textBaseline = "alphabetic", t2.fillStyle = o2.annotations.text.fill, t2.strokeStyle = o2.annotations.text.outlineColor, t2.lineWidth = 2 * o2.annotations.text.outlineWidth, o2.annotations.text.outlineWidth > 0 && (t2.lineJoin = "round", t2.strokeText(n3.note, n3.computed.text[0], n3.computed.text[1]), t2.lineJoin = "miter"), t2.fillText(n3.note, n3.computed.text[0], n3.computed.text[1]));
  }), t2.restore());
};

// node_modules/@nivo/bar/dist/nivo-bar.es.js
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var import_react2 = __toESM(require_react());

// node_modules/@nivo/bar/node_modules/d3-path/src/path.js
var pi = Math.PI;
var tau = 2 * pi;
var epsilon = 1e-6;
var tauEpsilon = tau - epsilon;
function Path() {
  this._x0 = this._y0 = // start of current subpath
  this._x1 = this._y1 = null;
  this._ = "";
}
function path() {
  return new Path();
}
Path.prototype = path.prototype = {
  constructor: Path,
  moveTo: function(x3, y2) {
    this._ += "M" + (this._x0 = this._x1 = +x3) + "," + (this._y0 = this._y1 = +y2);
  },
  closePath: function() {
    if (this._x1 !== null) {
      this._x1 = this._x0, this._y1 = this._y0;
      this._ += "Z";
    }
  },
  lineTo: function(x3, y2) {
    this._ += "L" + (this._x1 = +x3) + "," + (this._y1 = +y2);
  },
  quadraticCurveTo: function(x1, y1, x3, y2) {
    this._ += "Q" + +x1 + "," + +y1 + "," + (this._x1 = +x3) + "," + (this._y1 = +y2);
  },
  bezierCurveTo: function(x1, y1, x22, y2, x3, y3) {
    this._ += "C" + +x1 + "," + +y1 + "," + +x22 + "," + +y2 + "," + (this._x1 = +x3) + "," + (this._y1 = +y3);
  },
  arcTo: function(x1, y1, x22, y2, r) {
    x1 = +x1, y1 = +y1, x22 = +x22, y2 = +y2, r = +r;
    var x0 = this._x1, y0 = this._y1, x21 = x22 - x1, y21 = y2 - y1, x01 = x0 - x1, y01 = y0 - y1, l01_2 = x01 * x01 + y01 * y01;
    if (r < 0) throw new Error("negative radius: " + r);
    if (this._x1 === null) {
      this._ += "M" + (this._x1 = x1) + "," + (this._y1 = y1);
    } else if (!(l01_2 > epsilon)) ;
    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) {
      this._ += "L" + (this._x1 = x1) + "," + (this._y1 = y1);
    } else {
      var x20 = x22 - x0, y20 = y2 - y0, l21_2 = x21 * x21 + y21 * y21, l20_2 = x20 * x20 + y20 * y20, l21 = Math.sqrt(l21_2), l01 = Math.sqrt(l01_2), l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2), t01 = l / l01, t21 = l / l21;
      if (Math.abs(t01 - 1) > epsilon) {
        this._ += "L" + (x1 + t01 * x01) + "," + (y1 + t01 * y01);
      }
      this._ += "A" + r + "," + r + ",0,0," + +(y01 * x20 > x01 * y20) + "," + (this._x1 = x1 + t21 * x21) + "," + (this._y1 = y1 + t21 * y21);
    }
  },
  arc: function(x3, y2, r, a0, a1, ccw) {
    x3 = +x3, y2 = +y2, r = +r, ccw = !!ccw;
    var dx = r * Math.cos(a0), dy = r * Math.sin(a0), x0 = x3 + dx, y0 = y2 + dy, cw = 1 ^ ccw, da = ccw ? a0 - a1 : a1 - a0;
    if (r < 0) throw new Error("negative radius: " + r);
    if (this._x1 === null) {
      this._ += "M" + x0 + "," + y0;
    } else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) {
      this._ += "L" + x0 + "," + y0;
    }
    if (!r) return;
    if (da < 0) da = da % tau + tau;
    if (da > tauEpsilon) {
      this._ += "A" + r + "," + r + ",0,1," + cw + "," + (x3 - dx) + "," + (y2 - dy) + "A" + r + "," + r + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
    } else if (da > epsilon) {
      this._ += "A" + r + "," + r + ",0," + +(da >= pi) + "," + cw + "," + (this._x1 = x3 + r * Math.cos(a1)) + "," + (this._y1 = y2 + r * Math.sin(a1));
    }
  },
  rect: function(x3, y2, w3, h) {
    this._ += "M" + (this._x0 = this._x1 = +x3) + "," + (this._y0 = this._y1 = +y2) + "h" + +w3 + "v" + +h + "h" + -w3 + "Z";
  },
  toString: function() {
    return this._;
  }
};

// node_modules/@nivo/bar/node_modules/d3-shape/src/constant.js
function constant_default(x3) {
  return function constant() {
    return x3;
  };
}

// node_modules/@nivo/bar/node_modules/d3-shape/src/math.js
var epsilon2 = 1e-12;
var pi2 = Math.PI;
var halfPi = pi2 / 2;
var tau2 = 2 * pi2;

// node_modules/@nivo/bar/node_modules/d3-shape/src/curve/linear.js
function Linear(context) {
  this._context = context;
}
Linear.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x3, y2) {
    x3 = +x3, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x3, y2) : this._context.moveTo(x3, y2);
        break;
      case 1:
        this._point = 2;
      // proceed
      default:
        this._context.lineTo(x3, y2);
        break;
    }
  }
};
function linear_default(context) {
  return new Linear(context);
}

// node_modules/@nivo/bar/node_modules/d3-shape/src/curve/radial.js
var curveRadialLinear = curveRadial(linear_default);
function Radial(curve) {
  this._curve = curve;
}
Radial.prototype = {
  areaStart: function() {
    this._curve.areaStart();
  },
  areaEnd: function() {
    this._curve.areaEnd();
  },
  lineStart: function() {
    this._curve.lineStart();
  },
  lineEnd: function() {
    this._curve.lineEnd();
  },
  point: function(a3, r) {
    this._curve.point(r * Math.sin(a3), r * -Math.cos(a3));
  }
};
function curveRadial(curve) {
  function radial(context) {
    return new Radial(curve(context));
  }
  radial._curve = curve;
  return radial;
}

// node_modules/@nivo/bar/node_modules/d3-shape/src/array.js
var slice = Array.prototype.slice;

// node_modules/@nivo/bar/node_modules/d3-shape/src/symbol/diamond.js
var tan30 = Math.sqrt(1 / 3);
var tan30_2 = tan30 * 2;

// node_modules/@nivo/bar/node_modules/d3-shape/src/symbol/star.js
var kr = Math.sin(pi2 / 10) / Math.sin(7 * pi2 / 10);
var kx = Math.sin(tau2 / 10) * kr;
var ky = -Math.cos(tau2 / 10) * kr;

// node_modules/@nivo/bar/node_modules/d3-shape/src/symbol/triangle.js
var sqrt3 = Math.sqrt(3);

// node_modules/@nivo/bar/node_modules/d3-shape/src/symbol/wye.js
var s = Math.sqrt(3) / 2;
var k3 = 1 / Math.sqrt(12);
var a2 = (k3 / 2 + 1) * 3;

// node_modules/@nivo/bar/node_modules/d3-shape/src/noop.js
function noop_default() {
}

// node_modules/@nivo/bar/node_modules/d3-shape/src/curve/basis.js
function point(that, x3, y2) {
  that._context.bezierCurveTo(
    (2 * that._x0 + that._x1) / 3,
    (2 * that._y0 + that._y1) / 3,
    (that._x0 + 2 * that._x1) / 3,
    (that._y0 + 2 * that._y1) / 3,
    (that._x0 + 4 * that._x1 + x3) / 6,
    (that._y0 + 4 * that._y1 + y2) / 6
  );
}
function Basis(context) {
  this._context = context;
}
Basis.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 3:
        point(this, this._x1, this._y1);
      // proceed
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
    }
    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x3, y2) {
    x3 = +x3, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x3, y2) : this._context.moveTo(x3, y2);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
      // proceed
      default:
        point(this, x3, y2);
        break;
    }
    this._x0 = this._x1, this._x1 = x3;
    this._y0 = this._y1, this._y1 = y2;
  }
};

// node_modules/@nivo/bar/node_modules/d3-shape/src/curve/basisClosed.js
function BasisClosed(context) {
  this._context = context;
}
BasisClosed.prototype = {
  areaStart: noop_default,
  areaEnd: noop_default,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x2, this._y2);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3);
        this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x2, this._y2);
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        break;
      }
    }
  },
  point: function(x3, y2) {
    x3 = +x3, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._x2 = x3, this._y2 = y2;
        break;
      case 1:
        this._point = 2;
        this._x3 = x3, this._y3 = y2;
        break;
      case 2:
        this._point = 3;
        this._x4 = x3, this._y4 = y2;
        this._context.moveTo((this._x0 + 4 * this._x1 + x3) / 6, (this._y0 + 4 * this._y1 + y2) / 6);
        break;
      default:
        point(this, x3, y2);
        break;
    }
    this._x0 = this._x1, this._x1 = x3;
    this._y0 = this._y1, this._y1 = y2;
  }
};

// node_modules/@nivo/bar/node_modules/d3-shape/src/curve/basisOpen.js
function BasisOpen(context) {
  this._context = context;
}
BasisOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || this._line !== 0 && this._point === 3) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x3, y2) {
    x3 = +x3, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        var x0 = (this._x0 + 4 * this._x1 + x3) / 6, y0 = (this._y0 + 4 * this._y1 + y2) / 6;
        this._line ? this._context.lineTo(x0, y0) : this._context.moveTo(x0, y0);
        break;
      case 3:
        this._point = 4;
      // proceed
      default:
        point(this, x3, y2);
        break;
    }
    this._x0 = this._x1, this._x1 = x3;
    this._y0 = this._y1, this._y1 = y2;
  }
};

// node_modules/@nivo/bar/node_modules/d3-shape/src/curve/bundle.js
function Bundle(context, beta) {
  this._basis = new Basis(context);
  this._beta = beta;
}
Bundle.prototype = {
  lineStart: function() {
    this._x = [];
    this._y = [];
    this._basis.lineStart();
  },
  lineEnd: function() {
    var x3 = this._x, y2 = this._y, j3 = x3.length - 1;
    if (j3 > 0) {
      var x0 = x3[0], y0 = y2[0], dx = x3[j3] - x0, dy = y2[j3] - y0, i2 = -1, t2;
      while (++i2 <= j3) {
        t2 = i2 / j3;
        this._basis.point(
          this._beta * x3[i2] + (1 - this._beta) * (x0 + t2 * dx),
          this._beta * y2[i2] + (1 - this._beta) * (y0 + t2 * dy)
        );
      }
    }
    this._x = this._y = null;
    this._basis.lineEnd();
  },
  point: function(x3, y2) {
    this._x.push(+x3);
    this._y.push(+y2);
  }
};
var bundle_default = function custom(beta) {
  function bundle(context) {
    return beta === 1 ? new Basis(context) : new Bundle(context, beta);
  }
  bundle.beta = function(beta2) {
    return custom(+beta2);
  };
  return bundle;
}(0.85);

// node_modules/@nivo/bar/node_modules/d3-shape/src/curve/cardinal.js
function point2(that, x3, y2) {
  that._context.bezierCurveTo(
    that._x1 + that._k * (that._x2 - that._x0),
    that._y1 + that._k * (that._y2 - that._y0),
    that._x2 + that._k * (that._x1 - x3),
    that._y2 + that._k * (that._y1 - y2),
    that._x2,
    that._y2
  );
}
function Cardinal(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}
Cardinal.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x2, this._y2);
        break;
      case 3:
        point2(this, this._x1, this._y1);
        break;
    }
    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x3, y2) {
    x3 = +x3, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x3, y2) : this._context.moveTo(x3, y2);
        break;
      case 1:
        this._point = 2;
        this._x1 = x3, this._y1 = y2;
        break;
      case 2:
        this._point = 3;
      // proceed
      default:
        point2(this, x3, y2);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x3;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
  }
};
var cardinal_default = function custom2(tension) {
  function cardinal(context) {
    return new Cardinal(context, tension);
  }
  cardinal.tension = function(tension2) {
    return custom2(+tension2);
  };
  return cardinal;
}(0);

// node_modules/@nivo/bar/node_modules/d3-shape/src/curve/cardinalClosed.js
function CardinalClosed(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}
CardinalClosed.prototype = {
  areaStart: noop_default,
  areaEnd: noop_default,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(x3, y2) {
    x3 = +x3, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._x3 = x3, this._y3 = y2;
        break;
      case 1:
        this._point = 2;
        this._context.moveTo(this._x4 = x3, this._y4 = y2);
        break;
      case 2:
        this._point = 3;
        this._x5 = x3, this._y5 = y2;
        break;
      default:
        point2(this, x3, y2);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x3;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
  }
};
var cardinalClosed_default = function custom3(tension) {
  function cardinal(context) {
    return new CardinalClosed(context, tension);
  }
  cardinal.tension = function(tension2) {
    return custom3(+tension2);
  };
  return cardinal;
}(0);

// node_modules/@nivo/bar/node_modules/d3-shape/src/curve/cardinalOpen.js
function CardinalOpen(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}
CardinalOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || this._line !== 0 && this._point === 3) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x3, y2) {
    x3 = +x3, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
        break;
      case 3:
        this._point = 4;
      // proceed
      default:
        point2(this, x3, y2);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x3;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
  }
};
var cardinalOpen_default = function custom4(tension) {
  function cardinal(context) {
    return new CardinalOpen(context, tension);
  }
  cardinal.tension = function(tension2) {
    return custom4(+tension2);
  };
  return cardinal;
}(0);

// node_modules/@nivo/bar/node_modules/d3-shape/src/curve/catmullRom.js
function point3(that, x3, y2) {
  var x1 = that._x1, y1 = that._y1, x22 = that._x2, y22 = that._y2;
  if (that._l01_a > epsilon2) {
    var a3 = 2 * that._l01_2a + 3 * that._l01_a * that._l12_a + that._l12_2a, n2 = 3 * that._l01_a * (that._l01_a + that._l12_a);
    x1 = (x1 * a3 - that._x0 * that._l12_2a + that._x2 * that._l01_2a) / n2;
    y1 = (y1 * a3 - that._y0 * that._l12_2a + that._y2 * that._l01_2a) / n2;
  }
  if (that._l23_a > epsilon2) {
    var b2 = 2 * that._l23_2a + 3 * that._l23_a * that._l12_a + that._l12_2a, m2 = 3 * that._l23_a * (that._l23_a + that._l12_a);
    x22 = (x22 * b2 + that._x1 * that._l23_2a - x3 * that._l12_2a) / m2;
    y22 = (y22 * b2 + that._y1 * that._l23_2a - y2 * that._l12_2a) / m2;
  }
  that._context.bezierCurveTo(x1, y1, x22, y22, that._x2, that._y2);
}
function CatmullRom(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}
CatmullRom.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x2, this._y2);
        break;
      case 3:
        this.point(this._x2, this._y2);
        break;
    }
    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x3, y2) {
    x3 = +x3, y2 = +y2;
    if (this._point) {
      var x23 = this._x2 - x3, y23 = this._y2 - y2;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x3, y2) : this._context.moveTo(x3, y2);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
      // proceed
      default:
        point3(this, x3, y2);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x3;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
  }
};
var catmullRom_default = function custom5(alpha) {
  function catmullRom(context) {
    return alpha ? new CatmullRom(context, alpha) : new Cardinal(context, 0);
  }
  catmullRom.alpha = function(alpha2) {
    return custom5(+alpha2);
  };
  return catmullRom;
}(0.5);

// node_modules/@nivo/bar/node_modules/d3-shape/src/curve/catmullRomClosed.js
function CatmullRomClosed(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}
CatmullRomClosed.prototype = {
  areaStart: noop_default,
  areaEnd: noop_default,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(x3, y2) {
    x3 = +x3, y2 = +y2;
    if (this._point) {
      var x23 = this._x2 - x3, y23 = this._y2 - y2;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1;
        this._x3 = x3, this._y3 = y2;
        break;
      case 1:
        this._point = 2;
        this._context.moveTo(this._x4 = x3, this._y4 = y2);
        break;
      case 2:
        this._point = 3;
        this._x5 = x3, this._y5 = y2;
        break;
      default:
        point3(this, x3, y2);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x3;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
  }
};
var catmullRomClosed_default = function custom6(alpha) {
  function catmullRom(context) {
    return alpha ? new CatmullRomClosed(context, alpha) : new CardinalClosed(context, 0);
  }
  catmullRom.alpha = function(alpha2) {
    return custom6(+alpha2);
  };
  return catmullRom;
}(0.5);

// node_modules/@nivo/bar/node_modules/d3-shape/src/curve/catmullRomOpen.js
function CatmullRomOpen(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}
CatmullRomOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function() {
    if (this._line || this._line !== 0 && this._point === 3) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x3, y2) {
    x3 = +x3, y2 = +y2;
    if (this._point) {
      var x23 = this._x2 - x3, y23 = this._y2 - y2;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
        break;
      case 3:
        this._point = 4;
      // proceed
      default:
        point3(this, x3, y2);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x3;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
  }
};
var catmullRomOpen_default = function custom7(alpha) {
  function catmullRom(context) {
    return alpha ? new CatmullRomOpen(context, alpha) : new CardinalOpen(context, 0);
  }
  catmullRom.alpha = function(alpha2) {
    return custom7(+alpha2);
  };
  return catmullRom;
}(0.5);

// node_modules/@nivo/bar/node_modules/d3-shape/src/curve/linearClosed.js
function LinearClosed(context) {
  this._context = context;
}
LinearClosed.prototype = {
  areaStart: noop_default,
  areaEnd: noop_default,
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._point) this._context.closePath();
  },
  point: function(x3, y2) {
    x3 = +x3, y2 = +y2;
    if (this._point) this._context.lineTo(x3, y2);
    else this._point = 1, this._context.moveTo(x3, y2);
  }
};

// node_modules/@nivo/bar/node_modules/d3-shape/src/curve/monotone.js
function sign(x3) {
  return x3 < 0 ? -1 : 1;
}
function slope3(that, x22, y2) {
  var h0 = that._x1 - that._x0, h1 = x22 - that._x1, s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0), s1 = (y2 - that._y1) / (h1 || h0 < 0 && -0), p2 = (s0 * h1 + s1 * h0) / (h0 + h1);
  return (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p2)) || 0;
}
function slope2(that, t2) {
  var h = that._x1 - that._x0;
  return h ? (3 * (that._y1 - that._y0) / h - t2) / 2 : t2;
}
function point4(that, t0, t1) {
  var x0 = that._x0, y0 = that._y0, x1 = that._x1, y1 = that._y1, dx = (x1 - x0) / 3;
  that._context.bezierCurveTo(x0 + dx, y0 + dx * t0, x1 - dx, y1 - dx * t1, x1, y1);
}
function MonotoneX(context) {
  this._context = context;
}
MonotoneX.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
      case 3:
        point4(this, this._t0, slope2(this, this._t0));
        break;
    }
    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x3, y2) {
    var t1 = NaN;
    x3 = +x3, y2 = +y2;
    if (x3 === this._x1 && y2 === this._y1) return;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x3, y2) : this._context.moveTo(x3, y2);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        point4(this, slope2(this, t1 = slope3(this, x3, y2)), t1);
        break;
      default:
        point4(this, this._t0, t1 = slope3(this, x3, y2));
        break;
    }
    this._x0 = this._x1, this._x1 = x3;
    this._y0 = this._y1, this._y1 = y2;
    this._t0 = t1;
  }
};
function MonotoneY(context) {
  this._context = new ReflectContext(context);
}
(MonotoneY.prototype = Object.create(MonotoneX.prototype)).point = function(x3, y2) {
  MonotoneX.prototype.point.call(this, y2, x3);
};
function ReflectContext(context) {
  this._context = context;
}
ReflectContext.prototype = {
  moveTo: function(x3, y2) {
    this._context.moveTo(y2, x3);
  },
  closePath: function() {
    this._context.closePath();
  },
  lineTo: function(x3, y2) {
    this._context.lineTo(y2, x3);
  },
  bezierCurveTo: function(x1, y1, x22, y2, x3, y3) {
    this._context.bezierCurveTo(y1, x1, y2, x22, y3, x3);
  }
};

// node_modules/@nivo/bar/node_modules/d3-shape/src/curve/natural.js
function Natural(context) {
  this._context = context;
}
Natural.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = [];
    this._y = [];
  },
  lineEnd: function() {
    var x3 = this._x, y2 = this._y, n2 = x3.length;
    if (n2) {
      this._line ? this._context.lineTo(x3[0], y2[0]) : this._context.moveTo(x3[0], y2[0]);
      if (n2 === 2) {
        this._context.lineTo(x3[1], y2[1]);
      } else {
        var px = controlPoints(x3), py = controlPoints(y2);
        for (var i0 = 0, i1 = 1; i1 < n2; ++i0, ++i1) {
          this._context.bezierCurveTo(px[0][i0], py[0][i0], px[1][i0], py[1][i0], x3[i1], y2[i1]);
        }
      }
    }
    if (this._line || this._line !== 0 && n2 === 1) this._context.closePath();
    this._line = 1 - this._line;
    this._x = this._y = null;
  },
  point: function(x3, y2) {
    this._x.push(+x3);
    this._y.push(+y2);
  }
};
function controlPoints(x3) {
  var i2, n2 = x3.length - 1, m2, a3 = new Array(n2), b2 = new Array(n2), r = new Array(n2);
  a3[0] = 0, b2[0] = 2, r[0] = x3[0] + 2 * x3[1];
  for (i2 = 1; i2 < n2 - 1; ++i2) a3[i2] = 1, b2[i2] = 4, r[i2] = 4 * x3[i2] + 2 * x3[i2 + 1];
  a3[n2 - 1] = 2, b2[n2 - 1] = 7, r[n2 - 1] = 8 * x3[n2 - 1] + x3[n2];
  for (i2 = 1; i2 < n2; ++i2) m2 = a3[i2] / b2[i2 - 1], b2[i2] -= m2, r[i2] -= m2 * r[i2 - 1];
  a3[n2 - 1] = r[n2 - 1] / b2[n2 - 1];
  for (i2 = n2 - 2; i2 >= 0; --i2) a3[i2] = (r[i2] - a3[i2 + 1]) / b2[i2];
  b2[n2 - 1] = (x3[n2] + a3[n2 - 1]) / 2;
  for (i2 = 0; i2 < n2 - 1; ++i2) b2[i2] = 2 * x3[i2 + 1] - a3[i2 + 1];
  return [a3, b2];
}

// node_modules/@nivo/bar/node_modules/d3-shape/src/curve/step.js
function Step(context, t2) {
  this._context = context;
  this._t = t2;
}
Step.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = this._y = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (0 < this._t && this._t < 1 && this._point === 2) this._context.lineTo(this._x, this._y);
    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    if (this._line >= 0) this._t = 1 - this._t, this._line = 1 - this._line;
  },
  point: function(x3, y2) {
    x3 = +x3, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x3, y2) : this._context.moveTo(x3, y2);
        break;
      case 1:
        this._point = 2;
      // proceed
      default: {
        if (this._t <= 0) {
          this._context.lineTo(this._x, y2);
          this._context.lineTo(x3, y2);
        } else {
          var x1 = this._x * (1 - this._t) + x3 * this._t;
          this._context.lineTo(x1, this._y);
          this._context.lineTo(x1, y2);
        }
        break;
      }
    }
    this._x = x3, this._y = y2;
  }
};

// node_modules/@nivo/bar/node_modules/d3-shape/src/offset/none.js
function none_default(series, order) {
  if (!((n2 = series.length) > 1)) return;
  for (var i2 = 1, j3, s0, s1 = series[order[0]], n2, m2 = s1.length; i2 < n2; ++i2) {
    s0 = s1, s1 = series[order[i2]];
    for (j3 = 0; j3 < m2; ++j3) {
      s1[j3][1] += s1[j3][0] = isNaN(s0[j3][1]) ? s0[j3][0] : s0[j3][1];
    }
  }
}

// node_modules/@nivo/bar/node_modules/d3-shape/src/order/none.js
function none_default2(series) {
  var n2 = series.length, o2 = new Array(n2);
  while (--n2 >= 0) o2[n2] = n2;
  return o2;
}

// node_modules/@nivo/bar/node_modules/d3-shape/src/stack.js
function stackValue(d2, key) {
  return d2[key];
}
function stack_default() {
  var keys = constant_default([]), order = none_default2, offset = none_default, value = stackValue;
  function stack(data) {
    var kz = keys.apply(this, arguments), i2, m2 = data.length, n2 = kz.length, sz = new Array(n2), oz;
    for (i2 = 0; i2 < n2; ++i2) {
      for (var ki = kz[i2], si2 = sz[i2] = new Array(m2), j3 = 0, sij; j3 < m2; ++j3) {
        si2[j3] = sij = [0, +value(data[j3], ki, j3, data)];
        sij.data = data[j3];
      }
      si2.key = ki;
    }
    for (i2 = 0, oz = order(sz); i2 < n2; ++i2) {
      sz[oz[i2]].index = i2;
    }
    offset(sz, oz);
    return sz;
  }
  stack.keys = function(_2) {
    return arguments.length ? (keys = typeof _2 === "function" ? _2 : constant_default(slice.call(_2)), stack) : keys;
  };
  stack.value = function(_2) {
    return arguments.length ? (value = typeof _2 === "function" ? _2 : constant_default(+_2), stack) : value;
  };
  stack.order = function(_2) {
    return arguments.length ? (order = _2 == null ? none_default2 : typeof _2 === "function" ? _2 : constant_default(slice.call(_2)), stack) : order;
  };
  stack.offset = function(_2) {
    return arguments.length ? (offset = _2 == null ? none_default : _2, stack) : offset;
  };
  return stack;
}

// node_modules/@nivo/bar/node_modules/d3-shape/src/offset/diverging.js
function diverging_default(series, order) {
  if (!((n2 = series.length) > 0)) return;
  for (var i2, j3 = 0, d2, dy, yp, yn, n2, m2 = series[order[0]].length; j3 < m2; ++j3) {
    for (yp = yn = 0, i2 = 0; i2 < n2; ++i2) {
      if ((dy = (d2 = series[order[i2]][j3])[1] - d2[0]) > 0) {
        d2[0] = yp, d2[1] = yp += dy;
      } else if (dy < 0) {
        d2[1] = yn, d2[0] = yn += dy;
      } else {
        d2[0] = 0, d2[1] = dy;
      }
    }
  }
}

// node_modules/@nivo/bar/dist/nivo-bar.es.js
var import_uniqBy = __toESM(require_uniqBy());
function z3() {
  return z3 = Object.assign ? Object.assign.bind() : function(e3) {
    for (var a3 = 1; a3 < arguments.length; a3++) {
      var i2 = arguments[a3];
      for (var t2 in i2) Object.prototype.hasOwnProperty.call(i2, t2) && (e3[t2] = i2[t2]);
    }
    return e3;
  }, z3.apply(this, arguments);
}
function K(e3, a3) {
  if (null == e3) return {};
  var i2, t2, n2 = {}, r = Object.keys(e3);
  for (t2 = 0; t2 < r.length; t2++) i2 = r[t2], a3.indexOf(i2) >= 0 || (n2[i2] = e3[i2]);
  return n2;
}
var N;
var J2 = function(e3) {
  var a3 = e3.bars, i2 = e3.annotations, t2 = S({ data: a3, annotations: i2, getPosition: function(e4) {
    return { x: e4.x + e4.width / 2, y: e4.y + e4.height / 2 };
  }, getDimensions: function(e4) {
    var a4 = e4.height, i3 = e4.width;
    return { width: i3, height: a4, size: Math.max(i3, a4) };
  } });
  return (0, import_jsx_runtime2.jsx)(import_jsx_runtime2.Fragment, { children: t2.map(function(e4, a4) {
    return (0, import_jsx_runtime2.jsx)(R, z3({}, e4), a4);
  }) });
};
var Q = function(e3) {
  var a3 = e3.width, i2 = e3.height, t2 = e3.legends, n2 = e3.toggleSerie;
  return (0, import_jsx_runtime2.jsx)(import_jsx_runtime2.Fragment, { children: t2.map(function(e4, t3) {
    var r, l = e4[0], o2 = e4[1];
    return (0, import_jsx_runtime2.jsx)(X2, z3({}, l, { containerWidth: a3, containerHeight: i2, data: null != (r = l.data) ? r : o2, toggleSerie: l.toggleSerie && "keys" === l.dataFrom ? n2 : void 0 }), t3);
  }) });
};
var U = ["data"];
var Z = function(e3) {
  var a3, i2 = e3.bar, t2 = i2.data, n2 = K(i2, U), r = e3.style, l = r.borderColor, o2 = r.color, u2 = r.height, s2 = r.labelColor, h = r.labelOpacity, g2 = r.labelX, v2 = r.labelY, f = r.transform, m2 = r.width, p2 = e3.borderRadius, x3 = e3.borderWidth, y2 = e3.label, S2 = e3.shouldRenderLabel, k4 = e3.isInteractive, L2 = e3.onClick, w3 = e3.onMouseEnter, C2 = e3.onMouseLeave, B2 = e3.tooltip, I3 = e3.isFocusable, T3 = e3.ariaLabel, R3 = e3.ariaLabelledBy, H3 = e3.ariaDescribedBy, F = Et(), Y = k(), D3 = Y.showTooltipFromEvent, O2 = Y.showTooltipAt, G = Y.hideTooltip, A = (0, import_react2.useMemo)(function() {
    return function() {
      return (0, import_react2.createElement)(B2, z3({}, n2, t2));
    };
  }, [B2, n2, t2]), j3 = (0, import_react2.useCallback)(function(e4) {
    null == L2 || L2(z3({ color: n2.color }, t2), e4);
  }, [n2, t2, L2]), q3 = (0, import_react2.useCallback)(function(e4) {
    return D3(A(), e4);
  }, [D3, A]), N2 = (0, import_react2.useCallback)(function(e4) {
    null == w3 || w3(t2, e4), D3(A(), e4);
  }, [t2, w3, D3, A]), J3 = (0, import_react2.useCallback)(function(e4) {
    null == C2 || C2(t2, e4), G();
  }, [t2, G, C2]), Q2 = (0, import_react2.useCallback)(function() {
    O2(A(), [n2.absX + n2.width / 2, n2.absY]);
  }, [O2, A, n2]), Z2 = (0, import_react2.useCallback)(function() {
    G();
  }, [G]);
  return (0, import_jsx_runtime2.jsxs)(animated.g, { transform: f, children: [(0, import_jsx_runtime2.jsx)(animated.rect, { width: to(m2, function(e4) {
    return Math.max(e4, 0);
  }), height: to(u2, function(e4) {
    return Math.max(e4, 0);
  }), rx: p2, ry: p2, fill: null != (a3 = t2.fill) ? a3 : o2, strokeWidth: x3, stroke: l, focusable: I3, tabIndex: I3 ? 0 : void 0, "aria-label": T3 ? T3(t2) : void 0, "aria-labelledby": R3 ? R3(t2) : void 0, "aria-describedby": H3 ? H3(t2) : void 0, onMouseEnter: k4 ? N2 : void 0, onMouseMove: k4 ? q3 : void 0, onMouseLeave: k4 ? J3 : void 0, onClick: k4 ? j3 : void 0, onFocus: k4 && I3 ? Q2 : void 0, onBlur: k4 && I3 ? Z2 : void 0 }), S2 && (0, import_jsx_runtime2.jsx)(animated.text, { x: g2, y: v2, textAnchor: "middle", dominantBaseline: "central", fillOpacity: h, style: z3({}, F.labels.text, { pointerEvents: "none", fill: s2 }), children: y2 })] });
};
var $ = ["color", "label"];
var _ = function(e3) {
  var a3 = e3.color, i2 = e3.label, t2 = K(e3, $);
  return (0, import_jsx_runtime2.jsx)(w, { id: i2, value: t2.formattedValue, enableChip: true, color: a3 });
};
var ee = { indexBy: "id", keys: ["value"], groupMode: "stacked", layout: "vertical", reverse: false, minValue: "auto", maxValue: "auto", valueScale: { type: "linear" }, indexScale: { type: "band", round: true }, padding: 0.1, innerPadding: 0, axisBottom: {}, axisLeft: {}, enableGridX: false, enableGridY: true, enableLabel: true, label: "formattedValue", labelSkipWidth: 0, labelSkipHeight: 0, labelTextColor: { from: "theme", theme: "labels.text.fill" }, colorBy: "id", colors: { scheme: "nivo" }, borderRadius: 0, borderWidth: 0, borderColor: { from: "color" }, isInteractive: true, tooltip: _, tooltipLabel: function(e3) {
  return e3.id + " - " + e3.indexValue;
}, legends: [], initialHiddenIds: [], annotations: [], markers: [] };
var ae = z3({}, ee, { layers: ["grid", "axes", "bars", "markers", "legends", "annotations"], barComponent: Z, defs: [], fill: [], animate: true, motionConfig: "default", role: "img", isFocusable: false });
var ie = z3({}, ee, { layers: ["grid", "axes", "bars", "legends", "annotations"], pixelRatio: "undefined" != typeof window && null != (N = window.devicePixelRatio) ? N : 1 });
var te = function(e3, a3, i2, t2, n2, r) {
  return cn(t2, { all: e3.map(a3), min: 0, max: 0 }, n2, r).padding(i2);
};
var ne = function(e3, a3) {
  return e3.map(function(e4) {
    return z3({}, a3.reduce(function(e5, a4) {
      return e5[a4] = null, e5;
    }, {}), e4);
  });
};
var re = function(e3) {
  return Object.keys(e3).reduce(function(a3, i2) {
    return e3[i2] && (a3[i2] = e3[i2]), a3;
  }, {});
};
var le = function(e3) {
  return [e3, Number(e3)];
};
var oe = ["layout", "minValue", "maxValue", "reverse", "width", "height", "padding", "innerPadding", "valueScale", "indexScale", "hiddenIds"];
var de = function(e3, a3) {
  return e3 > a3;
};
var ue = function(e3, a3) {
  return e3 < a3;
};
var ce = function(e3, a3) {
  return Array.from(" ".repeat(a3 - e3), function(a4, i2) {
    return e3 + i2;
  });
};
var se = function(e3) {
  return de(e3, 0) ? 0 : e3;
};
var he = function(e3, a3, i2, t2) {
  var n2 = e3.data, r = e3.formatValue, l = e3.getColor, o2 = e3.getIndex, d2 = e3.getTooltipLabel, u2 = e3.innerPadding, c2 = void 0 === u2 ? 0 : u2, s2 = e3.keys, h = e3.xScale, b2 = e3.yScale, g2 = e3.margin, v2 = i2 ? ue : de, f = n2.map(re), m2 = [];
  return s2.forEach(function(e4, i3) {
    return ce(0, h.domain().length).forEach(function(u3) {
      var s3, p2, x3, y2 = le(n2[u3][e4]), S2 = y2[0], k4 = y2[1], L2 = o2(n2[u3]), w3 = (null != (s3 = h(L2)) ? s3 : 0) + a3 * i3 + c2 * i3, C2 = v2(p2 = k4, 0) ? null != (x3 = b2(p2)) ? x3 : 0 : t2, V2 = function(e5, a4) {
        var i4;
        return v2(e5, 0) ? t2 - a4 : (null != (i4 = b2(e5)) ? i4 : 0) - t2;
      }(k4, C2), W3 = { id: e4, value: null === S2 ? S2 : k4, formattedValue: r(k4), hidden: false, index: u3, indexValue: L2, data: f[u3] };
      m2.push({ key: e4 + "." + W3.indexValue, index: m2.length, data: W3, x: w3, y: C2, absX: g2.left + w3, absY: g2.top + C2, width: a3, height: V2, color: l(W3), label: d2(W3) });
    });
  }), m2;
};
var be = function(e3, a3, i2, t2) {
  var n2 = e3.data, r = e3.formatValue, l = e3.getIndex, o2 = e3.getColor, d2 = e3.getTooltipLabel, u2 = e3.keys, c2 = e3.innerPadding, s2 = void 0 === c2 ? 0 : c2, h = e3.xScale, b2 = e3.yScale, g2 = e3.margin, v2 = i2 ? ue : de, f = n2.map(re), m2 = [];
  return u2.forEach(function(e4, i3) {
    return ce(0, b2.domain().length).forEach(function(u3) {
      var c3, p2, x3, y2 = le(n2[u3][e4]), S2 = y2[0], k4 = y2[1], L2 = l(n2[u3]), w3 = v2(p2 = k4, 0) ? t2 : null != (x3 = h(p2)) ? x3 : 0, C2 = (null != (c3 = b2(L2)) ? c3 : 0) + a3 * i3 + s2 * i3, V2 = function(e5, a4) {
        var i4;
        return v2(e5, 0) ? (null != (i4 = h(e5)) ? i4 : 0) - t2 : t2 - a4;
      }(k4, w3), W3 = { id: e4, value: null === S2 ? S2 : k4, formattedValue: r(k4), hidden: false, index: u3, indexValue: L2, data: f[u3] };
      m2.push({ key: e4 + "." + W3.indexValue, index: m2.length, data: W3, x: w3, y: C2, absX: g2.left + w3, absY: g2.top + C2, width: V2, height: a3, color: o2(W3), label: d2(W3) });
    });
  }), m2;
};
var ge = function(e3) {
  var a3, i2, t2 = e3.layout, n2 = e3.minValue, r = e3.maxValue, l = e3.reverse, o2 = e3.width, d2 = e3.height, u2 = e3.padding, c2 = void 0 === u2 ? 0 : u2, s2 = e3.innerPadding, h = void 0 === s2 ? 0 : s2, b2 = e3.valueScale, g2 = e3.indexScale, v2 = e3.hiddenIds, f = void 0 === v2 ? [] : v2, m2 = K(e3, oe), p2 = m2.keys.filter(function(e4) {
    return !f.includes(e4);
  }), x3 = ne(m2.data, p2), y2 = "vertical" === t2 ? ["y", "x", o2] : ["x", "y", d2], S2 = y2[0], k4 = y2[1], L2 = y2[2], w3 = te(x3, m2.getIndex, c2, g2, L2, k4), C2 = z3({ max: r, min: n2, reverse: l }, b2), V2 = "auto" === C2.min ? se : function(e4) {
    return e4;
  }, W3 = x3.reduce(function(e4, a4) {
    return [].concat(e4, p2.map(function(e5) {
      return a4[e5];
    }));
  }, []).filter(Boolean), M3 = V2(Math.min.apply(Math, W3)), B2 = (i2 = Math.max.apply(Math, W3), isFinite(i2) ? i2 : 0), I3 = cn(C2, { all: W3, min: M3, max: B2 }, "x" === S2 ? o2 : d2, S2), T3 = "vertical" === t2 ? [w3, I3] : [I3, w3], R3 = T3[0], H3 = T3[1], P2 = (w3.bandwidth() - h * (p2.length - 1)) / p2.length, E2 = [z3({}, m2, { data: x3, keys: p2, innerPadding: h, xScale: R3, yScale: H3 }), P2, C2.reverse, null != (a3 = I3(0)) ? a3 : 0];
  return { xScale: R3, yScale: H3, bars: P2 > 0 ? "vertical" === t2 ? he.apply(void 0, E2) : be.apply(void 0, E2) : [] };
};
var ve = ["data", "layout", "minValue", "maxValue", "reverse", "width", "height", "padding", "valueScale", "indexScale", "hiddenIds"];
var fe = function e2(a3) {
  var i2;
  return a3.some(Array.isArray) ? e2((i2 = []).concat.apply(i2, a3)) : a3;
};
var me = function(e3, a3, i2) {
  var t2 = e3.formatValue, n2 = e3.getColor, r = e3.getIndex, l = e3.getTooltipLabel, o2 = e3.innerPadding, d2 = e3.stackedData, u2 = e3.xScale, c2 = e3.yScale, s2 = e3.margin, h = [];
  return d2.forEach(function(e4) {
    return u2.domain().forEach(function(d3, b2) {
      var g2, v2, f = e4[b2], m2 = null != (g2 = u2(r(f.data))) ? g2 : 0, p2 = (null != (v2 = function(e5) {
        return c2(e5[i2 ? 0 : 1]);
      }(f)) ? v2 : 0) + 0.5 * o2, x3 = function(e5, a4) {
        var t3;
        return (null != (t3 = c2(e5[i2 ? 1 : 0])) ? t3 : 0) - a4;
      }(f, p2) - o2, y2 = le(f.data[e4.key]), S2 = y2[0], k4 = y2[1], L2 = { id: e4.key, value: null === S2 ? S2 : k4, formattedValue: t2(k4), hidden: false, index: b2, indexValue: d3, data: re(f.data) };
      h.push({ key: e4.key + "." + d3, index: h.length, data: L2, x: m2, y: p2, absX: s2.left + m2, absY: s2.top + p2, width: a3, height: x3, color: n2(L2), label: l(L2) });
    });
  }), h;
};
var pe = function(e3, a3, i2) {
  var t2 = e3.formatValue, n2 = e3.getColor, r = e3.getIndex, l = e3.getTooltipLabel, o2 = e3.innerPadding, d2 = e3.stackedData, u2 = e3.xScale, c2 = e3.yScale, s2 = e3.margin, h = [];
  return d2.forEach(function(e4) {
    return c2.domain().forEach(function(d3, b2) {
      var g2, v2, f = e4[b2], m2 = null != (g2 = c2(r(f.data))) ? g2 : 0, p2 = (null != (v2 = function(e5) {
        return u2(e5[i2 ? 1 : 0]);
      }(f)) ? v2 : 0) + 0.5 * o2, x3 = function(e5, a4) {
        var t3;
        return (null != (t3 = u2(e5[i2 ? 0 : 1])) ? t3 : 0) - a4;
      }(f, p2) - o2, y2 = le(f.data[e4.key]), S2 = y2[0], k4 = y2[1], L2 = { id: e4.key, value: null === S2 ? S2 : k4, formattedValue: t2(k4), hidden: false, index: b2, indexValue: d3, data: re(f.data) };
      h.push({ key: e4.key + "." + d3, index: h.length, data: L2, x: p2, y: m2, absX: s2.left + p2, absY: s2.top + m2, width: x3, height: a3, color: n2(L2), label: l(L2) });
    });
  }), h;
};
var xe = function(e3) {
  var a3, i2 = e3.data, t2 = e3.layout, n2 = e3.minValue, r = e3.maxValue, l = e3.reverse, o2 = e3.width, d2 = e3.height, u2 = e3.padding, c2 = void 0 === u2 ? 0 : u2, s2 = e3.valueScale, h = e3.indexScale, b2 = e3.hiddenIds, g2 = void 0 === b2 ? [] : b2, v2 = K(e3, ve), f = v2.keys.filter(function(e4) {
    return !g2.includes(e4);
  }), m2 = stack_default().keys(f).offset(diverging_default)(ne(i2, f)), p2 = "vertical" === t2 ? ["y", "x", o2] : ["x", "y", d2], x3 = p2[0], y2 = p2[1], S2 = p2[2], k4 = te(i2, v2.getIndex, c2, h, S2, y2), L2 = z3({ max: r, min: n2, reverse: l }, s2), w3 = (a3 = fe(m2), "log" === s2.type ? a3.filter(function(e4) {
    return 0 !== e4;
  }) : a3), C2 = Math.min.apply(Math, w3), V2 = Math.max.apply(Math, w3), W3 = cn(L2, { all: w3, min: C2, max: V2 }, "x" === x3 ? o2 : d2, x3), M3 = "vertical" === t2 ? [k4, W3] : [W3, k4], B2 = M3[0], I3 = M3[1], T3 = v2.innerPadding > 0 ? v2.innerPadding : 0, R3 = k4.bandwidth(), H3 = [z3({}, v2, { innerPadding: T3, stackedData: m2, xScale: B2, yScale: I3 }), R3, L2.reverse];
  return { xScale: B2, yScale: I3, bars: R3 > 0 ? "vertical" === t2 ? me.apply(void 0, H3) : pe.apply(void 0, H3) : [] };
};
var ye = function(e3) {
  var a3 = e3.bars, i2 = e3.direction, t2 = e3.from, n2 = e3.groupMode, r = e3.layout, l = e3.legendLabel, o2 = e3.reverse, d2 = Bi(null != l ? l : "indexes" === t2 ? "indexValue" : "id");
  return "indexes" === t2 ? function(e4, a4, i3) {
    var t3 = (0, import_uniqBy.default)(e4.map(function(e5) {
      var a5, t4;
      return { id: null != (a5 = e5.data.indexValue) ? a5 : "", label: i3(e5.data), hidden: e5.data.hidden, color: null != (t4 = e5.color) ? t4 : "#000" };
    }), function(e5) {
      return e5.id;
    });
    return "horizontal" === a4 && t3.reverse(), t3;
  }(a3, r, d2) : function(e4, a4, i3, t3, n3, r2) {
    var l2 = (0, import_uniqBy.default)(e4.map(function(e5) {
      var a5;
      return { id: e5.data.id, label: r2(e5.data), hidden: e5.data.hidden, color: null != (a5 = e5.color) ? a5 : "#000" };
    }), function(e5) {
      return e5.id;
    });
    return ("vertical" === a4 && "stacked" === t3 && "column" === i3 && true !== n3 || "horizontal" === a4 && "stacked" === t3 && true === n3) && l2.reverse(), l2;
  }(a3, r, i2, n2, o2, d2);
};
var Se = function(e3) {
  var a3 = e3.indexBy, i2 = void 0 === a3 ? ee.indexBy : a3, t2 = e3.keys, n2 = void 0 === t2 ? ee.keys : t2, r = e3.label, l = void 0 === r ? ee.label : r, o2 = e3.tooltipLabel, d2 = void 0 === o2 ? ee.tooltipLabel : o2, u2 = e3.valueFormat, c2 = e3.colors, s2 = void 0 === c2 ? ee.colors : c2, h = e3.colorBy, g2 = void 0 === h ? ee.colorBy : h, m2 = e3.borderColor, p2 = void 0 === m2 ? ee.borderColor : m2, x3 = e3.labelTextColor, y2 = void 0 === x3 ? ee.labelTextColor : x3, S2 = e3.groupMode, k4 = void 0 === S2 ? ee.groupMode : S2, L2 = e3.layout, w3 = void 0 === L2 ? ee.layout : L2, C2 = e3.reverse, W3 = void 0 === C2 ? ee.reverse : C2, I3 = e3.data, T3 = e3.minValue, R3 = void 0 === T3 ? ee.minValue : T3, H3 = e3.maxValue, P2 = void 0 === H3 ? ee.maxValue : H3, E2 = e3.margin, F = e3.width, X3 = e3.height, Y = e3.padding, G = void 0 === Y ? ee.padding : Y, A = e3.innerPadding, j3 = void 0 === A ? ee.innerPadding : A, q3 = e3.valueScale, K2 = void 0 === q3 ? ee.valueScale : q3, N2 = e3.indexScale, J3 = void 0 === N2 ? ee.indexScale : N2, Q2 = e3.initialHiddenIds, U2 = void 0 === Q2 ? ee.initialHiddenIds : Q2, Z2 = e3.enableLabel, $2 = void 0 === Z2 ? ee.enableLabel : Z2, _2 = e3.labelSkipWidth, ae2 = void 0 === _2 ? ee.labelSkipWidth : _2, ie2 = e3.labelSkipHeight, te2 = void 0 === ie2 ? ee.labelSkipHeight : ie2, ne2 = e3.legends, re2 = void 0 === ne2 ? ee.legends : ne2, le2 = e3.legendLabel, oe2 = (0, import_react2.useState)(null != U2 ? U2 : []), de2 = oe2[0], ue2 = oe2[1], ce2 = (0, import_react2.useCallback)(function(e4) {
    ue2(function(a4) {
      return a4.indexOf(e4) > -1 ? a4.filter(function(a5) {
        return a5 !== e4;
      }) : [].concat(a4, [e4]);
    });
  }, []), se2 = Gi(i2), he2 = Gi(l), be2 = Gi(d2), ve2 = Dt(u2), fe2 = Et(), me2 = pr(s2, g2), pe2 = We(p2, fe2), Se2 = We(y2, fe2), ke2 = ("grouped" === k4 ? ge : xe)({ layout: w3, reverse: W3, data: I3, getIndex: se2, keys: n2, minValue: R3, maxValue: P2, width: F, height: X3, getColor: me2, padding: G, innerPadding: j3, valueScale: K2, indexScale: J3, hiddenIds: de2, formatValue: ve2, getTooltipLabel: be2, margin: E2 }), Le2 = ke2.bars, we2 = ke2.xScale, Ce2 = ke2.yScale, Ve2 = (0, import_react2.useMemo)(function() {
    return Le2.filter(function(e4) {
      return null !== e4.data.value;
    }).map(function(e4, a4) {
      return z3({}, e4, { index: a4 });
    });
  }, [Le2]), We3 = (0, import_react2.useCallback)(function(e4) {
    var a4 = e4.width, i3 = e4.height;
    return !!$2 && (!(ae2 > 0 && a4 < ae2) && !(te2 > 0 && i3 < te2));
  }, [$2, ae2, te2]), Me2 = (0, import_react2.useMemo)(function() {
    return n2.map(function(e4) {
      var a4 = Le2.find(function(a5) {
        return a5.data.id === e4;
      });
      return z3({}, a4, { data: z3({ id: e4 }, null == a4 ? void 0 : a4.data, { hidden: de2.includes(e4) }) });
    });
  }, [de2, n2, Le2]), Be2 = (0, import_react2.useMemo)(function() {
    return re2.map(function(e4) {
      return [e4, ye({ bars: "keys" === e4.dataFrom ? Me2 : Le2, direction: e4.direction, from: e4.dataFrom, groupMode: k4, layout: w3, legendLabel: le2, reverse: W3 })];
    });
  }, [re2, Me2, Le2, k4, w3, le2, W3]);
  return { bars: Le2, barsWithValue: Ve2, xScale: we2, yScale: Ce2, getIndex: se2, getLabel: he2, getTooltipLabel: be2, formatValue: ve2, getColor: me2, getBorderColor: pe2, getLabelColor: Se2, shouldRenderBarLabel: We3, hiddenIds: de2, toggleSerie: ce2, legendsWithData: Be2 };
};
var ke = ["isInteractive", "animate", "motionConfig", "theme", "renderWrapper"];
var Le = function(i2) {
  var t2 = i2.data, n2 = i2.indexBy, r = i2.keys, l = i2.margin, o2 = i2.width, u2 = i2.height, c2 = i2.groupMode, s2 = i2.layout, h = i2.reverse, b2 = i2.minValue, g2 = i2.maxValue, v2 = i2.valueScale, f = i2.indexScale, m2 = i2.padding, L2 = i2.innerPadding, w3 = i2.axisTop, C2 = i2.axisRight, M3 = i2.axisBottom, B2 = void 0 === M3 ? ae.axisBottom : M3, T3 = i2.axisLeft, R3 = void 0 === T3 ? ae.axisLeft : T3, H3 = i2.enableGridX, P2 = void 0 === H3 ? ae.enableGridX : H3, E2 = i2.enableGridY, X3 = void 0 === E2 ? ae.enableGridY : E2, Y = i2.gridXValues, D3 = i2.gridYValues, O2 = i2.layers, G = void 0 === O2 ? ae.layers : O2, A = i2.barComponent, j3 = void 0 === A ? ae.barComponent : A, q3 = i2.enableLabel, K2 = void 0 === q3 ? ae.enableLabel : q3, N2 = i2.label, U2 = i2.labelSkipWidth, Z2 = void 0 === U2 ? ae.labelSkipWidth : U2, $2 = i2.labelSkipHeight, _2 = void 0 === $2 ? ae.labelSkipHeight : $2, ee2 = i2.labelTextColor, ie2 = i2.markers, te2 = void 0 === ie2 ? ae.markers : ie2, ne2 = i2.colorBy, re2 = i2.colors, le2 = i2.defs, oe2 = void 0 === le2 ? ae.defs : le2, de2 = i2.fill, ue2 = void 0 === de2 ? ae.fill : de2, ce2 = i2.borderRadius, se2 = void 0 === ce2 ? ae.borderRadius : ce2, he2 = i2.borderWidth, be2 = void 0 === he2 ? ae.borderWidth : he2, ge2 = i2.borderColor, ve2 = i2.annotations, fe2 = void 0 === ve2 ? ae.annotations : ve2, me2 = i2.legendLabel, pe2 = i2.tooltipLabel, xe2 = i2.valueFormat, ye2 = i2.isInteractive, ke2 = void 0 === ye2 ? ae.isInteractive : ye2, Le2 = i2.tooltip, we2 = void 0 === Le2 ? ae.tooltip : Le2, Ce2 = i2.onClick, Ve2 = i2.onMouseEnter, We3 = i2.onMouseLeave, Me2 = i2.legends, Be2 = i2.role, Ie2 = void 0 === Be2 ? ae.role : Be2, Te = i2.ariaLabel, Re = i2.ariaLabelledBy, He = i2.ariaDescribedBy, Pe = i2.isFocusable, Ee = void 0 === Pe ? ae.isFocusable : Pe, Fe = i2.barAriaLabel, Xe = i2.barAriaLabelledBy, Ye = i2.barAriaDescribedBy, De = i2.initialHiddenIds, Oe = Zr(), Ge = Oe.animate, Ae = Oe.config, je = Bt(o2, u2, l), qe = je.outerWidth, ze = je.outerHeight, Ke = je.margin, Ne = je.innerWidth, Je = je.innerHeight, Qe = Se({ indexBy: n2, label: N2, tooltipLabel: pe2, valueFormat: xe2, colors: re2, colorBy: ne2, borderColor: ge2, labelTextColor: ee2, groupMode: c2, layout: s2, reverse: h, data: t2, keys: r, minValue: b2, maxValue: g2, margin: Ke, width: Ne, height: Je, padding: m2, innerPadding: L2, valueScale: v2, indexScale: f, enableLabel: K2, labelSkipWidth: Z2, labelSkipHeight: _2, legends: Me2, legendLabel: me2, initialHiddenIds: De }), Ue = Qe.bars, Ze = Qe.barsWithValue, $e = Qe.xScale, _e = Qe.yScale, ea = Qe.getLabel, aa = Qe.getTooltipLabel, ia = Qe.getBorderColor, ta = Qe.getLabelColor, na = Qe.shouldRenderBarLabel, ra = Qe.toggleSerie, la = Qe.legendsWithData, oa = useTransition(Ze, { keys: function(e3) {
    return e3.key;
  }, from: function(e3) {
    return z3({ borderColor: ia(e3), color: e3.color, height: 0, labelColor: ta(e3), labelOpacity: 0, labelX: e3.width / 2, labelY: e3.height / 2, transform: "translate(" + e3.x + ", " + (e3.y + e3.height) + ")", width: e3.width }, "vertical" === s2 ? {} : { height: e3.height, transform: "translate(" + e3.x + ", " + e3.y + ")", width: 0 });
  }, enter: function(e3) {
    return { borderColor: ia(e3), color: e3.color, height: e3.height, labelColor: ta(e3), labelOpacity: 1, labelX: e3.width / 2, labelY: e3.height / 2, transform: "translate(" + e3.x + ", " + e3.y + ")", width: e3.width };
  }, update: function(e3) {
    return { borderColor: ia(e3), color: e3.color, height: e3.height, labelColor: ta(e3), labelOpacity: 1, labelX: e3.width / 2, labelY: e3.height / 2, transform: "translate(" + e3.x + ", " + e3.y + ")", width: e3.width };
  }, leave: function(e3) {
    return z3({ borderColor: ia(e3), color: e3.color, height: 0, labelColor: ta(e3), labelOpacity: 0, labelX: e3.width / 2, labelY: 0, transform: "translate(" + e3.x + ", " + (e3.y + e3.height) + ")", width: e3.width }, "vertical" === s2 ? {} : { labelX: 0, labelY: e3.height / 2, height: e3.height, transform: "translate(" + e3.x + ", " + e3.y + ")", width: 0 });
  }, config: Ae, immediate: !Ge, initial: Ge ? void 0 : null }), da = (0, import_react2.useMemo)(function() {
    return { borderRadius: se2, borderWidth: be2, enableLabel: K2, isInteractive: ke2, labelSkipWidth: Z2, labelSkipHeight: _2, onClick: Ce2, onMouseEnter: Ve2, onMouseLeave: We3, getTooltipLabel: aa, tooltip: we2, isFocusable: Ee, ariaLabel: Fe, ariaLabelledBy: Xe, ariaDescribedBy: Ye };
  }, [se2, be2, K2, aa, ke2, _2, Z2, Ce2, Ve2, We3, we2, Ee, Fe, Xe, Ye]), ua = Hi(oe2, Ue, ue2, { dataKey: "data", targetKey: "data.fill" }), ca = { annotations: null, axes: null, bars: null, grid: null, legends: null, markers: null };
  G.includes("annotations") && (ca.annotations = (0, import_jsx_runtime2.jsx)(J2, { bars: Ue, annotations: fe2 }, "annotations")), G.includes("axes") && (ca.axes = (0, import_jsx_runtime2.jsx)(X, { xScale: $e, yScale: _e, width: Ne, height: Je, top: w3, right: C2, bottom: B2, left: R3 }, "axes")), G.includes("bars") && (ca.bars = (0, import_jsx_runtime2.jsx)(import_react2.Fragment, { children: oa(function(e3, a3) {
    return (0, import_react2.createElement)(j3, z3({}, da, { bar: a3, style: e3, shouldRenderLabel: na(a3), label: ea(a3.data) }));
  }) }, "bars")), G.includes("grid") && (ca.grid = (0, import_jsx_runtime2.jsx)(z, { width: Ne, height: Je, xScale: P2 ? $e : null, yScale: X3 ? _e : null, xValues: Y, yValues: D3 }, "grid")), G.includes("legends") && (ca.legends = (0, import_jsx_runtime2.jsx)(Q, { width: Ne, height: Je, legends: la, toggleSerie: ra }, "legends")), G.includes("markers") && (ca.markers = (0, import_jsx_runtime2.jsx)(Ti, { markers: te2, width: Ne, height: Je, xScale: $e, yScale: _e }, "markers"));
  var sa = (0, import_react2.useMemo)(function() {
    return z3({}, da, { margin: Ke, width: o2, height: u2, innerWidth: Ne, innerHeight: Je, bars: Ue, legendData: la, enableLabel: K2, xScale: $e, yScale: _e, tooltip: we2, getTooltipLabel: aa, onClick: Ce2, onMouseEnter: Ve2, onMouseLeave: We3 });
  }, [da, Ke, o2, u2, Ne, Je, Ue, la, K2, $e, _e, we2, aa, Ce2, Ve2, We3]);
  return (0, import_jsx_runtime2.jsx)(_i, { width: qe, height: ze, margin: Ke, defs: ua, role: Ie2, ariaLabel: Te, ariaLabelledBy: Re, ariaDescribedBy: He, isFocusable: Ee, children: G.map(function(e3, a3) {
    var i3;
    return "function" == typeof e3 ? (0, import_jsx_runtime2.jsx)(import_react2.Fragment, { children: (0, import_react2.createElement)(e3, sa) }, a3) : null != (i3 = null == ca ? void 0 : ca[e3]) ? i3 : null;
  }) });
};
var we = function(e3) {
  var a3 = e3.isInteractive, i2 = void 0 === a3 ? ae.isInteractive : a3, t2 = e3.animate, n2 = void 0 === t2 ? ae.animate : t2, r = e3.motionConfig, l = void 0 === r ? ae.motionConfig : r, o2 = e3.theme, u2 = e3.renderWrapper, c2 = K(e3, ke);
  return (0, import_jsx_runtime2.jsx)(Ht, { animate: n2, isInteractive: i2, motionConfig: l, renderWrapper: u2, theme: o2, children: (0, import_jsx_runtime2.jsx)(Le, z3({ isInteractive: i2 }, c2)) });
};
var Ce = ["isInteractive", "renderWrapper", "theme"];
var Ve = function(e3, a3, i2, t2) {
  return e3.find(function(e4) {
    return Ai(e4.x + a3.left, e4.y + a3.top, e4.width, e4.height, i2, t2);
  });
};
var We2 = function(e3) {
  var a3 = e3.data, r = e3.indexBy, u2 = e3.keys, c2 = e3.margin, s2 = e3.width, g2 = e3.height, v2 = e3.groupMode, f = e3.layout, m2 = e3.reverse, p2 = e3.minValue, y2 = e3.maxValue, S2 = e3.valueScale, k4 = e3.indexScale, w3 = e3.padding, C2 = e3.innerPadding, B2 = e3.axisTop, I3 = e3.axisRight, T3 = e3.axisBottom, P2 = void 0 === T3 ? ie.axisBottom : T3, E2 = e3.axisLeft, F = void 0 === E2 ? ie.axisLeft : E2, Y = e3.enableGridX, D3 = void 0 === Y ? ie.enableGridX : Y, O2 = e3.enableGridY, G = void 0 === O2 ? ie.enableGridY : O2, A = e3.gridXValues, j3 = e3.gridYValues, q3 = e3.layers, K2 = void 0 === q3 ? ie.layers : q3, N2 = e3.renderBar, J3 = void 0 === N2 ? function(e4, a4) {
    var i2 = a4.bar, t2 = i2.color, n2 = i2.height, r2 = i2.width, l = i2.x, o2 = i2.y, d2 = a4.borderColor, u3 = a4.borderRadius, c3 = a4.borderWidth, s3 = a4.label, h = a4.labelColor, b2 = a4.shouldRenderLabel;
    if (e4.fillStyle = t2, c3 > 0 && (e4.strokeStyle = d2, e4.lineWidth = c3), e4.beginPath(), u3 > 0) {
      var g3 = Math.min(u3, n2);
      e4.moveTo(l + g3, o2), e4.lineTo(l + r2 - g3, o2), e4.quadraticCurveTo(l + r2, o2, l + r2, o2 + g3), e4.lineTo(l + r2, o2 + n2 - g3), e4.quadraticCurveTo(l + r2, o2 + n2, l + r2 - g3, o2 + n2), e4.lineTo(l + g3, o2 + n2), e4.quadraticCurveTo(l, o2 + n2, l, o2 + n2 - g3), e4.lineTo(l, o2 + g3), e4.quadraticCurveTo(l, o2, l + g3, o2), e4.closePath();
    } else e4.rect(l, o2, r2, n2);
    e4.fill(), c3 > 0 && e4.stroke(), b2 && (e4.textBaseline = "middle", e4.textAlign = "center", e4.fillStyle = h, e4.fillText(s3, l + r2 / 2, o2 + n2 / 2));
  } : N2, Q2 = e3.enableLabel, U2 = void 0 === Q2 ? ie.enableLabel : Q2, Z2 = e3.label, $2 = e3.labelSkipWidth, _2 = void 0 === $2 ? ie.labelSkipWidth : $2, ee2 = e3.labelSkipHeight, ae2 = void 0 === ee2 ? ie.labelSkipHeight : ee2, te2 = e3.labelTextColor, ne2 = e3.colorBy, re2 = e3.colors, le2 = e3.borderRadius, oe2 = void 0 === le2 ? ie.borderRadius : le2, de2 = e3.borderWidth, ue2 = void 0 === de2 ? ie.borderWidth : de2, ce2 = e3.borderColor, se2 = e3.annotations, he2 = void 0 === se2 ? ie.annotations : se2, be2 = e3.legendLabel, ge2 = e3.tooltipLabel, ve2 = e3.valueFormat, fe2 = e3.isInteractive, me2 = void 0 === fe2 ? ie.isInteractive : fe2, pe2 = e3.tooltip, xe2 = void 0 === pe2 ? ie.tooltip : pe2, ye2 = e3.onClick, ke2 = e3.onMouseEnter, Le2 = e3.onMouseLeave, we2 = e3.legends, Ce2 = e3.pixelRatio, We3 = void 0 === Ce2 ? ie.pixelRatio : Ce2, Me2 = e3.canvasRef, Be2 = (0, import_react2.useRef)(null), Ie2 = Et(), Te = Bt(s2, g2, c2), Re = Te.margin, He = Te.innerWidth, Pe = Te.innerHeight, Ee = Te.outerWidth, Fe = Te.outerHeight, Xe = Se({ indexBy: r, label: Z2, tooltipLabel: ge2, valueFormat: ve2, colors: re2, colorBy: ne2, borderColor: ce2, labelTextColor: te2, groupMode: v2, layout: f, reverse: m2, data: a3, keys: u2, minValue: p2, maxValue: y2, margin: Re, width: He, height: Pe, padding: w3, innerPadding: C2, valueScale: S2, indexScale: k4, enableLabel: U2, labelSkipWidth: _2, labelSkipHeight: ae2, legends: we2, legendLabel: be2 }), Ye = Xe.bars, De = Xe.barsWithValue, Oe = Xe.xScale, Ge = Xe.yScale, Ae = Xe.getLabel, je = Xe.getTooltipLabel, qe = Xe.getBorderColor, ze = Xe.getLabelColor, Ke = Xe.shouldRenderBarLabel, Ne = Xe.legendsWithData, Je = k(), Qe = Je.showTooltipFromEvent, Ue = Je.hideTooltip, Ze = j2({ annotations: S({ data: Ye, annotations: he2, getPosition: function(e4) {
    return { x: e4.x, y: e4.y };
  }, getDimensions: function(e4) {
    var a4 = e4.width, i2 = e4.height;
    return { width: a4, height: i2, size: Math.max(a4, i2) };
  } }) }), $e = (0, import_react2.useMemo)(function() {
    return { borderRadius: oe2, borderWidth: ue2, isInteractive: me2, isFocusable: false, labelSkipWidth: _2, labelSkipHeight: ae2, margin: Re, width: s2, height: g2, innerWidth: He, innerHeight: Pe, bars: Ye, legendData: Ne, enableLabel: U2, xScale: Oe, yScale: Ge, tooltip: xe2, getTooltipLabel: je, onClick: ye2, onMouseEnter: ke2, onMouseLeave: Le2 };
  }, [oe2, ue2, me2, _2, ae2, Re, s2, g2, He, Pe, Ye, Ne, U2, Oe, Ge, xe2, je, ye2, ke2, Le2]);
  (0, import_react2.useEffect)(function() {
    var e4, a4 = null == (e4 = Be2.current) ? void 0 : e4.getContext("2d");
    Be2.current && a4 && (Be2.current.width = Ee * We3, Be2.current.height = Fe * We3, a4.scale(We3, We3), a4.fillStyle = Ie2.background, a4.fillRect(0, 0, Ee, Fe), a4.translate(Re.left, Re.top), K2.forEach(function(e5) {
      "grid" === e5 ? "number" == typeof Ie2.grid.line.strokeWidth && Ie2.grid.line.strokeWidth > 0 && (a4.lineWidth = Ie2.grid.line.strokeWidth, a4.strokeStyle = Ie2.grid.line.stroke, D3 && D(a4, { width: s2, height: g2, scale: Oe, axis: "x", values: A }), G && D(a4, { width: s2, height: g2, scale: Ge, axis: "y", values: j3 })) : "axes" === e5 ? j(a4, { xScale: Oe, yScale: Ge, width: He, height: Pe, top: B2, right: I3, bottom: P2, left: F, theme: Ie2 }) : "bars" === e5 ? De.forEach(function(e6) {
        J3(a4, { bar: e6, borderColor: qe(e6), borderRadius: oe2, borderWidth: ue2, label: Ae(e6.data), labelColor: ze(e6), shouldRenderLabel: Ke(e6) });
      }) : "legends" === e5 ? Ne.forEach(function(e6) {
        var i2 = e6[0], t2 = e6[1];
        H(a4, z3({}, i2, { data: t2, containerWidth: He, containerHeight: Pe, theme: Ie2 }));
      }) : "annotations" === e5 ? J(a4, { annotations: Ze, theme: Ie2 }) : "function" == typeof e5 && e5(a4, $e);
    }), a4.save());
  }, [P2, F, I3, B2, De, oe2, ue2, Ze, D3, G, qe, Ae, ze, A, j3, v2, g2, Pe, He, $e, K2, f, Ne, Re.left, Re.top, Fe, Ee, We3, J3, Oe, Ge, m2, Ke, Ie2, s2]);
  var _e = (0, import_react2.useCallback)(function(e4) {
    if (Ye && Be2.current) {
      var a4 = Fi(Be2.current, e4), i2 = a4[0], t2 = a4[1], n2 = Ve(Ye, Re, i2, t2);
      void 0 !== n2 ? (Qe((0, import_react2.createElement)(xe2, z3({}, n2.data, { color: n2.color, label: n2.label, value: Number(n2.data.value) })), e4), "mouseenter" === e4.type && (null == ke2 || ke2(n2.data, e4))) : Ue();
    }
  }, [Ue, Re, ke2, Ye, Qe, xe2]), ea = (0, import_react2.useCallback)(function(e4) {
    if (Ye && Be2.current) {
      Ue();
      var a4 = Fi(Be2.current, e4), i2 = a4[0], t2 = a4[1], n2 = Ve(Ye, Re, i2, t2);
      n2 && (null == Le2 || Le2(n2.data, e4));
    }
  }, [Ue, Re, Le2, Ye]), aa = (0, import_react2.useCallback)(function(e4) {
    if (Ye && Be2.current) {
      var a4 = Fi(Be2.current, e4), i2 = a4[0], t2 = a4[1], n2 = Ve(Ye, Re, i2, t2);
      void 0 !== n2 && (null == ye2 || ye2(z3({}, n2.data, { color: n2.color }), e4));
    }
  }, [Re, ye2, Ye]);
  return (0, import_jsx_runtime2.jsx)("canvas", { ref: function(e4) {
    Be2.current = e4, Me2 && "current" in Me2 && (Me2.current = e4);
  }, width: Ee * We3, height: Fe * We3, style: { width: Ee, height: Fe, cursor: me2 ? "auto" : "normal" }, onMouseEnter: me2 ? _e : void 0, onMouseMove: me2 ? _e : void 0, onMouseLeave: me2 ? ea : void 0, onClick: me2 ? aa : void 0 });
};
var Me = (0, import_react2.forwardRef)(function(e3, a3) {
  var i2 = e3.isInteractive, t2 = e3.renderWrapper, n2 = e3.theme, r = K(e3, Ce);
  return (0, import_jsx_runtime2.jsx)(Ht, { isInteractive: i2, renderWrapper: t2, theme: n2, animate: false, children: (0, import_jsx_runtime2.jsx)(We2, z3({}, r, { canvasRef: a3 })) });
});
var Be = function(e3) {
  return (0, import_jsx_runtime2.jsx)(Jt, { children: function(a3) {
    var i2 = a3.width, t2 = a3.height;
    return (0, import_jsx_runtime2.jsx)(we, z3({ width: i2, height: t2 }, e3));
  } });
};
var Ie = (0, import_react2.forwardRef)(function(e3, a3) {
  return (0, import_jsx_runtime2.jsx)(Jt, { children: function(i2) {
    var t2 = i2.width, n2 = i2.height;
    return (0, import_jsx_runtime2.jsx)(Me, z3({ width: t2, height: n2 }, e3, { ref: a3 }));
  } });
});
export {
  we as Bar,
  Me as BarCanvas,
  Z as BarItem,
  _ as BarTooltip,
  Be as ResponsiveBar,
  Ie as ResponsiveBarCanvas,
  ie as canvasDefaultProps,
  ee as defaultProps,
  ae as svgDefaultProps
};
//# sourceMappingURL=@nivo_bar.js.map
