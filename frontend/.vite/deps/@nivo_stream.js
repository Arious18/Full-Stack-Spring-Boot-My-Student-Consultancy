import {
  W,
  X,
  Y,
  z
} from "./chunk-2PVEFPLL.js";
import {
  $r,
  Bt,
  C,
  Dt,
  Et,
  Gi,
  Hi,
  Ht,
  Jt,
  Ot,
  Pt,
  We,
  X as X2,
  Zr,
  _i,
  animated,
  g,
  k,
  kt,
  pr,
  useSpring,
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
  __toESM
} from "./chunk-EWTE5DHJ.js";

// node_modules/@nivo/stream/dist/nivo-stream.es.js
var import_react = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());

// node_modules/@nivo/stream/node_modules/d3-path/src/path.js
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
  moveTo: function(x2, y2) {
    this._ += "M" + (this._x0 = this._x1 = +x2) + "," + (this._y0 = this._y1 = +y2);
  },
  closePath: function() {
    if (this._x1 !== null) {
      this._x1 = this._x0, this._y1 = this._y0;
      this._ += "Z";
    }
  },
  lineTo: function(x2, y2) {
    this._ += "L" + (this._x1 = +x2) + "," + (this._y1 = +y2);
  },
  quadraticCurveTo: function(x1, y1, x2, y2) {
    this._ += "Q" + +x1 + "," + +y1 + "," + (this._x1 = +x2) + "," + (this._y1 = +y2);
  },
  bezierCurveTo: function(x1, y1, x2, y2, x3, y3) {
    this._ += "C" + +x1 + "," + +y1 + "," + +x2 + "," + +y2 + "," + (this._x1 = +x3) + "," + (this._y1 = +y3);
  },
  arcTo: function(x1, y1, x2, y2, r2) {
    x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r2 = +r2;
    var x0 = this._x1, y0 = this._y1, x21 = x2 - x1, y21 = y2 - y1, x01 = x0 - x1, y01 = y0 - y1, l01_2 = x01 * x01 + y01 * y01;
    if (r2 < 0) throw new Error("negative radius: " + r2);
    if (this._x1 === null) {
      this._ += "M" + (this._x1 = x1) + "," + (this._y1 = y1);
    } else if (!(l01_2 > epsilon)) ;
    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r2) {
      this._ += "L" + (this._x1 = x1) + "," + (this._y1 = y1);
    } else {
      var x20 = x2 - x0, y20 = y2 - y0, l21_2 = x21 * x21 + y21 * y21, l20_2 = x20 * x20 + y20 * y20, l21 = Math.sqrt(l21_2), l01 = Math.sqrt(l01_2), l = r2 * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2), t01 = l / l01, t21 = l / l21;
      if (Math.abs(t01 - 1) > epsilon) {
        this._ += "L" + (x1 + t01 * x01) + "," + (y1 + t01 * y01);
      }
      this._ += "A" + r2 + "," + r2 + ",0,0," + +(y01 * x20 > x01 * y20) + "," + (this._x1 = x1 + t21 * x21) + "," + (this._y1 = y1 + t21 * y21);
    }
  },
  arc: function(x2, y2, r2, a0, a1, ccw) {
    x2 = +x2, y2 = +y2, r2 = +r2, ccw = !!ccw;
    var dx = r2 * Math.cos(a0), dy = r2 * Math.sin(a0), x0 = x2 + dx, y0 = y2 + dy, cw = 1 ^ ccw, da = ccw ? a0 - a1 : a1 - a0;
    if (r2 < 0) throw new Error("negative radius: " + r2);
    if (this._x1 === null) {
      this._ += "M" + x0 + "," + y0;
    } else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) {
      this._ += "L" + x0 + "," + y0;
    }
    if (!r2) return;
    if (da < 0) da = da % tau + tau;
    if (da > tauEpsilon) {
      this._ += "A" + r2 + "," + r2 + ",0,1," + cw + "," + (x2 - dx) + "," + (y2 - dy) + "A" + r2 + "," + r2 + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
    } else if (da > epsilon) {
      this._ += "A" + r2 + "," + r2 + ",0," + +(da >= pi) + "," + cw + "," + (this._x1 = x2 + r2 * Math.cos(a1)) + "," + (this._y1 = y2 + r2 * Math.sin(a1));
    }
  },
  rect: function(x2, y2, w3, h) {
    this._ += "M" + (this._x0 = this._x1 = +x2) + "," + (this._y0 = this._y1 = +y2) + "h" + +w3 + "v" + +h + "h" + -w3 + "Z";
  },
  toString: function() {
    return this._;
  }
};
var path_default = path;

// node_modules/@nivo/stream/node_modules/d3-shape/src/constant.js
function constant_default(x2) {
  return function constant() {
    return x2;
  };
}

// node_modules/@nivo/stream/node_modules/d3-shape/src/math.js
var epsilon2 = 1e-12;
var pi2 = Math.PI;
var halfPi = pi2 / 2;
var tau2 = 2 * pi2;

// node_modules/@nivo/stream/node_modules/d3-shape/src/curve/linear.js
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
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
        break;
      case 1:
        this._point = 2;
      // proceed
      default:
        this._context.lineTo(x2, y2);
        break;
    }
  }
};
function linear_default(context) {
  return new Linear(context);
}

// node_modules/@nivo/stream/node_modules/d3-shape/src/point.js
function x(p) {
  return p[0];
}
function y(p) {
  return p[1];
}

// node_modules/@nivo/stream/node_modules/d3-shape/src/line.js
function line_default() {
  var x2 = x, y2 = y, defined = constant_default(true), context = null, curve = linear_default, output = null;
  function line(data) {
    var i2, n = data.length, d, defined0 = false, buffer;
    if (context == null) output = curve(buffer = path_default());
    for (i2 = 0; i2 <= n; ++i2) {
      if (!(i2 < n && defined(d = data[i2], i2, data)) === defined0) {
        if (defined0 = !defined0) output.lineStart();
        else output.lineEnd();
      }
      if (defined0) output.point(+x2(d, i2, data), +y2(d, i2, data));
    }
    if (buffer) return output = null, buffer + "" || null;
  }
  line.x = function(_) {
    return arguments.length ? (x2 = typeof _ === "function" ? _ : constant_default(+_), line) : x2;
  };
  line.y = function(_) {
    return arguments.length ? (y2 = typeof _ === "function" ? _ : constant_default(+_), line) : y2;
  };
  line.defined = function(_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : constant_default(!!_), line) : defined;
  };
  line.curve = function(_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
  };
  line.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
  };
  return line;
}

// node_modules/@nivo/stream/node_modules/d3-shape/src/area.js
function area_default() {
  var x0 = x, x1 = null, y0 = constant_default(0), y1 = y, defined = constant_default(true), context = null, curve = linear_default, output = null;
  function area(data) {
    var i2, j2, k3, n = data.length, d, defined0 = false, buffer, x0z = new Array(n), y0z = new Array(n);
    if (context == null) output = curve(buffer = path_default());
    for (i2 = 0; i2 <= n; ++i2) {
      if (!(i2 < n && defined(d = data[i2], i2, data)) === defined0) {
        if (defined0 = !defined0) {
          j2 = i2;
          output.areaStart();
          output.lineStart();
        } else {
          output.lineEnd();
          output.lineStart();
          for (k3 = i2 - 1; k3 >= j2; --k3) {
            output.point(x0z[k3], y0z[k3]);
          }
          output.lineEnd();
          output.areaEnd();
        }
      }
      if (defined0) {
        x0z[i2] = +x0(d, i2, data), y0z[i2] = +y0(d, i2, data);
        output.point(x1 ? +x1(d, i2, data) : x0z[i2], y1 ? +y1(d, i2, data) : y0z[i2]);
      }
    }
    if (buffer) return output = null, buffer + "" || null;
  }
  function arealine() {
    return line_default().defined(defined).curve(curve).context(context);
  }
  area.x = function(_) {
    return arguments.length ? (x0 = typeof _ === "function" ? _ : constant_default(+_), x1 = null, area) : x0;
  };
  area.x0 = function(_) {
    return arguments.length ? (x0 = typeof _ === "function" ? _ : constant_default(+_), area) : x0;
  };
  area.x1 = function(_) {
    return arguments.length ? (x1 = _ == null ? null : typeof _ === "function" ? _ : constant_default(+_), area) : x1;
  };
  area.y = function(_) {
    return arguments.length ? (y0 = typeof _ === "function" ? _ : constant_default(+_), y1 = null, area) : y0;
  };
  area.y0 = function(_) {
    return arguments.length ? (y0 = typeof _ === "function" ? _ : constant_default(+_), area) : y0;
  };
  area.y1 = function(_) {
    return arguments.length ? (y1 = _ == null ? null : typeof _ === "function" ? _ : constant_default(+_), area) : y1;
  };
  area.lineX0 = area.lineY0 = function() {
    return arealine().x(x0).y(y0);
  };
  area.lineY1 = function() {
    return arealine().x(x0).y(y1);
  };
  area.lineX1 = function() {
    return arealine().x(x1).y(y0);
  };
  area.defined = function(_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : constant_default(!!_), area) : defined;
  };
  area.curve = function(_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), area) : curve;
  };
  area.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), area) : context;
  };
  return area;
}

// node_modules/@nivo/stream/node_modules/d3-shape/src/curve/radial.js
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
  point: function(a2, r2) {
    this._curve.point(r2 * Math.sin(a2), r2 * -Math.cos(a2));
  }
};
function curveRadial(curve) {
  function radial(context) {
    return new Radial(curve(context));
  }
  radial._curve = curve;
  return radial;
}

// node_modules/@nivo/stream/node_modules/d3-shape/src/array.js
var slice = Array.prototype.slice;

// node_modules/@nivo/stream/node_modules/d3-shape/src/symbol/diamond.js
var tan30 = Math.sqrt(1 / 3);
var tan30_2 = tan30 * 2;

// node_modules/@nivo/stream/node_modules/d3-shape/src/symbol/star.js
var kr = Math.sin(pi2 / 10) / Math.sin(7 * pi2 / 10);
var kx = Math.sin(tau2 / 10) * kr;
var ky = -Math.cos(tau2 / 10) * kr;

// node_modules/@nivo/stream/node_modules/d3-shape/src/symbol/triangle.js
var sqrt3 = Math.sqrt(3);

// node_modules/@nivo/stream/node_modules/d3-shape/src/symbol/wye.js
var s = Math.sqrt(3) / 2;
var k2 = 1 / Math.sqrt(12);
var a = (k2 / 2 + 1) * 3;

// node_modules/@nivo/stream/node_modules/d3-shape/src/noop.js
function noop_default() {
}

// node_modules/@nivo/stream/node_modules/d3-shape/src/curve/basis.js
function point(that, x2, y2) {
  that._context.bezierCurveTo(
    (2 * that._x0 + that._x1) / 3,
    (2 * that._y0 + that._y1) / 3,
    (that._x0 + 2 * that._x1) / 3,
    (that._y0 + 2 * that._y1) / 3,
    (that._x0 + 4 * that._x1 + x2) / 6,
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
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
      // proceed
      default:
        point(this, x2, y2);
        break;
    }
    this._x0 = this._x1, this._x1 = x2;
    this._y0 = this._y1, this._y1 = y2;
  }
};

// node_modules/@nivo/stream/node_modules/d3-shape/src/curve/basisClosed.js
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
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._x2 = x2, this._y2 = y2;
        break;
      case 1:
        this._point = 2;
        this._x3 = x2, this._y3 = y2;
        break;
      case 2:
        this._point = 3;
        this._x4 = x2, this._y4 = y2;
        this._context.moveTo((this._x0 + 4 * this._x1 + x2) / 6, (this._y0 + 4 * this._y1 + y2) / 6);
        break;
      default:
        point(this, x2, y2);
        break;
    }
    this._x0 = this._x1, this._x1 = x2;
    this._y0 = this._y1, this._y1 = y2;
  }
};

// node_modules/@nivo/stream/node_modules/d3-shape/src/curve/basisOpen.js
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
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        var x0 = (this._x0 + 4 * this._x1 + x2) / 6, y0 = (this._y0 + 4 * this._y1 + y2) / 6;
        this._line ? this._context.lineTo(x0, y0) : this._context.moveTo(x0, y0);
        break;
      case 3:
        this._point = 4;
      // proceed
      default:
        point(this, x2, y2);
        break;
    }
    this._x0 = this._x1, this._x1 = x2;
    this._y0 = this._y1, this._y1 = y2;
  }
};

// node_modules/@nivo/stream/node_modules/d3-shape/src/curve/bundle.js
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
    var x2 = this._x, y2 = this._y, j2 = x2.length - 1;
    if (j2 > 0) {
      var x0 = x2[0], y0 = y2[0], dx = x2[j2] - x0, dy = y2[j2] - y0, i2 = -1, t2;
      while (++i2 <= j2) {
        t2 = i2 / j2;
        this._basis.point(
          this._beta * x2[i2] + (1 - this._beta) * (x0 + t2 * dx),
          this._beta * y2[i2] + (1 - this._beta) * (y0 + t2 * dy)
        );
      }
    }
    this._x = this._y = null;
    this._basis.lineEnd();
  },
  point: function(x2, y2) {
    this._x.push(+x2);
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

// node_modules/@nivo/stream/node_modules/d3-shape/src/curve/cardinal.js
function point2(that, x2, y2) {
  that._context.bezierCurveTo(
    that._x1 + that._k * (that._x2 - that._x0),
    that._y1 + that._k * (that._y2 - that._y0),
    that._x2 + that._k * (that._x1 - x2),
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
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
        break;
      case 1:
        this._point = 2;
        this._x1 = x2, this._y1 = y2;
        break;
      case 2:
        this._point = 3;
      // proceed
      default:
        point2(this, x2, y2);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
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

// node_modules/@nivo/stream/node_modules/d3-shape/src/curve/cardinalClosed.js
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
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._x3 = x2, this._y3 = y2;
        break;
      case 1:
        this._point = 2;
        this._context.moveTo(this._x4 = x2, this._y4 = y2);
        break;
      case 2:
        this._point = 3;
        this._x5 = x2, this._y5 = y2;
        break;
      default:
        point2(this, x2, y2);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
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

// node_modules/@nivo/stream/node_modules/d3-shape/src/curve/cardinalOpen.js
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
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
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
        point2(this, x2, y2);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
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

// node_modules/@nivo/stream/node_modules/d3-shape/src/curve/catmullRom.js
function point3(that, x2, y2) {
  var x1 = that._x1, y1 = that._y1, x22 = that._x2, y22 = that._y2;
  if (that._l01_a > epsilon2) {
    var a2 = 2 * that._l01_2a + 3 * that._l01_a * that._l12_a + that._l12_2a, n = 3 * that._l01_a * (that._l01_a + that._l12_a);
    x1 = (x1 * a2 - that._x0 * that._l12_2a + that._x2 * that._l01_2a) / n;
    y1 = (y1 * a2 - that._y0 * that._l12_2a + that._y2 * that._l01_2a) / n;
  }
  if (that._l23_a > epsilon2) {
    var b = 2 * that._l23_2a + 3 * that._l23_a * that._l12_a + that._l12_2a, m = 3 * that._l23_a * (that._l23_a + that._l12_a);
    x22 = (x22 * b + that._x1 * that._l23_2a - x2 * that._l12_2a) / m;
    y22 = (y22 * b + that._y1 * that._l23_2a - y2 * that._l12_2a) / m;
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
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    if (this._point) {
      var x23 = this._x2 - x2, y23 = this._y2 - y2;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
      // proceed
      default:
        point3(this, x2, y2);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
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

// node_modules/@nivo/stream/node_modules/d3-shape/src/curve/catmullRomClosed.js
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
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    if (this._point) {
      var x23 = this._x2 - x2, y23 = this._y2 - y2;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1;
        this._x3 = x2, this._y3 = y2;
        break;
      case 1:
        this._point = 2;
        this._context.moveTo(this._x4 = x2, this._y4 = y2);
        break;
      case 2:
        this._point = 3;
        this._x5 = x2, this._y5 = y2;
        break;
      default:
        point3(this, x2, y2);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
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

// node_modules/@nivo/stream/node_modules/d3-shape/src/curve/catmullRomOpen.js
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
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    if (this._point) {
      var x23 = this._x2 - x2, y23 = this._y2 - y2;
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
        point3(this, x2, y2);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
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

// node_modules/@nivo/stream/node_modules/d3-shape/src/curve/linearClosed.js
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
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    if (this._point) this._context.lineTo(x2, y2);
    else this._point = 1, this._context.moveTo(x2, y2);
  }
};

// node_modules/@nivo/stream/node_modules/d3-shape/src/curve/monotone.js
function sign(x2) {
  return x2 < 0 ? -1 : 1;
}
function slope3(that, x2, y2) {
  var h0 = that._x1 - that._x0, h1 = x2 - that._x1, s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0), s1 = (y2 - that._y1) / (h1 || h0 < 0 && -0), p = (s0 * h1 + s1 * h0) / (h0 + h1);
  return (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
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
  point: function(x2, y2) {
    var t1 = NaN;
    x2 = +x2, y2 = +y2;
    if (x2 === this._x1 && y2 === this._y1) return;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        point4(this, slope2(this, t1 = slope3(this, x2, y2)), t1);
        break;
      default:
        point4(this, this._t0, t1 = slope3(this, x2, y2));
        break;
    }
    this._x0 = this._x1, this._x1 = x2;
    this._y0 = this._y1, this._y1 = y2;
    this._t0 = t1;
  }
};
function MonotoneY(context) {
  this._context = new ReflectContext(context);
}
(MonotoneY.prototype = Object.create(MonotoneX.prototype)).point = function(x2, y2) {
  MonotoneX.prototype.point.call(this, y2, x2);
};
function ReflectContext(context) {
  this._context = context;
}
ReflectContext.prototype = {
  moveTo: function(x2, y2) {
    this._context.moveTo(y2, x2);
  },
  closePath: function() {
    this._context.closePath();
  },
  lineTo: function(x2, y2) {
    this._context.lineTo(y2, x2);
  },
  bezierCurveTo: function(x1, y1, x2, y2, x3, y3) {
    this._context.bezierCurveTo(y1, x1, y2, x2, y3, x3);
  }
};

// node_modules/@nivo/stream/node_modules/d3-shape/src/curve/natural.js
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
    var x2 = this._x, y2 = this._y, n = x2.length;
    if (n) {
      this._line ? this._context.lineTo(x2[0], y2[0]) : this._context.moveTo(x2[0], y2[0]);
      if (n === 2) {
        this._context.lineTo(x2[1], y2[1]);
      } else {
        var px = controlPoints(x2), py = controlPoints(y2);
        for (var i0 = 0, i1 = 1; i1 < n; ++i0, ++i1) {
          this._context.bezierCurveTo(px[0][i0], py[0][i0], px[1][i0], py[1][i0], x2[i1], y2[i1]);
        }
      }
    }
    if (this._line || this._line !== 0 && n === 1) this._context.closePath();
    this._line = 1 - this._line;
    this._x = this._y = null;
  },
  point: function(x2, y2) {
    this._x.push(+x2);
    this._y.push(+y2);
  }
};
function controlPoints(x2) {
  var i2, n = x2.length - 1, m, a2 = new Array(n), b = new Array(n), r2 = new Array(n);
  a2[0] = 0, b[0] = 2, r2[0] = x2[0] + 2 * x2[1];
  for (i2 = 1; i2 < n - 1; ++i2) a2[i2] = 1, b[i2] = 4, r2[i2] = 4 * x2[i2] + 2 * x2[i2 + 1];
  a2[n - 1] = 2, b[n - 1] = 7, r2[n - 1] = 8 * x2[n - 1] + x2[n];
  for (i2 = 1; i2 < n; ++i2) m = a2[i2] / b[i2 - 1], b[i2] -= m, r2[i2] -= m * r2[i2 - 1];
  a2[n - 1] = r2[n - 1] / b[n - 1];
  for (i2 = n - 2; i2 >= 0; --i2) a2[i2] = (r2[i2] - a2[i2 + 1]) / b[i2];
  b[n - 1] = (x2[n] + a2[n - 1]) / 2;
  for (i2 = 0; i2 < n - 1; ++i2) b[i2] = 2 * x2[i2 + 1] - a2[i2 + 1];
  return [a2, b];
}

// node_modules/@nivo/stream/node_modules/d3-shape/src/curve/step.js
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
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
        break;
      case 1:
        this._point = 2;
      // proceed
      default: {
        if (this._t <= 0) {
          this._context.lineTo(this._x, y2);
          this._context.lineTo(x2, y2);
        } else {
          var x1 = this._x * (1 - this._t) + x2 * this._t;
          this._context.lineTo(x1, this._y);
          this._context.lineTo(x1, y2);
        }
        break;
      }
    }
    this._x = x2, this._y = y2;
  }
};

// node_modules/@nivo/stream/node_modules/d3-shape/src/offset/none.js
function none_default(series, order) {
  if (!((n = series.length) > 1)) return;
  for (var i2 = 1, j2, s0, s1 = series[order[0]], n, m = s1.length; i2 < n; ++i2) {
    s0 = s1, s1 = series[order[i2]];
    for (j2 = 0; j2 < m; ++j2) {
      s1[j2][1] += s1[j2][0] = isNaN(s0[j2][1]) ? s0[j2][0] : s0[j2][1];
    }
  }
}

// node_modules/@nivo/stream/node_modules/d3-shape/src/order/none.js
function none_default2(series) {
  var n = series.length, o2 = new Array(n);
  while (--n >= 0) o2[n] = n;
  return o2;
}

// node_modules/@nivo/stream/node_modules/d3-shape/src/stack.js
function stackValue(d, key) {
  return d[key];
}
function stack_default() {
  var keys = constant_default([]), order = none_default2, offset = none_default, value = stackValue;
  function stack(data) {
    var kz = keys.apply(this, arguments), i2, m = data.length, n = kz.length, sz = new Array(n), oz;
    for (i2 = 0; i2 < n; ++i2) {
      for (var ki = kz[i2], si = sz[i2] = new Array(m), j2 = 0, sij; j2 < m; ++j2) {
        si[j2] = sij = [0, +value(data[j2], ki, j2, data)];
        sij.data = data[j2];
      }
      si.key = ki;
    }
    for (i2 = 0, oz = order(sz); i2 < n; ++i2) {
      sz[oz[i2]].index = i2;
    }
    offset(sz, oz);
    return sz;
  }
  stack.keys = function(_) {
    return arguments.length ? (keys = typeof _ === "function" ? _ : constant_default(slice.call(_)), stack) : keys;
  };
  stack.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : constant_default(+_), stack) : value;
  };
  stack.order = function(_) {
    return arguments.length ? (order = _ == null ? none_default2 : typeof _ === "function" ? _ : constant_default(slice.call(_)), stack) : order;
  };
  stack.offset = function(_) {
    return arguments.length ? (offset = _ == null ? none_default : _, stack) : offset;
  };
  return stack;
}

// node_modules/@nivo/stream/dist/nivo-stream.es.js
function j() {
  return j = Object.assign ? Object.assign.bind() : function(o2) {
    for (var e2 = 1; e2 < arguments.length; e2++) {
      var r2 = arguments[e2];
      for (var t2 in r2) Object.prototype.hasOwnProperty.call(r2, t2) && (o2[t2] = r2[t2]);
    }
    return o2;
  }, j.apply(this, arguments);
}
var E = function(r2) {
  var t2 = r2.layer, i2 = r2.fillOpacity, a2 = r2.borderWidth, d = r2.getBorderColor, c = r2.isInteractive, s2 = r2.tooltip, u = k(), f = u.showTooltipFromEvent, h = u.hideTooltip, p = (0, import_react.useCallback)(function(o2) {
    f((0, import_react.createElement)(s2, { layer: t2 }), o2, "left");
  }, [f, t2]), v = Zr(), m = v.animate, y2 = v.config, g2 = $r(t2.path), b = useSpring({ color: t2.color, config: y2, immediate: !m });
  return (0, import_jsx_runtime.jsx)(animated.path, { d: g2, fill: t2.fill ? t2.fill : b.color, fillOpacity: i2, stroke: d(t2), strokeWidth: a2, onMouseMove: c ? p : void 0, onMouseEnter: c ? p : void 0, onMouseLeave: c ? h : void 0 });
};
var P = function(o2) {
  var e2 = o2.layers, r2 = o2.fillOpacity, t2 = o2.borderWidth, i2 = o2.getBorderColor, n = o2.isInteractive, l = o2.tooltip;
  return (0, import_jsx_runtime.jsx)("g", { children: e2.map(function(o3, e3) {
    return (0, import_jsx_runtime.jsx)(E, { layer: o3, getBorderColor: i2, borderWidth: t2, fillOpacity: r2, isInteractive: n, tooltip: l }, e3);
  }) });
};
var H = function(o2, e2) {
  var r2 = o2.y2;
  return "center" === e2 ? r2 = o2.y1 + (o2.y2 - o2.y1) / 2 : "start" === e2 && (r2 = o2.y1), r2;
};
var X3 = function(o2) {
  var r2 = o2.data, t2 = o2.dotComponent, i2 = o2.position, n = o2.getSize, l = o2.getColor, a2 = o2.getBorderWidth, d = o2.getBorderColor;
  return (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: r2.map(function(o3, r3) {
    return (0, import_react.createElement)(t2, { key: r3, datum: o3, x: o3.x, y: H(o3, i2), size: n(o3), color: l(o3), borderWidth: a2(o3), borderColor: d(o3) });
  }) });
};
var Y2 = function(t2) {
  var i2 = t2.slice, n = t2.height, l = t2.tooltip, a2 = (0, import_react.useState)(false), d = a2[0], c = a2[1], s2 = k(), u = s2.showTooltipFromEvent, f = s2.hideTooltip, h = (0, import_react.useCallback)(function(o2) {
    c(true), u((0, import_react.createElement)(l, { slice: i2 }), o2, "left");
  }, [c, u, l, i2]), p = (0, import_react.useCallback)(function() {
    c(false), f();
  }, [c, f]);
  return (0, import_jsx_runtime.jsxs)("g", { transform: "translate(" + i2.x + ", 0)", children: [d && (0, import_jsx_runtime.jsx)("line", { x1: 0, x2: 0, y1: 0, y2: n, stroke: "#000", strokeOpacity: 0.35, strokeWidth: 1 }), (0, import_jsx_runtime.jsx)("rect", { x: -20, width: 40, height: n, fill: "#000", fillOpacity: 0, onMouseEnter: h, onMouseMove: h, onMouseLeave: p })] });
};
var A = function(o2) {
  var e2 = o2.slices, r2 = o2.height, t2 = o2.tooltip;
  return (0, import_jsx_runtime.jsx)("g", { children: e2.map(function(o3) {
    return (0, import_jsx_runtime.jsx)(Y2, { slice: o3, height: r2, tooltip: t2 }, o3.index);
  }) });
};
var R = { label: "id", order: "none", offsetType: "wiggle", curve: "catmullRom", axisBottom: {}, axisLeft: {}, enableGridX: false, enableGridY: true, colors: { scheme: "nivo" }, fillOpacity: 1, borderWidth: 0, borderColor: { from: "color", modifiers: [["darker", 1]] }, enableDots: false, dotPosition: "center", dotComponent: function(o2) {
  var e2 = o2.x, r2 = o2.y, t2 = o2.size, i2 = o2.color, l = o2.borderWidth, a2 = o2.borderColor, d = Zr(), c = d.animate, s2 = d.config, u = useSpring({ x: e2, y: r2, radius: 0.5 * t2, color: i2, config: s2, immediate: !c });
  return (0, import_jsx_runtime.jsx)(animated.circle, { cx: u.x, cy: u.y, r: u.radius, fill: u.color, strokeWidth: l, stroke: a2 });
}, dotSize: 6, dotColor: { from: "color" }, dotBorderWidth: 0, dotBorderColor: { from: "color" }, isInteractive: true, tooltip: function(o2) {
  var e2 = o2.layer;
  return (0, import_jsx_runtime.jsx)(w, { id: e2.label, enableChip: true, color: e2.color });
}, enableStackTooltip: true, stackTooltip: function(o2) {
  var e2 = o2.slice, r2 = (0, import_react.useMemo)(function() {
    return e2.stack.map(function(o3) {
      return [(0, import_jsx_runtime.jsx)(g, { color: o3.color }, o3.layerId), o3.layerLabel, o3.formattedValue];
    });
  }, [e2]);
  return (0, import_jsx_runtime.jsx)(C, { rows: r2 });
}, legends: [], legendLabel: "id", role: "application" };
var V = j({}, R, { layers: ["grid", "axes", "layers", "dots", "slices", "legends"], defs: [], fill: [], animate: true, motionConfig: "default", role: "img", isFocusable: false });
var q = ["isInteractive", "animate", "motionConfig", "theme", "renderWrapper"];
var J = function(o2) {
  var r2 = o2.data, n = o2.keys, l = o2.label, h = o2.valueFormat, y2 = o2.offsetType, C2 = o2.order, B = o2.curve, W2 = o2.layers, k3 = void 0 === W2 ? V.layers : W2, S = o2.width, O = o2.height, w3 = o2.margin, I2 = o2.axisTop, E2 = o2.axisRight, H2 = o2.axisBottom, Y3 = void 0 === H2 ? V.axisBottom : H2, q2 = o2.axisLeft, J2 = void 0 === q2 ? V.axisLeft : q2, K2 = o2.enableGridX, N2 = void 0 === K2 ? V.enableGridX : K2, Q = o2.enableGridY, U = void 0 === Q ? V.enableGridY : Q, Z = o2.colors, $ = o2.fillOpacity, _ = void 0 === $ ? V.fillOpacity : $, oo = o2.borderWidth, eo = void 0 === oo ? V.borderWidth : oo, ro = o2.borderColor, to = o2.defs, io = void 0 === to ? V.defs : to, no = o2.fill, lo = void 0 === no ? V.fill : no, ao = o2.enableDots, co = void 0 === ao ? V.enableDots : ao, so = o2.dotPosition, uo = void 0 === so ? V.dotPosition : so, fo = o2.dotComponent, ho = void 0 === fo ? V.dotComponent : fo, po = o2.dotSize, vo = o2.dotColor, mo = o2.dotBorderWidth, yo = o2.dotBorderColor, go = o2.isInteractive, bo = void 0 === go ? V.isInteractive : go, xo = o2.tooltip, Co = void 0 === xo ? V.tooltip : xo, Bo = o2.enableStackTooltip, Wo = void 0 === Bo ? V.enableStackTooltip : Bo, ko = o2.stackTooltip, So = void 0 === ko ? V.stackTooltip : ko, Oo = o2.legends, To = void 0 === Oo ? V.legends : Oo, wo = o2.role, Io = o2.ariaLabel, Do = o2.ariaLabelledBy, Lo = o2.ariaDescribedBy, Mo = Bt(S, O, w3), zo = Mo.margin, Fo = Mo.innerWidth, Go = Mo.innerHeight, jo = Mo.outerWidth, Eo = Mo.outerHeight, Po = function(o3) {
    var e2 = o3.width, r3 = o3.height, i2 = o3.data, n2 = o3.keys, l2 = o3.label, h2 = void 0 === l2 ? R.label : l2, p = o3.valueFormat, v = o3.offsetType, m = void 0 === v ? R.offsetType : v, y3 = o3.order, g2 = void 0 === y3 ? R.order : y3, b = o3.curve, x2 = void 0 === b ? R.curve : b, C3 = o3.colors, B2 = void 0 === C3 ? R.colors : C3, W3 = o3.borderColor, k4 = void 0 === W3 ? R.borderColor : W3, S2 = o3.dotSize, O2 = void 0 === S2 ? R.dotSize : S2, T2 = o3.dotColor, w4 = void 0 === T2 ? R.dotColor : T2, I3 = o3.dotBorderWidth, E3 = void 0 === I3 ? R.dotBorderWidth : I3, P2 = o3.dotBorderColor, H3 = void 0 === P2 ? R.dotBorderColor : P2, X4 = Pt(x2), Y4 = (0, import_react.useMemo)(function() {
      return area_default().x(function(o4) {
        return o4.x;
      }).y0(function(o4) {
        return o4.y1;
      }).y1(function(o4) {
        return o4.y2;
      }).curve(X4);
    }, [X4]), A2 = (0, import_react.useMemo)(function() {
      return stack_default().keys(n2).offset(Ot(m)).order(kt(g2));
    }, [n2, m, g2]), V2 = (0, import_react.useMemo)(function() {
      var o4 = [], t2 = [], n3 = A2(i2).map(function(e3) {
        return e3.map(function(r4) {
          return o4.push(r4[0]), t2.push(r4[1]), j({}, r4, { value: r4.data[e3.key] });
        });
      }), l3 = Math.min.apply(Math, o4), a2 = Math.max.apply(Math, t2);
      return [n3, Y({ type: "point" }, { all: Array.from({ length: i2.length }, function(o5, e3) {
        return e3;
      }), min: 0, max: i2.length }, e2), W({ type: "linear", min: l3 }, { all: [l3, a2], min: l3, max: a2 }, r3, "y")];
    }, [A2, i2, e2, r3]), q3 = V2[0], J3 = V2[1], K3 = V2[2], N3 = Et(), Q2 = pr(B2, "id"), U2 = We(k4, N3), Z2 = (0, import_react.useMemo)(function() {
      return "function" == typeof O2 ? O2 : function() {
        return O2;
      };
    }, [O2]), $2 = We(w4, N3), _2 = (0, import_react.useMemo)(function() {
      return "function" == typeof E3 ? E3 : function() {
        return E3;
      };
    }, [E3]), oo2 = We(H3, N3), eo2 = Gi(h2), ro2 = Dt(p), to2 = (0, import_react.useMemo)(function() {
      return q3.map(function(o4, e3) {
        var r4 = o4.map(function(o5, r5) {
          return { layerId: n2[e3], layerLabel: "", index: r5, color: "", x: J3(r5), value: o5.value, formattedValue: ro2(o5.value), y1: K3(o5[0]), y2: K3(o5[1]) };
        }), t2 = { id: n2[e3], path: Y4(r4) }, i3 = j({}, t2, { label: eo2(t2), color: Q2(t2) });
        return j({}, i3, { data: r4.map(function(o5) {
          return o5.layerLabel = i3.label, o5.color = i3.color, o5;
        }) });
      });
    }, [q3, n2, eo2, Y4, Q2, J3, K3, ro2]), io2 = (0, import_react.useMemo)(function() {
      return Array.from({ length: i2.length }, function(o4, e3) {
        var r4 = to2.map(function(o5) {
          return o5.data[e3];
        }).sort(function(o5, e4) {
          return o5.y2 - e4.y2;
        });
        return { index: e3, x: to2[0].data[e3].x, stack: r4 };
      });
    }, [i2.length, to2]), no2 = (0, import_react.useMemo)(function() {
      return { xScale: J3, yScale: K3, layers: to2, slices: io2 };
    }, [J3, K3, to2, io2]);
    return { xScale: J3, yScale: K3, layers: to2, slices: io2, getBorderColor: U2, getDotSize: Z2, getDotColor: $2, getDotBorderWidth: _2, getDotBorderColor: oo2, layerContext: no2 };
  }({ width: Fo, height: Go, data: r2, keys: n, label: l, valueFormat: h, offsetType: y2, order: C2, curve: B, colors: Z, borderColor: ro, dotSize: po, dotColor: vo, dotBorderWidth: mo, dotBorderColor: yo }), Ho = Po.xScale, Xo = Po.yScale, Yo = Po.layers, Ao = Po.slices, Ro = Po.getBorderColor, Vo = Po.getDotSize, qo = Po.getDotColor, Jo = Po.getDotBorderWidth, Ko = Po.getDotBorderColor, No = Po.layerContext, Qo = Hi(io, Yo, lo), Uo = { grid: null, axes: null, layers: null, dots: null, slices: null, legends: null };
  return k3.includes("grid") && (Uo.grid = (0, import_jsx_runtime.jsx)(z, { width: Fo, height: Go, xScale: N2 ? Ho : null, yScale: U ? Xo : null }, "grid")), k3.includes("axes") && (Uo.axes = (0, import_jsx_runtime.jsx)(X, { xScale: Ho, yScale: Xo, width: Fo, height: Go, top: I2, right: E2, bottom: Y3, left: J2 }, "axes")), k3.includes("layers") && (Uo.layers = (0, import_jsx_runtime.jsx)(P, { layers: Yo, fillOpacity: _, borderWidth: eo, getBorderColor: Ro, isInteractive: bo, tooltip: Co }, "layers")), k3.includes("dots") && co && (Uo.dots = (0, import_jsx_runtime.jsx)(import_react.Fragment, { children: Yo.map(function(o3) {
    return (0, import_jsx_runtime.jsx)(X3, { id: o3.id, color: o3.color, data: o3.data, dotComponent: ho, position: uo, getSize: Vo, getColor: qo, getBorderWidth: Jo, getBorderColor: Ko }, o3.id);
  }) }, "dots")), k3.includes("slices") && bo && Wo && (Uo.slices = (0, import_jsx_runtime.jsx)(A, { slices: Ao, height: Go, tooltip: So }, "slices")), k3.includes("legends") && (Uo.legends = (0, import_jsx_runtime.jsx)(import_react.Fragment, { children: To.map(function(o3, e2) {
    var r3 = Yo.map(function(o4) {
      return { id: o4.id, label: o4.label, color: o4.color, fill: o4.fill };
    }).reverse();
    return (0, import_jsx_runtime.jsx)(X2, j({}, o3, { containerWidth: Fo, containerHeight: Go, data: r3 }), e2);
  }) }, "legends")), (0, import_jsx_runtime.jsx)(_i, { width: jo, height: Eo, margin: zo, defs: Qo, role: wo, ariaLabel: Io, ariaLabelledBy: Do, ariaDescribedBy: Lo, children: k3.map(function(o3, r3) {
    var t2;
    return "function" == typeof o3 ? (0, import_jsx_runtime.jsx)(import_react.Fragment, { children: (0, import_react.createElement)(o3, No) }, r3) : null != (t2 = null == Uo ? void 0 : Uo[o3]) ? t2 : null;
  }) });
};
var K = function(o2) {
  var e2 = o2.isInteractive, r2 = void 0 === e2 ? V.isInteractive : e2, t2 = o2.animate, i2 = void 0 === t2 ? V.animate : t2, n = o2.motionConfig, l = void 0 === n ? V.motionConfig : n, a2 = o2.theme, d = o2.renderWrapper, c = function(o3, e3) {
    if (null == o3) return {};
    var r3, t3, i3 = {}, n2 = Object.keys(o3);
    for (t3 = 0; t3 < n2.length; t3++) r3 = n2[t3], e3.indexOf(r3) >= 0 || (i3[r3] = o3[r3]);
    return i3;
  }(o2, q);
  return (0, import_jsx_runtime.jsx)(Ht, { animate: i2, isInteractive: r2, motionConfig: l, renderWrapper: d, theme: a2, children: (0, import_jsx_runtime.jsx)(J, j({ isInteractive: r2 }, c)) });
};
var N = function(o2) {
  return (0, import_jsx_runtime.jsx)(Jt, { children: function(e2) {
    var r2 = e2.width, t2 = e2.height;
    return (0, import_jsx_runtime.jsx)(K, j({ width: r2, height: t2 }, o2));
  } });
};
export {
  N as ResponsiveStream,
  K as Stream,
  R as defaultProps,
  V as svgDefaultProps
};
//# sourceMappingURL=@nivo_stream.js.map
