import {
  Et,
  Zr,
  animated,
  fi,
  format,
  formatPrefix,
  formatSpecifier,
  ni,
  precisionFixed_default,
  precisionPrefix_default,
  precisionRound_default,
  require_Set,
  require_SetCache,
  require_Stack,
  require_arrayIncludes,
  require_arrayIncludesWith,
  require_arrayMap,
  require_baseFlatten,
  require_baseFor,
  require_baseGet,
  require_baseGetTag,
  require_baseIsEqual,
  require_baseRest,
  require_baseUnary,
  require_cacheHas,
  require_get,
  require_hasIn,
  require_identity,
  require_isArray,
  require_isArrayLike,
  require_isIterateeCall,
  require_isKey,
  require_isObject,
  require_isObjectLike,
  require_isSymbol,
  require_keys,
  require_last,
  require_nodeUtil,
  require_setToArray,
  require_toKey,
  timeFormat,
  timeParse,
  useSpring,
  useTransition,
  utcFormat,
  utcParse
} from "./chunk-BQN4OYG4.js";
import {
  require_jsx_runtime,
  require_prop_types
} from "./chunk-ZEUX6AFY.js";
import {
  require_react
} from "./chunk-W4EHDCLL.js";
import {
  __commonJS,
  __toESM
} from "./chunk-EWTE5DHJ.js";

// node_modules/lodash/_baseIsMatch.js
var require_baseIsMatch = __commonJS({
  "node_modules/lodash/_baseIsMatch.js"(exports, module) {
    var Stack = require_Stack();
    var baseIsEqual = require_baseIsEqual();
    var COMPARE_PARTIAL_FLAG = 1;
    var COMPARE_UNORDERED_FLAG = 2;
    function baseIsMatch(object, source, matchData, customizer) {
      var index2 = matchData.length, length = index2, noCustomizer = !customizer;
      if (object == null) {
        return !length;
      }
      object = Object(object);
      while (index2--) {
        var data = matchData[index2];
        if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
          return false;
        }
      }
      while (++index2 < length) {
        data = matchData[index2];
        var key = data[0], objValue = object[key], srcValue = data[1];
        if (noCustomizer && data[2]) {
          if (objValue === void 0 && !(key in object)) {
            return false;
          }
        } else {
          var stack = new Stack();
          if (customizer) {
            var result = customizer(objValue, srcValue, key, object, source, stack);
          }
          if (!(result === void 0 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result)) {
            return false;
          }
        }
      }
      return true;
    }
    module.exports = baseIsMatch;
  }
});

// node_modules/lodash/_isStrictComparable.js
var require_isStrictComparable = __commonJS({
  "node_modules/lodash/_isStrictComparable.js"(exports, module) {
    var isObject = require_isObject();
    function isStrictComparable(value) {
      return value === value && !isObject(value);
    }
    module.exports = isStrictComparable;
  }
});

// node_modules/lodash/_getMatchData.js
var require_getMatchData = __commonJS({
  "node_modules/lodash/_getMatchData.js"(exports, module) {
    var isStrictComparable = require_isStrictComparable();
    var keys = require_keys();
    function getMatchData(object) {
      var result = keys(object), length = result.length;
      while (length--) {
        var key = result[length], value = object[key];
        result[length] = [key, value, isStrictComparable(value)];
      }
      return result;
    }
    module.exports = getMatchData;
  }
});

// node_modules/lodash/_matchesStrictComparable.js
var require_matchesStrictComparable = __commonJS({
  "node_modules/lodash/_matchesStrictComparable.js"(exports, module) {
    function matchesStrictComparable(key, srcValue) {
      return function(object) {
        if (object == null) {
          return false;
        }
        return object[key] === srcValue && (srcValue !== void 0 || key in Object(object));
      };
    }
    module.exports = matchesStrictComparable;
  }
});

// node_modules/lodash/_baseMatches.js
var require_baseMatches = __commonJS({
  "node_modules/lodash/_baseMatches.js"(exports, module) {
    var baseIsMatch = require_baseIsMatch();
    var getMatchData = require_getMatchData();
    var matchesStrictComparable = require_matchesStrictComparable();
    function baseMatches(source) {
      var matchData = getMatchData(source);
      if (matchData.length == 1 && matchData[0][2]) {
        return matchesStrictComparable(matchData[0][0], matchData[0][1]);
      }
      return function(object) {
        return object === source || baseIsMatch(object, source, matchData);
      };
    }
    module.exports = baseMatches;
  }
});

// node_modules/lodash/_baseMatchesProperty.js
var require_baseMatchesProperty = __commonJS({
  "node_modules/lodash/_baseMatchesProperty.js"(exports, module) {
    var baseIsEqual = require_baseIsEqual();
    var get = require_get();
    var hasIn = require_hasIn();
    var isKey = require_isKey();
    var isStrictComparable = require_isStrictComparable();
    var matchesStrictComparable = require_matchesStrictComparable();
    var toKey = require_toKey();
    var COMPARE_PARTIAL_FLAG = 1;
    var COMPARE_UNORDERED_FLAG = 2;
    function baseMatchesProperty(path, srcValue) {
      if (isKey(path) && isStrictComparable(srcValue)) {
        return matchesStrictComparable(toKey(path), srcValue);
      }
      return function(object) {
        var objValue = get(object, path);
        return objValue === void 0 && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
      };
    }
    module.exports = baseMatchesProperty;
  }
});

// node_modules/lodash/_baseProperty.js
var require_baseProperty = __commonJS({
  "node_modules/lodash/_baseProperty.js"(exports, module) {
    function baseProperty(key) {
      return function(object) {
        return object == null ? void 0 : object[key];
      };
    }
    module.exports = baseProperty;
  }
});

// node_modules/lodash/_basePropertyDeep.js
var require_basePropertyDeep = __commonJS({
  "node_modules/lodash/_basePropertyDeep.js"(exports, module) {
    var baseGet = require_baseGet();
    function basePropertyDeep(path) {
      return function(object) {
        return baseGet(object, path);
      };
    }
    module.exports = basePropertyDeep;
  }
});

// node_modules/lodash/property.js
var require_property = __commonJS({
  "node_modules/lodash/property.js"(exports, module) {
    var baseProperty = require_baseProperty();
    var basePropertyDeep = require_basePropertyDeep();
    var isKey = require_isKey();
    var toKey = require_toKey();
    function property(path) {
      return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
    }
    module.exports = property;
  }
});

// node_modules/lodash/_baseIteratee.js
var require_baseIteratee = __commonJS({
  "node_modules/lodash/_baseIteratee.js"(exports, module) {
    var baseMatches = require_baseMatches();
    var baseMatchesProperty = require_baseMatchesProperty();
    var identity4 = require_identity();
    var isArray = require_isArray();
    var property = require_property();
    function baseIteratee(value) {
      if (typeof value == "function") {
        return value;
      }
      if (value == null) {
        return identity4;
      }
      if (typeof value == "object") {
        return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
      }
      return property(value);
    }
    module.exports = baseIteratee;
  }
});

// node_modules/lodash/noop.js
var require_noop = __commonJS({
  "node_modules/lodash/noop.js"(exports, module) {
    function noop() {
    }
    module.exports = noop;
  }
});

// node_modules/lodash/_createSet.js
var require_createSet = __commonJS({
  "node_modules/lodash/_createSet.js"(exports, module) {
    var Set2 = require_Set();
    var noop = require_noop();
    var setToArray = require_setToArray();
    var INFINITY = 1 / 0;
    var createSet = !(Set2 && 1 / setToArray(new Set2([, -0]))[1] == INFINITY) ? noop : function(values) {
      return new Set2(values);
    };
    module.exports = createSet;
  }
});

// node_modules/lodash/_baseUniq.js
var require_baseUniq = __commonJS({
  "node_modules/lodash/_baseUniq.js"(exports, module) {
    var SetCache = require_SetCache();
    var arrayIncludes = require_arrayIncludes();
    var arrayIncludesWith = require_arrayIncludesWith();
    var cacheHas = require_cacheHas();
    var createSet = require_createSet();
    var setToArray = require_setToArray();
    var LARGE_ARRAY_SIZE = 200;
    function baseUniq(array2, iteratee, comparator) {
      var index2 = -1, includes = arrayIncludes, length = array2.length, isCommon = true, result = [], seen = result;
      if (comparator) {
        isCommon = false;
        includes = arrayIncludesWith;
      } else if (length >= LARGE_ARRAY_SIZE) {
        var set2 = iteratee ? null : createSet(array2);
        if (set2) {
          return setToArray(set2);
        }
        isCommon = false;
        includes = cacheHas;
        seen = new SetCache();
      } else {
        seen = iteratee ? [] : result;
      }
      outer:
        while (++index2 < length) {
          var value = array2[index2], computed = iteratee ? iteratee(value) : value;
          value = comparator || value !== 0 ? value : 0;
          if (isCommon && computed === computed) {
            var seenIndex = seen.length;
            while (seenIndex--) {
              if (seen[seenIndex] === computed) {
                continue outer;
              }
            }
            if (iteratee) {
              seen.push(computed);
            }
            result.push(value);
          } else if (!includes(seen, computed, comparator)) {
            if (seen !== result) {
              seen.push(computed);
            }
            result.push(value);
          }
        }
      return result;
    }
    module.exports = baseUniq;
  }
});

// node_modules/lodash/uniqBy.js
var require_uniqBy = __commonJS({
  "node_modules/lodash/uniqBy.js"(exports, module) {
    var baseIteratee = require_baseIteratee();
    var baseUniq = require_baseUniq();
    function uniqBy(array2, iteratee) {
      return array2 && array2.length ? baseUniq(array2, baseIteratee(iteratee, 2)) : [];
    }
    module.exports = uniqBy;
  }
});

// node_modules/lodash/uniq.js
var require_uniq = __commonJS({
  "node_modules/lodash/uniq.js"(exports, module) {
    var baseUniq = require_baseUniq();
    function uniq(array2) {
      return array2 && array2.length ? baseUniq(array2) : [];
    }
    module.exports = uniq;
  }
});

// node_modules/lodash/_baseForOwn.js
var require_baseForOwn = __commonJS({
  "node_modules/lodash/_baseForOwn.js"(exports, module) {
    var baseFor = require_baseFor();
    var keys = require_keys();
    function baseForOwn(object, iteratee) {
      return object && baseFor(object, iteratee, keys);
    }
    module.exports = baseForOwn;
  }
});

// node_modules/lodash/_createBaseEach.js
var require_createBaseEach = __commonJS({
  "node_modules/lodash/_createBaseEach.js"(exports, module) {
    var isArrayLike = require_isArrayLike();
    function createBaseEach(eachFunc, fromRight) {
      return function(collection, iteratee) {
        if (collection == null) {
          return collection;
        }
        if (!isArrayLike(collection)) {
          return eachFunc(collection, iteratee);
        }
        var length = collection.length, index2 = fromRight ? length : -1, iterable = Object(collection);
        while (fromRight ? index2-- : ++index2 < length) {
          if (iteratee(iterable[index2], index2, iterable) === false) {
            break;
          }
        }
        return collection;
      };
    }
    module.exports = createBaseEach;
  }
});

// node_modules/lodash/_baseEach.js
var require_baseEach = __commonJS({
  "node_modules/lodash/_baseEach.js"(exports, module) {
    var baseForOwn = require_baseForOwn();
    var createBaseEach = require_createBaseEach();
    var baseEach = createBaseEach(baseForOwn);
    module.exports = baseEach;
  }
});

// node_modules/lodash/_baseMap.js
var require_baseMap = __commonJS({
  "node_modules/lodash/_baseMap.js"(exports, module) {
    var baseEach = require_baseEach();
    var isArrayLike = require_isArrayLike();
    function baseMap(collection, iteratee) {
      var index2 = -1, result = isArrayLike(collection) ? Array(collection.length) : [];
      baseEach(collection, function(value, key, collection2) {
        result[++index2] = iteratee(value, key, collection2);
      });
      return result;
    }
    module.exports = baseMap;
  }
});

// node_modules/lodash/_baseSortBy.js
var require_baseSortBy = __commonJS({
  "node_modules/lodash/_baseSortBy.js"(exports, module) {
    function baseSortBy(array2, comparer) {
      var length = array2.length;
      array2.sort(comparer);
      while (length--) {
        array2[length] = array2[length].value;
      }
      return array2;
    }
    module.exports = baseSortBy;
  }
});

// node_modules/lodash/_compareAscending.js
var require_compareAscending = __commonJS({
  "node_modules/lodash/_compareAscending.js"(exports, module) {
    var isSymbol = require_isSymbol();
    function compareAscending(value, other) {
      if (value !== other) {
        var valIsDefined = value !== void 0, valIsNull = value === null, valIsReflexive = value === value, valIsSymbol = isSymbol(value);
        var othIsDefined = other !== void 0, othIsNull = other === null, othIsReflexive = other === other, othIsSymbol = isSymbol(other);
        if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
          return 1;
        }
        if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
          return -1;
        }
      }
      return 0;
    }
    module.exports = compareAscending;
  }
});

// node_modules/lodash/_compareMultiple.js
var require_compareMultiple = __commonJS({
  "node_modules/lodash/_compareMultiple.js"(exports, module) {
    var compareAscending = require_compareAscending();
    function compareMultiple(object, other, orders) {
      var index2 = -1, objCriteria = object.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length;
      while (++index2 < length) {
        var result = compareAscending(objCriteria[index2], othCriteria[index2]);
        if (result) {
          if (index2 >= ordersLength) {
            return result;
          }
          var order = orders[index2];
          return result * (order == "desc" ? -1 : 1);
        }
      }
      return object.index - other.index;
    }
    module.exports = compareMultiple;
  }
});

// node_modules/lodash/_baseOrderBy.js
var require_baseOrderBy = __commonJS({
  "node_modules/lodash/_baseOrderBy.js"(exports, module) {
    var arrayMap = require_arrayMap();
    var baseGet = require_baseGet();
    var baseIteratee = require_baseIteratee();
    var baseMap = require_baseMap();
    var baseSortBy = require_baseSortBy();
    var baseUnary = require_baseUnary();
    var compareMultiple = require_compareMultiple();
    var identity4 = require_identity();
    var isArray = require_isArray();
    function baseOrderBy(collection, iteratees, orders) {
      if (iteratees.length) {
        iteratees = arrayMap(iteratees, function(iteratee) {
          if (isArray(iteratee)) {
            return function(value) {
              return baseGet(value, iteratee.length === 1 ? iteratee[0] : iteratee);
            };
          }
          return iteratee;
        });
      } else {
        iteratees = [identity4];
      }
      var index2 = -1;
      iteratees = arrayMap(iteratees, baseUnary(baseIteratee));
      var result = baseMap(collection, function(value, key, collection2) {
        var criteria = arrayMap(iteratees, function(iteratee) {
          return iteratee(value);
        });
        return { "criteria": criteria, "index": ++index2, "value": value };
      });
      return baseSortBy(result, function(object, other) {
        return compareMultiple(object, other, orders);
      });
    }
    module.exports = baseOrderBy;
  }
});

// node_modules/lodash/sortBy.js
var require_sortBy = __commonJS({
  "node_modules/lodash/sortBy.js"(exports, module) {
    var baseFlatten = require_baseFlatten();
    var baseOrderBy = require_baseOrderBy();
    var baseRest = require_baseRest();
    var isIterateeCall = require_isIterateeCall();
    var sortBy = baseRest(function(collection, iteratees) {
      if (collection == null) {
        return [];
      }
      var length = iteratees.length;
      if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
        iteratees = [];
      } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
        iteratees = [iteratees[0]];
      }
      return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
    });
    module.exports = sortBy;
  }
});

// node_modules/lodash/_baseIsDate.js
var require_baseIsDate = __commonJS({
  "node_modules/lodash/_baseIsDate.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isObjectLike = require_isObjectLike();
    var dateTag = "[object Date]";
    function baseIsDate(value) {
      return isObjectLike(value) && baseGetTag(value) == dateTag;
    }
    module.exports = baseIsDate;
  }
});

// node_modules/lodash/isDate.js
var require_isDate = __commonJS({
  "node_modules/lodash/isDate.js"(exports, module) {
    var baseIsDate = require_baseIsDate();
    var baseUnary = require_baseUnary();
    var nodeUtil = require_nodeUtil();
    var nodeIsDate = nodeUtil && nodeUtil.isDate;
    var isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;
    module.exports = isDate;
  }
});

// node_modules/@nivo/scales/dist/nivo-scales.es.js
var import_uniq = __toESM(require_uniq());
var import_uniqBy = __toESM(require_uniqBy());
var import_sortBy = __toESM(require_sortBy());
var import_last = __toESM(require_last());
var import_isDate = __toESM(require_isDate());

// node_modules/@nivo/scales/node_modules/d3-array/src/ascending.js
function ascending_default(a2, b2) {
  return a2 < b2 ? -1 : a2 > b2 ? 1 : a2 >= b2 ? 0 : NaN;
}

// node_modules/@nivo/scales/node_modules/d3-array/src/bisector.js
function bisector_default(f) {
  let delta = f;
  let compare = f;
  if (f.length === 1) {
    delta = (d, x) => f(d) - x;
    compare = ascendingComparator(f);
  }
  function left(a2, x, lo, hi) {
    if (lo == null) lo = 0;
    if (hi == null) hi = a2.length;
    while (lo < hi) {
      const mid = lo + hi >>> 1;
      if (compare(a2[mid], x) < 0) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  }
  function right(a2, x, lo, hi) {
    if (lo == null) lo = 0;
    if (hi == null) hi = a2.length;
    while (lo < hi) {
      const mid = lo + hi >>> 1;
      if (compare(a2[mid], x) > 0) hi = mid;
      else lo = mid + 1;
    }
    return lo;
  }
  function center(a2, x, lo, hi) {
    if (lo == null) lo = 0;
    if (hi == null) hi = a2.length;
    const i2 = left(a2, x, lo, hi - 1);
    return i2 > lo && delta(a2[i2 - 1], x) > -delta(a2[i2], x) ? i2 - 1 : i2;
  }
  return { left, center, right };
}
function ascendingComparator(f) {
  return (d, x) => ascending_default(f(d), x);
}

// node_modules/@nivo/scales/node_modules/d3-array/src/number.js
function number_default(x) {
  return x === null ? NaN : +x;
}

// node_modules/@nivo/scales/node_modules/d3-array/src/bisect.js
var ascendingBisect = bisector_default(ascending_default);
var bisectRight = ascendingBisect.right;
var bisectLeft = ascendingBisect.left;
var bisectCenter = bisector_default(number_default).center;
var bisect_default = bisectRight;

// node_modules/@nivo/scales/node_modules/d3-array/src/array.js
var array = Array.prototype;
var slice = array.slice;
var map = array.map;

// node_modules/@nivo/scales/node_modules/d3-array/src/ticks.js
var e10 = Math.sqrt(50);
var e5 = Math.sqrt(10);
var e2 = Math.sqrt(2);
function ticks_default(start, stop, count2) {
  var reverse2, i2 = -1, n3, ticks, step;
  stop = +stop, start = +start, count2 = +count2;
  if (start === stop && count2 > 0) return [start];
  if (reverse2 = stop < start) n3 = start, start = stop, stop = n3;
  if ((step = tickIncrement(start, stop, count2)) === 0 || !isFinite(step)) return [];
  if (step > 0) {
    let r0 = Math.round(start / step), r1 = Math.round(stop / step);
    if (r0 * step < start) ++r0;
    if (r1 * step > stop) --r1;
    ticks = new Array(n3 = r1 - r0 + 1);
    while (++i2 < n3) ticks[i2] = (r0 + i2) * step;
  } else {
    step = -step;
    let r0 = Math.round(start * step), r1 = Math.round(stop * step);
    if (r0 / step < start) ++r0;
    if (r1 / step > stop) --r1;
    ticks = new Array(n3 = r1 - r0 + 1);
    while (++i2 < n3) ticks[i2] = (r0 + i2) / step;
  }
  if (reverse2) ticks.reverse();
  return ticks;
}
function tickIncrement(start, stop, count2) {
  var step = (stop - start) / Math.max(0, count2), power = Math.floor(Math.log(step) / Math.LN10), error = step / Math.pow(10, power);
  return power >= 0 ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power) : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
}
function tickStep(start, stop, count2) {
  var step0 = Math.abs(stop - start) / Math.max(0, count2), step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)), error = step0 / step1;
  if (error >= e10) step1 *= 10;
  else if (error >= e5) step1 *= 5;
  else if (error >= e2) step1 *= 2;
  return stop < start ? -step1 : step1;
}

// node_modules/@nivo/scales/node_modules/d3-array/src/range.js
function range_default(start, stop, step) {
  start = +start, stop = +stop, step = (n3 = arguments.length) < 2 ? (stop = start, start = 0, 1) : n3 < 3 ? 1 : +step;
  var i2 = -1, n3 = Math.max(0, Math.ceil((stop - start) / step)) | 0, range = new Array(n3);
  while (++i2 < n3) {
    range[i2] = start + i2 * step;
  }
  return range;
}

// node_modules/@nivo/scales/node_modules/d3-array/src/shuffle.js
var shuffle_default = shuffler(Math.random);
function shuffler(random) {
  return function shuffle(array2, i0 = 0, i1 = array2.length) {
    let m = i1 - (i0 = +i0);
    while (m) {
      const i2 = random() * m-- | 0, t5 = array2[m + i0];
      array2[m + i0] = array2[i2 + i0];
      array2[i2 + i0] = t5;
    }
    return array2;
  };
}

// node_modules/@nivo/scales/node_modules/d3-scale/src/init.js
function initRange(domain, range) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(domain);
      break;
    default:
      this.range(range).domain(domain);
      break;
  }
  return this;
}

// node_modules/@nivo/scales/node_modules/d3-scale/src/ordinal.js
var implicit = Symbol("implicit");
function ordinal() {
  var index2 = /* @__PURE__ */ new Map(), domain = [], range = [], unknown = implicit;
  function scale(d) {
    var key = d + "", i2 = index2.get(key);
    if (!i2) {
      if (unknown !== implicit) return unknown;
      index2.set(key, i2 = domain.push(d));
    }
    return range[(i2 - 1) % range.length];
  }
  scale.domain = function(_2) {
    if (!arguments.length) return domain.slice();
    domain = [], index2 = /* @__PURE__ */ new Map();
    for (const value of _2) {
      const key = value + "";
      if (index2.has(key)) continue;
      index2.set(key, domain.push(value));
    }
    return scale;
  };
  scale.range = function(_2) {
    return arguments.length ? (range = Array.from(_2), scale) : range.slice();
  };
  scale.unknown = function(_2) {
    return arguments.length ? (unknown = _2, scale) : unknown;
  };
  scale.copy = function() {
    return ordinal(domain, range).unknown(unknown);
  };
  initRange.apply(scale, arguments);
  return scale;
}

// node_modules/@nivo/scales/node_modules/d3-scale/src/band.js
function band() {
  var scale = ordinal().unknown(void 0), domain = scale.domain, ordinalRange = scale.range, r0 = 0, r1 = 1, step, bandwidth, round = false, paddingInner = 0, paddingOuter = 0, align = 0.5;
  delete scale.unknown;
  function rescale() {
    var n3 = domain().length, reverse2 = r1 < r0, start = reverse2 ? r1 : r0, stop = reverse2 ? r0 : r1;
    step = (stop - start) / Math.max(1, n3 - paddingInner + paddingOuter * 2);
    if (round) step = Math.floor(step);
    start += (stop - start - step * (n3 - paddingInner)) * align;
    bandwidth = step * (1 - paddingInner);
    if (round) start = Math.round(start), bandwidth = Math.round(bandwidth);
    var values = range_default(n3).map(function(i2) {
      return start + step * i2;
    });
    return ordinalRange(reverse2 ? values.reverse() : values);
  }
  scale.domain = function(_2) {
    return arguments.length ? (domain(_2), rescale()) : domain();
  };
  scale.range = function(_2) {
    return arguments.length ? ([r0, r1] = _2, r0 = +r0, r1 = +r1, rescale()) : [r0, r1];
  };
  scale.rangeRound = function(_2) {
    return [r0, r1] = _2, r0 = +r0, r1 = +r1, round = true, rescale();
  };
  scale.bandwidth = function() {
    return bandwidth;
  };
  scale.step = function() {
    return step;
  };
  scale.round = function(_2) {
    return arguments.length ? (round = !!_2, rescale()) : round;
  };
  scale.padding = function(_2) {
    return arguments.length ? (paddingInner = Math.min(1, paddingOuter = +_2), rescale()) : paddingInner;
  };
  scale.paddingInner = function(_2) {
    return arguments.length ? (paddingInner = Math.min(1, _2), rescale()) : paddingInner;
  };
  scale.paddingOuter = function(_2) {
    return arguments.length ? (paddingOuter = +_2, rescale()) : paddingOuter;
  };
  scale.align = function(_2) {
    return arguments.length ? (align = Math.max(0, Math.min(1, _2)), rescale()) : align;
  };
  scale.copy = function() {
    return band(domain(), [r0, r1]).round(round).paddingInner(paddingInner).paddingOuter(paddingOuter).align(align);
  };
  return initRange.apply(rescale(), arguments);
}
function pointish(scale) {
  var copy3 = scale.copy;
  scale.padding = scale.paddingOuter;
  delete scale.paddingInner;
  delete scale.paddingOuter;
  scale.copy = function() {
    return pointish(copy3());
  };
  return scale;
}
function point() {
  return pointish(band.apply(null, arguments).paddingInner(1));
}

// node_modules/@nivo/scales/node_modules/d3-color/src/define.js
function define_default(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}
function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}

// node_modules/@nivo/scales/node_modules/d3-color/src/color.js
function Color() {
}
var darker = 0.7;
var brighter = 1 / darker;
var reI = "\\s*([+-]?\\d+)\\s*";
var reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*";
var reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
var reHex = /^#([0-9a-f]{3,8})$/;
var reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$");
var reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$");
var reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$");
var reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$");
var reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$");
var reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");
var named = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
define_default(Color, color, {
  copy: function(channels) {
    return Object.assign(new this.constructor(), this, channels);
  },
  displayable: function() {
    return this.rgb().displayable();
  },
  hex: color_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});
function color_formatHex() {
  return this.rgb().formatHex();
}
function color_formatHsl() {
  return hslConvert(this).formatHsl();
}
function color_formatRgb() {
  return this.rgb().formatRgb();
}
function color(format2) {
  var m, l;
  format2 = (format2 + "").trim().toLowerCase();
  return (m = reHex.exec(format2)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) : l === 3 ? new Rgb(m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, (m & 15) << 4 | m & 15, 1) : l === 8 ? rgba(m >> 24 & 255, m >> 16 & 255, m >> 8 & 255, (m & 255) / 255) : l === 4 ? rgba(m >> 12 & 15 | m >> 8 & 240, m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, ((m & 15) << 4 | m & 15) / 255) : null) : (m = reRgbInteger.exec(format2)) ? new Rgb(m[1], m[2], m[3], 1) : (m = reRgbPercent.exec(format2)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) : (m = reRgbaInteger.exec(format2)) ? rgba(m[1], m[2], m[3], m[4]) : (m = reRgbaPercent.exec(format2)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) : (m = reHslPercent.exec(format2)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) : (m = reHslaPercent.exec(format2)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) : named.hasOwnProperty(format2) ? rgbn(named[format2]) : format2 === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}
function rgbn(n3) {
  return new Rgb(n3 >> 16 & 255, n3 >> 8 & 255, n3 & 255, 1);
}
function rgba(r3, g2, b2, a2) {
  if (a2 <= 0) r3 = g2 = b2 = NaN;
  return new Rgb(r3, g2, b2, a2);
}
function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb();
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}
function rgb(r3, g2, b2, opacity) {
  return arguments.length === 1 ? rgbConvert(r3) : new Rgb(r3, g2, b2, opacity == null ? 1 : opacity);
}
function Rgb(r3, g2, b2, opacity) {
  this.r = +r3;
  this.g = +g2;
  this.b = +b2;
  this.opacity = +opacity;
}
define_default(Rgb, rgb, extend(Color, {
  brighter: function(k2) {
    k2 = k2 == null ? brighter : Math.pow(brighter, k2);
    return new Rgb(this.r * k2, this.g * k2, this.b * k2, this.opacity);
  },
  darker: function(k2) {
    k2 = k2 == null ? darker : Math.pow(darker, k2);
    return new Rgb(this.r * k2, this.g * k2, this.b * k2, this.opacity);
  },
  rgb: function() {
    return this;
  },
  displayable: function() {
    return -0.5 <= this.r && this.r < 255.5 && (-0.5 <= this.g && this.g < 255.5) && (-0.5 <= this.b && this.b < 255.5) && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));
function rgb_formatHex() {
  return "#" + hex(this.r) + hex(this.g) + hex(this.b);
}
function rgb_formatRgb() {
  var a2 = this.opacity;
  a2 = isNaN(a2) ? 1 : Math.max(0, Math.min(1, a2));
  return (a2 === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a2 === 1 ? ")" : ", " + a2 + ")");
}
function hex(value) {
  value = Math.max(0, Math.min(255, Math.round(value) || 0));
  return (value < 16 ? "0" : "") + value.toString(16);
}
function hsla(h2, s, l, a2) {
  if (a2 <= 0) h2 = s = l = NaN;
  else if (l <= 0 || l >= 1) h2 = s = NaN;
  else if (s <= 0) h2 = NaN;
  return new Hsl(h2, s, l, a2);
}
function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl();
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r3 = o.r / 255, g2 = o.g / 255, b2 = o.b / 255, min2 = Math.min(r3, g2, b2), max2 = Math.max(r3, g2, b2), h2 = NaN, s = max2 - min2, l = (max2 + min2) / 2;
  if (s) {
    if (r3 === max2) h2 = (g2 - b2) / s + (g2 < b2) * 6;
    else if (g2 === max2) h2 = (b2 - r3) / s + 2;
    else h2 = (r3 - g2) / s + 4;
    s /= l < 0.5 ? max2 + min2 : 2 - max2 - min2;
    h2 *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h2;
  }
  return new Hsl(h2, s, l, o.opacity);
}
function hsl(h2, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h2) : new Hsl(h2, s, l, opacity == null ? 1 : opacity);
}
function Hsl(h2, s, l, opacity) {
  this.h = +h2;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}
define_default(Hsl, hsl, extend(Color, {
  brighter: function(k2) {
    k2 = k2 == null ? brighter : Math.pow(brighter, k2);
    return new Hsl(this.h, this.s, this.l * k2, this.opacity);
  },
  darker: function(k2) {
    k2 = k2 == null ? darker : Math.pow(darker, k2);
    return new Hsl(this.h, this.s, this.l * k2, this.opacity);
  },
  rgb: function() {
    var h2 = this.h % 360 + (this.h < 0) * 360, s = isNaN(h2) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s, m1 = 2 * l - m2;
    return new Rgb(
      hsl2rgb(h2 >= 240 ? h2 - 240 : h2 + 120, m1, m2),
      hsl2rgb(h2, m1, m2),
      hsl2rgb(h2 < 120 ? h2 + 240 : h2 - 120, m1, m2),
      this.opacity
    );
  },
  displayable: function() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && (0 <= this.l && this.l <= 1) && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl: function() {
    var a2 = this.opacity;
    a2 = isNaN(a2) ? 1 : Math.max(0, Math.min(1, a2));
    return (a2 === 1 ? "hsl(" : "hsla(") + (this.h || 0) + ", " + (this.s || 0) * 100 + "%, " + (this.l || 0) * 100 + "%" + (a2 === 1 ? ")" : ", " + a2 + ")");
  }
}));
function hsl2rgb(h2, m1, m2) {
  return (h2 < 60 ? m1 + (m2 - m1) * h2 / 60 : h2 < 180 ? m2 : h2 < 240 ? m1 + (m2 - m1) * (240 - h2) / 60 : m1) * 255;
}

// node_modules/@nivo/scales/node_modules/d3-color/src/math.js
var radians = Math.PI / 180;
var degrees = 180 / Math.PI;

// node_modules/@nivo/scales/node_modules/d3-color/src/lab.js
var K = 18;
var Xn = 0.96422;
var Yn = 1;
var Zn = 0.82521;
var t0 = 4 / 29;
var t1 = 6 / 29;
var t2 = 3 * t1 * t1;
var t3 = t1 * t1 * t1;
function labConvert(o) {
  if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);
  if (o instanceof Hcl) return hcl2lab(o);
  if (!(o instanceof Rgb)) o = rgbConvert(o);
  var r3 = rgb2lrgb(o.r), g2 = rgb2lrgb(o.g), b2 = rgb2lrgb(o.b), y = xyz2lab((0.2225045 * r3 + 0.7168786 * g2 + 0.0606169 * b2) / Yn), x, z2;
  if (r3 === g2 && g2 === b2) x = z2 = y;
  else {
    x = xyz2lab((0.4360747 * r3 + 0.3850649 * g2 + 0.1430804 * b2) / Xn);
    z2 = xyz2lab((0.0139322 * r3 + 0.0971045 * g2 + 0.7141733 * b2) / Zn);
  }
  return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z2), o.opacity);
}
function lab(l, a2, b2, opacity) {
  return arguments.length === 1 ? labConvert(l) : new Lab(l, a2, b2, opacity == null ? 1 : opacity);
}
function Lab(l, a2, b2, opacity) {
  this.l = +l;
  this.a = +a2;
  this.b = +b2;
  this.opacity = +opacity;
}
define_default(Lab, lab, extend(Color, {
  brighter: function(k2) {
    return new Lab(this.l + K * (k2 == null ? 1 : k2), this.a, this.b, this.opacity);
  },
  darker: function(k2) {
    return new Lab(this.l - K * (k2 == null ? 1 : k2), this.a, this.b, this.opacity);
  },
  rgb: function() {
    var y = (this.l + 16) / 116, x = isNaN(this.a) ? y : y + this.a / 500, z2 = isNaN(this.b) ? y : y - this.b / 200;
    x = Xn * lab2xyz(x);
    y = Yn * lab2xyz(y);
    z2 = Zn * lab2xyz(z2);
    return new Rgb(
      lrgb2rgb(3.1338561 * x - 1.6168667 * y - 0.4906146 * z2),
      lrgb2rgb(-0.9787684 * x + 1.9161415 * y + 0.033454 * z2),
      lrgb2rgb(0.0719453 * x - 0.2289914 * y + 1.4052427 * z2),
      this.opacity
    );
  }
}));
function xyz2lab(t5) {
  return t5 > t3 ? Math.pow(t5, 1 / 3) : t5 / t2 + t0;
}
function lab2xyz(t5) {
  return t5 > t1 ? t5 * t5 * t5 : t2 * (t5 - t0);
}
function lrgb2rgb(x) {
  return 255 * (x <= 31308e-7 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
}
function rgb2lrgb(x) {
  return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}
function hclConvert(o) {
  if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
  if (!(o instanceof Lab)) o = labConvert(o);
  if (o.a === 0 && o.b === 0) return new Hcl(NaN, 0 < o.l && o.l < 100 ? 0 : NaN, o.l, o.opacity);
  var h2 = Math.atan2(o.b, o.a) * degrees;
  return new Hcl(h2 < 0 ? h2 + 360 : h2, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
}
function hcl(h2, c, l, opacity) {
  return arguments.length === 1 ? hclConvert(h2) : new Hcl(h2, c, l, opacity == null ? 1 : opacity);
}
function Hcl(h2, c, l, opacity) {
  this.h = +h2;
  this.c = +c;
  this.l = +l;
  this.opacity = +opacity;
}
function hcl2lab(o) {
  if (isNaN(o.h)) return new Lab(o.l, 0, 0, o.opacity);
  var h2 = o.h * radians;
  return new Lab(o.l, Math.cos(h2) * o.c, Math.sin(h2) * o.c, o.opacity);
}
define_default(Hcl, hcl, extend(Color, {
  brighter: function(k2) {
    return new Hcl(this.h, this.c, this.l + K * (k2 == null ? 1 : k2), this.opacity);
  },
  darker: function(k2) {
    return new Hcl(this.h, this.c, this.l - K * (k2 == null ? 1 : k2), this.opacity);
  },
  rgb: function() {
    return hcl2lab(this).rgb();
  }
}));

// node_modules/@nivo/scales/node_modules/d3-color/src/cubehelix.js
var A = -0.14861;
var B = 1.78277;
var C = -0.29227;
var D = -0.90649;
var E = 1.97294;
var ED = E * D;
var EB = E * B;
var BC_DA = B * C - D * A;
function cubehelixConvert(o) {
  if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Rgb)) o = rgbConvert(o);
  var r3 = o.r / 255, g2 = o.g / 255, b2 = o.b / 255, l = (BC_DA * b2 + ED * r3 - EB * g2) / (BC_DA + ED - EB), bl = b2 - l, k2 = (E * (g2 - l) - C * bl) / D, s = Math.sqrt(k2 * k2 + bl * bl) / (E * l * (1 - l)), h2 = s ? Math.atan2(k2, bl) * degrees - 120 : NaN;
  return new Cubehelix(h2 < 0 ? h2 + 360 : h2, s, l, o.opacity);
}
function cubehelix(h2, s, l, opacity) {
  return arguments.length === 1 ? cubehelixConvert(h2) : new Cubehelix(h2, s, l, opacity == null ? 1 : opacity);
}
function Cubehelix(h2, s, l, opacity) {
  this.h = +h2;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}
define_default(Cubehelix, cubehelix, extend(Color, {
  brighter: function(k2) {
    k2 = k2 == null ? brighter : Math.pow(brighter, k2);
    return new Cubehelix(this.h, this.s, this.l * k2, this.opacity);
  },
  darker: function(k2) {
    k2 = k2 == null ? darker : Math.pow(darker, k2);
    return new Cubehelix(this.h, this.s, this.l * k2, this.opacity);
  },
  rgb: function() {
    var h2 = isNaN(this.h) ? 0 : (this.h + 120) * radians, l = +this.l, a2 = isNaN(this.s) ? 0 : this.s * l * (1 - l), cosh2 = Math.cos(h2), sinh2 = Math.sin(h2);
    return new Rgb(
      255 * (l + a2 * (A * cosh2 + B * sinh2)),
      255 * (l + a2 * (C * cosh2 + D * sinh2)),
      255 * (l + a2 * (E * cosh2)),
      this.opacity
    );
  }
}));

// node_modules/@nivo/scales/node_modules/d3-interpolate/src/basis.js
function basis(t14, v0, v1, v2, v3) {
  var t22 = t14 * t14, t32 = t22 * t14;
  return ((1 - 3 * t14 + 3 * t22 - t32) * v0 + (4 - 6 * t22 + 3 * t32) * v1 + (1 + 3 * t14 + 3 * t22 - 3 * t32) * v2 + t32 * v3) / 6;
}
function basis_default(values) {
  var n3 = values.length - 1;
  return function(t5) {
    var i2 = t5 <= 0 ? t5 = 0 : t5 >= 1 ? (t5 = 1, n3 - 1) : Math.floor(t5 * n3), v1 = values[i2], v2 = values[i2 + 1], v0 = i2 > 0 ? values[i2 - 1] : 2 * v1 - v2, v3 = i2 < n3 - 1 ? values[i2 + 2] : 2 * v2 - v1;
    return basis((t5 - i2 / n3) * n3, v0, v1, v2, v3);
  };
}

// node_modules/@nivo/scales/node_modules/d3-interpolate/src/basisClosed.js
function basisClosed_default(values) {
  var n3 = values.length;
  return function(t5) {
    var i2 = Math.floor(((t5 %= 1) < 0 ? ++t5 : t5) * n3), v0 = values[(i2 + n3 - 1) % n3], v1 = values[i2 % n3], v2 = values[(i2 + 1) % n3], v3 = values[(i2 + 2) % n3];
    return basis((t5 - i2 / n3) * n3, v0, v1, v2, v3);
  };
}

// node_modules/@nivo/scales/node_modules/d3-interpolate/src/constant.js
var constant_default2 = (x) => () => x;

// node_modules/@nivo/scales/node_modules/d3-interpolate/src/color.js
function linear(a2, d) {
  return function(t5) {
    return a2 + t5 * d;
  };
}
function exponential(a2, b2, y) {
  return a2 = Math.pow(a2, y), b2 = Math.pow(b2, y) - a2, y = 1 / y, function(t5) {
    return Math.pow(a2 + t5 * b2, y);
  };
}
function hue(a2, b2) {
  var d = b2 - a2;
  return d ? linear(a2, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant_default2(isNaN(a2) ? b2 : a2);
}
function gamma(y) {
  return (y = +y) === 1 ? nogamma : function(a2, b2) {
    return b2 - a2 ? exponential(a2, b2, y) : constant_default2(isNaN(a2) ? b2 : a2);
  };
}
function nogamma(a2, b2) {
  var d = b2 - a2;
  return d ? linear(a2, d) : constant_default2(isNaN(a2) ? b2 : a2);
}

// node_modules/@nivo/scales/node_modules/d3-interpolate/src/rgb.js
var rgb_default = function rgbGamma(y) {
  var color2 = gamma(y);
  function rgb2(start, end) {
    var r3 = color2((start = rgb(start)).r, (end = rgb(end)).r), g2 = color2(start.g, end.g), b2 = color2(start.b, end.b), opacity = nogamma(start.opacity, end.opacity);
    return function(t5) {
      start.r = r3(t5);
      start.g = g2(t5);
      start.b = b2(t5);
      start.opacity = opacity(t5);
      return start + "";
    };
  }
  rgb2.gamma = rgbGamma;
  return rgb2;
}(1);
function rgbSpline(spline) {
  return function(colors) {
    var n3 = colors.length, r3 = new Array(n3), g2 = new Array(n3), b2 = new Array(n3), i2, color2;
    for (i2 = 0; i2 < n3; ++i2) {
      color2 = rgb(colors[i2]);
      r3[i2] = color2.r || 0;
      g2[i2] = color2.g || 0;
      b2[i2] = color2.b || 0;
    }
    r3 = spline(r3);
    g2 = spline(g2);
    b2 = spline(b2);
    color2.opacity = 1;
    return function(t5) {
      color2.r = r3(t5);
      color2.g = g2(t5);
      color2.b = b2(t5);
      return color2 + "";
    };
  };
}
var rgbBasis = rgbSpline(basis_default);
var rgbBasisClosed = rgbSpline(basisClosed_default);

// node_modules/@nivo/scales/node_modules/d3-interpolate/src/numberArray.js
function numberArray_default(a2, b2) {
  if (!b2) b2 = [];
  var n3 = a2 ? Math.min(b2.length, a2.length) : 0, c = b2.slice(), i2;
  return function(t5) {
    for (i2 = 0; i2 < n3; ++i2) c[i2] = a2[i2] * (1 - t5) + b2[i2] * t5;
    return c;
  };
}
function isNumberArray(x) {
  return ArrayBuffer.isView(x) && !(x instanceof DataView);
}

// node_modules/@nivo/scales/node_modules/d3-interpolate/src/array.js
function genericArray(a2, b2) {
  var nb = b2 ? b2.length : 0, na = a2 ? Math.min(nb, a2.length) : 0, x = new Array(na), c = new Array(nb), i2;
  for (i2 = 0; i2 < na; ++i2) x[i2] = value_default(a2[i2], b2[i2]);
  for (; i2 < nb; ++i2) c[i2] = b2[i2];
  return function(t5) {
    for (i2 = 0; i2 < na; ++i2) c[i2] = x[i2](t5);
    return c;
  };
}

// node_modules/@nivo/scales/node_modules/d3-interpolate/src/date.js
function date_default(a2, b2) {
  var d = /* @__PURE__ */ new Date();
  return a2 = +a2, b2 = +b2, function(t5) {
    return d.setTime(a2 * (1 - t5) + b2 * t5), d;
  };
}

// node_modules/@nivo/scales/node_modules/d3-interpolate/src/number.js
function number_default2(a2, b2) {
  return a2 = +a2, b2 = +b2, function(t5) {
    return a2 * (1 - t5) + b2 * t5;
  };
}

// node_modules/@nivo/scales/node_modules/d3-interpolate/src/object.js
function object_default(a2, b2) {
  var i2 = {}, c = {}, k2;
  if (a2 === null || typeof a2 !== "object") a2 = {};
  if (b2 === null || typeof b2 !== "object") b2 = {};
  for (k2 in b2) {
    if (k2 in a2) {
      i2[k2] = value_default(a2[k2], b2[k2]);
    } else {
      c[k2] = b2[k2];
    }
  }
  return function(t5) {
    for (k2 in i2) c[k2] = i2[k2](t5);
    return c;
  };
}

// node_modules/@nivo/scales/node_modules/d3-interpolate/src/string.js
var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
var reB = new RegExp(reA.source, "g");
function zero(b2) {
  return function() {
    return b2;
  };
}
function one(b2) {
  return function(t5) {
    return b2(t5) + "";
  };
}
function string_default(a2, b2) {
  var bi = reA.lastIndex = reB.lastIndex = 0, am, bm, bs, i2 = -1, s = [], q = [];
  a2 = a2 + "", b2 = b2 + "";
  while ((am = reA.exec(a2)) && (bm = reB.exec(b2))) {
    if ((bs = bm.index) > bi) {
      bs = b2.slice(bi, bs);
      if (s[i2]) s[i2] += bs;
      else s[++i2] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) {
      if (s[i2]) s[i2] += bm;
      else s[++i2] = bm;
    } else {
      s[++i2] = null;
      q.push({ i: i2, x: number_default2(am, bm) });
    }
    bi = reB.lastIndex;
  }
  if (bi < b2.length) {
    bs = b2.slice(bi);
    if (s[i2]) s[i2] += bs;
    else s[++i2] = bs;
  }
  return s.length < 2 ? q[0] ? one(q[0].x) : zero(b2) : (b2 = q.length, function(t5) {
    for (var i3 = 0, o; i3 < b2; ++i3) s[(o = q[i3]).i] = o.x(t5);
    return s.join("");
  });
}

// node_modules/@nivo/scales/node_modules/d3-interpolate/src/value.js
function value_default(a2, b2) {
  var t5 = typeof b2, c;
  return b2 == null || t5 === "boolean" ? constant_default2(b2) : (t5 === "number" ? number_default2 : t5 === "string" ? (c = color(b2)) ? (b2 = c, rgb_default) : string_default : b2 instanceof color ? rgb_default : b2 instanceof Date ? date_default : isNumberArray(b2) ? numberArray_default : Array.isArray(b2) ? genericArray : typeof b2.valueOf !== "function" && typeof b2.toString !== "function" || isNaN(b2) ? object_default : number_default2)(a2, b2);
}

// node_modules/@nivo/scales/node_modules/d3-interpolate/src/round.js
function round_default(a2, b2) {
  return a2 = +a2, b2 = +b2, function(t5) {
    return Math.round(a2 * (1 - t5) + b2 * t5);
  };
}

// node_modules/@nivo/scales/node_modules/d3-interpolate/src/transform/decompose.js
var degrees2 = 180 / Math.PI;
var identity = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function decompose_default(a2, b2, c, d, e4, f) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a2 * a2 + b2 * b2)) a2 /= scaleX, b2 /= scaleX;
  if (skewX = a2 * c + b2 * d) c -= a2 * skewX, d -= b2 * skewX;
  if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a2 * d < b2 * c) a2 = -a2, b2 = -b2, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e4,
    translateY: f,
    rotate: Math.atan2(b2, a2) * degrees2,
    skewX: Math.atan(skewX) * degrees2,
    scaleX,
    scaleY
  };
}

// node_modules/@nivo/scales/node_modules/d3-interpolate/src/transform/parse.js
var svgNode;
function parseCss(value) {
  const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
  return m.isIdentity ? identity : decompose_default(m.a, m.b, m.c, m.d, m.e, m.f);
}
function parseSvg(value) {
  if (value == null) return identity;
  if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate())) return identity;
  value = value.matrix;
  return decompose_default(value.a, value.b, value.c, value.d, value.e, value.f);
}

// node_modules/@nivo/scales/node_modules/d3-interpolate/src/transform/index.js
function interpolateTransform(parse, pxComma, pxParen, degParen) {
  function pop(s) {
    return s.length ? s.pop() + " " : "";
  }
  function translate(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i2 = s.push("translate(", null, pxComma, null, pxParen);
      q.push({ i: i2 - 4, x: number_default2(xa, xb) }, { i: i2 - 2, x: number_default2(ya, yb) });
    } else if (xb || yb) {
      s.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }
  function rotate(a2, b2, s, q) {
    if (a2 !== b2) {
      if (a2 - b2 > 180) b2 += 360;
      else if (b2 - a2 > 180) a2 += 360;
      q.push({ i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: number_default2(a2, b2) });
    } else if (b2) {
      s.push(pop(s) + "rotate(" + b2 + degParen);
    }
  }
  function skewX(a2, b2, s, q) {
    if (a2 !== b2) {
      q.push({ i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: number_default2(a2, b2) });
    } else if (b2) {
      s.push(pop(s) + "skewX(" + b2 + degParen);
    }
  }
  function scale(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i2 = s.push(pop(s) + "scale(", null, ",", null, ")");
      q.push({ i: i2 - 4, x: number_default2(xa, xb) }, { i: i2 - 2, x: number_default2(ya, yb) });
    } else if (xb !== 1 || yb !== 1) {
      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
    }
  }
  return function(a2, b2) {
    var s = [], q = [];
    a2 = parse(a2), b2 = parse(b2);
    translate(a2.translateX, a2.translateY, b2.translateX, b2.translateY, s, q);
    rotate(a2.rotate, b2.rotate, s, q);
    skewX(a2.skewX, b2.skewX, s, q);
    scale(a2.scaleX, a2.scaleY, b2.scaleX, b2.scaleY, s, q);
    a2 = b2 = null;
    return function(t5) {
      var i2 = -1, n3 = q.length, o;
      while (++i2 < n3) s[(o = q[i2]).i] = o.x(t5);
      return s.join("");
    };
  };
}
var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

// node_modules/@nivo/scales/node_modules/d3-interpolate/src/zoom.js
var epsilon2 = 1e-12;
function cosh(x) {
  return ((x = Math.exp(x)) + 1 / x) / 2;
}
function sinh(x) {
  return ((x = Math.exp(x)) - 1 / x) / 2;
}
function tanh(x) {
  return ((x = Math.exp(2 * x)) - 1) / (x + 1);
}
var zoom_default = function zoomRho(rho, rho2, rho4) {
  function zoom(p0, p1) {
    var ux0 = p0[0], uy0 = p0[1], w0 = p0[2], ux1 = p1[0], uy1 = p1[1], w1 = p1[2], dx = ux1 - ux0, dy = uy1 - uy0, d2 = dx * dx + dy * dy, i2, S2;
    if (d2 < epsilon2) {
      S2 = Math.log(w1 / w0) / rho;
      i2 = function(t5) {
        return [
          ux0 + t5 * dx,
          uy0 + t5 * dy,
          w0 * Math.exp(rho * t5 * S2)
        ];
      };
    } else {
      var d1 = Math.sqrt(d2), b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1), b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1), r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0), r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
      S2 = (r1 - r0) / rho;
      i2 = function(t5) {
        var s = t5 * S2, coshr0 = cosh(r0), u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
        return [
          ux0 + u * dx,
          uy0 + u * dy,
          w0 * coshr0 / cosh(rho * s + r0)
        ];
      };
    }
    i2.duration = S2 * 1e3 * rho / Math.SQRT2;
    return i2;
  }
  zoom.rho = function(_2) {
    var _1 = Math.max(1e-3, +_2), _22 = _1 * _1, _4 = _22 * _22;
    return zoomRho(_1, _22, _4);
  };
  return zoom;
}(Math.SQRT2, 2, 4);

// node_modules/@nivo/scales/node_modules/d3-interpolate/src/hsl.js
function hsl2(hue2) {
  return function(start, end) {
    var h2 = hue2((start = hsl(start)).h, (end = hsl(end)).h), s = nogamma(start.s, end.s), l = nogamma(start.l, end.l), opacity = nogamma(start.opacity, end.opacity);
    return function(t5) {
      start.h = h2(t5);
      start.s = s(t5);
      start.l = l(t5);
      start.opacity = opacity(t5);
      return start + "";
    };
  };
}
var hsl_default = hsl2(hue);
var hslLong = hsl2(nogamma);

// node_modules/@nivo/scales/node_modules/d3-interpolate/src/hcl.js
function hcl2(hue2) {
  return function(start, end) {
    var h2 = hue2((start = hcl(start)).h, (end = hcl(end)).h), c = nogamma(start.c, end.c), l = nogamma(start.l, end.l), opacity = nogamma(start.opacity, end.opacity);
    return function(t5) {
      start.h = h2(t5);
      start.c = c(t5);
      start.l = l(t5);
      start.opacity = opacity(t5);
      return start + "";
    };
  };
}
var hcl_default = hcl2(hue);
var hclLong = hcl2(nogamma);

// node_modules/@nivo/scales/node_modules/d3-interpolate/src/cubehelix.js
function cubehelix2(hue2) {
  return function cubehelixGamma(y) {
    y = +y;
    function cubehelix3(start, end) {
      var h2 = hue2((start = cubehelix(start)).h, (end = cubehelix(end)).h), s = nogamma(start.s, end.s), l = nogamma(start.l, end.l), opacity = nogamma(start.opacity, end.opacity);
      return function(t5) {
        start.h = h2(t5);
        start.s = s(t5);
        start.l = l(Math.pow(t5, y));
        start.opacity = opacity(t5);
        return start + "";
      };
    }
    cubehelix3.gamma = cubehelixGamma;
    return cubehelix3;
  }(1);
}
var cubehelix_default = cubehelix2(hue);
var cubehelixLong = cubehelix2(nogamma);

// node_modules/@nivo/scales/node_modules/d3-scale/src/constant.js
function constants(x) {
  return function() {
    return x;
  };
}

// node_modules/@nivo/scales/node_modules/d3-scale/src/number.js
function number(x) {
  return +x;
}

// node_modules/@nivo/scales/node_modules/d3-scale/src/continuous.js
var unit = [0, 1];
function identity2(x) {
  return x;
}
function normalize(a2, b2) {
  return (b2 -= a2 = +a2) ? function(x) {
    return (x - a2) / b2;
  } : constants(isNaN(b2) ? NaN : 0.5);
}
function clamper(a2, b2) {
  var t5;
  if (a2 > b2) t5 = a2, a2 = b2, b2 = t5;
  return function(x) {
    return Math.max(a2, Math.min(b2, x));
  };
}
function bimap(domain, range, interpolate) {
  var d0 = domain[0], d1 = domain[1], r0 = range[0], r1 = range[1];
  if (d1 < d0) d0 = normalize(d1, d0), r0 = interpolate(r1, r0);
  else d0 = normalize(d0, d1), r0 = interpolate(r0, r1);
  return function(x) {
    return r0(d0(x));
  };
}
function polymap(domain, range, interpolate) {
  var j2 = Math.min(domain.length, range.length) - 1, d = new Array(j2), r3 = new Array(j2), i2 = -1;
  if (domain[j2] < domain[0]) {
    domain = domain.slice().reverse();
    range = range.slice().reverse();
  }
  while (++i2 < j2) {
    d[i2] = normalize(domain[i2], domain[i2 + 1]);
    r3[i2] = interpolate(range[i2], range[i2 + 1]);
  }
  return function(x) {
    var i3 = bisect_default(domain, x, 1, j2) - 1;
    return r3[i3](d[i3](x));
  };
}
function copy(source, target) {
  return target.domain(source.domain()).range(source.range()).interpolate(source.interpolate()).clamp(source.clamp()).unknown(source.unknown());
}
function transformer() {
  var domain = unit, range = unit, interpolate = value_default, transform, untransform, unknown, clamp = identity2, piecewise2, output, input;
  function rescale() {
    var n3 = Math.min(domain.length, range.length);
    if (clamp !== identity2) clamp = clamper(domain[0], domain[n3 - 1]);
    piecewise2 = n3 > 2 ? polymap : bimap;
    output = input = null;
    return scale;
  }
  function scale(x) {
    return x == null || isNaN(x = +x) ? unknown : (output || (output = piecewise2(domain.map(transform), range, interpolate)))(transform(clamp(x)));
  }
  scale.invert = function(y) {
    return clamp(untransform((input || (input = piecewise2(range, domain.map(transform), number_default2)))(y)));
  };
  scale.domain = function(_2) {
    return arguments.length ? (domain = Array.from(_2, number), rescale()) : domain.slice();
  };
  scale.range = function(_2) {
    return arguments.length ? (range = Array.from(_2), rescale()) : range.slice();
  };
  scale.rangeRound = function(_2) {
    return range = Array.from(_2), interpolate = round_default, rescale();
  };
  scale.clamp = function(_2) {
    return arguments.length ? (clamp = _2 ? true : identity2, rescale()) : clamp !== identity2;
  };
  scale.interpolate = function(_2) {
    return arguments.length ? (interpolate = _2, rescale()) : interpolate;
  };
  scale.unknown = function(_2) {
    return arguments.length ? (unknown = _2, scale) : unknown;
  };
  return function(t5, u) {
    transform = t5, untransform = u;
    return rescale();
  };
}
function continuous() {
  return transformer()(identity2, identity2);
}

// node_modules/@nivo/scales/node_modules/d3-scale/src/tickFormat.js
function tickFormat(start, stop, count2, specifier) {
  var step = tickStep(start, stop, count2), precision;
  specifier = formatSpecifier(specifier == null ? ",f" : specifier);
  switch (specifier.type) {
    case "s": {
      var value = Math.max(Math.abs(start), Math.abs(stop));
      if (specifier.precision == null && !isNaN(precision = precisionPrefix_default(step, value))) specifier.precision = precision;
      return formatPrefix(specifier, value);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      if (specifier.precision == null && !isNaN(precision = precisionRound_default(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
      break;
    }
    case "f":
    case "%": {
      if (specifier.precision == null && !isNaN(precision = precisionFixed_default(step))) specifier.precision = precision - (specifier.type === "%") * 2;
      break;
    }
  }
  return format(specifier);
}

// node_modules/@nivo/scales/node_modules/d3-scale/src/linear.js
function linearish(scale) {
  var domain = scale.domain;
  scale.ticks = function(count2) {
    var d = domain();
    return ticks_default(d[0], d[d.length - 1], count2 == null ? 10 : count2);
  };
  scale.tickFormat = function(count2, specifier) {
    var d = domain();
    return tickFormat(d[0], d[d.length - 1], count2 == null ? 10 : count2, specifier);
  };
  scale.nice = function(count2) {
    if (count2 == null) count2 = 10;
    var d = domain();
    var i0 = 0;
    var i1 = d.length - 1;
    var start = d[i0];
    var stop = d[i1];
    var prestep;
    var step;
    var maxIter = 10;
    if (stop < start) {
      step = start, start = stop, stop = step;
      step = i0, i0 = i1, i1 = step;
    }
    while (maxIter-- > 0) {
      step = tickIncrement(start, stop, count2);
      if (step === prestep) {
        d[i0] = start;
        d[i1] = stop;
        return domain(d);
      } else if (step > 0) {
        start = Math.floor(start / step) * step;
        stop = Math.ceil(stop / step) * step;
      } else if (step < 0) {
        start = Math.ceil(start * step) / step;
        stop = Math.floor(stop * step) / step;
      } else {
        break;
      }
      prestep = step;
    }
    return scale;
  };
  return scale;
}
function linear2() {
  var scale = continuous();
  scale.copy = function() {
    return copy(scale, linear2());
  };
  initRange.apply(scale, arguments);
  return linearish(scale);
}

// node_modules/@nivo/scales/node_modules/d3-scale/src/nice.js
function nice2(domain, interval) {
  domain = domain.slice();
  var i0 = 0, i1 = domain.length - 1, x0 = domain[i0], x1 = domain[i1], t5;
  if (x1 < x0) {
    t5 = i0, i0 = i1, i1 = t5;
    t5 = x0, x0 = x1, x1 = t5;
  }
  domain[i0] = interval.floor(x0);
  domain[i1] = interval.ceil(x1);
  return domain;
}

// node_modules/@nivo/scales/node_modules/d3-scale/src/log.js
function transformLog(x) {
  return Math.log(x);
}
function transformExp(x) {
  return Math.exp(x);
}
function transformLogn(x) {
  return -Math.log(-x);
}
function transformExpn(x) {
  return -Math.exp(-x);
}
function pow10(x) {
  return isFinite(x) ? +("1e" + x) : x < 0 ? 0 : x;
}
function powp(base) {
  return base === 10 ? pow10 : base === Math.E ? Math.exp : function(x) {
    return Math.pow(base, x);
  };
}
function logp(base) {
  return base === Math.E ? Math.log : base === 10 && Math.log10 || base === 2 && Math.log2 || (base = Math.log(base), function(x) {
    return Math.log(x) / base;
  });
}
function reflect(f) {
  return function(x) {
    return -f(-x);
  };
}
function loggish(transform) {
  var scale = transform(transformLog, transformExp), domain = scale.domain, base = 10, logs, pows;
  function rescale() {
    logs = logp(base), pows = powp(base);
    if (domain()[0] < 0) {
      logs = reflect(logs), pows = reflect(pows);
      transform(transformLogn, transformExpn);
    } else {
      transform(transformLog, transformExp);
    }
    return scale;
  }
  scale.base = function(_2) {
    return arguments.length ? (base = +_2, rescale()) : base;
  };
  scale.domain = function(_2) {
    return arguments.length ? (domain(_2), rescale()) : domain();
  };
  scale.ticks = function(count2) {
    var d = domain(), u = d[0], v2 = d[d.length - 1], r3;
    if (r3 = v2 < u) i2 = u, u = v2, v2 = i2;
    var i2 = logs(u), j2 = logs(v2), p2, k2, t5, n3 = count2 == null ? 10 : +count2, z2 = [];
    if (!(base % 1) && j2 - i2 < n3) {
      i2 = Math.floor(i2), j2 = Math.ceil(j2);
      if (u > 0) for (; i2 <= j2; ++i2) {
        for (k2 = 1, p2 = pows(i2); k2 < base; ++k2) {
          t5 = p2 * k2;
          if (t5 < u) continue;
          if (t5 > v2) break;
          z2.push(t5);
        }
      }
      else for (; i2 <= j2; ++i2) {
        for (k2 = base - 1, p2 = pows(i2); k2 >= 1; --k2) {
          t5 = p2 * k2;
          if (t5 < u) continue;
          if (t5 > v2) break;
          z2.push(t5);
        }
      }
      if (z2.length * 2 < n3) z2 = ticks_default(u, v2, n3);
    } else {
      z2 = ticks_default(i2, j2, Math.min(j2 - i2, n3)).map(pows);
    }
    return r3 ? z2.reverse() : z2;
  };
  scale.tickFormat = function(count2, specifier) {
    if (specifier == null) specifier = base === 10 ? ".0e" : ",";
    if (typeof specifier !== "function") specifier = format(specifier);
    if (count2 === Infinity) return specifier;
    if (count2 == null) count2 = 10;
    var k2 = Math.max(1, base * count2 / scale.ticks().length);
    return function(d) {
      var i2 = d / pows(Math.round(logs(d)));
      if (i2 * base < base - 0.5) i2 *= base;
      return i2 <= k2 ? specifier(d) : "";
    };
  };
  scale.nice = function() {
    return domain(nice2(domain(), {
      floor: function(x) {
        return pows(Math.floor(logs(x)));
      },
      ceil: function(x) {
        return pows(Math.ceil(logs(x)));
      }
    }));
  };
  return scale;
}
function log() {
  var scale = loggish(transformer()).domain([1, 10]);
  scale.copy = function() {
    return copy(scale, log()).base(scale.base());
  };
  initRange.apply(scale, arguments);
  return scale;
}

// node_modules/@nivo/scales/node_modules/d3-scale/src/symlog.js
function transformSymlog(c) {
  return function(x) {
    return Math.sign(x) * Math.log1p(Math.abs(x / c));
  };
}
function transformSymexp(c) {
  return function(x) {
    return Math.sign(x) * Math.expm1(Math.abs(x)) * c;
  };
}
function symlogish(transform) {
  var c = 1, scale = transform(transformSymlog(c), transformSymexp(c));
  scale.constant = function(_2) {
    return arguments.length ? transform(transformSymlog(c = +_2), transformSymexp(c)) : c;
  };
  return linearish(scale);
}
function symlog() {
  var scale = symlogish(transformer());
  scale.copy = function() {
    return copy(scale, symlog()).constant(scale.constant());
  };
  return initRange.apply(scale, arguments);
}

// node_modules/@nivo/scales/node_modules/d3-scale/node_modules/d3-time/src/interval.js
var t02 = /* @__PURE__ */ new Date();
var t12 = /* @__PURE__ */ new Date();
function newInterval(floori, offseti, count2, field) {
  function interval(date2) {
    return floori(date2 = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+date2)), date2;
  }
  interval.floor = function(date2) {
    return floori(date2 = /* @__PURE__ */ new Date(+date2)), date2;
  };
  interval.ceil = function(date2) {
    return floori(date2 = new Date(date2 - 1)), offseti(date2, 1), floori(date2), date2;
  };
  interval.round = function(date2) {
    var d0 = interval(date2), d1 = interval.ceil(date2);
    return date2 - d0 < d1 - date2 ? d0 : d1;
  };
  interval.offset = function(date2, step) {
    return offseti(date2 = /* @__PURE__ */ new Date(+date2), step == null ? 1 : Math.floor(step)), date2;
  };
  interval.range = function(start, stop, step) {
    var range = [], previous;
    start = interval.ceil(start);
    step = step == null ? 1 : Math.floor(step);
    if (!(start < stop) || !(step > 0)) return range;
    do
      range.push(previous = /* @__PURE__ */ new Date(+start)), offseti(start, step), floori(start);
    while (previous < start && start < stop);
    return range;
  };
  interval.filter = function(test) {
    return newInterval(function(date2) {
      if (date2 >= date2) while (floori(date2), !test(date2)) date2.setTime(date2 - 1);
    }, function(date2, step) {
      if (date2 >= date2) {
        if (step < 0) while (++step <= 0) {
          while (offseti(date2, -1), !test(date2)) {
          }
        }
        else while (--step >= 0) {
          while (offseti(date2, 1), !test(date2)) {
          }
        }
      }
    });
  };
  if (count2) {
    interval.count = function(start, end) {
      t02.setTime(+start), t12.setTime(+end);
      floori(t02), floori(t12);
      return Math.floor(count2(t02, t12));
    };
    interval.every = function(step) {
      step = Math.floor(step);
      return !isFinite(step) || !(step > 0) ? null : !(step > 1) ? interval : interval.filter(field ? function(d) {
        return field(d) % step === 0;
      } : function(d) {
        return interval.count(0, d) % step === 0;
      });
    };
  }
  return interval;
}

// node_modules/@nivo/scales/node_modules/d3-scale/node_modules/d3-time/src/millisecond.js
var millisecond = newInterval(function() {
}, function(date2, step) {
  date2.setTime(+date2 + step);
}, function(start, end) {
  return end - start;
});
millisecond.every = function(k2) {
  k2 = Math.floor(k2);
  if (!isFinite(k2) || !(k2 > 0)) return null;
  if (!(k2 > 1)) return millisecond;
  return newInterval(function(date2) {
    date2.setTime(Math.floor(date2 / k2) * k2);
  }, function(date2, step) {
    date2.setTime(+date2 + step * k2);
  }, function(start, end) {
    return (end - start) / k2;
  });
};
var millisecond_default = millisecond;
var milliseconds = millisecond.range;

// node_modules/@nivo/scales/node_modules/d3-scale/node_modules/d3-time/src/duration.js
var durationSecond = 1e3;
var durationMinute = durationSecond * 60;
var durationHour = durationMinute * 60;
var durationDay = durationHour * 24;
var durationWeek = durationDay * 7;
var durationMonth = durationDay * 30;
var durationYear = durationDay * 365;

// node_modules/@nivo/scales/node_modules/d3-scale/node_modules/d3-time/src/second.js
var second = newInterval(function(date2) {
  date2.setTime(date2 - date2.getMilliseconds());
}, function(date2, step) {
  date2.setTime(+date2 + step * durationSecond);
}, function(start, end) {
  return (end - start) / durationSecond;
}, function(date2) {
  return date2.getUTCSeconds();
});
var second_default = second;
var seconds = second.range;

// node_modules/@nivo/scales/node_modules/d3-scale/node_modules/d3-time/src/minute.js
var minute = newInterval(function(date2) {
  date2.setTime(date2 - date2.getMilliseconds() - date2.getSeconds() * durationSecond);
}, function(date2, step) {
  date2.setTime(+date2 + step * durationMinute);
}, function(start, end) {
  return (end - start) / durationMinute;
}, function(date2) {
  return date2.getMinutes();
});
var minute_default = minute;
var minutes = minute.range;

// node_modules/@nivo/scales/node_modules/d3-scale/node_modules/d3-time/src/hour.js
var hour = newInterval(function(date2) {
  date2.setTime(date2 - date2.getMilliseconds() - date2.getSeconds() * durationSecond - date2.getMinutes() * durationMinute);
}, function(date2, step) {
  date2.setTime(+date2 + step * durationHour);
}, function(start, end) {
  return (end - start) / durationHour;
}, function(date2) {
  return date2.getHours();
});
var hour_default = hour;
var hours = hour.range;

// node_modules/@nivo/scales/node_modules/d3-scale/node_modules/d3-time/src/day.js
var day = newInterval(
  (date2) => date2.setHours(0, 0, 0, 0),
  (date2, step) => date2.setDate(date2.getDate() + step),
  (start, end) => (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationDay,
  (date2) => date2.getDate() - 1
);
var day_default = day;
var days = day.range;

// node_modules/@nivo/scales/node_modules/d3-scale/node_modules/d3-time/src/week.js
function weekday(i2) {
  return newInterval(function(date2) {
    date2.setDate(date2.getDate() - (date2.getDay() + 7 - i2) % 7);
    date2.setHours(0, 0, 0, 0);
  }, function(date2, step) {
    date2.setDate(date2.getDate() + step * 7);
  }, function(start, end) {
    return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationWeek;
  });
}
var sunday = weekday(0);
var monday = weekday(1);
var tuesday = weekday(2);
var wednesday = weekday(3);
var thursday = weekday(4);
var friday = weekday(5);
var saturday = weekday(6);
var sundays = sunday.range;
var mondays = monday.range;
var tuesdays = tuesday.range;
var wednesdays = wednesday.range;
var thursdays = thursday.range;
var fridays = friday.range;
var saturdays = saturday.range;

// node_modules/@nivo/scales/node_modules/d3-scale/node_modules/d3-time/src/month.js
var month = newInterval(function(date2) {
  date2.setDate(1);
  date2.setHours(0, 0, 0, 0);
}, function(date2, step) {
  date2.setMonth(date2.getMonth() + step);
}, function(start, end) {
  return end.getMonth() - start.getMonth() + (end.getFullYear() - start.getFullYear()) * 12;
}, function(date2) {
  return date2.getMonth();
});
var month_default = month;
var months = month.range;

// node_modules/@nivo/scales/node_modules/d3-scale/node_modules/d3-time/src/year.js
var year = newInterval(function(date2) {
  date2.setMonth(0, 1);
  date2.setHours(0, 0, 0, 0);
}, function(date2, step) {
  date2.setFullYear(date2.getFullYear() + step);
}, function(start, end) {
  return end.getFullYear() - start.getFullYear();
}, function(date2) {
  return date2.getFullYear();
});
year.every = function(k2) {
  return !isFinite(k2 = Math.floor(k2)) || !(k2 > 0) ? null : newInterval(function(date2) {
    date2.setFullYear(Math.floor(date2.getFullYear() / k2) * k2);
    date2.setMonth(0, 1);
    date2.setHours(0, 0, 0, 0);
  }, function(date2, step) {
    date2.setFullYear(date2.getFullYear() + step * k2);
  });
};
var year_default = year;
var years = year.range;

// node_modules/@nivo/scales/node_modules/d3-scale/node_modules/d3-time/src/utcMinute.js
var utcMinute = newInterval(function(date2) {
  date2.setUTCSeconds(0, 0);
}, function(date2, step) {
  date2.setTime(+date2 + step * durationMinute);
}, function(start, end) {
  return (end - start) / durationMinute;
}, function(date2) {
  return date2.getUTCMinutes();
});
var utcMinute_default = utcMinute;
var utcMinutes = utcMinute.range;

// node_modules/@nivo/scales/node_modules/d3-scale/node_modules/d3-time/src/utcHour.js
var utcHour = newInterval(function(date2) {
  date2.setUTCMinutes(0, 0, 0);
}, function(date2, step) {
  date2.setTime(+date2 + step * durationHour);
}, function(start, end) {
  return (end - start) / durationHour;
}, function(date2) {
  return date2.getUTCHours();
});
var utcHour_default = utcHour;
var utcHours = utcHour.range;

// node_modules/@nivo/scales/node_modules/d3-scale/node_modules/d3-time/src/utcDay.js
var utcDay = newInterval(function(date2) {
  date2.setUTCHours(0, 0, 0, 0);
}, function(date2, step) {
  date2.setUTCDate(date2.getUTCDate() + step);
}, function(start, end) {
  return (end - start) / durationDay;
}, function(date2) {
  return date2.getUTCDate() - 1;
});
var utcDay_default = utcDay;
var utcDays = utcDay.range;

// node_modules/@nivo/scales/node_modules/d3-scale/node_modules/d3-time/src/utcWeek.js
function utcWeekday(i2) {
  return newInterval(function(date2) {
    date2.setUTCDate(date2.getUTCDate() - (date2.getUTCDay() + 7 - i2) % 7);
    date2.setUTCHours(0, 0, 0, 0);
  }, function(date2, step) {
    date2.setUTCDate(date2.getUTCDate() + step * 7);
  }, function(start, end) {
    return (end - start) / durationWeek;
  });
}
var utcSunday = utcWeekday(0);
var utcMonday = utcWeekday(1);
var utcTuesday = utcWeekday(2);
var utcWednesday = utcWeekday(3);
var utcThursday = utcWeekday(4);
var utcFriday = utcWeekday(5);
var utcSaturday = utcWeekday(6);
var utcSundays = utcSunday.range;
var utcMondays = utcMonday.range;
var utcTuesdays = utcTuesday.range;
var utcWednesdays = utcWednesday.range;
var utcThursdays = utcThursday.range;
var utcFridays = utcFriday.range;
var utcSaturdays = utcSaturday.range;

// node_modules/@nivo/scales/node_modules/d3-scale/node_modules/d3-time/src/utcMonth.js
var utcMonth = newInterval(function(date2) {
  date2.setUTCDate(1);
  date2.setUTCHours(0, 0, 0, 0);
}, function(date2, step) {
  date2.setUTCMonth(date2.getUTCMonth() + step);
}, function(start, end) {
  return end.getUTCMonth() - start.getUTCMonth() + (end.getUTCFullYear() - start.getUTCFullYear()) * 12;
}, function(date2) {
  return date2.getUTCMonth();
});
var utcMonth_default = utcMonth;
var utcMonths = utcMonth.range;

// node_modules/@nivo/scales/node_modules/d3-scale/node_modules/d3-time/src/utcYear.js
var utcYear = newInterval(function(date2) {
  date2.setUTCMonth(0, 1);
  date2.setUTCHours(0, 0, 0, 0);
}, function(date2, step) {
  date2.setUTCFullYear(date2.getUTCFullYear() + step);
}, function(start, end) {
  return end.getUTCFullYear() - start.getUTCFullYear();
}, function(date2) {
  return date2.getUTCFullYear();
});
utcYear.every = function(k2) {
  return !isFinite(k2 = Math.floor(k2)) || !(k2 > 0) ? null : newInterval(function(date2) {
    date2.setUTCFullYear(Math.floor(date2.getUTCFullYear() / k2) * k2);
    date2.setUTCMonth(0, 1);
    date2.setUTCHours(0, 0, 0, 0);
  }, function(date2, step) {
    date2.setUTCFullYear(date2.getUTCFullYear() + step * k2);
  });
};
var utcYear_default = utcYear;
var utcYears = utcYear.range;

// node_modules/@nivo/scales/node_modules/d3-scale/node_modules/d3-time/src/ticks.js
function ticker(year3, month3, week, day3, hour3, minute3) {
  const tickIntervals = [
    [second_default, 1, durationSecond],
    [second_default, 5, 5 * durationSecond],
    [second_default, 15, 15 * durationSecond],
    [second_default, 30, 30 * durationSecond],
    [minute3, 1, durationMinute],
    [minute3, 5, 5 * durationMinute],
    [minute3, 15, 15 * durationMinute],
    [minute3, 30, 30 * durationMinute],
    [hour3, 1, durationHour],
    [hour3, 3, 3 * durationHour],
    [hour3, 6, 6 * durationHour],
    [hour3, 12, 12 * durationHour],
    [day3, 1, durationDay],
    [day3, 2, 2 * durationDay],
    [week, 1, durationWeek],
    [month3, 1, durationMonth],
    [month3, 3, 3 * durationMonth],
    [year3, 1, durationYear]
  ];
  function ticks(start, stop, count2) {
    const reverse2 = stop < start;
    if (reverse2) [start, stop] = [stop, start];
    const interval = count2 && typeof count2.range === "function" ? count2 : tickInterval(start, stop, count2);
    const ticks2 = interval ? interval.range(start, +stop + 1) : [];
    return reverse2 ? ticks2.reverse() : ticks2;
  }
  function tickInterval(start, stop, count2) {
    const target = Math.abs(stop - start) / count2;
    const i2 = bisector_default(([, , step2]) => step2).right(tickIntervals, target);
    if (i2 === tickIntervals.length) return year3.every(tickStep(start / durationYear, stop / durationYear, count2));
    if (i2 === 0) return millisecond_default.every(Math.max(tickStep(start, stop, count2), 1));
    const [t5, step] = tickIntervals[target / tickIntervals[i2 - 1][2] < tickIntervals[i2][2] / target ? i2 - 1 : i2];
    return t5.every(step);
  }
  return [ticks, tickInterval];
}
var [utcTicks, utcTickInterval] = ticker(utcYear_default, utcMonth_default, utcSunday, utcDay_default, utcHour_default, utcMinute_default);
var [timeTicks, timeTickInterval] = ticker(year_default, month_default, sunday, day_default, hour_default, minute_default);

// node_modules/@nivo/scales/node_modules/d3-scale/src/time.js
function date(t5) {
  return new Date(t5);
}
function number2(t5) {
  return t5 instanceof Date ? +t5 : +/* @__PURE__ */ new Date(+t5);
}
function calendar(ticks, tickInterval, year3, month3, week, day3, hour3, minute3, second3, format2) {
  var scale = continuous(), invert = scale.invert, domain = scale.domain;
  var formatMillisecond = format2(".%L"), formatSecond = format2(":%S"), formatMinute = format2("%I:%M"), formatHour = format2("%I %p"), formatDay = format2("%a %d"), formatWeek = format2("%b %d"), formatMonth = format2("%B"), formatYear = format2("%Y");
  function tickFormat2(date2) {
    return (second3(date2) < date2 ? formatMillisecond : minute3(date2) < date2 ? formatSecond : hour3(date2) < date2 ? formatMinute : day3(date2) < date2 ? formatHour : month3(date2) < date2 ? week(date2) < date2 ? formatDay : formatWeek : year3(date2) < date2 ? formatMonth : formatYear)(date2);
  }
  scale.invert = function(y) {
    return new Date(invert(y));
  };
  scale.domain = function(_2) {
    return arguments.length ? domain(Array.from(_2, number2)) : domain().map(date);
  };
  scale.ticks = function(interval) {
    var d = domain();
    return ticks(d[0], d[d.length - 1], interval == null ? 10 : interval);
  };
  scale.tickFormat = function(count2, specifier) {
    return specifier == null ? tickFormat2 : format2(specifier);
  };
  scale.nice = function(interval) {
    var d = domain();
    if (!interval || typeof interval.range !== "function") interval = tickInterval(d[0], d[d.length - 1], interval == null ? 10 : interval);
    return interval ? domain(nice2(d, interval)) : scale;
  };
  scale.copy = function() {
    return copy(scale, calendar(ticks, tickInterval, year3, month3, week, day3, hour3, minute3, second3, format2));
  };
  return scale;
}
function time() {
  return initRange.apply(calendar(timeTicks, timeTickInterval, year_default, month_default, sunday, day_default, hour_default, minute_default, second_default, timeFormat).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
}

// node_modules/@nivo/scales/node_modules/d3-scale/src/utcTime.js
function utcTime() {
  return initRange.apply(calendar(utcTicks, utcTickInterval, utcYear_default, utcMonth_default, utcSunday, utcDay_default, utcHour_default, utcMinute_default, second_default, utcFormat).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]), arguments);
}

// node_modules/@nivo/scales/node_modules/d3-time/src/interval.js
var t03 = /* @__PURE__ */ new Date();
var t13 = /* @__PURE__ */ new Date();
function newInterval2(floori, offseti, count2, field) {
  function interval(date2) {
    return floori(date2 = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+date2)), date2;
  }
  interval.floor = function(date2) {
    return floori(date2 = /* @__PURE__ */ new Date(+date2)), date2;
  };
  interval.ceil = function(date2) {
    return floori(date2 = new Date(date2 - 1)), offseti(date2, 1), floori(date2), date2;
  };
  interval.round = function(date2) {
    var d0 = interval(date2), d1 = interval.ceil(date2);
    return date2 - d0 < d1 - date2 ? d0 : d1;
  };
  interval.offset = function(date2, step) {
    return offseti(date2 = /* @__PURE__ */ new Date(+date2), step == null ? 1 : Math.floor(step)), date2;
  };
  interval.range = function(start, stop, step) {
    var range = [], previous;
    start = interval.ceil(start);
    step = step == null ? 1 : Math.floor(step);
    if (!(start < stop) || !(step > 0)) return range;
    do
      range.push(previous = /* @__PURE__ */ new Date(+start)), offseti(start, step), floori(start);
    while (previous < start && start < stop);
    return range;
  };
  interval.filter = function(test) {
    return newInterval2(function(date2) {
      if (date2 >= date2) while (floori(date2), !test(date2)) date2.setTime(date2 - 1);
    }, function(date2, step) {
      if (date2 >= date2) {
        if (step < 0) while (++step <= 0) {
          while (offseti(date2, -1), !test(date2)) {
          }
        }
        else while (--step >= 0) {
          while (offseti(date2, 1), !test(date2)) {
          }
        }
      }
    });
  };
  if (count2) {
    interval.count = function(start, end) {
      t03.setTime(+start), t13.setTime(+end);
      floori(t03), floori(t13);
      return Math.floor(count2(t03, t13));
    };
    interval.every = function(step) {
      step = Math.floor(step);
      return !isFinite(step) || !(step > 0) ? null : !(step > 1) ? interval : interval.filter(field ? function(d) {
        return field(d) % step === 0;
      } : function(d) {
        return interval.count(0, d) % step === 0;
      });
    };
  }
  return interval;
}

// node_modules/@nivo/scales/node_modules/d3-time/src/millisecond.js
var millisecond2 = newInterval2(function() {
}, function(date2, step) {
  date2.setTime(+date2 + step);
}, function(start, end) {
  return end - start;
});
millisecond2.every = function(k2) {
  k2 = Math.floor(k2);
  if (!isFinite(k2) || !(k2 > 0)) return null;
  if (!(k2 > 1)) return millisecond2;
  return newInterval2(function(date2) {
    date2.setTime(Math.floor(date2 / k2) * k2);
  }, function(date2, step) {
    date2.setTime(+date2 + step * k2);
  }, function(start, end) {
    return (end - start) / k2;
  });
};
var millisecond_default2 = millisecond2;
var milliseconds2 = millisecond2.range;

// node_modules/@nivo/scales/node_modules/d3-time/src/duration.js
var durationSecond2 = 1e3;
var durationMinute2 = 6e4;
var durationHour2 = 36e5;
var durationDay2 = 864e5;
var durationWeek2 = 6048e5;

// node_modules/@nivo/scales/node_modules/d3-time/src/second.js
var second2 = newInterval2(function(date2) {
  date2.setTime(date2 - date2.getMilliseconds());
}, function(date2, step) {
  date2.setTime(+date2 + step * durationSecond2);
}, function(start, end) {
  return (end - start) / durationSecond2;
}, function(date2) {
  return date2.getUTCSeconds();
});
var second_default2 = second2;
var seconds2 = second2.range;

// node_modules/@nivo/scales/node_modules/d3-time/src/minute.js
var minute2 = newInterval2(function(date2) {
  date2.setTime(date2 - date2.getMilliseconds() - date2.getSeconds() * durationSecond2);
}, function(date2, step) {
  date2.setTime(+date2 + step * durationMinute2);
}, function(start, end) {
  return (end - start) / durationMinute2;
}, function(date2) {
  return date2.getMinutes();
});
var minute_default2 = minute2;
var minutes2 = minute2.range;

// node_modules/@nivo/scales/node_modules/d3-time/src/hour.js
var hour2 = newInterval2(function(date2) {
  date2.setTime(date2 - date2.getMilliseconds() - date2.getSeconds() * durationSecond2 - date2.getMinutes() * durationMinute2);
}, function(date2, step) {
  date2.setTime(+date2 + step * durationHour2);
}, function(start, end) {
  return (end - start) / durationHour2;
}, function(date2) {
  return date2.getHours();
});
var hour_default2 = hour2;
var hours2 = hour2.range;

// node_modules/@nivo/scales/node_modules/d3-time/src/day.js
var day2 = newInterval2(function(date2) {
  date2.setHours(0, 0, 0, 0);
}, function(date2, step) {
  date2.setDate(date2.getDate() + step);
}, function(start, end) {
  return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute2) / durationDay2;
}, function(date2) {
  return date2.getDate() - 1;
});
var days2 = day2.range;

// node_modules/@nivo/scales/node_modules/d3-time/src/week.js
function weekday2(i2) {
  return newInterval2(function(date2) {
    date2.setDate(date2.getDate() - (date2.getDay() + 7 - i2) % 7);
    date2.setHours(0, 0, 0, 0);
  }, function(date2, step) {
    date2.setDate(date2.getDate() + step * 7);
  }, function(start, end) {
    return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute2) / durationWeek2;
  });
}
var sunday2 = weekday2(0);
var monday2 = weekday2(1);
var tuesday2 = weekday2(2);
var wednesday2 = weekday2(3);
var thursday2 = weekday2(4);
var friday2 = weekday2(5);
var saturday2 = weekday2(6);
var sundays2 = sunday2.range;
var mondays2 = monday2.range;
var tuesdays2 = tuesday2.range;
var wednesdays2 = wednesday2.range;
var thursdays2 = thursday2.range;
var fridays2 = friday2.range;
var saturdays2 = saturday2.range;

// node_modules/@nivo/scales/node_modules/d3-time/src/month.js
var month2 = newInterval2(function(date2) {
  date2.setDate(1);
  date2.setHours(0, 0, 0, 0);
}, function(date2, step) {
  date2.setMonth(date2.getMonth() + step);
}, function(start, end) {
  return end.getMonth() - start.getMonth() + (end.getFullYear() - start.getFullYear()) * 12;
}, function(date2) {
  return date2.getMonth();
});
var month_default2 = month2;
var months2 = month2.range;

// node_modules/@nivo/scales/node_modules/d3-time/src/year.js
var year2 = newInterval2(function(date2) {
  date2.setMonth(0, 1);
  date2.setHours(0, 0, 0, 0);
}, function(date2, step) {
  date2.setFullYear(date2.getFullYear() + step);
}, function(start, end) {
  return end.getFullYear() - start.getFullYear();
}, function(date2) {
  return date2.getFullYear();
});
year2.every = function(k2) {
  return !isFinite(k2 = Math.floor(k2)) || !(k2 > 0) ? null : newInterval2(function(date2) {
    date2.setFullYear(Math.floor(date2.getFullYear() / k2) * k2);
    date2.setMonth(0, 1);
    date2.setHours(0, 0, 0, 0);
  }, function(date2, step) {
    date2.setFullYear(date2.getFullYear() + step * k2);
  });
};
var year_default2 = year2;
var years2 = year2.range;

// node_modules/@nivo/scales/node_modules/d3-time/src/utcMinute.js
var utcMinute2 = newInterval2(function(date2) {
  date2.setUTCSeconds(0, 0);
}, function(date2, step) {
  date2.setTime(+date2 + step * durationMinute2);
}, function(start, end) {
  return (end - start) / durationMinute2;
}, function(date2) {
  return date2.getUTCMinutes();
});
var utcMinute_default2 = utcMinute2;
var utcMinutes2 = utcMinute2.range;

// node_modules/@nivo/scales/node_modules/d3-time/src/utcHour.js
var utcHour2 = newInterval2(function(date2) {
  date2.setUTCMinutes(0, 0, 0);
}, function(date2, step) {
  date2.setTime(+date2 + step * durationHour2);
}, function(start, end) {
  return (end - start) / durationHour2;
}, function(date2) {
  return date2.getUTCHours();
});
var utcHour_default2 = utcHour2;
var utcHours2 = utcHour2.range;

// node_modules/@nivo/scales/node_modules/d3-time/src/utcDay.js
var utcDay2 = newInterval2(function(date2) {
  date2.setUTCHours(0, 0, 0, 0);
}, function(date2, step) {
  date2.setUTCDate(date2.getUTCDate() + step);
}, function(start, end) {
  return (end - start) / durationDay2;
}, function(date2) {
  return date2.getUTCDate() - 1;
});
var utcDays2 = utcDay2.range;

// node_modules/@nivo/scales/node_modules/d3-time/src/utcWeek.js
function utcWeekday2(i2) {
  return newInterval2(function(date2) {
    date2.setUTCDate(date2.getUTCDate() - (date2.getUTCDay() + 7 - i2) % 7);
    date2.setUTCHours(0, 0, 0, 0);
  }, function(date2, step) {
    date2.setUTCDate(date2.getUTCDate() + step * 7);
  }, function(start, end) {
    return (end - start) / durationWeek2;
  });
}
var utcSunday2 = utcWeekday2(0);
var utcMonday2 = utcWeekday2(1);
var utcTuesday2 = utcWeekday2(2);
var utcWednesday2 = utcWeekday2(3);
var utcThursday2 = utcWeekday2(4);
var utcFriday2 = utcWeekday2(5);
var utcSaturday2 = utcWeekday2(6);
var utcSundays2 = utcSunday2.range;
var utcMondays2 = utcMonday2.range;
var utcTuesdays2 = utcTuesday2.range;
var utcWednesdays2 = utcWednesday2.range;
var utcThursdays2 = utcThursday2.range;
var utcFridays2 = utcFriday2.range;
var utcSaturdays2 = utcSaturday2.range;

// node_modules/@nivo/scales/node_modules/d3-time/src/utcMonth.js
var utcMonth2 = newInterval2(function(date2) {
  date2.setUTCDate(1);
  date2.setUTCHours(0, 0, 0, 0);
}, function(date2, step) {
  date2.setUTCMonth(date2.getUTCMonth() + step);
}, function(start, end) {
  return end.getUTCMonth() - start.getUTCMonth() + (end.getUTCFullYear() - start.getUTCFullYear()) * 12;
}, function(date2) {
  return date2.getUTCMonth();
});
var utcMonth_default2 = utcMonth2;
var utcMonths2 = utcMonth2.range;

// node_modules/@nivo/scales/node_modules/d3-time/src/utcYear.js
var utcYear2 = newInterval2(function(date2) {
  date2.setUTCMonth(0, 1);
  date2.setUTCHours(0, 0, 0, 0);
}, function(date2, step) {
  date2.setUTCFullYear(date2.getUTCFullYear() + step);
}, function(start, end) {
  return end.getUTCFullYear() - start.getUTCFullYear();
}, function(date2) {
  return date2.getUTCFullYear();
});
utcYear2.every = function(k2) {
  return !isFinite(k2 = Math.floor(k2)) || !(k2 > 0) ? null : newInterval2(function(date2) {
    date2.setUTCFullYear(Math.floor(date2.getUTCFullYear() / k2) * k2);
    date2.setUTCMonth(0, 1);
    date2.setUTCHours(0, 0, 0, 0);
  }, function(date2, step) {
    date2.setUTCFullYear(date2.getUTCFullYear() + step * k2);
  });
};
var utcYear_default2 = utcYear2;
var utcYears2 = utcYear2.range;

// node_modules/@nivo/scales/dist/nivo-scales.es.js
function $() {
  return $ = Object.assign ? Object.assign.bind() : function(n3) {
    for (var t5 = 1; t5 < arguments.length; t5++) {
      var r3 = arguments[t5];
      for (var e4 in r3) Object.prototype.hasOwnProperty.call(r3, e4) && (n3[e4] = r3[e4]);
    }
    return n3;
  }, $.apply(this, arguments);
}
var J = [function(n3) {
  return n3.setMilliseconds(0);
}, function(n3) {
  return n3.setSeconds(0);
}, function(n3) {
  return n3.setMinutes(0);
}, function(n3) {
  return n3.setHours(0);
}, function(n3) {
  return n3.setDate(1);
}, function(n3) {
  return n3.setMonth(0);
}];
var K2 = { millisecond: [], second: J.slice(0, 1), minute: J.slice(0, 2), hour: J.slice(0, 3), day: J.slice(0, 4), month: J.slice(0, 5), year: J.slice(0, 6) };
var L = function(n3) {
  return function(t5) {
    return K2[n3].forEach(function(n4) {
      n4(t5);
    }), t5;
  };
};
var Q = function(n3) {
  var t5 = n3.format, r3 = void 0 === t5 ? "native" : t5, e4 = n3.precision, a2 = void 0 === e4 ? "millisecond" : e4, u = n3.useUTC, c = void 0 === u || u, s = L(a2);
  return function(n4) {
    if (void 0 === n4) return n4;
    if ("native" === r3 || n4 instanceof Date) return s(n4);
    var t6 = c ? utcParse(r3) : timeParse(r3);
    return s(t6(n4));
  };
};
var W = function(n3, t5, r3, e4) {
  var a2, i2, o, c, s = n3.min, d = void 0 === s ? 0 : s, f = n3.max, l = void 0 === f ? "auto" : f, m = n3.stacked, v2 = void 0 !== m && m, y = n3.reverse, p2 = void 0 !== y && y, h2 = n3.clamp, g2 = void 0 !== h2 && h2, x = n3.nice, k2 = void 0 !== x && x;
  "auto" === d ? a2 = true === v2 ? null != (i2 = t5.minStacked) ? i2 : 0 : t5.min : a2 = d;
  "auto" === l ? o = true === v2 ? null != (c = t5.maxStacked) ? c : 0 : t5.max : o = l;
  var T2 = linear2().rangeRound("x" === e4 ? [0, r3] : [r3, 0]).domain(p2 ? [o, a2] : [a2, o]).clamp(g2);
  return true === k2 ? T2.nice() : "number" == typeof k2 && T2.nice(k2), X(T2, v2);
};
var X = function(n3, t5) {
  void 0 === t5 && (t5 = false);
  var r3 = n3;
  return r3.type = "linear", r3.stacked = t5, r3;
};
var Y = function(n3, t5, r3) {
  var e4 = point().range([0, r3]).domain(t5.all);
  return e4.type = "point", e4;
};
var _ = function(n3, t5, r3, e4) {
  var a2 = n3.round, i2 = void 0 === a2 || a2, o = band().range("x" === e4 ? [0, r3] : [r3, 0]).domain(t5.all).round(i2);
  return nn(o);
};
var nn = function(n3) {
  var t5 = n3;
  return t5.type = "band", t5;
};
var tn = function(n3, t5, r3) {
  var e4, a2, i2 = n3.format, o = void 0 === i2 ? "native" : i2, u = n3.precision, c = void 0 === u ? "millisecond" : u, s = n3.min, l = void 0 === s ? "auto" : s, m = n3.max, v2 = void 0 === m ? "auto" : m, y = n3.useUTC, p2 = void 0 === y || y, h2 = n3.nice, g2 = void 0 !== h2 && h2, x = Q({ format: o, precision: c, useUTC: p2 });
  e4 = "auto" === l ? x(t5.min) : "native" !== o ? x(l) : l, a2 = "auto" === v2 ? x(t5.max) : "native" !== o ? x(v2) : v2;
  var k2 = p2 ? utcTime() : time();
  k2.range([0, r3]), e4 && a2 && k2.domain([e4, a2]), true === g2 ? k2.nice() : "object" != typeof g2 && "number" != typeof g2 || k2.nice(g2);
  var T2 = k2;
  return T2.type = "time", T2.useUTC = p2, T2;
};
var rn = function(n3, t5, r3, e4) {
  var a2, i2 = n3.base, o = void 0 === i2 ? 10 : i2, u = n3.min, c = void 0 === u ? "auto" : u, s = n3.max, d = void 0 === s ? "auto" : s;
  if (t5.all.some(function(n4) {
    return 0 === n4;
  })) throw new Error("a log scale domain must not include or cross zero");
  var f, m, v2 = false;
  if (t5.all.filter(function(n4) {
    return null != n4;
  }).forEach(function(n4) {
    v2 || (void 0 === a2 ? a2 = Math.sign(n4) : Math.sign(n4) !== a2 && (v2 = true));
  }), v2) throw new Error("a log scale domain must be strictly-positive or strictly-negative");
  f = "auto" === c ? t5.min : c, m = "auto" === d ? t5.max : d;
  var y = log().domain([f, m]).rangeRound("x" === e4 ? [0, r3] : [r3, 0]).base(o).nice();
  return y.type = "log", y;
};
var en = function(n3, t5, r3, e4) {
  var a2, i2, o = n3.constant, u = void 0 === o ? 1 : o, c = n3.min, s = void 0 === c ? "auto" : c, d = n3.max, f = void 0 === d ? "auto" : d, l = n3.reverse, v2 = void 0 !== l && l;
  a2 = "auto" === s ? t5.min : s, i2 = "auto" === f ? t5.max : f;
  var y = symlog().constant(u).rangeRound("x" === e4 ? [0, r3] : [r3, 0]).nice();
  true === v2 ? y.domain([i2, a2]) : y.domain([a2, i2]);
  var p2 = y;
  return p2.type = "symlog", p2;
};
var an = function(n3) {
  return "x" === n3 ? "y" : "x";
};
var on = function(n3, t5) {
  return n3 === t5;
};
var un = function(n3, t5) {
  return n3.getTime() === t5.getTime();
};
function cn(n3, t5, r3, e4) {
  switch (n3.type) {
    case "linear":
      return W(n3, t5, r3, e4);
    case "point":
      return Y(n3, t5, r3);
    case "band":
      return _(n3, t5, r3, e4);
    case "time":
      return tn(n3, t5, r3);
    case "log":
      return rn(n3, t5, r3, e4);
    case "symlog":
      return en(n3, t5, r3, e4);
    default:
      throw new Error("invalid scale spec");
  }
}
var sn = function(n3, t5, r3) {
  var e4;
  if ("stacked" in r3 && r3.stacked) {
    var a2 = n3.data["x" === t5 ? "xStacked" : "yStacked"];
    return null == a2 ? null : r3(a2);
  }
  return null != (e4 = r3(n3.data[t5])) ? e4 : null;
};
var dn = function(n3, t5, r3, e4, a2) {
  var i2 = n3.map(function(n4) {
    return function(n5) {
      return $({}, n5, { data: n5.data.map(function(n6) {
        return { data: $({}, n6) };
      }) });
    }(n4);
  }), o = fn(i2, t5, r3);
  "stacked" in t5 && true === t5.stacked && vn(o, i2), "stacked" in r3 && true === r3.stacked && yn(o, i2);
  var u = cn(t5, o.x, e4, "x"), c = cn(r3, o.y, a2, "y"), s = i2.map(function(n4) {
    return $({}, n4, { data: n4.data.map(function(n5) {
      return $({}, n5, { position: { x: sn(n5, "x", u), y: sn(n5, "y", c) } });
    }) });
  });
  return $({}, o, { series: s, xScale: u, yScale: c });
};
var fn = function(n3, t5, r3) {
  return { x: ln(n3, "x", t5), y: ln(n3, "y", r3) };
};
var ln = function(a2, i2, o, u) {
  var c = void 0 === u ? {} : u, s = c.getValue, d = void 0 === s ? function(n3) {
    return n3.data[i2];
  } : s, f = c.setValue, l = void 0 === f ? function(n3, t5) {
    n3.data[i2] = t5;
  } : f;
  if ("linear" === o.type) a2.forEach(function(n3) {
    n3.data.forEach(function(n4) {
      var t5 = d(n4);
      t5 && l(n4, parseFloat(String(t5)));
    });
  });
  else if ("time" === o.type && "native" !== o.format) {
    var m = Q(o);
    a2.forEach(function(n3) {
      n3.data.forEach(function(n4) {
        var t5 = d(n4);
        t5 && l(n4, m(t5));
      });
    });
  }
  var v2 = [];
  switch (a2.forEach(function(n3) {
    n3.data.forEach(function(n4) {
      v2.push(d(n4));
    });
  }), o.type) {
    case "linear":
      var y = (0, import_sortBy.default)((0, import_uniq.default)(v2).filter(function(n3) {
        return null !== n3;
      }), function(n3) {
        return n3;
      });
      return { all: y, min: Math.min.apply(Math, y), max: Math.max.apply(Math, y) };
    case "time":
      var p2 = (0, import_uniqBy.default)(v2, function(n3) {
        return n3.getTime();
      }).slice(0).sort(function(n3, t5) {
        return t5.getTime() - n3.getTime();
      }).reverse();
      return { all: p2, min: p2[0], max: (0, import_last.default)(p2) };
    default:
      var h2 = (0, import_uniq.default)(v2);
      return { all: h2, min: h2[0], max: (0, import_last.default)(h2) };
  }
};
var mn = function(n3, t5, r3) {
  var i2 = an(n3), o = [];
  t5[i2].all.forEach(function(t6) {
    var u = (0, import_isDate.default)(t6) ? un : on, c = [];
    r3.forEach(function(r4) {
      var a2 = r4.data.find(function(n4) {
        return u(n4.data[i2], t6);
      }), s = null, d = null;
      if (void 0 !== a2) {
        if (null !== (s = a2.data[n3])) {
          var f = (0, import_last.default)(c);
          void 0 === f ? d = s : null !== f && (d = f + s);
        }
        a2.data["x" === n3 ? "xStacked" : "yStacked"] = d;
      }
      c.push(d), null !== d && o.push(d);
    });
  }), t5[n3].minStacked = Math.min.apply(Math, o), t5[n3].maxStacked = Math.max.apply(Math, o);
};
var vn = function(n3, t5) {
  return mn("x", n3, t5);
};
var yn = function(n3, t5) {
  return mn("y", n3, t5);
};
var pn = function(n3) {
  var t5 = n3.bandwidth();
  if (0 === t5) return n3;
  var r3 = t5 / 2;
  return n3.round() && (r3 = Math.round(r3)), function(t6) {
    var e4;
    return (null != (e4 = n3(t6)) ? e4 : 0) + r3;
  };
};
var hn = { millisecond: [millisecond_default2, millisecond_default2], second: [second_default2, second_default2], minute: [minute_default2, utcMinute_default2], hour: [hour_default2, utcHour_default2], day: [newInterval2(function(n3) {
  return n3.setHours(0, 0, 0, 0);
}, function(n3, t5) {
  return n3.setDate(n3.getDate() + t5);
}, function(n3, t5) {
  return (t5.getTime() - n3.getTime()) / 864e5;
}, function(n3) {
  return Math.floor(n3.getTime() / 864e5);
}), newInterval2(function(n3) {
  return n3.setUTCHours(0, 0, 0, 0);
}, function(n3, t5) {
  return n3.setUTCDate(n3.getUTCDate() + t5);
}, function(n3, t5) {
  return (t5.getTime() - n3.getTime()) / 864e5;
}, function(n3) {
  return Math.floor(n3.getTime() / 864e5);
})], week: [sunday2, utcSunday2], sunday: [sunday2, utcSunday2], monday: [monday2, utcMonday2], tuesday: [tuesday2, utcTuesday2], wednesday: [wednesday2, utcWednesday2], thursday: [thursday2, utcThursday2], friday: [friday2, utcFriday2], saturday: [saturday2, utcSaturday2], month: [month_default2, utcMonth_default2], year: [year_default2, utcYear_default2] };
var gn = Object.keys(hn);
var xn = new RegExp("^every\\s*(\\d+)?\\s*(" + gn.join("|") + ")s?$", "i");
var kn = function(n3, t5) {
  if (Array.isArray(t5)) return t5;
  if ("string" == typeof t5 && "useUTC" in n3) {
    var r3 = t5.match(xn);
    if (r3) {
      var e4 = r3[1], a2 = r3[2], i2 = hn[a2][n3.useUTC ? 1 : 0];
      if ("day" === a2) {
        var o, u, c = n3.domain(), s = c[0], d = c[1], f = new Date(d);
        return f.setDate(f.getDate() + 1), null != (o = null == (u = i2.every(Number(null != e4 ? e4 : 1))) ? void 0 : u.range(s, f)) ? o : [];
      }
      if (void 0 === e4) return n3.ticks(i2);
      var l = i2.every(Number(e4));
      if (l) return n3.ticks(l);
    }
    throw new Error("Invalid tickValues: " + t5);
  }
  if ("ticks" in n3) {
    if (void 0 === t5) return n3.ticks();
    if ("number" == typeof (m = t5) && isFinite(m) && Math.floor(m) === m) return n3.ticks(t5);
  }
  var m;
  return n3.domain();
};

// node_modules/@nivo/axes/dist/nivo-axes.es.js
var t4 = __toESM(require_react());
var import_react = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var import_prop_types = __toESM(require_prop_types());
function p() {
  return p = Object.assign ? Object.assign.bind() : function(t5) {
    for (var e4 = 1; e4 < arguments.length; e4++) {
      var i2 = arguments[e4];
      for (var n3 in i2) Object.prototype.hasOwnProperty.call(i2, n3) && (t5[n3] = i2[n3]);
    }
    return t5;
  }, p.apply(this, arguments);
}
var b = function(t5) {
  var e4, i2 = t5.axis, n3 = t5.scale, r3 = t5.ticksPosition, a2 = t5.tickValues, l = t5.tickSize, s = t5.tickPadding, c = t5.tickRotation, f = t5.truncateTickAt, u = t5.engine, d = void 0 === u ? "svg" : u, x = kn(n3, a2), h2 = fi[d], g2 = "bandwidth" in n3 ? pn(n3) : n3, k2 = { lineX: 0, lineY: 0 }, v2 = { textX: 0, textY: 0 }, b2 = "object" == typeof document && "rtl" === document.dir, T2 = h2.align.center, P2 = h2.baseline.center;
  "x" === i2 ? (e4 = function(t6) {
    var e6;
    return { x: null != (e6 = g2(t6)) ? e6 : 0, y: 0 };
  }, k2.lineY = l * ("after" === r3 ? 1 : -1), v2.textY = (l + s) * ("after" === r3 ? 1 : -1), P2 = "after" === r3 ? h2.baseline.top : h2.baseline.bottom, 0 === c ? T2 = h2.align.center : "after" === r3 && c < 0 || "before" === r3 && c > 0 ? (T2 = h2.align[b2 ? "left" : "right"], P2 = h2.baseline.center) : ("after" === r3 && c > 0 || "before" === r3 && c < 0) && (T2 = h2.align[b2 ? "right" : "left"], P2 = h2.baseline.center)) : (e4 = function(t6) {
    var e6;
    return { x: 0, y: null != (e6 = g2(t6)) ? e6 : 0 };
  }, k2.lineX = l * ("after" === r3 ? 1 : -1), v2.textX = (l + s) * ("after" === r3 ? 1 : -1), T2 = "after" === r3 ? h2.align.left : h2.align.right);
  return { ticks: x.map(function(t6) {
    var i3 = "string" == typeof t6 ? function(t7) {
      var e6 = String(t7).length;
      return f && f > 0 && e6 > f ? "" + String(t7).slice(0, f).concat("...") : "" + t7;
    }(t6) : t6;
    return p({ key: t6 instanceof Date ? "" + t6.valueOf() : "" + t6, value: i3 }, e4(t6), k2, v2);
  }), textAlign: T2, textBaseline: P2 };
};
var T = function(t5, e4) {
  if (void 0 === t5 || "function" == typeof t5) return t5;
  if ("time" === e4.type) {
    var i2 = timeFormat(t5);
    return function(t6) {
      return i2(t6 instanceof Date ? t6 : new Date(t6));
    };
  }
  return format(t5);
};
var P = function(t5) {
  var e4, i2 = t5.width, n3 = t5.height, r3 = t5.scale, o = t5.axis, a2 = t5.values, l = (e4 = a2, Array.isArray(e4) ? a2 : void 0) || kn(r3, a2), s = "bandwidth" in r3 ? pn(r3) : r3, c = "x" === o ? l.map(function(t6) {
    var e6, i3;
    return { key: t6 instanceof Date ? "" + t6.valueOf() : "" + t6, x1: null != (e6 = s(t6)) ? e6 : 0, x2: null != (i3 = s(t6)) ? i3 : 0, y1: 0, y2: n3 };
  }) : l.map(function(t6) {
    var e6, n4;
    return { key: t6 instanceof Date ? "" + t6.valueOf() : "" + t6, x1: 0, x2: i2, y1: null != (e6 = s(t6)) ? e6 : 0, y2: null != (n4 = s(t6)) ? n4 : 0 };
  });
  return c;
};
var S = (0, import_react.memo)(function(t5) {
  var e4, n3 = t5.value, r3 = t5.format, o = t5.lineX, l = t5.lineY, s = t5.onClick, f = t5.textBaseline, u = t5.textAnchor, d = t5.animatedProps, x = Et(), m = x.axis.ticks.line, y = x.axis.ticks.text, k2 = null != (e4 = null == r3 ? void 0 : r3(n3)) ? e4 : n3, v2 = (0, import_react.useMemo)(function() {
    var t6 = { opacity: d.opacity };
    return s ? { style: p({}, t6, { cursor: "pointer" }), onClick: function(t7) {
      return s(t7, k2);
    } } : { style: t6 };
  }, [d.opacity, s, k2]);
  return (0, import_jsx_runtime.jsxs)(animated.g, p({ transform: d.transform }, v2, { children: [(0, import_jsx_runtime.jsx)("line", { x1: 0, x2: o, y1: 0, y2: l, style: m }), y.outlineWidth > 0 && (0, import_jsx_runtime.jsx)(animated.text, { dominantBaseline: f, textAnchor: u, transform: d.textTransform, style: y, strokeWidth: 2 * y.outlineWidth, stroke: y.outlineColor, strokeLinejoin: "round", children: "" + k2 }), (0, import_jsx_runtime.jsx)(animated.text, { dominantBaseline: f, textAnchor: u, transform: d.textTransform, style: y, children: "" + k2 })] }));
});
var A2 = function(e4) {
  var r3 = e4.axis, o = e4.scale, s = e4.x, d = void 0 === s ? 0 : s, x = e4.y, m = void 0 === x ? 0 : x, y = e4.length, v2 = e4.ticksPosition, P2 = e4.tickValues, A3 = e4.tickSize, W3 = void 0 === A3 ? 5 : A3, O2 = e4.tickPadding, w2 = void 0 === O2 ? 5 : O2, B3 = e4.tickRotation, X3 = void 0 === B3 ? 0 : B3, Y3 = e4.format, C3 = e4.renderTick, z2 = void 0 === C3 ? S : C3, V2 = e4.truncateTickAt, j2 = e4.legend, D3 = e4.legendPosition, R = void 0 === D3 ? "end" : D3, E2 = e4.legendOffset, L2 = void 0 === E2 ? 0 : E2, q = e4.onClick, F = e4.ariaHidden, H = Et(), N = H.axis.legend.text, I = (0, import_react.useMemo)(function() {
    return T(Y3, o);
  }, [Y3, o]), J2 = b({ axis: r3, scale: o, ticksPosition: v2, tickValues: P2, tickSize: W3, tickPadding: w2, tickRotation: X3, truncateTickAt: V2 }), G = J2.ticks, K3 = J2.textAlign, M = J2.textBaseline, Q2 = null;
  if (void 0 !== j2) {
    var U, Z = 0, $2 = 0, _2 = 0;
    "y" === r3 ? (_2 = -90, Z = L2, "start" === R ? (U = "start", $2 = y) : "middle" === R ? (U = "middle", $2 = y / 2) : "end" === R && (U = "end")) : ($2 = L2, "start" === R ? U = "start" : "middle" === R ? (U = "middle", Z = y / 2) : "end" === R && (U = "end", Z = y)), Q2 = (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [N.outlineWidth > 0 && (0, import_jsx_runtime.jsx)("text", { transform: "translate(" + Z + ", " + $2 + ") rotate(" + _2 + ")", textAnchor: U, style: p({ dominantBaseline: "central" }, N), strokeWidth: 2 * N.outlineWidth, stroke: N.outlineColor, strokeLinejoin: "round", children: j2 }), (0, import_jsx_runtime.jsx)("text", { transform: "translate(" + Z + ", " + $2 + ") rotate(" + _2 + ")", textAnchor: U, style: p({ dominantBaseline: "central" }, N), children: j2 })] });
  }
  var tt = Zr(), et = tt.animate, it = tt.config, nt = useSpring({ transform: "translate(" + d + "," + m + ")", lineX2: "x" === r3 ? y : 0, lineY2: "x" === r3 ? 0 : y, config: it, immediate: !et }), rt = (0, import_react.useCallback)(function(t5) {
    return { opacity: 1, transform: "translate(" + t5.x + "," + t5.y + ")", textTransform: "translate(" + t5.textX + "," + t5.textY + ") rotate(" + X3 + ")" };
  }, [X3]), ot = (0, import_react.useCallback)(function(t5) {
    return { opacity: 0, transform: "translate(" + t5.x + "," + t5.y + ")", textTransform: "translate(" + t5.textX + "," + t5.textY + ") rotate(" + X3 + ")" };
  }, [X3]), at = useTransition(G, { keys: function(t5) {
    return t5.key;
  }, initial: rt, from: ot, enter: rt, update: rt, leave: { opacity: 0 }, config: it, immediate: !et });
  return (0, import_jsx_runtime.jsxs)(animated.g, { transform: nt.transform, "aria-hidden": F, children: [at(function(e6, i2, n3, r4) {
    return t4.createElement(z2, p({ tickIndex: r4, format: I, rotate: X3, textBaseline: M, textAnchor: K3, truncateTickAt: V2, animatedProps: e6 }, i2, q ? { onClick: q } : {}));
  }), (0, import_jsx_runtime.jsx)(animated.line, { style: H.axis.domain.line, x1: 0, x2: nt.lineX2, y1: 0, y2: nt.lineY2 }), Q2] });
};
var W2 = (0, import_react.memo)(A2);
var O = { ticksPosition: import_prop_types.default.oneOf(["before", "after"]), tickValues: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string, import_prop_types.default.instanceOf(Date)])), import_prop_types.default.string]), rotateOnTickLength: import_prop_types.default.shape({ angle: import_prop_types.default.number, length: import_prop_types.default.number }), tickSize: import_prop_types.default.number, tickPadding: import_prop_types.default.number, tickRotation: import_prop_types.default.number, format: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.string]), renderTick: import_prop_types.default.func, legend: import_prop_types.default.node, legendPosition: import_prop_types.default.oneOf(["start", "middle", "end"]), legendOffset: import_prop_types.default.number, ariaHidden: import_prop_types.default.bool };
var w = import_prop_types.default.shape(O);
var B2 = ["top", "right", "bottom", "left"];
var X2 = (0, import_react.memo)(function(t5) {
  var e4 = t5.xScale, i2 = t5.yScale, n3 = t5.width, r3 = t5.height, o = { top: t5.top, right: t5.right, bottom: t5.bottom, left: t5.left };
  return (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: B2.map(function(t6) {
    var a2 = o[t6];
    if (!a2) return null;
    var l = "top" === t6 || "bottom" === t6;
    return (0, import_jsx_runtime.jsx)(W2, p({}, a2, { axis: l ? "x" : "y", x: "right" === t6 ? n3 : 0, y: "bottom" === t6 ? r3 : 0, scale: l ? e4 : i2, length: l ? n3 : r3, ticksPosition: "top" === t6 || "left" === t6 ? "before" : "after", truncateTickAt: a2.truncateTickAt }), t6);
  }) });
});
var Y2 = (0, import_react.memo)(function(t5) {
  var e4 = t5.animatedProps, i2 = Et();
  return (0, import_jsx_runtime.jsx)(animated.line, p({}, e4, i2.grid.line));
});
var C2 = (0, import_react.memo)(function(t5) {
  var e4 = t5.lines, i2 = Zr(), n3 = i2.animate, o = i2.config, a2 = useTransition(e4, { keys: function(t6) {
    return t6.key;
  }, initial: function(t6) {
    return { opacity: 1, x1: t6.x1, x2: t6.x2, y1: t6.y1, y2: t6.y2 };
  }, from: function(t6) {
    return { opacity: 0, x1: t6.x1, x2: t6.x2, y1: t6.y1, y2: t6.y2 };
  }, enter: function(t6) {
    return { opacity: 1, x1: t6.x1, x2: t6.x2, y1: t6.y1, y2: t6.y2 };
  }, update: function(t6) {
    return { opacity: 1, x1: t6.x1, x2: t6.x2, y1: t6.y1, y2: t6.y2 };
  }, leave: { opacity: 0 }, config: o, immediate: !n3 });
  return (0, import_jsx_runtime.jsx)("g", { children: a2(function(t6, e6) {
    return (0, import_react.createElement)(Y2, p({}, e6, { key: e6.key, animatedProps: t6 }));
  }) });
});
var z = (0, import_react.memo)(function(t5) {
  var e4 = t5.width, n3 = t5.height, r3 = t5.xScale, o = t5.yScale, a2 = t5.xValues, l = t5.yValues, s = (0, import_react.useMemo)(function() {
    return !!r3 && P({ width: e4, height: n3, scale: r3, axis: "x", values: a2 });
  }, [r3, a2, e4, n3]), c = (0, import_react.useMemo)(function() {
    return !!o && P({ width: e4, height: n3, scale: o, axis: "y", values: l });
  }, [n3, e4, o, l]);
  return (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [s && (0, import_jsx_runtime.jsx)(C2, { lines: s }), c && (0, import_jsx_runtime.jsx)(C2, { lines: c })] });
});
var V = function(t5, e4) {
  var i2, n3 = e4.axis, r3 = e4.scale, o = e4.x, a2 = void 0 === o ? 0 : o, l = e4.y, c = void 0 === l ? 0 : l, f = e4.length, u = e4.ticksPosition, d = e4.tickValues, x = e4.tickSize, m = void 0 === x ? 5 : x, y = e4.tickPadding, h2 = void 0 === y ? 5 : y, g2 = e4.tickRotation, k2 = void 0 === g2 ? 0 : g2, v2 = e4.format, p2 = e4.legend, T2 = e4.legendPosition, P2 = void 0 === T2 ? "end" : T2, S2 = e4.legendOffset, A3 = void 0 === S2 ? 0 : S2, W3 = e4.theme, O2 = b({ axis: n3, scale: r3, ticksPosition: u, tickValues: d, tickSize: m, tickPadding: h2, tickRotation: k2, engine: "canvas" }), w2 = O2.ticks, B3 = O2.textAlign, X3 = O2.textBaseline;
  t5.save(), t5.translate(a2, c), t5.textAlign = B3, t5.textBaseline = X3;
  var Y3 = W3.axis.ticks.text;
  t5.font = (Y3.fontWeight ? Y3.fontWeight + " " : "") + Y3.fontSize + "px " + Y3.fontFamily, (null != (i2 = W3.axis.domain.line.strokeWidth) ? i2 : 0) > 0 && (t5.lineWidth = Number(W3.axis.domain.line.strokeWidth), t5.lineCap = "square", W3.axis.domain.line.stroke && (t5.strokeStyle = W3.axis.domain.line.stroke), t5.beginPath(), t5.moveTo(0, 0), t5.lineTo("x" === n3 ? f : 0, "x" === n3 ? 0 : f), t5.stroke());
  var C3 = "function" == typeof v2 ? v2 : function(t6) {
    return "" + t6;
  };
  if (w2.forEach(function(e6) {
    var i3;
    (null != (i3 = W3.axis.ticks.line.strokeWidth) ? i3 : 0) > 0 && (t5.lineWidth = Number(W3.axis.ticks.line.strokeWidth), t5.lineCap = "square", W3.axis.ticks.line.stroke && (t5.strokeStyle = W3.axis.ticks.line.stroke), t5.beginPath(), t5.moveTo(e6.x, e6.y), t5.lineTo(e6.x + e6.lineX, e6.y + e6.lineY), t5.stroke());
    var n4 = C3(e6.value);
    t5.save(), t5.translate(e6.x + e6.textX, e6.y + e6.textY), t5.rotate(ni(k2)), Y3.outlineWidth > 0 && (t5.strokeStyle = Y3.outlineColor, t5.lineWidth = 2 * Y3.outlineWidth, t5.lineJoin = "round", t5.strokeText("" + n4, 0, 0)), W3.axis.ticks.text.fill && (t5.fillStyle = Y3.fill), t5.fillText("" + n4, 0, 0), t5.restore();
  }), void 0 !== p2) {
    var z2 = 0, V2 = 0, j2 = 0, D3 = "center";
    "y" === n3 ? (j2 = -90, z2 = A3, "start" === P2 ? (D3 = "start", V2 = f) : "middle" === P2 ? (D3 = "center", V2 = f / 2) : "end" === P2 && (D3 = "end")) : (V2 = A3, "start" === P2 ? D3 = "start" : "middle" === P2 ? (D3 = "center", z2 = f / 2) : "end" === P2 && (D3 = "end", z2 = f)), t5.translate(z2, V2), t5.rotate(ni(j2)), t5.font = (W3.axis.legend.text.fontWeight ? W3.axis.legend.text.fontWeight + " " : "") + W3.axis.legend.text.fontSize + "px " + W3.axis.legend.text.fontFamily, W3.axis.legend.text.fill && (t5.fillStyle = W3.axis.legend.text.fill), t5.textAlign = D3, t5.textBaseline = "middle", t5.fillText(p2, 0, 0);
  }
  t5.restore();
};
var j = function(t5, e4) {
  var i2 = e4.xScale, n3 = e4.yScale, r3 = e4.width, o = e4.height, a2 = e4.top, l = e4.right, s = e4.bottom, c = e4.left, f = e4.theme, u = { top: a2, right: l, bottom: s, left: c };
  B2.forEach(function(e6) {
    var a3 = u[e6];
    if (!a3) return null;
    var l2 = "top" === e6 || "bottom" === e6, s2 = "top" === e6 || "left" === e6 ? "before" : "after", c2 = l2 ? i2 : n3, d = T(a3.format, c2);
    V(t5, p({}, a3, { axis: l2 ? "x" : "y", x: "right" === e6 ? r3 : 0, y: "bottom" === e6 ? o : 0, scale: c2, format: d, length: l2 ? r3 : o, ticksPosition: s2, theme: f }));
  });
};
var D2 = function(t5, e4) {
  var i2 = e4.width, n3 = e4.height, r3 = e4.scale, o = e4.axis, a2 = e4.values;
  P({ width: i2, height: n3, scale: r3, axis: o, values: a2 }).forEach(function(e6) {
    t5.beginPath(), t5.moveTo(e6.x1, e6.y1), t5.lineTo(e6.x2, e6.y2), t5.stroke();
  });
};

export {
  require_baseIteratee,
  require_uniqBy,
  require_baseEach,
  W,
  Y,
  cn,
  dn,
  w,
  X2 as X,
  z,
  j,
  D2 as D
};
//# sourceMappingURL=chunk-2PVEFPLL.js.map
