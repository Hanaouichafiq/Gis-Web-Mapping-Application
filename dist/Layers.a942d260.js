// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/ol/src/events/EventType.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @module ol/events/EventType
 */

/**
 * @enum {string}
 * @const
 */
var _default = {
  /**
   * Generic change event. Triggered when the revision counter is increased.
   * @event module:ol/events/Event~BaseEvent#change
   * @api
   */
  CHANGE: 'change',

  /**
   * Generic error event. Triggered when an error occurs.
   * @event module:ol/events/Event~BaseEvent#error
   * @api
   */
  ERROR: 'error',
  BLUR: 'blur',
  CLEAR: 'clear',
  CONTEXTMENU: 'contextmenu',
  CLICK: 'click',
  DBLCLICK: 'dblclick',
  DRAGENTER: 'dragenter',
  DRAGOVER: 'dragover',
  DROP: 'drop',
  FOCUS: 'focus',
  KEYDOWN: 'keydown',
  KEYPRESS: 'keypress',
  LOAD: 'load',
  RESIZE: 'resize',
  TOUCHMOVE: 'touchmove',
  WHEEL: 'wheel'
};
exports.default = _default;
},{}],"node_modules/ol/src/ImageState.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @module ol/ImageState
 */

/**
 * @enum {number}
 */
var _default = {
  IDLE: 0,
  LOADING: 1,
  LOADED: 2,
  ERROR: 3,
  EMPTY: 4
};
exports.default = _default;
},{}],"node_modules/ol/src/Disposable.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @module ol/Disposable
 */

/**
 * @classdesc
 * Objects that need to clean up after themselves.
 */
class Disposable {
  constructor() {
    /**
     * The object has already been disposed.
     * @type {boolean}
     * @protected
     */
    this.disposed = false;
  }
  /**
   * Clean up.
   */


  dispose() {
    if (!this.disposed) {
      this.disposed = true;
      this.disposeInternal();
    }
  }
  /**
   * Extension point for disposable objects.
   * @protected
   */


  disposeInternal() {}

}

var _default = Disposable;
exports.default = _default;
},{}],"node_modules/ol/src/events/Event.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stopPropagation = stopPropagation;
exports.preventDefault = preventDefault;
exports.default = void 0;

/**
 * @module ol/events/Event
 */

/**
 * @classdesc
 * Stripped down implementation of the W3C DOM Level 2 Event interface.
 * See https://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-interface.
 *
 * This implementation only provides `type` and `target` properties, and
 * `stopPropagation` and `preventDefault` methods. It is meant as base class
 * for higher level events defined in the library, and works with
 * {@link module:ol/events/Target~Target}.
 */
class BaseEvent {
  /**
   * @param {string} type Type.
   */
  constructor(type) {
    /**
     * @type {boolean}
     */
    this.propagationStopped;
    /**
     * @type {boolean}
     */

    this.defaultPrevented;
    /**
     * The event type.
     * @type {string}
     * @api
     */

    this.type = type;
    /**
     * The event target.
     * @type {Object}
     * @api
     */

    this.target = null;
  }
  /**
   * Prevent default. This means that no emulated `click`, `singleclick` or `doubleclick` events
   * will be fired.
   * @api
   */


  preventDefault() {
    this.defaultPrevented = true;
  }
  /**
   * Stop event propagation.
   * @api
   */


  stopPropagation() {
    this.propagationStopped = true;
  }

}
/**
 * @param {Event|import("./Event.js").default} evt Event
 */


function stopPropagation(evt) {
  evt.stopPropagation();
}
/**
 * @param {Event|import("./Event.js").default} evt Event
 */


function preventDefault(evt) {
  evt.preventDefault();
}

var _default = BaseEvent;
exports.default = _default;
},{}],"node_modules/ol/src/array.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.binarySearch = binarySearch;
exports.numberSafeCompareFunction = numberSafeCompareFunction;
exports.includes = includes;
exports.linearFindNearest = linearFindNearest;
exports.reverseSubArray = reverseSubArray;
exports.extend = extend;
exports.remove = remove;
exports.find = find;
exports.equals = equals;
exports.stableSort = stableSort;
exports.findIndex = findIndex;
exports.isSorted = isSorted;

/**
 * @module ol/array
 */

/**
 * Performs a binary search on the provided sorted list and returns the index of the item if found. If it can't be found it'll return -1.
 * https://github.com/darkskyapp/binary-search
 *
 * @param {Array<*>} haystack Items to search through.
 * @param {*} needle The item to look for.
 * @param {Function} [opt_comparator] Comparator function.
 * @return {number} The index of the item if found, -1 if not.
 */
function binarySearch(haystack, needle, opt_comparator) {
  let mid, cmp;
  const comparator = opt_comparator || numberSafeCompareFunction;
  let low = 0;
  let high = haystack.length;
  let found = false;

  while (low < high) {
    /* Note that "(low + high) >>> 1" may overflow, and results in a typecast
     * to double (which gives the wrong results). */
    mid = low + (high - low >> 1);
    cmp = +comparator(haystack[mid], needle);

    if (cmp < 0.0) {
      /* Too low. */
      low = mid + 1;
    } else {
      /* Key found or too high */
      high = mid;
      found = !cmp;
    }
  }
  /* Key not found. */


  return found ? low : ~low;
}
/**
 * Compare function for array sort that is safe for numbers.
 * @param {*} a The first object to be compared.
 * @param {*} b The second object to be compared.
 * @return {number} A negative number, zero, or a positive number as the first
 *     argument is less than, equal to, or greater than the second.
 */


function numberSafeCompareFunction(a, b) {
  return a > b ? 1 : a < b ? -1 : 0;
}
/**
 * Whether the array contains the given object.
 * @param {Array<*>} arr The array to test for the presence of the element.
 * @param {*} obj The object for which to test.
 * @return {boolean} The object is in the array.
 */


function includes(arr, obj) {
  return arr.indexOf(obj) >= 0;
}
/**
 * {@link module:ol/tilegrid/TileGrid~TileGrid#getZForResolution} can use a function
 * of this type to determine which nearest resolution to use.
 *
 * This function takes a `{number}` representing a value between two array entries,
 * a `{number}` representing the value of the nearest higher entry and
 * a `{number}` representing the value of the nearest lower entry
 * as arguments and returns a `{number}`. If a negative number or zero is returned
 * the lower value will be used, if a positive number is returned the higher value
 * will be used.
 * @typedef {function(number, number, number): number} NearestDirectionFunction
 * @api
 */

/**
 * @param {Array<number>} arr Array in desccending order.
 * @param {number} target Target.
 * @param {number|NearestDirectionFunction} direction
 *    0 means return the nearest,
 *    > 0 means return the largest nearest,
 *    < 0 means return the smallest nearest.
 * @return {number} Index.
 */


function linearFindNearest(arr, target, direction) {
  const n = arr.length;

  if (arr[0] <= target) {
    return 0;
  } else if (target <= arr[n - 1]) {
    return n - 1;
  } else {
    let i;

    if (direction > 0) {
      for (i = 1; i < n; ++i) {
        if (arr[i] < target) {
          return i - 1;
        }
      }
    } else if (direction < 0) {
      for (i = 1; i < n; ++i) {
        if (arr[i] <= target) {
          return i;
        }
      }
    } else {
      for (i = 1; i < n; ++i) {
        if (arr[i] == target) {
          return i;
        } else if (arr[i] < target) {
          if (typeof direction === 'function') {
            if (direction(target, arr[i - 1], arr[i]) > 0) {
              return i - 1;
            } else {
              return i;
            }
          } else if (arr[i - 1] - target < target - arr[i]) {
            return i - 1;
          } else {
            return i;
          }
        }
      }
    }

    return n - 1;
  }
}
/**
 * @param {Array<*>} arr Array.
 * @param {number} begin Begin index.
 * @param {number} end End index.
 */


function reverseSubArray(arr, begin, end) {
  while (begin < end) {
    const tmp = arr[begin];
    arr[begin] = arr[end];
    arr[end] = tmp;
    ++begin;
    --end;
  }
}
/**
 * @param {Array<VALUE>} arr The array to modify.
 * @param {!Array<VALUE>|VALUE} data The elements or arrays of elements to add to arr.
 * @template VALUE
 */


function extend(arr, data) {
  const extension = Array.isArray(data) ? data : [data];
  const length = extension.length;

  for (let i = 0; i < length; i++) {
    arr[arr.length] = extension[i];
  }
}
/**
 * @param {Array<VALUE>} arr The array to modify.
 * @param {VALUE} obj The element to remove.
 * @template VALUE
 * @return {boolean} If the element was removed.
 */


function remove(arr, obj) {
  const i = arr.indexOf(obj);
  const found = i > -1;

  if (found) {
    arr.splice(i, 1);
  }

  return found;
}
/**
 * @param {Array<VALUE>} arr The array to search in.
 * @param {function(VALUE, number, ?) : boolean} func The function to compare.
 * @template VALUE
 * @return {VALUE|null} The element found or null.
 */


function find(arr, func) {
  const length = arr.length >>> 0;
  let value;

  for (let i = 0; i < length; i++) {
    value = arr[i];

    if (func(value, i, arr)) {
      return value;
    }
  }

  return null;
}
/**
 * @param {Array|Uint8ClampedArray} arr1 The first array to compare.
 * @param {Array|Uint8ClampedArray} arr2 The second array to compare.
 * @return {boolean} Whether the two arrays are equal.
 */


function equals(arr1, arr2) {
  const len1 = arr1.length;

  if (len1 !== arr2.length) {
    return false;
  }

  for (let i = 0; i < len1; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}
/**
 * Sort the passed array such that the relative order of equal elements is preverved.
 * See https://en.wikipedia.org/wiki/Sorting_algorithm#Stability for details.
 * @param {Array<*>} arr The array to sort (modifies original).
 * @param {!function(*, *): number} compareFnc Comparison function.
 * @api
 */


function stableSort(arr, compareFnc) {
  const length = arr.length;
  const tmp = Array(arr.length);
  let i;

  for (i = 0; i < length; i++) {
    tmp[i] = {
      index: i,
      value: arr[i]
    };
  }

  tmp.sort(function (a, b) {
    return compareFnc(a.value, b.value) || a.index - b.index;
  });

  for (i = 0; i < arr.length; i++) {
    arr[i] = tmp[i].value;
  }
}
/**
 * @param {Array<*>} arr The array to search in.
 * @param {Function} func Comparison function.
 * @return {number} Return index.
 */


function findIndex(arr, func) {
  let index;
  const found = !arr.every(function (el, idx) {
    index = idx;
    return !func(el, idx, arr);
  });
  return found ? index : -1;
}
/**
 * @param {Array<*>} arr The array to test.
 * @param {Function} [opt_func] Comparison function.
 * @param {boolean} [opt_strict] Strictly sorted (default false).
 * @return {boolean} Return index.
 */


function isSorted(arr, opt_func, opt_strict) {
  const compare = opt_func || numberSafeCompareFunction;
  return arr.every(function (currentVal, index) {
    if (index === 0) {
      return true;
    }

    const res = compare(arr[index - 1], currentVal);
    return !(res > 0 || opt_strict && res === 0);
  });
}
},{}],"node_modules/ol/src/functions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TRUE = TRUE;
exports.FALSE = FALSE;
exports.VOID = VOID;
exports.memoizeOne = memoizeOne;

var _array = require("./array.js");

/**
 * @module ol/functions
 */

/**
 * Always returns true.
 * @return {boolean} true.
 */
function TRUE() {
  return true;
}
/**
 * Always returns false.
 * @return {boolean} false.
 */


function FALSE() {
  return false;
}
/**
 * A reusable function, used e.g. as a default for callbacks.
 *
 * @return {void} Nothing.
 */


function VOID() {}
/**
 * Wrap a function in another function that remembers the last return.  If the
 * returned function is called twice in a row with the same arguments and the same
 * this object, it will return the value from the first call in the second call.
 *
 * @param {function(...any): ReturnType} fn The function to memoize.
 * @return {function(...any): ReturnType} The memoized function.
 * @template ReturnType
 */


function memoizeOne(fn) {
  let called = false;
  /** @type {ReturnType} */

  let lastResult;
  /** @type {Array<any>} */

  let lastArgs;
  let lastThis;
  return function () {
    const nextArgs = Array.prototype.slice.call(arguments);

    if (!called || this !== lastThis || !(0, _array.equals)(nextArgs, lastArgs)) {
      called = true;
      lastThis = this;
      lastArgs = nextArgs;
      lastResult = fn.apply(this, arguments);
    }

    return lastResult;
  };
}
},{"./array.js":"node_modules/ol/src/array.js"}],"node_modules/ol/src/obj.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clear = clear;
exports.isEmpty = isEmpty;
exports.getValues = exports.assign = void 0;

/**
 * @module ol/obj
 */

/**
 * Polyfill for Object.assign().  Assigns enumerable and own properties from
 * one or more source objects to a target object.
 * See https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign.
 *
 * @param {!Object} target The target object.
 * @param {...Object} var_sources The source object(s).
 * @return {!Object} The modified target object.
 */
const assign = typeof Object.assign === 'function' ? Object.assign : function (target, var_sources) {
  if (target === undefined || target === null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  const output = Object(target);

  for (let i = 1, ii = arguments.length; i < ii; ++i) {
    const source = arguments[i];

    if (source !== undefined && source !== null) {
      for (const key in source) {
        if (source.hasOwnProperty(key)) {
          output[key] = source[key];
        }
      }
    }
  }

  return output;
};
/**
 * Removes all properties from an object.
 * @param {Object} object The object to clear.
 */

exports.assign = assign;

function clear(object) {
  for (const property in object) {
    delete object[property];
  }
}
/**
 * Polyfill for Object.values().  Get an array of property values from an object.
 * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values
 *
 * @param {!Object<K,V>} object The object from which to get the values.
 * @return {!Array<V>} The property values.
 * @template K,V
 */


const getValues = typeof Object.values === 'function' ? Object.values : function (object) {
  const values = [];

  for (const property in object) {
    values.push(object[property]);
  }

  return values;
};
/**
 * Determine if an object has any properties.
 * @param {Object} object The object to check.
 * @return {boolean} The object is empty.
 */

exports.getValues = getValues;

function isEmpty(object) {
  let property;

  for (property in object) {
    return false;
  }

  return !property;
}
},{}],"node_modules/ol/src/events/Target.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Disposable = _interopRequireDefault(require("../Disposable.js"));

var _Event = _interopRequireDefault(require("./Event.js"));

var _functions = require("../functions.js");

var _obj = require("../obj.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module ol/events/Target
 */

/**
 * @typedef {EventTarget|Target} EventTargetLike
 */

/**
 * @classdesc
 * A simplified implementation of the W3C DOM Level 2 EventTarget interface.
 * See https://www.w3.org/TR/2000/REC-DOM-Level-2-Events-20001113/events.html#Events-EventTarget.
 *
 * There are two important simplifications compared to the specification:
 *
 * 1. The handling of `useCapture` in `addEventListener` and
 *    `removeEventListener`. There is no real capture model.
 * 2. The handling of `stopPropagation` and `preventDefault` on `dispatchEvent`.
 *    There is no event target hierarchy. When a listener calls
 *    `stopPropagation` or `preventDefault` on an event object, it means that no
 *    more listeners after this one will be called. Same as when the listener
 *    returns false.
 */
class Target extends _Disposable.default {
  /**
   * @param {*} [opt_target] Default event target for dispatched events.
   */
  constructor(opt_target) {
    super();
    /**
     * @private
     * @type {*}
     */

    this.eventTarget_ = opt_target;
    /**
     * @private
     * @type {Object<string, number>}
     */

    this.pendingRemovals_ = null;
    /**
     * @private
     * @type {Object<string, number>}
     */

    this.dispatching_ = null;
    /**
     * @private
     * @type {Object<string, Array<import("../events.js").Listener>>}
     */

    this.listeners_ = null;
  }
  /**
   * @param {string} type Type.
   * @param {import("../events.js").Listener} listener Listener.
   */


  addEventListener(type, listener) {
    if (!type || !listener) {
      return;
    }

    const listeners = this.listeners_ || (this.listeners_ = {});
    const listenersForType = listeners[type] || (listeners[type] = []);

    if (listenersForType.indexOf(listener) === -1) {
      listenersForType.push(listener);
    }
  }
  /**
   * Dispatches an event and calls all listeners listening for events
   * of this type. The event parameter can either be a string or an
   * Object with a `type` property.
   *
   * @param {import("./Event.js").default|string} event Event object.
   * @return {boolean|undefined} `false` if anyone called preventDefault on the
   *     event object or if any of the listeners returned false.
   * @api
   */


  dispatchEvent(event) {
    /** @type {import("./Event.js").default|Event} */
    const evt = typeof event === 'string' ? new _Event.default(event) : event;
    const type = evt.type;

    if (!evt.target) {
      evt.target = this.eventTarget_ || this;
    }

    const listeners = this.listeners_ && this.listeners_[type];
    let propagate;

    if (listeners) {
      const dispatching = this.dispatching_ || (this.dispatching_ = {});
      const pendingRemovals = this.pendingRemovals_ || (this.pendingRemovals_ = {});

      if (!(type in dispatching)) {
        dispatching[type] = 0;
        pendingRemovals[type] = 0;
      }

      ++dispatching[type];

      for (let i = 0, ii = listeners.length; i < ii; ++i) {
        if ('handleEvent' in listeners[i]) {
          propagate =
          /** @type {import("../events.js").ListenerObject} */
          listeners[i].handleEvent(evt);
        } else {
          propagate =
          /** @type {import("../events.js").ListenerFunction} */
          listeners[i].call(this, evt);
        }

        if (propagate === false || evt.propagationStopped) {
          propagate = false;
          break;
        }
      }

      --dispatching[type];

      if (dispatching[type] === 0) {
        let pr = pendingRemovals[type];
        delete pendingRemovals[type];

        while (pr--) {
          this.removeEventListener(type, _functions.VOID);
        }

        delete dispatching[type];
      }

      return propagate;
    }
  }
  /**
   * Clean up.
   */


  disposeInternal() {
    this.listeners_ && (0, _obj.clear)(this.listeners_);
  }
  /**
   * Get the listeners for a specified event type. Listeners are returned in the
   * order that they will be called in.
   *
   * @param {string} type Type.
   * @return {Array<import("../events.js").Listener>|undefined} Listeners.
   */


  getListeners(type) {
    return this.listeners_ && this.listeners_[type] || undefined;
  }
  /**
   * @param {string} [opt_type] Type. If not provided,
   *     `true` will be returned if this event target has any listeners.
   * @return {boolean} Has listeners.
   */


  hasListener(opt_type) {
    if (!this.listeners_) {
      return false;
    }

    return opt_type ? opt_type in this.listeners_ : Object.keys(this.listeners_).length > 0;
  }
  /**
   * @param {string} type Type.
   * @param {import("../events.js").Listener} listener Listener.
   */


  removeEventListener(type, listener) {
    const listeners = this.listeners_ && this.listeners_[type];

    if (listeners) {
      const index = listeners.indexOf(listener);

      if (index !== -1) {
        if (this.pendingRemovals_ && type in this.pendingRemovals_) {
          // make listener a no-op, and remove later in #dispatchEvent()
          listeners[index] = _functions.VOID;
          ++this.pendingRemovals_[type];
        } else {
          listeners.splice(index, 1);

          if (listeners.length === 0) {
            delete this.listeners_[type];
          }
        }
      }
    }
  }

}

var _default = Target;
exports.default = _default;
},{"../Disposable.js":"node_modules/ol/src/Disposable.js","./Event.js":"node_modules/ol/src/events/Event.js","../functions.js":"node_modules/ol/src/functions.js","../obj.js":"node_modules/ol/src/obj.js"}],"node_modules/ol/src/events.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listen = listen;
exports.listenOnce = listenOnce;
exports.unlistenByKey = unlistenByKey;

var _obj = require("./obj.js");

/**
 * @module ol/events
 */

/**
 * Key to use with {@link module:ol/Observable~Observable#unByKey}.
 * @typedef {Object} EventsKey
 * @property {ListenerFunction} listener Listener.
 * @property {import("./events/Target.js").EventTargetLike} target Target.
 * @property {string} type Type.
 * @api
 */

/**
 * Listener function. This function is called with an event object as argument.
 * When the function returns `false`, event propagation will stop.
 *
 * @typedef {function((Event|import("./events/Event.js").default)): (void|boolean)} ListenerFunction
 * @api
 */

/**
 * @typedef {Object} ListenerObject
 * @property {ListenerFunction} handleEvent HandleEvent listener function.
 */

/**
 * @typedef {ListenerFunction|ListenerObject} Listener
 */

/**
 * Registers an event listener on an event target. Inspired by
 * https://google.github.io/closure-library/api/source/closure/goog/events/events.js.src.html
 *
 * This function efficiently binds a `listener` to a `this` object, and returns
 * a key for use with {@link module:ol/events.unlistenByKey}.
 *
 * @param {import("./events/Target.js").EventTargetLike} target Event target.
 * @param {string} type Event type.
 * @param {ListenerFunction} listener Listener.
 * @param {Object} [opt_this] Object referenced by the `this` keyword in the
 *     listener. Default is the `target`.
 * @param {boolean} [opt_once] If true, add the listener as one-off listener.
 * @return {EventsKey} Unique key for the listener.
 */
function listen(target, type, listener, opt_this, opt_once) {
  if (opt_this && opt_this !== target) {
    listener = listener.bind(opt_this);
  }

  if (opt_once) {
    const originalListener = listener;

    listener = function () {
      target.removeEventListener(type, listener);
      originalListener.apply(this, arguments);
    };
  }

  const eventsKey = {
    target: target,
    type: type,
    listener: listener
  };
  target.addEventListener(type, listener);
  return eventsKey;
}
/**
 * Registers a one-off event listener on an event target. Inspired by
 * https://google.github.io/closure-library/api/source/closure/goog/events/events.js.src.html
 *
 * This function efficiently binds a `listener` as self-unregistering listener
 * to a `this` object, and returns a key for use with
 * {@link module:ol/events.unlistenByKey} in case the listener needs to be
 * unregistered before it is called.
 *
 * When {@link module:ol/events.listen} is called with the same arguments after this
 * function, the self-unregistering listener will be turned into a permanent
 * listener.
 *
 * @param {import("./events/Target.js").EventTargetLike} target Event target.
 * @param {string} type Event type.
 * @param {ListenerFunction} listener Listener.
 * @param {Object} [opt_this] Object referenced by the `this` keyword in the
 *     listener. Default is the `target`.
 * @return {EventsKey} Key for unlistenByKey.
 */


function listenOnce(target, type, listener, opt_this) {
  return listen(target, type, listener, opt_this, true);
}
/**
 * Unregisters event listeners on an event target. Inspired by
 * https://google.github.io/closure-library/api/source/closure/goog/events/events.js.src.html
 *
 * The argument passed to this function is the key returned from
 * {@link module:ol/events.listen} or {@link module:ol/events.listenOnce}.
 *
 * @param {EventsKey} key The key.
 */


function unlistenByKey(key) {
  if (key && key.target) {
    key.target.removeEventListener(key.type, key.listener);
    (0, _obj.clear)(key);
  }
}
},{"./obj.js":"node_modules/ol/src/obj.js"}],"node_modules/ol/src/Observable.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unByKey = unByKey;
exports.default = void 0;

var _Target = _interopRequireDefault(require("./events/Target.js"));

var _EventType = _interopRequireDefault(require("./events/EventType.js"));

var _events = require("./events.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module ol/Observable
 */

/***
 * @template {string} Type
 * @template {Event|import("./events/Event.js").default} EventClass
 * @template Return
 * @typedef {(type: Type|Type[], listener: (event: EventClass) => ?) => Return} OnSignature
 */

/***
 * @template {string} Type
 * @template Return
 * @typedef {(type: Type[], listener: (event: Event|import("./events/Event").default) => ?) => Return} CombinedOnSignature
 */

/***
 * @typedef {import("./events").EventsKey|Array<import("./events").EventsKey>} OnReturn
 */

/**
 * @typedef {'change'|'error'} EventTypes
 */

/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * An event target providing convenient methods for listener registration
 * and unregistration. A generic `change` event is always available through
 * {@link module:ol/Observable~Observable#changed}.
 *
 * @fires import("./events/Event.js").default
 * @api
 */
class Observable extends _Target.default {
  constructor() {
    super();
    /***
     * @type {OnSignature<EventTypes, import("./events/Event.js").default, OnReturn>}
     */

    this.on = this.onInternal;
    /***
     * @type {OnSignature<EventTypes, import("./events/Event.js").default, OnReturn>}
     */

    this.once = this.onceInternal;
    /***
     * @type {OnSignature<EventTypes, import("./events/Event.js").default, void>}
     */

    this.un = this.unInternal;
    /**
     * @private
     * @type {number}
     */

    this.revision_ = 0;
  }
  /**
   * Increases the revision counter and dispatches a 'change' event.
   * @api
   */


  changed() {
    ++this.revision_;
    this.dispatchEvent(_EventType.default.CHANGE);
  }
  /**
   * Get the version number for this object.  Each time the object is modified,
   * its version number will be incremented.
   * @return {number} Revision.
   * @api
   */


  getRevision() {
    return this.revision_;
  }
  /**
   * @param {string|Array<string>} type Type.
   * @param {function(?): ?} listener Listener.
   * @return {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} Event key.
   * @protected
   */


  onInternal(type, listener) {
    if (Array.isArray(type)) {
      const len = type.length;
      const keys = new Array(len);

      for (let i = 0; i < len; ++i) {
        keys[i] = (0, _events.listen)(this, type[i], listener);
      }

      return keys;
    } else {
      return (0, _events.listen)(this, type, listener);
    }
  }
  /**
   * @param {string|Array<string>} type Type.
   * @param {function(?): ?} listener Listener.
   * @return {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} Event key.
   * @protected
   */


  onceInternal(type, listener) {
    let key;

    if (Array.isArray(type)) {
      const len = type.length;
      key = new Array(len);

      for (let i = 0; i < len; ++i) {
        key[i] = (0, _events.listenOnce)(this, type[i], listener);
      }
    } else {
      key = (0, _events.listenOnce)(this, type, listener);
    }
    /** @type {Object} */


    listener.ol_key = key;
    return key;
  }
  /**
   * Unlisten for a certain type of event.
   * @param {string|Array<string>} type Type.
   * @param {function(?): ?} listener Listener.
   * @protected
   */


  unInternal(type, listener) {
    const key =
    /** @type {Object} */
    listener.ol_key;

    if (key) {
      unByKey(key);
    } else if (Array.isArray(type)) {
      for (let i = 0, ii = type.length; i < ii; ++i) {
        this.removeEventListener(type[i], listener);
      }
    } else {
      this.removeEventListener(type, listener);
    }
  }

}
/**
 * Listen for a certain type of event.
 * @function
 * @param {string|Array<string>} type The event type or array of event types.
 * @param {function((Event|import("./events/Event").default)): ?} listener The listener function.
 * @return {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} Unique key for the listener. If
 *     called with an array of event types as the first argument, the return
 *     will be an array of keys.
 * @api
 */


Observable.prototype.on;
/**
 * Listen once for a certain type of event.
 * @function
 * @param {string|Array<string>} type The event type or array of event types.
 * @param {function((Event|import("./events/Event").default)): ?} listener The listener function.
 * @return {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} Unique key for the listener. If
 *     called with an array of event types as the first argument, the return
 *     will be an array of keys.
 * @api
 */

Observable.prototype.once;
/**
 * Unlisten for a certain type of event.
 * @function
 * @param {string|Array<string>} type The event type or array of event types.
 * @param {function((Event|import("./events/Event").default)): ?} listener The listener function.
 * @api
 */

Observable.prototype.un;
/**
 * Removes an event listener using the key returned by `on()` or `once()`.
 * @param {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} key The key returned by `on()`
 *     or `once()` (or an array of keys).
 * @api
 */

function unByKey(key) {
  if (Array.isArray(key)) {
    for (let i = 0, ii = key.length; i < ii; ++i) {
      (0, _events.unlistenByKey)(key[i]);
    }
  } else {
    (0, _events.unlistenByKey)(key);
  }
}

var _default = Observable;
exports.default = _default;
},{"./events/Target.js":"node_modules/ol/src/events/Target.js","./events/EventType.js":"node_modules/ol/src/events/EventType.js","./events.js":"node_modules/ol/src/events.js"}],"node_modules/ol/src/source/State.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @module ol/source/State
 */

/**
 * @enum {string}
 * State of the source, one of 'undefined', 'loading', 'ready' or 'error'.
 */
var _default = {
  UNDEFINED: 'undefined',
  LOADING: 'loading',
  READY: 'ready',
  ERROR: 'error'
};
exports.default = _default;
},{}],"node_modules/ol/src/util.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.abstract = abstract;
exports.getUid = getUid;
exports.VERSION = void 0;

/**
 * @module ol/util
 */

/**
 * @return {?} Any return.
 */
function abstract() {
  return function () {
    throw new Error('Unimplemented abstract method.');
  }();
}
/**
 * Counter for getUid.
 * @type {number}
 * @private
 */


let uidCounter_ = 0;
/**
 * Gets a unique ID for an object. This mutates the object so that further calls
 * with the same object as a parameter returns the same value. Unique IDs are generated
 * as a strictly increasing sequence. Adapted from goog.getUid.
 *
 * @param {Object} obj The object to get the unique ID for.
 * @return {string} The unique ID for the object.
 * @api
 */

function getUid(obj) {
  return obj.ol_uid || (obj.ol_uid = String(++uidCounter_));
}
/**
 * OpenLayers version.
 * @type {string}
 */


const VERSION = 'latest';
exports.VERSION = VERSION;
},{}],"node_modules/ol/src/renderer/Layer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _EventType = _interopRequireDefault(require("../events/EventType.js"));

var _ImageState = _interopRequireDefault(require("../ImageState.js"));

var _Observable = _interopRequireDefault(require("../Observable.js"));

var _State = _interopRequireDefault(require("../source/State.js"));

var _util = require("../util.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module ol/renderer/Layer
 */

/**
 * @template {import("../layer/Layer.js").default} LayerType
 */
class LayerRenderer extends _Observable.default {
  /**
   * @param {LayerType} layer Layer.
   */
  constructor(layer) {
    super();
    /** @private */

    this.boundHandleImageChange_ = this.handleImageChange_.bind(this);
    /**
     * @protected
     * @type {LayerType}
     */

    this.layer_ = layer;
    /**
     * @type {import("../render/canvas/ExecutorGroup").default}
     */

    this.declutterExecutorGroup = null;
  }
  /**
   * Asynchronous layer level hit detection.
   * @param {import("../pixel.js").Pixel} pixel Pixel.
   * @return {Promise<Array<import("../Feature").default>>} Promise that resolves with
   * an array of features.
   */


  getFeatures(pixel) {
    return (0, _util.abstract)();
  }
  /**
   * Determine whether render should be called.
   * @abstract
   * @param {import("../PluggableMap.js").FrameState} frameState Frame state.
   * @return {boolean} Layer is ready to be rendered.
   */


  prepareFrame(frameState) {
    return (0, _util.abstract)();
  }
  /**
   * Render the layer.
   * @abstract
   * @param {import("../PluggableMap.js").FrameState} frameState Frame state.
   * @param {HTMLElement} target Target that may be used to render content to.
   * @return {HTMLElement} The rendered element.
   */


  renderFrame(frameState, target) {
    return (0, _util.abstract)();
  }
  /**
   * @param {Object<number, Object<string, import("../Tile.js").default>>} tiles Lookup of loaded tiles by zoom level.
   * @param {number} zoom Zoom level.
   * @param {import("../Tile.js").default} tile Tile.
   * @return {boolean|void} If `false`, the tile will not be considered loaded.
   */


  loadedTileCallback(tiles, zoom, tile) {
    if (!tiles[zoom]) {
      tiles[zoom] = {};
    }

    tiles[zoom][tile.tileCoord.toString()] = tile;
    return undefined;
  }
  /**
   * Create a function that adds loaded tiles to the tile lookup.
   * @param {import("../source/Tile.js").default} source Tile source.
   * @param {import("../proj/Projection.js").default} projection Projection of the tiles.
   * @param {Object<number, Object<string, import("../Tile.js").default>>} tiles Lookup of loaded tiles by zoom level.
   * @return {function(number, import("../TileRange.js").default):boolean} A function that can be
   *     called with a zoom level and a tile range to add loaded tiles to the lookup.
   * @protected
   */


  createLoadedTileFinder(source, projection, tiles) {
    return (
      /**
       * @param {number} zoom Zoom level.
       * @param {import("../TileRange.js").default} tileRange Tile range.
       * @return {boolean} The tile range is fully loaded.
       * @this {LayerRenderer}
       */
      function (zoom, tileRange) {
        const callback = this.loadedTileCallback.bind(this, tiles, zoom);
        return source.forEachLoadedTile(projection, zoom, tileRange, callback);
      }.bind(this)
    );
  }
  /**
   * @abstract
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {import("../PluggableMap.js").FrameState} frameState Frame state.
   * @param {number} hitTolerance Hit tolerance in pixels.
   * @param {import("./vector.js").FeatureCallback<T>} callback Feature callback.
   * @param {Array<import("./Map.js").HitMatch<T>>} matches The hit detected matches with tolerance.
   * @return {T|undefined} Callback result.
   * @template T
   */


  forEachFeatureAtCoordinate(coordinate, frameState, hitTolerance, callback, matches) {
    return undefined;
  }
  /**
   * @abstract
   * @param {import("../pixel.js").Pixel} pixel Pixel.
   * @param {import("../PluggableMap.js").FrameState} frameState FrameState.
   * @param {number} hitTolerance Hit tolerance in pixels.
   * @return {Uint8ClampedArray|Uint8Array} The result.  If there is no data at the pixel
   *    location, null will be returned.  If there is data, but pixel values cannot be
   *    returned, and empty array will be returned.
   */


  getDataAtPixel(pixel, frameState, hitTolerance) {
    return (0, _util.abstract)();
  }
  /**
   * @return {LayerType} Layer.
   */


  getLayer() {
    return this.layer_;
  }
  /**
   * Perform action necessary to get the layer rendered after new fonts have loaded
   * @abstract
   */


  handleFontsChanged() {}
  /**
   * Handle changes in image state.
   * @param {import("../events/Event.js").default} event Image change event.
   * @private
   */


  handleImageChange_(event) {
    const image = event.target;

    if (image.getState() === _ImageState.default.LOADED) {
      this.renderIfReadyAndVisible();
    }
  }
  /**
   * Load the image if not already loaded, and register the image change
   * listener if needed.
   * @param {import("../ImageBase.js").default} image Image.
   * @return {boolean} `true` if the image is already loaded, `false` otherwise.
   * @protected
   */


  loadImage(image) {
    let imageState = image.getState();

    if (imageState != _ImageState.default.LOADED && imageState != _ImageState.default.ERROR) {
      image.addEventListener(_EventType.default.CHANGE, this.boundHandleImageChange_);
    }

    if (imageState == _ImageState.default.IDLE) {
      image.load();
      imageState = image.getState();
    }

    return imageState == _ImageState.default.LOADED;
  }
  /**
   * @protected
   */


  renderIfReadyAndVisible() {
    const layer = this.getLayer();

    if (layer.getVisible() && layer.getSourceState() == _State.default.READY) {
      layer.changed();
    }
  }

}

var _default = LayerRenderer;
exports.default = _default;
},{"../events/EventType.js":"node_modules/ol/src/events/EventType.js","../ImageState.js":"node_modules/ol/src/ImageState.js","../Observable.js":"node_modules/ol/src/Observable.js","../source/State.js":"node_modules/ol/src/source/State.js","../util.js":"node_modules/ol/src/util.js"}],"scripts/customFunctions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLayerByName = getLayerByName;

var _require = require("ol/src/renderer/Layer"),
    LayerRenderer = _require.default;

var map = $('#Map').data('map');
var mapLayers = map.getLayers();

function getLayerByName(layerName) {
  var layer = null;
  mapLayers.forEach(function (lyr) {
    if (lyr.get('name') === layerName) layer = lyr;
  });
  return layer;
}
},{"ol/src/renderer/Layer":"node_modules/ol/src/renderer/Layer.js"}],"scripts/Layers.js":[function(require,module,exports) {
var _require = require("./customFunctions"),
    getLayerByName = _require.getLayerByName;

var map = $('#Map').data('map');
var layers = map.getLayers();
var closer = $('#draggable-closer');
$('#layers').click(function () {
  var layersDiv = $('#draggable');
  var layersDivTitle = $('#draggable-title');
  var layersDivContent = $('#draggable-content');
  layersDivTitle.html('Layers');
  layersDivContent.html('');
  layersDiv.css('display', 'block');
  layers.forEach(function (layers) {
    if (layers.get('name')) {
      var element = "<div class=\"form-check\">\n    <input type=\"checkbox\" class=\"form-check-input\" id=\"".concat(layers.get('name'), "\">\n    <label class=\"form-check-label\" for=\"exampleCheck1\">").concat(layers.get('name'), "</label>\n    </div>");
      layersDivContent.append(element);
      $("#".concat(layers.get('name'))).prop('checked', layers.getVisible());
    }
  });
  $('.form-check-input').change(function () {
    var checkbox = this;
    var layerName = checkbox.id;
    var layer = getLayerByName(layerName); // @ts-ignore

    layer.setVisible(checkbox.checked);
  });
  closer.click(function () {
    $('#draggable').css('display', 'none');
  });
}); // Make the DIV element draggable:

dragElement(document.getElementById("draggable"));

function dragElement(elmnt) {
  var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

  if (document.getElementById(elmnt.id + "-header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault(); // get the mouse cursor position at startup:

    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement; // call a function whenever the cursor moves:

    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault(); // calculate the new cursor position:

    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY; // set the element's new position:

    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
},{"./customFunctions":"scripts/customFunctions.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55316" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scripts/Layers.js"], null)
//# sourceMappingURL=/Layers.a942d260.js.map