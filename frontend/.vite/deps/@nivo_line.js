import {
  D,
  X,
  dn,
  j,
  w as w2,
  z
} from "./chunk-2PVEFPLL.js";
import {
  $r,
  Ai,
  Bt,
  C,
  Dt,
  Et,
  Fi,
  H,
  Hi,
  Jr,
  Jt,
  Mi,
  P,
  T,
  Ti,
  We,
  Wi,
  X as X2,
  Xe,
  Zr,
  _i,
  animated,
  bt,
  g,
  ji,
  k,
  mt,
  pr,
  useSpring,
  w,
  yt,
  zt
} from "./chunk-BQN4OYG4.js";
import {
  require_jsx_runtime,
  require_prop_types
} from "./chunk-ZEUX6AFY.js";
import "./chunk-JUWM2LYA.js";
import {
  require_react
} from "./chunk-W4EHDCLL.js";
import {
  __toESM
} from "./chunk-EWTE5DHJ.js";

// node_modules/@nivo/line/dist/nivo-line.es.js
var import_react2 = __toESM(require_react());

// node_modules/@nivo/line/node_modules/d3-path/src/path.js
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
  arcTo: function(x1, y1, x22, y2, r3) {
    x1 = +x1, y1 = +y1, x22 = +x22, y2 = +y2, r3 = +r3;
    var x0 = this._x1, y0 = this._y1, x21 = x22 - x1, y21 = y2 - y1, x01 = x0 - x1, y01 = y0 - y1, l01_2 = x01 * x01 + y01 * y01;
    if (r3 < 0) throw new Error("negative radius: " + r3);
    if (this._x1 === null) {
      this._ += "M" + (this._x1 = x1) + "," + (this._y1 = y1);
    } else if (!(l01_2 > epsilon)) ;
    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r3) {
      this._ += "L" + (this._x1 = x1) + "," + (this._y1 = y1);
    } else {
      var x20 = x22 - x0, y20 = y2 - y0, l21_2 = x21 * x21 + y21 * y21, l20_2 = x20 * x20 + y20 * y20, l21 = Math.sqrt(l21_2), l01 = Math.sqrt(l01_2), l2 = r3 * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2), t01 = l2 / l01, t21 = l2 / l21;
      if (Math.abs(t01 - 1) > epsilon) {
        this._ += "L" + (x1 + t01 * x01) + "," + (y1 + t01 * y01);
      }
      this._ += "A" + r3 + "," + r3 + ",0,0," + +(y01 * x20 > x01 * y20) + "," + (this._x1 = x1 + t21 * x21) + "," + (this._y1 = y1 + t21 * y21);
    }
  },
  arc: function(x3, y2, r3, a0, a1, ccw) {
    x3 = +x3, y2 = +y2, r3 = +r3, ccw = !!ccw;
    var dx = r3 * Math.cos(a0), dy = r3 * Math.sin(a0), x0 = x3 + dx, y0 = y2 + dy, cw = 1 ^ ccw, da = ccw ? a0 - a1 : a1 - a0;
    if (r3 < 0) throw new Error("negative radius: " + r3);
    if (this._x1 === null) {
      this._ += "M" + x0 + "," + y0;
    } else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) {
      this._ += "L" + x0 + "," + y0;
    }
    if (!r3) return;
    if (da < 0) da = da % tau + tau;
    if (da > tauEpsilon) {
      this._ += "A" + r3 + "," + r3 + ",0,1," + cw + "," + (x3 - dx) + "," + (y2 - dy) + "A" + r3 + "," + r3 + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
    } else if (da > epsilon) {
      this._ += "A" + r3 + "," + r3 + ",0," + +(da >= pi) + "," + cw + "," + (this._x1 = x3 + r3 * Math.cos(a1)) + "," + (this._y1 = y2 + r3 * Math.sin(a1));
    }
  },
  rect: function(x3, y2, w3, h) {
    this._ += "M" + (this._x0 = this._x1 = +x3) + "," + (this._y0 = this._y1 = +y2) + "h" + +w3 + "v" + +h + "h" + -w3 + "Z";
  },
  toString: function() {
    return this._;
  }
};
var path_default = path;

// node_modules/@nivo/line/node_modules/d3-shape/src/constant.js
function constant_default(x3) {
  return function constant() {
    return x3;
  };
}

// node_modules/@nivo/line/node_modules/d3-shape/src/math.js
var epsilon2 = 1e-12;
var pi2 = Math.PI;
var halfPi = pi2 / 2;
var tau2 = 2 * pi2;

// node_modules/@nivo/line/node_modules/d3-shape/src/curve/linear.js
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

// node_modules/@nivo/line/node_modules/d3-shape/src/point.js
function x(p2) {
  return p2[0];
}
function y(p2) {
  return p2[1];
}

// node_modules/@nivo/line/node_modules/d3-shape/src/line.js
function line_default() {
  var x3 = x, y2 = y, defined = constant_default(true), context = null, curve = linear_default, output = null;
  function line(data) {
    var i3, n3 = data.length, d, defined0 = false, buffer;
    if (context == null) output = curve(buffer = path_default());
    for (i3 = 0; i3 <= n3; ++i3) {
      if (!(i3 < n3 && defined(d = data[i3], i3, data)) === defined0) {
        if (defined0 = !defined0) output.lineStart();
        else output.lineEnd();
      }
      if (defined0) output.point(+x3(d, i3, data), +y2(d, i3, data));
    }
    if (buffer) return output = null, buffer + "" || null;
  }
  line.x = function(_) {
    return arguments.length ? (x3 = typeof _ === "function" ? _ : constant_default(+_), line) : x3;
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

// node_modules/@nivo/line/node_modules/d3-shape/src/area.js
function area_default() {
  var x0 = x, x1 = null, y0 = constant_default(0), y1 = y, defined = constant_default(true), context = null, curve = linear_default, output = null;
  function area(data) {
    var i3, j3, k4, n3 = data.length, d, defined0 = false, buffer, x0z = new Array(n3), y0z = new Array(n3);
    if (context == null) output = curve(buffer = path_default());
    for (i3 = 0; i3 <= n3; ++i3) {
      if (!(i3 < n3 && defined(d = data[i3], i3, data)) === defined0) {
        if (defined0 = !defined0) {
          j3 = i3;
          output.areaStart();
          output.lineStart();
        } else {
          output.lineEnd();
          output.lineStart();
          for (k4 = i3 - 1; k4 >= j3; --k4) {
            output.point(x0z[k4], y0z[k4]);
          }
          output.lineEnd();
          output.areaEnd();
        }
      }
      if (defined0) {
        x0z[i3] = +x0(d, i3, data), y0z[i3] = +y0(d, i3, data);
        output.point(x1 ? +x1(d, i3, data) : x0z[i3], y1 ? +y1(d, i3, data) : y0z[i3]);
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

// node_modules/@nivo/line/node_modules/d3-shape/src/curve/radial.js
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
  point: function(a3, r3) {
    this._curve.point(r3 * Math.sin(a3), r3 * -Math.cos(a3));
  }
};
function curveRadial(curve) {
  function radial2(context) {
    return new Radial(curve(context));
  }
  radial2._curve = curve;
  return radial2;
}

// node_modules/@nivo/line/node_modules/d3-shape/src/array.js
var slice = Array.prototype.slice;

// node_modules/@nivo/line/node_modules/d3-shape/src/symbol/diamond.js
var tan30 = Math.sqrt(1 / 3);
var tan30_2 = tan30 * 2;

// node_modules/@nivo/line/node_modules/d3-shape/src/symbol/star.js
var kr = Math.sin(pi2 / 10) / Math.sin(7 * pi2 / 10);
var kx = Math.sin(tau2 / 10) * kr;
var ky = -Math.cos(tau2 / 10) * kr;

// node_modules/@nivo/line/node_modules/d3-shape/src/symbol/triangle.js
var sqrt3 = Math.sqrt(3);

// node_modules/@nivo/line/node_modules/d3-shape/src/symbol/wye.js
var s = Math.sqrt(3) / 2;
var k2 = 1 / Math.sqrt(12);
var a = (k2 / 2 + 1) * 3;

// node_modules/@nivo/line/node_modules/d3-shape/src/noop.js
function noop_default() {
}

// node_modules/@nivo/line/node_modules/d3-shape/src/curve/basis.js
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

// node_modules/@nivo/line/node_modules/d3-shape/src/curve/basisClosed.js
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

// node_modules/@nivo/line/node_modules/d3-shape/src/curve/basisOpen.js
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

// node_modules/@nivo/line/node_modules/d3-shape/src/curve/bundle.js
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
      var x0 = x3[0], y0 = y2[0], dx = x3[j3] - x0, dy = y2[j3] - y0, i3 = -1, t5;
      while (++i3 <= j3) {
        t5 = i3 / j3;
        this._basis.point(
          this._beta * x3[i3] + (1 - this._beta) * (x0 + t5 * dx),
          this._beta * y2[i3] + (1 - this._beta) * (y0 + t5 * dy)
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

// node_modules/@nivo/line/node_modules/d3-shape/src/curve/cardinal.js
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

// node_modules/@nivo/line/node_modules/d3-shape/src/curve/cardinalClosed.js
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

// node_modules/@nivo/line/node_modules/d3-shape/src/curve/cardinalOpen.js
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

// node_modules/@nivo/line/node_modules/d3-shape/src/curve/catmullRom.js
function point3(that, x3, y2) {
  var x1 = that._x1, y1 = that._y1, x22 = that._x2, y22 = that._y2;
  if (that._l01_a > epsilon2) {
    var a3 = 2 * that._l01_2a + 3 * that._l01_a * that._l12_a + that._l12_2a, n3 = 3 * that._l01_a * (that._l01_a + that._l12_a);
    x1 = (x1 * a3 - that._x0 * that._l12_2a + that._x2 * that._l01_2a) / n3;
    y1 = (y1 * a3 - that._y0 * that._l12_2a + that._y2 * that._l01_2a) / n3;
  }
  if (that._l23_a > epsilon2) {
    var b2 = 2 * that._l23_2a + 3 * that._l23_a * that._l12_a + that._l12_2a, m = 3 * that._l23_a * (that._l23_a + that._l12_a);
    x22 = (x22 * b2 + that._x1 * that._l23_2a - x3 * that._l12_2a) / m;
    y22 = (y22 * b2 + that._y1 * that._l23_2a - y2 * that._l12_2a) / m;
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

// node_modules/@nivo/line/node_modules/d3-shape/src/curve/catmullRomClosed.js
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

// node_modules/@nivo/line/node_modules/d3-shape/src/curve/catmullRomOpen.js
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

// node_modules/@nivo/line/node_modules/d3-shape/src/curve/linearClosed.js
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

// node_modules/@nivo/line/node_modules/d3-shape/src/curve/monotone.js
function sign(x3) {
  return x3 < 0 ? -1 : 1;
}
function slope3(that, x22, y2) {
  var h0 = that._x1 - that._x0, h1 = x22 - that._x1, s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0), s1 = (y2 - that._y1) / (h1 || h0 < 0 && -0), p2 = (s0 * h1 + s1 * h0) / (h0 + h1);
  return (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p2)) || 0;
}
function slope2(that, t5) {
  var h = that._x1 - that._x0;
  return h ? (3 * (that._y1 - that._y0) / h - t5) / 2 : t5;
}
function point4(that, t03, t13) {
  var x0 = that._x0, y0 = that._y0, x1 = that._x1, y1 = that._y1, dx = (x1 - x0) / 3;
  that._context.bezierCurveTo(x0 + dx, y0 + dx * t03, x1 - dx, y1 - dx * t13, x1, y1);
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
    var t13 = NaN;
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
        point4(this, slope2(this, t13 = slope3(this, x3, y2)), t13);
        break;
      default:
        point4(this, this._t0, t13 = slope3(this, x3, y2));
        break;
    }
    this._x0 = this._x1, this._x1 = x3;
    this._y0 = this._y1, this._y1 = y2;
    this._t0 = t13;
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

// node_modules/@nivo/line/node_modules/d3-shape/src/curve/natural.js
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
    var x3 = this._x, y2 = this._y, n3 = x3.length;
    if (n3) {
      this._line ? this._context.lineTo(x3[0], y2[0]) : this._context.moveTo(x3[0], y2[0]);
      if (n3 === 2) {
        this._context.lineTo(x3[1], y2[1]);
      } else {
        var px = controlPoints(x3), py = controlPoints(y2);
        for (var i0 = 0, i1 = 1; i1 < n3; ++i0, ++i1) {
          this._context.bezierCurveTo(px[0][i0], py[0][i0], px[1][i0], py[1][i0], x3[i1], y2[i1]);
        }
      }
    }
    if (this._line || this._line !== 0 && n3 === 1) this._context.closePath();
    this._line = 1 - this._line;
    this._x = this._y = null;
  },
  point: function(x3, y2) {
    this._x.push(+x3);
    this._y.push(+y2);
  }
};
function controlPoints(x3) {
  var i3, n3 = x3.length - 1, m, a3 = new Array(n3), b2 = new Array(n3), r3 = new Array(n3);
  a3[0] = 0, b2[0] = 2, r3[0] = x3[0] + 2 * x3[1];
  for (i3 = 1; i3 < n3 - 1; ++i3) a3[i3] = 1, b2[i3] = 4, r3[i3] = 4 * x3[i3] + 2 * x3[i3 + 1];
  a3[n3 - 1] = 2, b2[n3 - 1] = 7, r3[n3 - 1] = 8 * x3[n3 - 1] + x3[n3];
  for (i3 = 1; i3 < n3; ++i3) m = a3[i3] / b2[i3 - 1], b2[i3] -= m, r3[i3] -= m * r3[i3 - 1];
  a3[n3 - 1] = r3[n3 - 1] / b2[n3 - 1];
  for (i3 = n3 - 2; i3 >= 0; --i3) a3[i3] = (r3[i3] - a3[i3 + 1]) / b2[i3];
  b2[n3 - 1] = (x3[n3] + a3[n3 - 1]) / 2;
  for (i3 = 0; i3 < n3 - 1; ++i3) b2[i3] = 2 * x3[i3 + 1] - a3[i3 + 1];
  return [a3, b2];
}

// node_modules/@nivo/line/node_modules/d3-shape/src/curve/step.js
function Step(context, t5) {
  this._context = context;
  this._t = t5;
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

// node_modules/@nivo/line/dist/nivo-line.es.js
var import_prop_types = __toESM(require_prop_types());
var import_jsx_runtime2 = __toESM(require_jsx_runtime());

// node_modules/@nivo/voronoi/dist/nivo-voronoi.es.js
var import_react = __toESM(require_react());

// node_modules/@nivo/voronoi/node_modules/d3-array/src/ascending.js
function ascending_default2(a3, b2) {
  return a3 < b2 ? -1 : a3 > b2 ? 1 : a3 >= b2 ? 0 : NaN;
}

// node_modules/@nivo/voronoi/node_modules/d3-array/src/bisector.js
function bisector_default(f2) {
  let delta = f2;
  let compare = f2;
  if (f2.length === 1) {
    delta = (d, x3) => f2(d) - x3;
    compare = ascendingComparator(f2);
  }
  function left(a3, x3, lo, hi) {
    if (lo == null) lo = 0;
    if (hi == null) hi = a3.length;
    while (lo < hi) {
      const mid = lo + hi >>> 1;
      if (compare(a3[mid], x3) < 0) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  }
  function right(a3, x3, lo, hi) {
    if (lo == null) lo = 0;
    if (hi == null) hi = a3.length;
    while (lo < hi) {
      const mid = lo + hi >>> 1;
      if (compare(a3[mid], x3) > 0) hi = mid;
      else lo = mid + 1;
    }
    return lo;
  }
  function center(a3, x3, lo, hi) {
    if (lo == null) lo = 0;
    if (hi == null) hi = a3.length;
    const i3 = left(a3, x3, lo, hi - 1);
    return i3 > lo && delta(a3[i3 - 1], x3) > -delta(a3[i3], x3) ? i3 - 1 : i3;
  }
  return { left, center, right };
}
function ascendingComparator(f2) {
  return (d, x3) => ascending_default2(f2(d), x3);
}

// node_modules/@nivo/voronoi/node_modules/d3-array/src/number.js
function number_default(x3) {
  return x3 === null ? NaN : +x3;
}

// node_modules/@nivo/voronoi/node_modules/d3-array/src/bisect.js
var ascendingBisect = bisector_default(ascending_default2);
var bisectRight = ascendingBisect.right;
var bisectLeft = ascendingBisect.left;
var bisectCenter = bisector_default(number_default).center;

// node_modules/@nivo/voronoi/node_modules/d3-array/src/array.js
var array = Array.prototype;
var slice2 = array.slice;
var map = array.map;

// node_modules/@nivo/voronoi/node_modules/d3-array/src/ticks.js
var e10 = Math.sqrt(50);
var e5 = Math.sqrt(10);
var e2 = Math.sqrt(2);
function tickStep(start, stop, count2) {
  var step0 = Math.abs(stop - start) / Math.max(0, count2), step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)), error = step0 / step1;
  if (error >= e10) step1 *= 10;
  else if (error >= e5) step1 *= 5;
  else if (error >= e2) step1 *= 2;
  return stop < start ? -step1 : step1;
}

// node_modules/@nivo/voronoi/node_modules/d3-array/src/shuffle.js
var shuffle_default = shuffler(Math.random);
function shuffler(random) {
  return function shuffle(array2, i0 = 0, i1 = array2.length) {
    let m = i1 - (i0 = +i0);
    while (m) {
      const i3 = random() * m-- | 0, t5 = array2[m + i0];
      array2[m + i0] = array2[i3 + i0];
      array2[i3 + i0] = t5;
    }
    return array2;
  };
}

// node_modules/@nivo/voronoi/node_modules/d3-scale/src/ordinal.js
var implicit = Symbol("implicit");

// node_modules/@nivo/voronoi/node_modules/d3-color/src/define.js
function define_default(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}
function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}

// node_modules/@nivo/voronoi/node_modules/d3-color/src/color.js
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
  var m, l2;
  format2 = (format2 + "").trim().toLowerCase();
  return (m = reHex.exec(format2)) ? (l2 = m[1].length, m = parseInt(m[1], 16), l2 === 6 ? rgbn(m) : l2 === 3 ? new Rgb(m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, (m & 15) << 4 | m & 15, 1) : l2 === 8 ? rgba(m >> 24 & 255, m >> 16 & 255, m >> 8 & 255, (m & 255) / 255) : l2 === 4 ? rgba(m >> 12 & 15 | m >> 8 & 240, m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, ((m & 15) << 4 | m & 15) / 255) : null) : (m = reRgbInteger.exec(format2)) ? new Rgb(m[1], m[2], m[3], 1) : (m = reRgbPercent.exec(format2)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) : (m = reRgbaInteger.exec(format2)) ? rgba(m[1], m[2], m[3], m[4]) : (m = reRgbaPercent.exec(format2)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) : (m = reHslPercent.exec(format2)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) : (m = reHslaPercent.exec(format2)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) : named.hasOwnProperty(format2) ? rgbn(named[format2]) : format2 === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}
function rgbn(n3) {
  return new Rgb(n3 >> 16 & 255, n3 >> 8 & 255, n3 & 255, 1);
}
function rgba(r3, g3, b2, a3) {
  if (a3 <= 0) r3 = g3 = b2 = NaN;
  return new Rgb(r3, g3, b2, a3);
}
function rgbConvert(o3) {
  if (!(o3 instanceof Color)) o3 = color(o3);
  if (!o3) return new Rgb();
  o3 = o3.rgb();
  return new Rgb(o3.r, o3.g, o3.b, o3.opacity);
}
function rgb(r3, g3, b2, opacity) {
  return arguments.length === 1 ? rgbConvert(r3) : new Rgb(r3, g3, b2, opacity == null ? 1 : opacity);
}
function Rgb(r3, g3, b2, opacity) {
  this.r = +r3;
  this.g = +g3;
  this.b = +b2;
  this.opacity = +opacity;
}
define_default(Rgb, rgb, extend(Color, {
  brighter: function(k4) {
    k4 = k4 == null ? brighter : Math.pow(brighter, k4);
    return new Rgb(this.r * k4, this.g * k4, this.b * k4, this.opacity);
  },
  darker: function(k4) {
    k4 = k4 == null ? darker : Math.pow(darker, k4);
    return new Rgb(this.r * k4, this.g * k4, this.b * k4, this.opacity);
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
  var a3 = this.opacity;
  a3 = isNaN(a3) ? 1 : Math.max(0, Math.min(1, a3));
  return (a3 === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a3 === 1 ? ")" : ", " + a3 + ")");
}
function hex(value) {
  value = Math.max(0, Math.min(255, Math.round(value) || 0));
  return (value < 16 ? "0" : "") + value.toString(16);
}
function hsla(h, s3, l2, a3) {
  if (a3 <= 0) h = s3 = l2 = NaN;
  else if (l2 <= 0 || l2 >= 1) h = s3 = NaN;
  else if (s3 <= 0) h = NaN;
  return new Hsl(h, s3, l2, a3);
}
function hslConvert(o3) {
  if (o3 instanceof Hsl) return new Hsl(o3.h, o3.s, o3.l, o3.opacity);
  if (!(o3 instanceof Color)) o3 = color(o3);
  if (!o3) return new Hsl();
  if (o3 instanceof Hsl) return o3;
  o3 = o3.rgb();
  var r3 = o3.r / 255, g3 = o3.g / 255, b2 = o3.b / 255, min3 = Math.min(r3, g3, b2), max3 = Math.max(r3, g3, b2), h = NaN, s3 = max3 - min3, l2 = (max3 + min3) / 2;
  if (s3) {
    if (r3 === max3) h = (g3 - b2) / s3 + (g3 < b2) * 6;
    else if (g3 === max3) h = (b2 - r3) / s3 + 2;
    else h = (r3 - g3) / s3 + 4;
    s3 /= l2 < 0.5 ? max3 + min3 : 2 - max3 - min3;
    h *= 60;
  } else {
    s3 = l2 > 0 && l2 < 1 ? 0 : h;
  }
  return new Hsl(h, s3, l2, o3.opacity);
}
function hsl(h, s3, l2, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s3, l2, opacity == null ? 1 : opacity);
}
function Hsl(h, s3, l2, opacity) {
  this.h = +h;
  this.s = +s3;
  this.l = +l2;
  this.opacity = +opacity;
}
define_default(Hsl, hsl, extend(Color, {
  brighter: function(k4) {
    k4 = k4 == null ? brighter : Math.pow(brighter, k4);
    return new Hsl(this.h, this.s, this.l * k4, this.opacity);
  },
  darker: function(k4) {
    k4 = k4 == null ? darker : Math.pow(darker, k4);
    return new Hsl(this.h, this.s, this.l * k4, this.opacity);
  },
  rgb: function() {
    var h = this.h % 360 + (this.h < 0) * 360, s3 = isNaN(h) || isNaN(this.s) ? 0 : this.s, l2 = this.l, m2 = l2 + (l2 < 0.5 ? l2 : 1 - l2) * s3, m1 = 2 * l2 - m2;
    return new Rgb(
      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
      hsl2rgb(h, m1, m2),
      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
      this.opacity
    );
  },
  displayable: function() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && (0 <= this.l && this.l <= 1) && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl: function() {
    var a3 = this.opacity;
    a3 = isNaN(a3) ? 1 : Math.max(0, Math.min(1, a3));
    return (a3 === 1 ? "hsl(" : "hsla(") + (this.h || 0) + ", " + (this.s || 0) * 100 + "%, " + (this.l || 0) * 100 + "%" + (a3 === 1 ? ")" : ", " + a3 + ")");
  }
}));
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}

// node_modules/@nivo/voronoi/node_modules/d3-color/src/math.js
var radians = Math.PI / 180;
var degrees = 180 / Math.PI;

// node_modules/@nivo/voronoi/node_modules/d3-color/src/lab.js
var K = 18;
var Xn = 0.96422;
var Yn = 1;
var Zn = 0.82521;
var t0 = 4 / 29;
var t1 = 6 / 29;
var t2 = 3 * t1 * t1;
var t3 = t1 * t1 * t1;
function labConvert(o3) {
  if (o3 instanceof Lab) return new Lab(o3.l, o3.a, o3.b, o3.opacity);
  if (o3 instanceof Hcl) return hcl2lab(o3);
  if (!(o3 instanceof Rgb)) o3 = rgbConvert(o3);
  var r3 = rgb2lrgb(o3.r), g3 = rgb2lrgb(o3.g), b2 = rgb2lrgb(o3.b), y2 = xyz2lab((0.2225045 * r3 + 0.7168786 * g3 + 0.0606169 * b2) / Yn), x3, z2;
  if (r3 === g3 && g3 === b2) x3 = z2 = y2;
  else {
    x3 = xyz2lab((0.4360747 * r3 + 0.3850649 * g3 + 0.1430804 * b2) / Xn);
    z2 = xyz2lab((0.0139322 * r3 + 0.0971045 * g3 + 0.7141733 * b2) / Zn);
  }
  return new Lab(116 * y2 - 16, 500 * (x3 - y2), 200 * (y2 - z2), o3.opacity);
}
function lab(l2, a3, b2, opacity) {
  return arguments.length === 1 ? labConvert(l2) : new Lab(l2, a3, b2, opacity == null ? 1 : opacity);
}
function Lab(l2, a3, b2, opacity) {
  this.l = +l2;
  this.a = +a3;
  this.b = +b2;
  this.opacity = +opacity;
}
define_default(Lab, lab, extend(Color, {
  brighter: function(k4) {
    return new Lab(this.l + K * (k4 == null ? 1 : k4), this.a, this.b, this.opacity);
  },
  darker: function(k4) {
    return new Lab(this.l - K * (k4 == null ? 1 : k4), this.a, this.b, this.opacity);
  },
  rgb: function() {
    var y2 = (this.l + 16) / 116, x3 = isNaN(this.a) ? y2 : y2 + this.a / 500, z2 = isNaN(this.b) ? y2 : y2 - this.b / 200;
    x3 = Xn * lab2xyz(x3);
    y2 = Yn * lab2xyz(y2);
    z2 = Zn * lab2xyz(z2);
    return new Rgb(
      lrgb2rgb(3.1338561 * x3 - 1.6168667 * y2 - 0.4906146 * z2),
      lrgb2rgb(-0.9787684 * x3 + 1.9161415 * y2 + 0.033454 * z2),
      lrgb2rgb(0.0719453 * x3 - 0.2289914 * y2 + 1.4052427 * z2),
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
function lrgb2rgb(x3) {
  return 255 * (x3 <= 31308e-7 ? 12.92 * x3 : 1.055 * Math.pow(x3, 1 / 2.4) - 0.055);
}
function rgb2lrgb(x3) {
  return (x3 /= 255) <= 0.04045 ? x3 / 12.92 : Math.pow((x3 + 0.055) / 1.055, 2.4);
}
function hclConvert(o3) {
  if (o3 instanceof Hcl) return new Hcl(o3.h, o3.c, o3.l, o3.opacity);
  if (!(o3 instanceof Lab)) o3 = labConvert(o3);
  if (o3.a === 0 && o3.b === 0) return new Hcl(NaN, 0 < o3.l && o3.l < 100 ? 0 : NaN, o3.l, o3.opacity);
  var h = Math.atan2(o3.b, o3.a) * degrees;
  return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o3.a * o3.a + o3.b * o3.b), o3.l, o3.opacity);
}
function hcl(h, c, l2, opacity) {
  return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l2, opacity == null ? 1 : opacity);
}
function Hcl(h, c, l2, opacity) {
  this.h = +h;
  this.c = +c;
  this.l = +l2;
  this.opacity = +opacity;
}
function hcl2lab(o3) {
  if (isNaN(o3.h)) return new Lab(o3.l, 0, 0, o3.opacity);
  var h = o3.h * radians;
  return new Lab(o3.l, Math.cos(h) * o3.c, Math.sin(h) * o3.c, o3.opacity);
}
define_default(Hcl, hcl, extend(Color, {
  brighter: function(k4) {
    return new Hcl(this.h, this.c, this.l + K * (k4 == null ? 1 : k4), this.opacity);
  },
  darker: function(k4) {
    return new Hcl(this.h, this.c, this.l - K * (k4 == null ? 1 : k4), this.opacity);
  },
  rgb: function() {
    return hcl2lab(this).rgb();
  }
}));

// node_modules/@nivo/voronoi/node_modules/d3-color/src/cubehelix.js
var A = -0.14861;
var B = 1.78277;
var C2 = -0.29227;
var D2 = -0.90649;
var E = 1.97294;
var ED = E * D2;
var EB = E * B;
var BC_DA = B * C2 - D2 * A;
function cubehelixConvert(o3) {
  if (o3 instanceof Cubehelix) return new Cubehelix(o3.h, o3.s, o3.l, o3.opacity);
  if (!(o3 instanceof Rgb)) o3 = rgbConvert(o3);
  var r3 = o3.r / 255, g3 = o3.g / 255, b2 = o3.b / 255, l2 = (BC_DA * b2 + ED * r3 - EB * g3) / (BC_DA + ED - EB), bl = b2 - l2, k4 = (E * (g3 - l2) - C2 * bl) / D2, s3 = Math.sqrt(k4 * k4 + bl * bl) / (E * l2 * (1 - l2)), h = s3 ? Math.atan2(k4, bl) * degrees - 120 : NaN;
  return new Cubehelix(h < 0 ? h + 360 : h, s3, l2, o3.opacity);
}
function cubehelix(h, s3, l2, opacity) {
  return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s3, l2, opacity == null ? 1 : opacity);
}
function Cubehelix(h, s3, l2, opacity) {
  this.h = +h;
  this.s = +s3;
  this.l = +l2;
  this.opacity = +opacity;
}
define_default(Cubehelix, cubehelix, extend(Color, {
  brighter: function(k4) {
    k4 = k4 == null ? brighter : Math.pow(brighter, k4);
    return new Cubehelix(this.h, this.s, this.l * k4, this.opacity);
  },
  darker: function(k4) {
    k4 = k4 == null ? darker : Math.pow(darker, k4);
    return new Cubehelix(this.h, this.s, this.l * k4, this.opacity);
  },
  rgb: function() {
    var h = isNaN(this.h) ? 0 : (this.h + 120) * radians, l2 = +this.l, a3 = isNaN(this.s) ? 0 : this.s * l2 * (1 - l2), cosh2 = Math.cos(h), sinh2 = Math.sin(h);
    return new Rgb(
      255 * (l2 + a3 * (A * cosh2 + B * sinh2)),
      255 * (l2 + a3 * (C2 * cosh2 + D2 * sinh2)),
      255 * (l2 + a3 * (E * cosh2)),
      this.opacity
    );
  }
}));

// node_modules/@nivo/voronoi/node_modules/d3-interpolate/src/basis.js
function basis(t13, v0, v1, v2, v3) {
  var t22 = t13 * t13, t32 = t22 * t13;
  return ((1 - 3 * t13 + 3 * t22 - t32) * v0 + (4 - 6 * t22 + 3 * t32) * v1 + (1 + 3 * t13 + 3 * t22 - 3 * t32) * v2 + t32 * v3) / 6;
}
function basis_default2(values) {
  var n3 = values.length - 1;
  return function(t5) {
    var i3 = t5 <= 0 ? t5 = 0 : t5 >= 1 ? (t5 = 1, n3 - 1) : Math.floor(t5 * n3), v1 = values[i3], v2 = values[i3 + 1], v0 = i3 > 0 ? values[i3 - 1] : 2 * v1 - v2, v3 = i3 < n3 - 1 ? values[i3 + 2] : 2 * v2 - v1;
    return basis((t5 - i3 / n3) * n3, v0, v1, v2, v3);
  };
}

// node_modules/@nivo/voronoi/node_modules/d3-interpolate/src/basisClosed.js
function basisClosed_default2(values) {
  var n3 = values.length;
  return function(t5) {
    var i3 = Math.floor(((t5 %= 1) < 0 ? ++t5 : t5) * n3), v0 = values[(i3 + n3 - 1) % n3], v1 = values[i3 % n3], v2 = values[(i3 + 1) % n3], v3 = values[(i3 + 2) % n3];
    return basis((t5 - i3 / n3) * n3, v0, v1, v2, v3);
  };
}

// node_modules/@nivo/voronoi/node_modules/d3-interpolate/src/constant.js
var constant_default3 = (x3) => () => x3;

// node_modules/@nivo/voronoi/node_modules/d3-interpolate/src/color.js
function linear(a3, d) {
  return function(t5) {
    return a3 + t5 * d;
  };
}
function exponential(a3, b2, y2) {
  return a3 = Math.pow(a3, y2), b2 = Math.pow(b2, y2) - a3, y2 = 1 / y2, function(t5) {
    return Math.pow(a3 + t5 * b2, y2);
  };
}
function hue(a3, b2) {
  var d = b2 - a3;
  return d ? linear(a3, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant_default3(isNaN(a3) ? b2 : a3);
}
function gamma(y2) {
  return (y2 = +y2) === 1 ? nogamma : function(a3, b2) {
    return b2 - a3 ? exponential(a3, b2, y2) : constant_default3(isNaN(a3) ? b2 : a3);
  };
}
function nogamma(a3, b2) {
  var d = b2 - a3;
  return d ? linear(a3, d) : constant_default3(isNaN(a3) ? b2 : a3);
}

// node_modules/@nivo/voronoi/node_modules/d3-interpolate/src/rgb.js
var rgb_default = function rgbGamma(y2) {
  var color2 = gamma(y2);
  function rgb2(start, end) {
    var r3 = color2((start = rgb(start)).r, (end = rgb(end)).r), g3 = color2(start.g, end.g), b2 = color2(start.b, end.b), opacity = nogamma(start.opacity, end.opacity);
    return function(t5) {
      start.r = r3(t5);
      start.g = g3(t5);
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
    var n3 = colors.length, r3 = new Array(n3), g3 = new Array(n3), b2 = new Array(n3), i3, color2;
    for (i3 = 0; i3 < n3; ++i3) {
      color2 = rgb(colors[i3]);
      r3[i3] = color2.r || 0;
      g3[i3] = color2.g || 0;
      b2[i3] = color2.b || 0;
    }
    r3 = spline(r3);
    g3 = spline(g3);
    b2 = spline(b2);
    color2.opacity = 1;
    return function(t5) {
      color2.r = r3(t5);
      color2.g = g3(t5);
      color2.b = b2(t5);
      return color2 + "";
    };
  };
}
var rgbBasis = rgbSpline(basis_default2);
var rgbBasisClosed = rgbSpline(basisClosed_default2);

// node_modules/@nivo/voronoi/node_modules/d3-interpolate/src/number.js
function number_default2(a3, b2) {
  return a3 = +a3, b2 = +b2, function(t5) {
    return a3 * (1 - t5) + b2 * t5;
  };
}

// node_modules/@nivo/voronoi/node_modules/d3-interpolate/src/string.js
var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
var reB = new RegExp(reA.source, "g");

// node_modules/@nivo/voronoi/node_modules/d3-interpolate/src/transform/decompose.js
var degrees2 = 180 / Math.PI;
var identity = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function decompose_default(a3, b2, c, d, e4, f2) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a3 * a3 + b2 * b2)) a3 /= scaleX, b2 /= scaleX;
  if (skewX = a3 * c + b2 * d) c -= a3 * skewX, d -= b2 * skewX;
  if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a3 * d < b2 * c) a3 = -a3, b2 = -b2, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e4,
    translateY: f2,
    rotate: Math.atan2(b2, a3) * degrees2,
    skewX: Math.atan(skewX) * degrees2,
    scaleX,
    scaleY
  };
}

// node_modules/@nivo/voronoi/node_modules/d3-interpolate/src/transform/parse.js
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

// node_modules/@nivo/voronoi/node_modules/d3-interpolate/src/transform/index.js
function interpolateTransform(parse, pxComma, pxParen, degParen) {
  function pop(s3) {
    return s3.length ? s3.pop() + " " : "";
  }
  function translate(xa, ya, xb, yb, s3, q) {
    if (xa !== xb || ya !== yb) {
      var i3 = s3.push("translate(", null, pxComma, null, pxParen);
      q.push({ i: i3 - 4, x: number_default2(xa, xb) }, { i: i3 - 2, x: number_default2(ya, yb) });
    } else if (xb || yb) {
      s3.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }
  function rotate(a3, b2, s3, q) {
    if (a3 !== b2) {
      if (a3 - b2 > 180) b2 += 360;
      else if (b2 - a3 > 180) a3 += 360;
      q.push({ i: s3.push(pop(s3) + "rotate(", null, degParen) - 2, x: number_default2(a3, b2) });
    } else if (b2) {
      s3.push(pop(s3) + "rotate(" + b2 + degParen);
    }
  }
  function skewX(a3, b2, s3, q) {
    if (a3 !== b2) {
      q.push({ i: s3.push(pop(s3) + "skewX(", null, degParen) - 2, x: number_default2(a3, b2) });
    } else if (b2) {
      s3.push(pop(s3) + "skewX(" + b2 + degParen);
    }
  }
  function scale(xa, ya, xb, yb, s3, q) {
    if (xa !== xb || ya !== yb) {
      var i3 = s3.push(pop(s3) + "scale(", null, ",", null, ")");
      q.push({ i: i3 - 4, x: number_default2(xa, xb) }, { i: i3 - 2, x: number_default2(ya, yb) });
    } else if (xb !== 1 || yb !== 1) {
      s3.push(pop(s3) + "scale(" + xb + "," + yb + ")");
    }
  }
  return function(a3, b2) {
    var s3 = [], q = [];
    a3 = parse(a3), b2 = parse(b2);
    translate(a3.translateX, a3.translateY, b2.translateX, b2.translateY, s3, q);
    rotate(a3.rotate, b2.rotate, s3, q);
    skewX(a3.skewX, b2.skewX, s3, q);
    scale(a3.scaleX, a3.scaleY, b2.scaleX, b2.scaleY, s3, q);
    a3 = b2 = null;
    return function(t5) {
      var i3 = -1, n3 = q.length, o3;
      while (++i3 < n3) s3[(o3 = q[i3]).i] = o3.x(t5);
      return s3.join("");
    };
  };
}
var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

// node_modules/@nivo/voronoi/node_modules/d3-interpolate/src/zoom.js
var epsilon22 = 1e-12;
function cosh(x3) {
  return ((x3 = Math.exp(x3)) + 1 / x3) / 2;
}
function sinh(x3) {
  return ((x3 = Math.exp(x3)) - 1 / x3) / 2;
}
function tanh(x3) {
  return ((x3 = Math.exp(2 * x3)) - 1) / (x3 + 1);
}
var zoom_default = function zoomRho(rho, rho2, rho4) {
  function zoom(p0, p1) {
    var ux0 = p0[0], uy0 = p0[1], w0 = p0[2], ux1 = p1[0], uy1 = p1[1], w1 = p1[2], dx = ux1 - ux0, dy = uy1 - uy0, d2 = dx * dx + dy * dy, i3, S;
    if (d2 < epsilon22) {
      S = Math.log(w1 / w0) / rho;
      i3 = function(t5) {
        return [
          ux0 + t5 * dx,
          uy0 + t5 * dy,
          w0 * Math.exp(rho * t5 * S)
        ];
      };
    } else {
      var d1 = Math.sqrt(d2), b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1), b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1), r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0), r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
      S = (r1 - r0) / rho;
      i3 = function(t5) {
        var s3 = t5 * S, coshr0 = cosh(r0), u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s3 + r0) - sinh(r0));
        return [
          ux0 + u * dx,
          uy0 + u * dy,
          w0 * coshr0 / cosh(rho * s3 + r0)
        ];
      };
    }
    i3.duration = S * 1e3 * rho / Math.SQRT2;
    return i3;
  }
  zoom.rho = function(_) {
    var _1 = Math.max(1e-3, +_), _2 = _1 * _1, _4 = _2 * _2;
    return zoomRho(_1, _2, _4);
  };
  return zoom;
}(Math.SQRT2, 2, 4);

// node_modules/@nivo/voronoi/node_modules/d3-interpolate/src/hsl.js
function hsl2(hue2) {
  return function(start, end) {
    var h = hue2((start = hsl(start)).h, (end = hsl(end)).h), s3 = nogamma(start.s, end.s), l2 = nogamma(start.l, end.l), opacity = nogamma(start.opacity, end.opacity);
    return function(t5) {
      start.h = h(t5);
      start.s = s3(t5);
      start.l = l2(t5);
      start.opacity = opacity(t5);
      return start + "";
    };
  };
}
var hsl_default = hsl2(hue);
var hslLong = hsl2(nogamma);

// node_modules/@nivo/voronoi/node_modules/d3-interpolate/src/hcl.js
function hcl2(hue2) {
  return function(start, end) {
    var h = hue2((start = hcl(start)).h, (end = hcl(end)).h), c = nogamma(start.c, end.c), l2 = nogamma(start.l, end.l), opacity = nogamma(start.opacity, end.opacity);
    return function(t5) {
      start.h = h(t5);
      start.c = c(t5);
      start.l = l2(t5);
      start.opacity = opacity(t5);
      return start + "";
    };
  };
}
var hcl_default = hcl2(hue);
var hclLong = hcl2(nogamma);

// node_modules/@nivo/voronoi/node_modules/d3-interpolate/src/cubehelix.js
function cubehelix2(hue2) {
  return function cubehelixGamma(y2) {
    y2 = +y2;
    function cubehelix3(start, end) {
      var h = hue2((start = cubehelix(start)).h, (end = cubehelix(end)).h), s3 = nogamma(start.s, end.s), l2 = nogamma(start.l, end.l), opacity = nogamma(start.opacity, end.opacity);
      return function(t5) {
        start.h = h(t5);
        start.s = s3(t5);
        start.l = l2(Math.pow(t5, y2));
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

// node_modules/@nivo/voronoi/node_modules/d3-time/src/interval.js
var t02 = /* @__PURE__ */ new Date();
var t12 = /* @__PURE__ */ new Date();
function newInterval(floori, offseti, count2, field) {
  function interval(date) {
    return floori(date = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+date)), date;
  }
  interval.floor = function(date) {
    return floori(date = /* @__PURE__ */ new Date(+date)), date;
  };
  interval.ceil = function(date) {
    return floori(date = new Date(date - 1)), offseti(date, 1), floori(date), date;
  };
  interval.round = function(date) {
    var d0 = interval(date), d1 = interval.ceil(date);
    return date - d0 < d1 - date ? d0 : d1;
  };
  interval.offset = function(date, step) {
    return offseti(date = /* @__PURE__ */ new Date(+date), step == null ? 1 : Math.floor(step)), date;
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
    return newInterval(function(date) {
      if (date >= date) while (floori(date), !test(date)) date.setTime(date - 1);
    }, function(date, step) {
      if (date >= date) {
        if (step < 0) while (++step <= 0) {
          while (offseti(date, -1), !test(date)) {
          }
        }
        else while (--step >= 0) {
          while (offseti(date, 1), !test(date)) {
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

// node_modules/@nivo/voronoi/node_modules/d3-time/src/millisecond.js
var millisecond = newInterval(function() {
}, function(date, step) {
  date.setTime(+date + step);
}, function(start, end) {
  return end - start;
});
millisecond.every = function(k4) {
  k4 = Math.floor(k4);
  if (!isFinite(k4) || !(k4 > 0)) return null;
  if (!(k4 > 1)) return millisecond;
  return newInterval(function(date) {
    date.setTime(Math.floor(date / k4) * k4);
  }, function(date, step) {
    date.setTime(+date + step * k4);
  }, function(start, end) {
    return (end - start) / k4;
  });
};
var millisecond_default = millisecond;
var milliseconds = millisecond.range;

// node_modules/@nivo/voronoi/node_modules/d3-time/src/duration.js
var durationSecond = 1e3;
var durationMinute = durationSecond * 60;
var durationHour = durationMinute * 60;
var durationDay = durationHour * 24;
var durationWeek = durationDay * 7;
var durationMonth = durationDay * 30;
var durationYear = durationDay * 365;

// node_modules/@nivo/voronoi/node_modules/d3-time/src/second.js
var second = newInterval(function(date) {
  date.setTime(date - date.getMilliseconds());
}, function(date, step) {
  date.setTime(+date + step * durationSecond);
}, function(start, end) {
  return (end - start) / durationSecond;
}, function(date) {
  return date.getUTCSeconds();
});
var second_default = second;
var seconds = second.range;

// node_modules/@nivo/voronoi/node_modules/d3-time/src/minute.js
var minute = newInterval(function(date) {
  date.setTime(date - date.getMilliseconds() - date.getSeconds() * durationSecond);
}, function(date, step) {
  date.setTime(+date + step * durationMinute);
}, function(start, end) {
  return (end - start) / durationMinute;
}, function(date) {
  return date.getMinutes();
});
var minute_default = minute;
var minutes = minute.range;

// node_modules/@nivo/voronoi/node_modules/d3-time/src/hour.js
var hour = newInterval(function(date) {
  date.setTime(date - date.getMilliseconds() - date.getSeconds() * durationSecond - date.getMinutes() * durationMinute);
}, function(date, step) {
  date.setTime(+date + step * durationHour);
}, function(start, end) {
  return (end - start) / durationHour;
}, function(date) {
  return date.getHours();
});
var hour_default = hour;
var hours = hour.range;

// node_modules/@nivo/voronoi/node_modules/d3-time/src/day.js
var day = newInterval(
  (date) => date.setHours(0, 0, 0, 0),
  (date, step) => date.setDate(date.getDate() + step),
  (start, end) => (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationDay,
  (date) => date.getDate() - 1
);
var day_default = day;
var days = day.range;

// node_modules/@nivo/voronoi/node_modules/d3-time/src/week.js
function weekday(i3) {
  return newInterval(function(date) {
    date.setDate(date.getDate() - (date.getDay() + 7 - i3) % 7);
    date.setHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setDate(date.getDate() + step * 7);
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

// node_modules/@nivo/voronoi/node_modules/d3-time/src/month.js
var month = newInterval(function(date) {
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
}, function(date, step) {
  date.setMonth(date.getMonth() + step);
}, function(start, end) {
  return end.getMonth() - start.getMonth() + (end.getFullYear() - start.getFullYear()) * 12;
}, function(date) {
  return date.getMonth();
});
var month_default = month;
var months = month.range;

// node_modules/@nivo/voronoi/node_modules/d3-time/src/year.js
var year = newInterval(function(date) {
  date.setMonth(0, 1);
  date.setHours(0, 0, 0, 0);
}, function(date, step) {
  date.setFullYear(date.getFullYear() + step);
}, function(start, end) {
  return end.getFullYear() - start.getFullYear();
}, function(date) {
  return date.getFullYear();
});
year.every = function(k4) {
  return !isFinite(k4 = Math.floor(k4)) || !(k4 > 0) ? null : newInterval(function(date) {
    date.setFullYear(Math.floor(date.getFullYear() / k4) * k4);
    date.setMonth(0, 1);
    date.setHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setFullYear(date.getFullYear() + step * k4);
  });
};
var year_default = year;
var years = year.range;

// node_modules/@nivo/voronoi/node_modules/d3-time/src/utcMinute.js
var utcMinute = newInterval(function(date) {
  date.setUTCSeconds(0, 0);
}, function(date, step) {
  date.setTime(+date + step * durationMinute);
}, function(start, end) {
  return (end - start) / durationMinute;
}, function(date) {
  return date.getUTCMinutes();
});
var utcMinute_default = utcMinute;
var utcMinutes = utcMinute.range;

// node_modules/@nivo/voronoi/node_modules/d3-time/src/utcHour.js
var utcHour = newInterval(function(date) {
  date.setUTCMinutes(0, 0, 0);
}, function(date, step) {
  date.setTime(+date + step * durationHour);
}, function(start, end) {
  return (end - start) / durationHour;
}, function(date) {
  return date.getUTCHours();
});
var utcHour_default = utcHour;
var utcHours = utcHour.range;

// node_modules/@nivo/voronoi/node_modules/d3-time/src/utcDay.js
var utcDay = newInterval(function(date) {
  date.setUTCHours(0, 0, 0, 0);
}, function(date, step) {
  date.setUTCDate(date.getUTCDate() + step);
}, function(start, end) {
  return (end - start) / durationDay;
}, function(date) {
  return date.getUTCDate() - 1;
});
var utcDay_default = utcDay;
var utcDays = utcDay.range;

// node_modules/@nivo/voronoi/node_modules/d3-time/src/utcWeek.js
function utcWeekday(i3) {
  return newInterval(function(date) {
    date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i3) % 7);
    date.setUTCHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setUTCDate(date.getUTCDate() + step * 7);
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

// node_modules/@nivo/voronoi/node_modules/d3-time/src/utcMonth.js
var utcMonth = newInterval(function(date) {
  date.setUTCDate(1);
  date.setUTCHours(0, 0, 0, 0);
}, function(date, step) {
  date.setUTCMonth(date.getUTCMonth() + step);
}, function(start, end) {
  return end.getUTCMonth() - start.getUTCMonth() + (end.getUTCFullYear() - start.getUTCFullYear()) * 12;
}, function(date) {
  return date.getUTCMonth();
});
var utcMonth_default = utcMonth;
var utcMonths = utcMonth.range;

// node_modules/@nivo/voronoi/node_modules/d3-time/src/utcYear.js
var utcYear = newInterval(function(date) {
  date.setUTCMonth(0, 1);
  date.setUTCHours(0, 0, 0, 0);
}, function(date, step) {
  date.setUTCFullYear(date.getUTCFullYear() + step);
}, function(start, end) {
  return end.getUTCFullYear() - start.getUTCFullYear();
}, function(date) {
  return date.getUTCFullYear();
});
utcYear.every = function(k4) {
  return !isFinite(k4 = Math.floor(k4)) || !(k4 > 0) ? null : newInterval(function(date) {
    date.setUTCFullYear(Math.floor(date.getUTCFullYear() / k4) * k4);
    date.setUTCMonth(0, 1);
    date.setUTCHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setUTCFullYear(date.getUTCFullYear() + step * k4);
  });
};
var utcYear_default = utcYear;
var utcYears = utcYear.range;

// node_modules/@nivo/voronoi/node_modules/d3-time/src/ticks.js
function ticker(year2, month2, week, day2, hour2, minute2) {
  const tickIntervals = [
    [second_default, 1, durationSecond],
    [second_default, 5, 5 * durationSecond],
    [second_default, 15, 15 * durationSecond],
    [second_default, 30, 30 * durationSecond],
    [minute2, 1, durationMinute],
    [minute2, 5, 5 * durationMinute],
    [minute2, 15, 15 * durationMinute],
    [minute2, 30, 30 * durationMinute],
    [hour2, 1, durationHour],
    [hour2, 3, 3 * durationHour],
    [hour2, 6, 6 * durationHour],
    [hour2, 12, 12 * durationHour],
    [day2, 1, durationDay],
    [day2, 2, 2 * durationDay],
    [week, 1, durationWeek],
    [month2, 1, durationMonth],
    [month2, 3, 3 * durationMonth],
    [year2, 1, durationYear]
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
    const i3 = bisector_default(([, , step2]) => step2).right(tickIntervals, target);
    if (i3 === tickIntervals.length) return year2.every(tickStep(start / durationYear, stop / durationYear, count2));
    if (i3 === 0) return millisecond_default.every(Math.max(tickStep(start, stop, count2), 1));
    const [t5, step] = tickIntervals[target / tickIntervals[i3 - 1][2] < tickIntervals[i3][2] / target ? i3 - 1 : i3];
    return t5.every(step);
  }
  return [ticks, tickInterval];
}
var [utcTicks, utcTickInterval] = ticker(utcYear_default, utcMonth_default, utcSunday, utcDay_default, utcHour_default, utcMinute_default);
var [timeTicks, timeTickInterval] = ticker(year_default, month_default, sunday, day_default, hour_default, minute_default);

// node_modules/@nivo/voronoi/node_modules/delaunator/index.js
var EPSILON = Math.pow(2, -52);
var EDGE_STACK = new Uint32Array(512);
var Delaunator = class _Delaunator {
  static from(points, getX = defaultGetX, getY = defaultGetY) {
    const n3 = points.length;
    const coords = new Float64Array(n3 * 2);
    for (let i3 = 0; i3 < n3; i3++) {
      const p2 = points[i3];
      coords[2 * i3] = getX(p2);
      coords[2 * i3 + 1] = getY(p2);
    }
    return new _Delaunator(coords);
  }
  constructor(coords) {
    const n3 = coords.length >> 1;
    if (n3 > 0 && typeof coords[0] !== "number") throw new Error("Expected coords to contain numbers.");
    this.coords = coords;
    const maxTriangles = Math.max(2 * n3 - 5, 0);
    this._triangles = new Uint32Array(maxTriangles * 3);
    this._halfedges = new Int32Array(maxTriangles * 3);
    this._hashSize = Math.ceil(Math.sqrt(n3));
    this._hullPrev = new Uint32Array(n3);
    this._hullNext = new Uint32Array(n3);
    this._hullTri = new Uint32Array(n3);
    this._hullHash = new Int32Array(this._hashSize).fill(-1);
    this._ids = new Uint32Array(n3);
    this._dists = new Float64Array(n3);
    this.update();
  }
  update() {
    const { coords, _hullPrev: hullPrev, _hullNext: hullNext, _hullTri: hullTri, _hullHash: hullHash } = this;
    const n3 = coords.length >> 1;
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (let i3 = 0; i3 < n3; i3++) {
      const x3 = coords[2 * i3];
      const y2 = coords[2 * i3 + 1];
      if (x3 < minX) minX = x3;
      if (y2 < minY) minY = y2;
      if (x3 > maxX) maxX = x3;
      if (y2 > maxY) maxY = y2;
      this._ids[i3] = i3;
    }
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
    let minDist = Infinity;
    let i0, i1, i22;
    for (let i3 = 0; i3 < n3; i3++) {
      const d = dist(cx, cy, coords[2 * i3], coords[2 * i3 + 1]);
      if (d < minDist) {
        i0 = i3;
        minDist = d;
      }
    }
    const i0x = coords[2 * i0];
    const i0y = coords[2 * i0 + 1];
    minDist = Infinity;
    for (let i3 = 0; i3 < n3; i3++) {
      if (i3 === i0) continue;
      const d = dist(i0x, i0y, coords[2 * i3], coords[2 * i3 + 1]);
      if (d < minDist && d > 0) {
        i1 = i3;
        minDist = d;
      }
    }
    let i1x = coords[2 * i1];
    let i1y = coords[2 * i1 + 1];
    let minRadius = Infinity;
    for (let i3 = 0; i3 < n3; i3++) {
      if (i3 === i0 || i3 === i1) continue;
      const r3 = circumradius(i0x, i0y, i1x, i1y, coords[2 * i3], coords[2 * i3 + 1]);
      if (r3 < minRadius) {
        i22 = i3;
        minRadius = r3;
      }
    }
    let i2x = coords[2 * i22];
    let i2y = coords[2 * i22 + 1];
    if (minRadius === Infinity) {
      for (let i3 = 0; i3 < n3; i3++) {
        this._dists[i3] = coords[2 * i3] - coords[0] || coords[2 * i3 + 1] - coords[1];
      }
      quicksort(this._ids, this._dists, 0, n3 - 1);
      const hull = new Uint32Array(n3);
      let j3 = 0;
      for (let i3 = 0, d0 = -Infinity; i3 < n3; i3++) {
        const id = this._ids[i3];
        if (this._dists[id] > d0) {
          hull[j3++] = id;
          d0 = this._dists[id];
        }
      }
      this.hull = hull.subarray(0, j3);
      this.triangles = new Uint32Array(0);
      this.halfedges = new Uint32Array(0);
      return;
    }
    if (orient(i0x, i0y, i1x, i1y, i2x, i2y)) {
      const i3 = i1;
      const x3 = i1x;
      const y2 = i1y;
      i1 = i22;
      i1x = i2x;
      i1y = i2y;
      i22 = i3;
      i2x = x3;
      i2y = y2;
    }
    const center = circumcenter(i0x, i0y, i1x, i1y, i2x, i2y);
    this._cx = center.x;
    this._cy = center.y;
    for (let i3 = 0; i3 < n3; i3++) {
      this._dists[i3] = dist(coords[2 * i3], coords[2 * i3 + 1], center.x, center.y);
    }
    quicksort(this._ids, this._dists, 0, n3 - 1);
    this._hullStart = i0;
    let hullSize = 3;
    hullNext[i0] = hullPrev[i22] = i1;
    hullNext[i1] = hullPrev[i0] = i22;
    hullNext[i22] = hullPrev[i1] = i0;
    hullTri[i0] = 0;
    hullTri[i1] = 1;
    hullTri[i22] = 2;
    hullHash.fill(-1);
    hullHash[this._hashKey(i0x, i0y)] = i0;
    hullHash[this._hashKey(i1x, i1y)] = i1;
    hullHash[this._hashKey(i2x, i2y)] = i22;
    this.trianglesLen = 0;
    this._addTriangle(i0, i1, i22, -1, -1, -1);
    for (let k4 = 0, xp, yp; k4 < this._ids.length; k4++) {
      const i3 = this._ids[k4];
      const x3 = coords[2 * i3];
      const y2 = coords[2 * i3 + 1];
      if (k4 > 0 && Math.abs(x3 - xp) <= EPSILON && Math.abs(y2 - yp) <= EPSILON) continue;
      xp = x3;
      yp = y2;
      if (i3 === i0 || i3 === i1 || i3 === i22) continue;
      let start = 0;
      for (let j3 = 0, key = this._hashKey(x3, y2); j3 < this._hashSize; j3++) {
        start = hullHash[(key + j3) % this._hashSize];
        if (start !== -1 && start !== hullNext[start]) break;
      }
      start = hullPrev[start];
      let e4 = start, q;
      while (q = hullNext[e4], !orient(x3, y2, coords[2 * e4], coords[2 * e4 + 1], coords[2 * q], coords[2 * q + 1])) {
        e4 = q;
        if (e4 === start) {
          e4 = -1;
          break;
        }
      }
      if (e4 === -1) continue;
      let t5 = this._addTriangle(e4, i3, hullNext[e4], -1, -1, hullTri[e4]);
      hullTri[i3] = this._legalize(t5 + 2);
      hullTri[e4] = t5;
      hullSize++;
      let n4 = hullNext[e4];
      while (q = hullNext[n4], orient(x3, y2, coords[2 * n4], coords[2 * n4 + 1], coords[2 * q], coords[2 * q + 1])) {
        t5 = this._addTriangle(n4, i3, q, hullTri[i3], -1, hullTri[n4]);
        hullTri[i3] = this._legalize(t5 + 2);
        hullNext[n4] = n4;
        hullSize--;
        n4 = q;
      }
      if (e4 === start) {
        while (q = hullPrev[e4], orient(x3, y2, coords[2 * q], coords[2 * q + 1], coords[2 * e4], coords[2 * e4 + 1])) {
          t5 = this._addTriangle(q, i3, e4, -1, hullTri[e4], hullTri[q]);
          this._legalize(t5 + 2);
          hullTri[q] = t5;
          hullNext[e4] = e4;
          hullSize--;
          e4 = q;
        }
      }
      this._hullStart = hullPrev[i3] = e4;
      hullNext[e4] = hullPrev[n4] = i3;
      hullNext[i3] = n4;
      hullHash[this._hashKey(x3, y2)] = i3;
      hullHash[this._hashKey(coords[2 * e4], coords[2 * e4 + 1])] = e4;
    }
    this.hull = new Uint32Array(hullSize);
    for (let i3 = 0, e4 = this._hullStart; i3 < hullSize; i3++) {
      this.hull[i3] = e4;
      e4 = hullNext[e4];
    }
    this.triangles = this._triangles.subarray(0, this.trianglesLen);
    this.halfedges = this._halfedges.subarray(0, this.trianglesLen);
  }
  _hashKey(x3, y2) {
    return Math.floor(pseudoAngle(x3 - this._cx, y2 - this._cy) * this._hashSize) % this._hashSize;
  }
  _legalize(a3) {
    const { _triangles: triangles, _halfedges: halfedges, coords } = this;
    let i3 = 0;
    let ar = 0;
    while (true) {
      const b2 = halfedges[a3];
      const a0 = a3 - a3 % 3;
      ar = a0 + (a3 + 2) % 3;
      if (b2 === -1) {
        if (i3 === 0) break;
        a3 = EDGE_STACK[--i3];
        continue;
      }
      const b0 = b2 - b2 % 3;
      const al = a0 + (a3 + 1) % 3;
      const bl = b0 + (b2 + 2) % 3;
      const p0 = triangles[ar];
      const pr2 = triangles[a3];
      const pl = triangles[al];
      const p1 = triangles[bl];
      const illegal = inCircle(
        coords[2 * p0],
        coords[2 * p0 + 1],
        coords[2 * pr2],
        coords[2 * pr2 + 1],
        coords[2 * pl],
        coords[2 * pl + 1],
        coords[2 * p1],
        coords[2 * p1 + 1]
      );
      if (illegal) {
        triangles[a3] = p1;
        triangles[b2] = p0;
        const hbl = halfedges[bl];
        if (hbl === -1) {
          let e4 = this._hullStart;
          do {
            if (this._hullTri[e4] === bl) {
              this._hullTri[e4] = a3;
              break;
            }
            e4 = this._hullPrev[e4];
          } while (e4 !== this._hullStart);
        }
        this._link(a3, hbl);
        this._link(b2, halfedges[ar]);
        this._link(ar, bl);
        const br = b0 + (b2 + 1) % 3;
        if (i3 < EDGE_STACK.length) {
          EDGE_STACK[i3++] = br;
        }
      } else {
        if (i3 === 0) break;
        a3 = EDGE_STACK[--i3];
      }
    }
    return ar;
  }
  _link(a3, b2) {
    this._halfedges[a3] = b2;
    if (b2 !== -1) this._halfedges[b2] = a3;
  }
  // add a new triangle given vertex indices and adjacent half-edge ids
  _addTriangle(i0, i1, i22, a3, b2, c) {
    const t5 = this.trianglesLen;
    this._triangles[t5] = i0;
    this._triangles[t5 + 1] = i1;
    this._triangles[t5 + 2] = i22;
    this._link(t5, a3);
    this._link(t5 + 1, b2);
    this._link(t5 + 2, c);
    this.trianglesLen += 3;
    return t5;
  }
};
function pseudoAngle(dx, dy) {
  const p2 = dx / (Math.abs(dx) + Math.abs(dy));
  return (dy > 0 ? 3 - p2 : 1 + p2) / 4;
}
function dist(ax, ay, bx, by) {
  const dx = ax - bx;
  const dy = ay - by;
  return dx * dx + dy * dy;
}
function orientIfSure(px, py, rx, ry, qx, qy) {
  const l2 = (ry - py) * (qx - px);
  const r3 = (rx - px) * (qy - py);
  return Math.abs(l2 - r3) >= 33306690738754716e-32 * Math.abs(l2 + r3) ? l2 - r3 : 0;
}
function orient(rx, ry, qx, qy, px, py) {
  const sign2 = orientIfSure(px, py, rx, ry, qx, qy) || orientIfSure(rx, ry, qx, qy, px, py) || orientIfSure(qx, qy, px, py, rx, ry);
  return sign2 < 0;
}
function inCircle(ax, ay, bx, by, cx, cy, px, py) {
  const dx = ax - px;
  const dy = ay - py;
  const ex = bx - px;
  const ey = by - py;
  const fx = cx - px;
  const fy = cy - py;
  const ap = dx * dx + dy * dy;
  const bp = ex * ex + ey * ey;
  const cp = fx * fx + fy * fy;
  return dx * (ey * cp - bp * fy) - dy * (ex * cp - bp * fx) + ap * (ex * fy - ey * fx) < 0;
}
function circumradius(ax, ay, bx, by, cx, cy) {
  const dx = bx - ax;
  const dy = by - ay;
  const ex = cx - ax;
  const ey = cy - ay;
  const bl = dx * dx + dy * dy;
  const cl = ex * ex + ey * ey;
  const d = 0.5 / (dx * ey - dy * ex);
  const x3 = (ey * bl - dy * cl) * d;
  const y2 = (dx * cl - ex * bl) * d;
  return x3 * x3 + y2 * y2;
}
function circumcenter(ax, ay, bx, by, cx, cy) {
  const dx = bx - ax;
  const dy = by - ay;
  const ex = cx - ax;
  const ey = cy - ay;
  const bl = dx * dx + dy * dy;
  const cl = ex * ex + ey * ey;
  const d = 0.5 / (dx * ey - dy * ex);
  const x3 = ax + (ey * bl - dy * cl) * d;
  const y2 = ay + (dx * cl - ex * bl) * d;
  return { x: x3, y: y2 };
}
function quicksort(ids, dists, left, right) {
  if (right - left <= 20) {
    for (let i3 = left + 1; i3 <= right; i3++) {
      const temp = ids[i3];
      const tempDist = dists[temp];
      let j3 = i3 - 1;
      while (j3 >= left && dists[ids[j3]] > tempDist) ids[j3 + 1] = ids[j3--];
      ids[j3 + 1] = temp;
    }
  } else {
    const median = left + right >> 1;
    let i3 = left + 1;
    let j3 = right;
    swap(ids, median, i3);
    if (dists[ids[left]] > dists[ids[right]]) swap(ids, left, right);
    if (dists[ids[i3]] > dists[ids[right]]) swap(ids, i3, right);
    if (dists[ids[left]] > dists[ids[i3]]) swap(ids, left, i3);
    const temp = ids[i3];
    const tempDist = dists[temp];
    while (true) {
      do
        i3++;
      while (dists[ids[i3]] < tempDist);
      do
        j3--;
      while (dists[ids[j3]] > tempDist);
      if (j3 < i3) break;
      swap(ids, i3, j3);
    }
    ids[left + 1] = ids[j3];
    ids[j3] = temp;
    if (right - i3 + 1 >= j3 - left) {
      quicksort(ids, dists, i3, right);
      quicksort(ids, dists, left, j3 - 1);
    } else {
      quicksort(ids, dists, left, j3 - 1);
      quicksort(ids, dists, i3, right);
    }
  }
}
function swap(arr, i3, j3) {
  const tmp = arr[i3];
  arr[i3] = arr[j3];
  arr[j3] = tmp;
}
function defaultGetX(p2) {
  return p2[0];
}
function defaultGetY(p2) {
  return p2[1];
}

// node_modules/@nivo/voronoi/node_modules/d3-delaunay/src/path.js
var epsilon3 = 1e-6;
var Path2 = class {
  constructor() {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null;
    this._ = "";
  }
  moveTo(x3, y2) {
    this._ += `M${this._x0 = this._x1 = +x3},${this._y0 = this._y1 = +y2}`;
  }
  closePath() {
    if (this._x1 !== null) {
      this._x1 = this._x0, this._y1 = this._y0;
      this._ += "Z";
    }
  }
  lineTo(x3, y2) {
    this._ += `L${this._x1 = +x3},${this._y1 = +y2}`;
  }
  arc(x3, y2, r3) {
    x3 = +x3, y2 = +y2, r3 = +r3;
    const x0 = x3 + r3;
    const y0 = y2;
    if (r3 < 0) throw new Error("negative radius");
    if (this._x1 === null) this._ += `M${x0},${y0}`;
    else if (Math.abs(this._x1 - x0) > epsilon3 || Math.abs(this._y1 - y0) > epsilon3) this._ += "L" + x0 + "," + y0;
    if (!r3) return;
    this._ += `A${r3},${r3},0,1,1,${x3 - r3},${y2}A${r3},${r3},0,1,1,${this._x1 = x0},${this._y1 = y0}`;
  }
  rect(x3, y2, w3, h) {
    this._ += `M${this._x0 = this._x1 = +x3},${this._y0 = this._y1 = +y2}h${+w3}v${+h}h${-w3}Z`;
  }
  value() {
    return this._ || null;
  }
};

// node_modules/@nivo/voronoi/node_modules/d3-delaunay/src/polygon.js
var Polygon = class {
  constructor() {
    this._ = [];
  }
  moveTo(x3, y2) {
    this._.push([x3, y2]);
  }
  closePath() {
    this._.push(this._[0].slice());
  }
  lineTo(x3, y2) {
    this._.push([x3, y2]);
  }
  value() {
    return this._.length ? this._ : null;
  }
};

// node_modules/@nivo/voronoi/node_modules/d3-delaunay/src/voronoi.js
var Voronoi = class {
  constructor(delaunay, [xmin, ymin, xmax, ymax] = [0, 0, 960, 500]) {
    if (!((xmax = +xmax) >= (xmin = +xmin)) || !((ymax = +ymax) >= (ymin = +ymin))) throw new Error("invalid bounds");
    this.delaunay = delaunay;
    this._circumcenters = new Float64Array(delaunay.points.length * 2);
    this.vectors = new Float64Array(delaunay.points.length * 2);
    this.xmax = xmax, this.xmin = xmin;
    this.ymax = ymax, this.ymin = ymin;
    this._init();
  }
  update() {
    this.delaunay.update();
    this._init();
    return this;
  }
  _init() {
    const { delaunay: { points, hull, triangles }, vectors } = this;
    const circumcenters = this.circumcenters = this._circumcenters.subarray(0, triangles.length / 3 * 2);
    for (let i3 = 0, j3 = 0, n3 = triangles.length, x3, y2; i3 < n3; i3 += 3, j3 += 2) {
      const t13 = triangles[i3] * 2;
      const t22 = triangles[i3 + 1] * 2;
      const t32 = triangles[i3 + 2] * 2;
      const x12 = points[t13];
      const y12 = points[t13 + 1];
      const x22 = points[t22];
      const y22 = points[t22 + 1];
      const x32 = points[t32];
      const y3 = points[t32 + 1];
      const dx = x22 - x12;
      const dy = y22 - y12;
      const ex = x32 - x12;
      const ey = y3 - y12;
      const bl = dx * dx + dy * dy;
      const cl = ex * ex + ey * ey;
      const ab = (dx * ey - dy * ex) * 2;
      if (!ab) {
        x3 = (x12 + x32) / 2 - 1e8 * ey;
        y2 = (y12 + y3) / 2 + 1e8 * ex;
      } else if (Math.abs(ab) < 1e-8) {
        x3 = (x12 + x32) / 2;
        y2 = (y12 + y3) / 2;
      } else {
        const d = 1 / ab;
        x3 = x12 + (ey * bl - dy * cl) * d;
        y2 = y12 + (dx * cl - ex * bl) * d;
      }
      circumcenters[j3] = x3;
      circumcenters[j3 + 1] = y2;
    }
    let h = hull[hull.length - 1];
    let p0, p1 = h * 4;
    let x0, x1 = points[2 * h];
    let y0, y1 = points[2 * h + 1];
    vectors.fill(0);
    for (let i3 = 0; i3 < hull.length; ++i3) {
      h = hull[i3];
      p0 = p1, x0 = x1, y0 = y1;
      p1 = h * 4, x1 = points[2 * h], y1 = points[2 * h + 1];
      vectors[p0 + 2] = vectors[p1] = y0 - y1;
      vectors[p0 + 3] = vectors[p1 + 1] = x1 - x0;
    }
  }
  render(context) {
    const buffer = context == null ? context = new Path2() : void 0;
    const { delaunay: { halfedges, inedges, hull }, circumcenters, vectors } = this;
    if (hull.length <= 1) return null;
    for (let i3 = 0, n3 = halfedges.length; i3 < n3; ++i3) {
      const j3 = halfedges[i3];
      if (j3 < i3) continue;
      const ti = Math.floor(i3 / 3) * 2;
      const tj = Math.floor(j3 / 3) * 2;
      const xi = circumcenters[ti];
      const yi = circumcenters[ti + 1];
      const xj = circumcenters[tj];
      const yj = circumcenters[tj + 1];
      this._renderSegment(xi, yi, xj, yj, context);
    }
    let h0, h1 = hull[hull.length - 1];
    for (let i3 = 0; i3 < hull.length; ++i3) {
      h0 = h1, h1 = hull[i3];
      const t5 = Math.floor(inedges[h1] / 3) * 2;
      const x3 = circumcenters[t5];
      const y2 = circumcenters[t5 + 1];
      const v2 = h0 * 4;
      const p2 = this._project(x3, y2, vectors[v2 + 2], vectors[v2 + 3]);
      if (p2) this._renderSegment(x3, y2, p2[0], p2[1], context);
    }
    return buffer && buffer.value();
  }
  renderBounds(context) {
    const buffer = context == null ? context = new Path2() : void 0;
    context.rect(this.xmin, this.ymin, this.xmax - this.xmin, this.ymax - this.ymin);
    return buffer && buffer.value();
  }
  renderCell(i3, context) {
    const buffer = context == null ? context = new Path2() : void 0;
    const points = this._clip(i3);
    if (points === null || !points.length) return;
    context.moveTo(points[0], points[1]);
    let n3 = points.length;
    while (points[0] === points[n3 - 2] && points[1] === points[n3 - 1] && n3 > 1) n3 -= 2;
    for (let i4 = 2; i4 < n3; i4 += 2) {
      if (points[i4] !== points[i4 - 2] || points[i4 + 1] !== points[i4 - 1])
        context.lineTo(points[i4], points[i4 + 1]);
    }
    context.closePath();
    return buffer && buffer.value();
  }
  *cellPolygons() {
    const { delaunay: { points } } = this;
    for (let i3 = 0, n3 = points.length / 2; i3 < n3; ++i3) {
      const cell = this.cellPolygon(i3);
      if (cell) cell.index = i3, yield cell;
    }
  }
  cellPolygon(i3) {
    const polygon = new Polygon();
    this.renderCell(i3, polygon);
    return polygon.value();
  }
  _renderSegment(x0, y0, x1, y1, context) {
    let S;
    const c0 = this._regioncode(x0, y0);
    const c1 = this._regioncode(x1, y1);
    if (c0 === 0 && c1 === 0) {
      context.moveTo(x0, y0);
      context.lineTo(x1, y1);
    } else if (S = this._clipSegment(x0, y0, x1, y1, c0, c1)) {
      context.moveTo(S[0], S[1]);
      context.lineTo(S[2], S[3]);
    }
  }
  contains(i3, x3, y2) {
    if ((x3 = +x3, x3 !== x3) || (y2 = +y2, y2 !== y2)) return false;
    return this.delaunay._step(i3, x3, y2) === i3;
  }
  *neighbors(i3) {
    const ci = this._clip(i3);
    if (ci) for (const j3 of this.delaunay.neighbors(i3)) {
      const cj = this._clip(j3);
      if (cj) loop: for (let ai = 0, li = ci.length; ai < li; ai += 2) {
        for (let aj = 0, lj = cj.length; aj < lj; aj += 2) {
          if (ci[ai] == cj[aj] && ci[ai + 1] == cj[aj + 1] && ci[(ai + 2) % li] == cj[(aj + lj - 2) % lj] && ci[(ai + 3) % li] == cj[(aj + lj - 1) % lj]) {
            yield j3;
            break loop;
          }
        }
      }
    }
  }
  _cell(i3) {
    const { circumcenters, delaunay: { inedges, halfedges, triangles } } = this;
    const e0 = inedges[i3];
    if (e0 === -1) return null;
    const points = [];
    let e4 = e0;
    do {
      const t5 = Math.floor(e4 / 3);
      points.push(circumcenters[t5 * 2], circumcenters[t5 * 2 + 1]);
      e4 = e4 % 3 === 2 ? e4 - 2 : e4 + 1;
      if (triangles[e4] !== i3) break;
      e4 = halfedges[e4];
    } while (e4 !== e0 && e4 !== -1);
    return points;
  }
  _clip(i3) {
    if (i3 === 0 && this.delaunay.hull.length === 1) {
      return [this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax, this.xmin, this.ymin];
    }
    const points = this._cell(i3);
    if (points === null) return null;
    const { vectors: V } = this;
    const v2 = i3 * 4;
    return V[v2] || V[v2 + 1] ? this._clipInfinite(i3, points, V[v2], V[v2 + 1], V[v2 + 2], V[v2 + 3]) : this._clipFinite(i3, points);
  }
  _clipFinite(i3, points) {
    const n3 = points.length;
    let P3 = null;
    let x0, y0, x1 = points[n3 - 2], y1 = points[n3 - 1];
    let c0, c1 = this._regioncode(x1, y1);
    let e0, e1;
    for (let j3 = 0; j3 < n3; j3 += 2) {
      x0 = x1, y0 = y1, x1 = points[j3], y1 = points[j3 + 1];
      c0 = c1, c1 = this._regioncode(x1, y1);
      if (c0 === 0 && c1 === 0) {
        e0 = e1, e1 = 0;
        if (P3) P3.push(x1, y1);
        else P3 = [x1, y1];
      } else {
        let S, sx0, sy0, sx1, sy1;
        if (c0 === 0) {
          if ((S = this._clipSegment(x0, y0, x1, y1, c0, c1)) === null) continue;
          [sx0, sy0, sx1, sy1] = S;
        } else {
          if ((S = this._clipSegment(x1, y1, x0, y0, c1, c0)) === null) continue;
          [sx1, sy1, sx0, sy0] = S;
          e0 = e1, e1 = this._edgecode(sx0, sy0);
          if (e0 && e1) this._edge(i3, e0, e1, P3, P3.length);
          if (P3) P3.push(sx0, sy0);
          else P3 = [sx0, sy0];
        }
        e0 = e1, e1 = this._edgecode(sx1, sy1);
        if (e0 && e1) this._edge(i3, e0, e1, P3, P3.length);
        if (P3) P3.push(sx1, sy1);
        else P3 = [sx1, sy1];
      }
    }
    if (P3) {
      e0 = e1, e1 = this._edgecode(P3[0], P3[1]);
      if (e0 && e1) this._edge(i3, e0, e1, P3, P3.length);
    } else if (this.contains(i3, (this.xmin + this.xmax) / 2, (this.ymin + this.ymax) / 2)) {
      return [this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax, this.xmin, this.ymin];
    }
    return P3;
  }
  _clipSegment(x0, y0, x1, y1, c0, c1) {
    while (true) {
      if (c0 === 0 && c1 === 0) return [x0, y0, x1, y1];
      if (c0 & c1) return null;
      let x3, y2, c = c0 || c1;
      if (c & 8) x3 = x0 + (x1 - x0) * (this.ymax - y0) / (y1 - y0), y2 = this.ymax;
      else if (c & 4) x3 = x0 + (x1 - x0) * (this.ymin - y0) / (y1 - y0), y2 = this.ymin;
      else if (c & 2) y2 = y0 + (y1 - y0) * (this.xmax - x0) / (x1 - x0), x3 = this.xmax;
      else y2 = y0 + (y1 - y0) * (this.xmin - x0) / (x1 - x0), x3 = this.xmin;
      if (c0) x0 = x3, y0 = y2, c0 = this._regioncode(x0, y0);
      else x1 = x3, y1 = y2, c1 = this._regioncode(x1, y1);
    }
  }
  _clipInfinite(i3, points, vx0, vy0, vxn, vyn) {
    let P3 = Array.from(points), p2;
    if (p2 = this._project(P3[0], P3[1], vx0, vy0)) P3.unshift(p2[0], p2[1]);
    if (p2 = this._project(P3[P3.length - 2], P3[P3.length - 1], vxn, vyn)) P3.push(p2[0], p2[1]);
    if (P3 = this._clipFinite(i3, P3)) {
      for (let j3 = 0, n3 = P3.length, c0, c1 = this._edgecode(P3[n3 - 2], P3[n3 - 1]); j3 < n3; j3 += 2) {
        c0 = c1, c1 = this._edgecode(P3[j3], P3[j3 + 1]);
        if (c0 && c1) j3 = this._edge(i3, c0, c1, P3, j3), n3 = P3.length;
      }
    } else if (this.contains(i3, (this.xmin + this.xmax) / 2, (this.ymin + this.ymax) / 2)) {
      P3 = [this.xmin, this.ymin, this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax];
    }
    return P3;
  }
  _edge(i3, e0, e1, P3, j3) {
    while (e0 !== e1) {
      let x3, y2;
      switch (e0) {
        case 5:
          e0 = 4;
          continue;
        // top-left
        case 4:
          e0 = 6, x3 = this.xmax, y2 = this.ymin;
          break;
        // top
        case 6:
          e0 = 2;
          continue;
        // top-right
        case 2:
          e0 = 10, x3 = this.xmax, y2 = this.ymax;
          break;
        // right
        case 10:
          e0 = 8;
          continue;
        // bottom-right
        case 8:
          e0 = 9, x3 = this.xmin, y2 = this.ymax;
          break;
        // bottom
        case 9:
          e0 = 1;
          continue;
        // bottom-left
        case 1:
          e0 = 5, x3 = this.xmin, y2 = this.ymin;
          break;
      }
      if ((P3[j3] !== x3 || P3[j3 + 1] !== y2) && this.contains(i3, x3, y2)) {
        P3.splice(j3, 0, x3, y2), j3 += 2;
      }
    }
    if (P3.length > 4) {
      for (let i4 = 0; i4 < P3.length; i4 += 2) {
        const j4 = (i4 + 2) % P3.length, k4 = (i4 + 4) % P3.length;
        if (P3[i4] === P3[j4] && P3[j4] === P3[k4] || P3[i4 + 1] === P3[j4 + 1] && P3[j4 + 1] === P3[k4 + 1])
          P3.splice(j4, 2), i4 -= 2;
      }
    }
    return j3;
  }
  _project(x0, y0, vx, vy) {
    let t5 = Infinity, c, x3, y2;
    if (vy < 0) {
      if (y0 <= this.ymin) return null;
      if ((c = (this.ymin - y0) / vy) < t5) y2 = this.ymin, x3 = x0 + (t5 = c) * vx;
    } else if (vy > 0) {
      if (y0 >= this.ymax) return null;
      if ((c = (this.ymax - y0) / vy) < t5) y2 = this.ymax, x3 = x0 + (t5 = c) * vx;
    }
    if (vx > 0) {
      if (x0 >= this.xmax) return null;
      if ((c = (this.xmax - x0) / vx) < t5) x3 = this.xmax, y2 = y0 + (t5 = c) * vy;
    } else if (vx < 0) {
      if (x0 <= this.xmin) return null;
      if ((c = (this.xmin - x0) / vx) < t5) x3 = this.xmin, y2 = y0 + (t5 = c) * vy;
    }
    return [x3, y2];
  }
  _edgecode(x3, y2) {
    return (x3 === this.xmin ? 1 : x3 === this.xmax ? 2 : 0) | (y2 === this.ymin ? 4 : y2 === this.ymax ? 8 : 0);
  }
  _regioncode(x3, y2) {
    return (x3 < this.xmin ? 1 : x3 > this.xmax ? 2 : 0) | (y2 < this.ymin ? 4 : y2 > this.ymax ? 8 : 0);
  }
};

// node_modules/@nivo/voronoi/node_modules/d3-delaunay/src/delaunay.js
var tau3 = 2 * Math.PI;
var pow2 = Math.pow;
function pointX(p2) {
  return p2[0];
}
function pointY(p2) {
  return p2[1];
}
function collinear(d) {
  const { triangles, coords } = d;
  for (let i3 = 0; i3 < triangles.length; i3 += 3) {
    const a3 = 2 * triangles[i3], b2 = 2 * triangles[i3 + 1], c = 2 * triangles[i3 + 2], cross2 = (coords[c] - coords[a3]) * (coords[b2 + 1] - coords[a3 + 1]) - (coords[b2] - coords[a3]) * (coords[c + 1] - coords[a3 + 1]);
    if (cross2 > 1e-10) return false;
  }
  return true;
}
function jitter(x3, y2, r3) {
  return [x3 + Math.sin(x3 + y2) * r3, y2 + Math.cos(x3 - y2) * r3];
}
var Delaunay = class _Delaunay {
  static from(points, fx = pointX, fy = pointY, that) {
    return new _Delaunay("length" in points ? flatArray(points, fx, fy, that) : Float64Array.from(flatIterable(points, fx, fy, that)));
  }
  constructor(points) {
    this._delaunator = new Delaunator(points);
    this.inedges = new Int32Array(points.length / 2);
    this._hullIndex = new Int32Array(points.length / 2);
    this.points = this._delaunator.coords;
    this._init();
  }
  update() {
    this._delaunator.update();
    this._init();
    return this;
  }
  _init() {
    const d = this._delaunator, points = this.points;
    if (d.hull && d.hull.length > 2 && collinear(d)) {
      this.collinear = Int32Array.from({ length: points.length / 2 }, (_, i3) => i3).sort((i3, j3) => points[2 * i3] - points[2 * j3] || points[2 * i3 + 1] - points[2 * j3 + 1]);
      const e4 = this.collinear[0], f2 = this.collinear[this.collinear.length - 1], bounds = [points[2 * e4], points[2 * e4 + 1], points[2 * f2], points[2 * f2 + 1]], r3 = 1e-8 * Math.hypot(bounds[3] - bounds[1], bounds[2] - bounds[0]);
      for (let i3 = 0, n3 = points.length / 2; i3 < n3; ++i3) {
        const p2 = jitter(points[2 * i3], points[2 * i3 + 1], r3);
        points[2 * i3] = p2[0];
        points[2 * i3 + 1] = p2[1];
      }
      this._delaunator = new Delaunator(points);
    } else {
      delete this.collinear;
    }
    const halfedges = this.halfedges = this._delaunator.halfedges;
    const hull = this.hull = this._delaunator.hull;
    const triangles = this.triangles = this._delaunator.triangles;
    const inedges = this.inedges.fill(-1);
    const hullIndex = this._hullIndex.fill(-1);
    for (let e4 = 0, n3 = halfedges.length; e4 < n3; ++e4) {
      const p2 = triangles[e4 % 3 === 2 ? e4 - 2 : e4 + 1];
      if (halfedges[e4] === -1 || inedges[p2] === -1) inedges[p2] = e4;
    }
    for (let i3 = 0, n3 = hull.length; i3 < n3; ++i3) {
      hullIndex[hull[i3]] = i3;
    }
    if (hull.length <= 2 && hull.length > 0) {
      this.triangles = new Int32Array(3).fill(-1);
      this.halfedges = new Int32Array(3).fill(-1);
      this.triangles[0] = hull[0];
      this.triangles[1] = hull[1];
      this.triangles[2] = hull[1];
      inedges[hull[0]] = 1;
      if (hull.length === 2) inedges[hull[1]] = 0;
    }
  }
  voronoi(bounds) {
    return new Voronoi(this, bounds);
  }
  *neighbors(i3) {
    const { inedges, hull, _hullIndex, halfedges, triangles, collinear: collinear2 } = this;
    if (collinear2) {
      const l2 = collinear2.indexOf(i3);
      if (l2 > 0) yield collinear2[l2 - 1];
      if (l2 < collinear2.length - 1) yield collinear2[l2 + 1];
      return;
    }
    const e0 = inedges[i3];
    if (e0 === -1) return;
    let e4 = e0, p0 = -1;
    do {
      yield p0 = triangles[e4];
      e4 = e4 % 3 === 2 ? e4 - 2 : e4 + 1;
      if (triangles[e4] !== i3) return;
      e4 = halfedges[e4];
      if (e4 === -1) {
        const p2 = hull[(_hullIndex[i3] + 1) % hull.length];
        if (p2 !== p0) yield p2;
        return;
      }
    } while (e4 !== e0);
  }
  find(x3, y2, i3 = 0) {
    if ((x3 = +x3, x3 !== x3) || (y2 = +y2, y2 !== y2)) return -1;
    const i0 = i3;
    let c;
    while ((c = this._step(i3, x3, y2)) >= 0 && c !== i3 && c !== i0) i3 = c;
    return c;
  }
  _step(i3, x3, y2) {
    const { inedges, hull, _hullIndex, halfedges, triangles, points } = this;
    if (inedges[i3] === -1 || !points.length) return (i3 + 1) % (points.length >> 1);
    let c = i3;
    let dc = pow2(x3 - points[i3 * 2], 2) + pow2(y2 - points[i3 * 2 + 1], 2);
    const e0 = inedges[i3];
    let e4 = e0;
    do {
      let t5 = triangles[e4];
      const dt = pow2(x3 - points[t5 * 2], 2) + pow2(y2 - points[t5 * 2 + 1], 2);
      if (dt < dc) dc = dt, c = t5;
      e4 = e4 % 3 === 2 ? e4 - 2 : e4 + 1;
      if (triangles[e4] !== i3) break;
      e4 = halfedges[e4];
      if (e4 === -1) {
        e4 = hull[(_hullIndex[i3] + 1) % hull.length];
        if (e4 !== t5) {
          if (pow2(x3 - points[e4 * 2], 2) + pow2(y2 - points[e4 * 2 + 1], 2) < dc) return e4;
        }
        break;
      }
    } while (e4 !== e0);
    return c;
  }
  render(context) {
    const buffer = context == null ? context = new Path2() : void 0;
    const { points, halfedges, triangles } = this;
    for (let i3 = 0, n3 = halfedges.length; i3 < n3; ++i3) {
      const j3 = halfedges[i3];
      if (j3 < i3) continue;
      const ti = triangles[i3] * 2;
      const tj = triangles[j3] * 2;
      context.moveTo(points[ti], points[ti + 1]);
      context.lineTo(points[tj], points[tj + 1]);
    }
    this.renderHull(context);
    return buffer && buffer.value();
  }
  renderPoints(context, r3 = 2) {
    const buffer = context == null ? context = new Path2() : void 0;
    const { points } = this;
    for (let i3 = 0, n3 = points.length; i3 < n3; i3 += 2) {
      const x3 = points[i3], y2 = points[i3 + 1];
      context.moveTo(x3 + r3, y2);
      context.arc(x3, y2, r3, 0, tau3);
    }
    return buffer && buffer.value();
  }
  renderHull(context) {
    const buffer = context == null ? context = new Path2() : void 0;
    const { hull, points } = this;
    const h = hull[0] * 2, n3 = hull.length;
    context.moveTo(points[h], points[h + 1]);
    for (let i3 = 1; i3 < n3; ++i3) {
      const h2 = 2 * hull[i3];
      context.lineTo(points[h2], points[h2 + 1]);
    }
    context.closePath();
    return buffer && buffer.value();
  }
  hullPolygon() {
    const polygon = new Polygon();
    this.renderHull(polygon);
    return polygon.value();
  }
  renderTriangle(i3, context) {
    const buffer = context == null ? context = new Path2() : void 0;
    const { points, triangles } = this;
    const t03 = triangles[i3 *= 3] * 2;
    const t13 = triangles[i3 + 1] * 2;
    const t22 = triangles[i3 + 2] * 2;
    context.moveTo(points[t03], points[t03 + 1]);
    context.lineTo(points[t13], points[t13 + 1]);
    context.lineTo(points[t22], points[t22 + 1]);
    context.closePath();
    return buffer && buffer.value();
  }
  *trianglePolygons() {
    const { triangles } = this;
    for (let i3 = 0, n3 = triangles.length / 3; i3 < n3; ++i3) {
      yield this.trianglePolygon(i3);
    }
  }
  trianglePolygon(i3) {
    const polygon = new Polygon();
    this.renderTriangle(i3, polygon);
    return polygon.value();
  }
};
function flatArray(points, fx, fy, that) {
  const n3 = points.length;
  const array2 = new Float64Array(n3 * 2);
  for (let i3 = 0; i3 < n3; ++i3) {
    const p2 = points[i3];
    array2[i3 * 2] = fx.call(that, p2, i3, points);
    array2[i3 * 2 + 1] = fy.call(that, p2, i3, points);
  }
  return array2;
}
function* flatIterable(points, fx, fy, that) {
  let i3 = 0;
  for (const p2 of points) {
    yield fx.call(that, p2, i3, points);
    yield fy.call(that, p2, i3, points);
    ++i3;
  }
}

// node_modules/@nivo/voronoi/dist/nivo-voronoi.es.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
var g2 = function(n3) {
  return "function" == typeof n3 ? n3 : function(e4) {
    return e4[n3];
  };
};
var b = function(n3) {
  var e4 = n3.points, i3 = n3.x, o3 = void 0 === i3 ? "x" : i3, t5 = n3.y, r3 = void 0 === t5 ? "y" : t5, l2 = g2(o3), u = g2(r3);
  return e4.map(function(n4) {
    return [l2(n4), u(n4)];
  });
};
var k3 = function(n3) {
  var e4 = n3.points, i3 = n3.width, o3 = n3.height, t5 = n3.debug, r3 = Delaunay.from(e4), l2 = t5 ? r3.voronoi([0, 0, i3, o3]) : void 0;
  return { delaunay: r3, voronoi: l2 };
};
var x2 = function(e4) {
  var i3 = e4.points, o3 = e4.x, t5 = e4.y, r3 = e4.width, l2 = e4.height, u = e4.debug, a3 = (0, import_react.useMemo)(function() {
    return b({ points: i3, x: o3, y: t5 });
  }, [i3, o3, t5]);
  return (0, import_react.useMemo)(function() {
    return k3({ points: a3, width: r3, height: l2, debug: u });
  }, [a3, r3, l2, u]);
};
var O = function(e4) {
  var i3 = e4.nodes, l2 = e4.width, u = e4.height, a3 = e4.x, d = e4.y, c = e4.onMouseEnter, h = e4.onMouseMove, m = e4.onMouseLeave, y2 = e4.onClick, g3 = e4.debug, b2 = (0, import_react.useRef)(null), k4 = (0, import_react.useState)(null), C3 = k4[0], L = k4[1], w3 = x2({ points: i3, x: a3, y: d, width: l2, height: u, debug: g3 }), W = w3.delaunay, D3 = w3.voronoi, M = (0, import_react.useMemo)(function() {
    if (g3 && D3) return D3.render();
  }, [g3, D3]), O2 = (0, import_react.useCallback)(function(n3) {
    if (!b2.current) return [null, null];
    var e6 = Fi(b2.current, n3), o3 = e6[0], t5 = e6[1], r3 = W.find(o3, t5);
    return [r3, void 0 !== r3 ? i3[r3] : null];
  }, [b2, W]), P3 = (0, import_react.useCallback)(function(n3) {
    var e6 = O2(n3), i4 = e6[0], o3 = e6[1];
    L(i4), o3 && (null == c || c(o3, n3));
  }, [O2, L, c]), j3 = (0, import_react.useCallback)(function(n3) {
    var e6 = O2(n3), i4 = e6[0], o3 = e6[1];
    L(i4), o3 && (null == h || h(o3, n3));
  }, [O2, L, h]), S = (0, import_react.useCallback)(function(n3) {
    if (L(null), m) {
      var e6 = void 0;
      null !== C3 && (e6 = i3[C3]), e6 && m(e6, n3);
    }
  }, [L, C3, m, i3]), z2 = (0, import_react.useCallback)(function(n3) {
    var e6 = O2(n3), i4 = e6[0], o3 = e6[1];
    L(i4), o3 && (null == y2 || y2(o3, n3));
  }, [O2, L, y2]);
  return (0, import_jsx_runtime.jsxs)("g", { ref: b2, children: [g3 && D3 && (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [(0, import_jsx_runtime.jsx)("path", { d: M, stroke: "red", strokeWidth: 1, opacity: 0.75 }), null !== C3 && (0, import_jsx_runtime.jsx)("path", { fill: "pink", opacity: 0.35, d: D3.renderCell(C3) })] }), (0, import_jsx_runtime.jsx)("rect", { width: l2, height: u, fill: "red", opacity: 0, style: { cursor: "auto" }, onMouseEnter: P3, onMouseMove: j3, onMouseLeave: S, onClick: z2 })] });
};
var P2 = function(n3, e4) {
  n3.save(), n3.globalAlpha = 0.75, n3.beginPath(), e4.render(n3), n3.strokeStyle = "red", n3.lineWidth = 1, n3.stroke(), n3.restore();
};
var j2 = function(n3, e4, i3) {
  n3.save(), n3.globalAlpha = 0.35, n3.beginPath(), e4.renderCell(i3, n3), n3.fillStyle = "red", n3.fill(), n3.restore();
};

// node_modules/@nivo/line/dist/nivo-line.es.js
function re() {
  return re = Object.assign ? Object.assign.bind() : function(e4) {
    for (var i3 = 1; i3 < arguments.length; i3++) {
      var r3 = arguments[i3];
      for (var n3 in r3) Object.prototype.hasOwnProperty.call(r3, n3) && (e4[n3] = r3[n3]);
    }
    return e4;
  }, re.apply(this, arguments);
}
var ne = function(e4) {
  var i3 = e4.point;
  return (0, import_jsx_runtime2.jsx)(w, { id: (0, import_jsx_runtime2.jsxs)("span", { children: ["x: ", (0, import_jsx_runtime2.jsx)("strong", { children: i3.data.xFormatted }), ", y:", " ", (0, import_jsx_runtime2.jsx)("strong", { children: i3.data.yFormatted })] }), enableChip: true, color: i3.serieColor });
};
ne.propTypes = { point: import_prop_types.default.object.isRequired };
var oe = (0, import_react2.memo)(ne);
var te = function(e4) {
  var i3 = e4.slice, r3 = e4.axis, n3 = Et(), o3 = "x" === r3 ? "y" : "x";
  return (0, import_jsx_runtime2.jsx)(C, { rows: i3.points.map(function(e6) {
    return [(0, import_jsx_runtime2.jsx)(g, { color: e6.serieColor, style: n3.tooltip.chip }, "chip"), e6.serieId, (0, import_jsx_runtime2.jsx)("span", { style: n3.tooltip.tableCellValue, children: e6.data[o3 + "Formatted"] }, "value")];
  }) });
};
te.propTypes = { slice: import_prop_types.default.object.isRequired, axis: import_prop_types.default.oneOf(["x", "y"]).isRequired };
var ae = (0, import_react2.memo)(te);
var se = { data: import_prop_types.default.arrayOf(import_prop_types.default.shape({ id: import_prop_types.default.oneOfType([import_prop_types.default.string, import_prop_types.default.number]).isRequired, data: import_prop_types.default.arrayOf(import_prop_types.default.shape({ x: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string, import_prop_types.default.instanceOf(Date)]), y: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string, import_prop_types.default.instanceOf(Date)]) })).isRequired })).isRequired, xScale: import_prop_types.default.object.isRequired, xFormat: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.string]), yScale: import_prop_types.default.object.isRequired, yFormat: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.string]), layers: import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["grid", "markers", "axes", "areas", "crosshair", "lines", "slices", "points", "mesh", "legends"]), import_prop_types.default.func])).isRequired, curve: bt.isRequired, axisTop: w2, axisRight: w2, axisBottom: w2, axisLeft: w2, enableGridX: import_prop_types.default.bool.isRequired, enableGridY: import_prop_types.default.bool.isRequired, gridXValues: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string, import_prop_types.default.instanceOf(Date)]))]), gridYValues: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string, import_prop_types.default.instanceOf(Date)]))]), enablePoints: import_prop_types.default.bool.isRequired, pointSymbol: import_prop_types.default.func, pointSize: import_prop_types.default.number.isRequired, pointColor: import_prop_types.default.any.isRequired, pointBorderWidth: import_prop_types.default.number.isRequired, pointBorderColor: import_prop_types.default.any.isRequired, enablePointLabel: import_prop_types.default.bool.isRequired, pointLabel: import_prop_types.default.oneOfType([import_prop_types.default.string, import_prop_types.default.func]).isRequired, markers: import_prop_types.default.arrayOf(import_prop_types.default.shape({ axis: import_prop_types.default.oneOf(["x", "y"]).isRequired, value: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string, import_prop_types.default.instanceOf(Date)]).isRequired, style: import_prop_types.default.object })), colors: Xe.isRequired, enableArea: import_prop_types.default.bool.isRequired, areaOpacity: import_prop_types.default.number.isRequired, areaBlendMode: zt.isRequired, areaBaselineValue: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string, import_prop_types.default.instanceOf(Date)]).isRequired, lineWidth: import_prop_types.default.number.isRequired, legends: import_prop_types.default.arrayOf(import_prop_types.default.shape(T)).isRequired, isInteractive: import_prop_types.default.bool.isRequired, debugMesh: import_prop_types.default.bool.isRequired, tooltip: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]).isRequired, enableSlices: import_prop_types.default.oneOf(["x", "y", false]).isRequired, debugSlices: import_prop_types.default.bool.isRequired, sliceTooltip: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]).isRequired, enableCrosshair: import_prop_types.default.bool.isRequired, crosshairType: import_prop_types.default.string.isRequired };
var le = re({}, se, { enablePointLabel: import_prop_types.default.bool.isRequired, role: import_prop_types.default.string.isRequired, useMesh: import_prop_types.default.bool.isRequired }, Jr, yt);
var ue = re({ pixelRatio: import_prop_types.default.number.isRequired }, se);
var de = { curve: "linear", xScale: { type: "point" }, yScale: { type: "linear", min: 0, max: "auto" }, layers: ["grid", "markers", "axes", "areas", "crosshair", "lines", "points", "slices", "mesh", "legends"], axisBottom: {}, axisLeft: {}, enableGridX: true, enableGridY: true, enablePoints: true, pointSize: 6, pointColor: { from: "color" }, pointBorderWidth: 0, pointBorderColor: { theme: "background" }, enablePointLabel: false, pointLabel: "yFormatted", colors: { scheme: "nivo" }, enableArea: false, areaBaselineValue: 0, areaOpacity: 0.2, areaBlendMode: "normal", lineWidth: 2, legends: [], isInteractive: true, tooltip: oe, enableSlices: false, debugSlices: false, sliceTooltip: ae, debugMesh: false, enableCrosshair: true, crosshairType: "bottom-left" };
var ce = re({}, de, { enablePointLabel: false, useMesh: false, animate: true, motionConfig: "gentle", defs: [], fill: [], role: "img" });
var fe = re({}, de, { pixelRatio: "undefined" != typeof window && window.devicePixelRatio || 1 });
var pe = function(e4) {
  var r3 = e4.curve;
  return (0, import_react2.useMemo)(function() {
    return line_default().defined(function(e6) {
      return null !== e6.x && null !== e6.y;
    }).x(function(e6) {
      return e6.x;
    }).y(function(e6) {
      return e6.y;
    }).curve(mt(r3));
  }, [r3]);
};
var he = function(e4) {
  var r3 = e4.curve, n3 = e4.yScale, o3 = e4.areaBaselineValue;
  return (0, import_react2.useMemo)(function() {
    return area_default().defined(function(e6) {
      return null !== e6.x && null !== e6.y;
    }).x(function(e6) {
      return e6.x;
    }).y1(function(e6) {
      return e6.y;
    }).curve(mt(r3)).y0(n3(o3));
  }, [r3, n3, o3]);
};
var ye = function(e4) {
  var r3 = e4.enableSlices, n3 = e4.points, o3 = e4.width, t5 = e4.height;
  return (0, import_react2.useMemo)(function() {
    if (false === r3) return [];
    if ("x" === r3) {
      var e6 = /* @__PURE__ */ new Map();
      return n3.forEach(function(i4) {
        null !== i4.data.x && null !== i4.data.y && (e6.has(i4.x) ? e6.get(i4.x).push(i4) : e6.set(i4.x, [i4]));
      }), Array.from(e6.entries()).sort(function(e7, i4) {
        return e7[0] - i4[0];
      }).map(function(e7, i4, r4) {
        var n4, a3 = e7[0], s3 = e7[1], l2 = r4[i4 - 1], u = r4[i4 + 1];
        return { id: a3, x0: n4 = l2 ? a3 - (a3 - l2[0]) / 2 : a3, x: a3, y0: 0, y: 0, width: u ? a3 - n4 + (u[0] - a3) / 2 : o3 - n4, height: t5, points: s3.reverse() };
      });
    }
    if ("y" === r3) {
      var i3 = /* @__PURE__ */ new Map();
      return n3.forEach(function(e7) {
        null !== e7.data.x && null !== e7.data.y && (i3.has(e7.y) ? i3.get(e7.y).push(e7) : i3.set(e7.y, [e7]));
      }), Array.from(i3.entries()).sort(function(e7, i4) {
        return e7[0] - i4[0];
      }).map(function(e7, i4, r4) {
        var n4, a3, s3 = e7[0], l2 = e7[1], u = r4[i4 - 1], d = r4[i4 + 1];
        return n4 = u ? s3 - (s3 - u[0]) / 2 : s3, a3 = d ? s3 - n4 + (d[0] - s3) / 2 : t5 - n4, { id: s3, x0: 0, x: 0, y0: n4, y: s3, width: o3, height: a3, points: l2.reverse() };
      });
    }
  }, [r3, n3]);
};
var be = function(e4) {
  var o3 = e4.data, t5 = e4.xScale, a3 = void 0 === t5 ? ce.xScale : t5, s3 = e4.xFormat, l2 = e4.yScale, d = void 0 === l2 ? ce.yScale : l2, c = e4.yFormat, f2 = e4.width, p2 = e4.height, h = e4.colors, b2 = void 0 === h ? ce.colors : h, g3 = e4.curve, m = void 0 === g3 ? ce.curve : g3, v2 = e4.areaBaselineValue, x3 = void 0 === v2 ? ce.areaBaselineValue : v2, R = e4.pointColor, q = void 0 === R ? ce.pointColor : R, O2 = e4.pointBorderColor, M = void 0 === O2 ? ce.pointBorderColor : O2, C3 = e4.enableSlices, S = void 0 === C3 ? ce.enableSlicesTooltip : C3, T2 = Dt(s3), w3 = Dt(c), L = pr(b2, "id"), W = Et(), G = We(q, W), P3 = We(M, W), E2 = (0, import_react2.useState)([]), j3 = E2[0], F = E2[1], V = (0, import_react2.useMemo)(function() {
    return dn(o3.filter(function(e6) {
      return -1 === j3.indexOf(e6.id);
    }), a3, d, f2, p2);
  }, [o3, j3, a3, d, f2, p2]), Y = V.xScale, D3 = V.yScale, X3 = V.series, z2 = (0, import_react2.useMemo)(function() {
    var e6 = o3.map(function(e7) {
      return { id: e7.id, label: e7.id, color: L(e7) };
    }), i3 = e6.map(function(e7) {
      return re({}, X3.find(function(i4) {
        return i4.id === e7.id;
      }), { color: e7.color });
    }).filter(function(e7) {
      return Boolean(e7.id);
    });
    return { legendData: e6.map(function(e7) {
      return re({}, e7, { hidden: !i3.find(function(i4) {
        return i4.id === e7.id;
      }) });
    }).reverse(), series: i3 };
  }, [o3, X3, L]), A2 = z2.legendData, H2 = z2.series, I = (0, import_react2.useCallback)(function(e6) {
    F(function(i3) {
      return i3.indexOf(e6) > -1 ? i3.filter(function(i4) {
        return i4 !== e6;
      }) : [].concat(i3, [e6]);
    });
  }, []), K3 = function(e6) {
    var r3 = e6.series, n3 = e6.getPointColor, o4 = e6.getPointBorderColor, t6 = e6.formatX, a4 = e6.formatY;
    return (0, import_react2.useMemo)(function() {
      return r3.reduce(function(e7, i3) {
        return [].concat(e7, i3.data.filter(function(e8) {
          return null !== e8.position.x && null !== e8.position.y;
        }).map(function(r4, s4) {
          var l3 = { id: i3.id + "." + s4, index: e7.length + s4, serieId: i3.id, serieColor: i3.color, x: r4.position.x, y: r4.position.y };
          return l3.color = n3(i3), l3.borderColor = o4(l3), l3.data = re({}, r4.data, { xFormatted: t6(r4.data.x), yFormatted: a4(r4.data.y) }), l3;
        }));
      }, []);
    }, [r3, n3, o4, t6, a4]);
  }({ series: H2, getPointColor: G, getPointBorderColor: P3, formatX: T2, formatY: w3 }), N2 = ye({ enableSlices: S, points: K3, width: f2, height: p2 });
  return { legendData: A2, toggleSerie: I, lineGenerator: pe({ curve: m }), areaGenerator: he({ curve: m, yScale: D3, areaBaselineValue: x3 }), getColor: L, series: H2, xScale: Y, yScale: D3, slices: N2, points: K3 };
};
var ge = function(e4) {
  var i3 = e4.areaBlendMode, r3 = e4.areaOpacity, n3 = e4.color, o3 = e4.fill, t5 = e4.path, a3 = Zr(), s3 = a3.animate, l2 = a3.config, u = $r(t5), d = useSpring({ color: n3, config: l2, immediate: !s3 });
  return (0, import_jsx_runtime2.jsx)(animated.path, { d: u, fill: o3 || d.color, fillOpacity: r3, strokeWidth: 0, style: { mixBlendMode: i3 } });
};
ge.propTypes = { areaBlendMode: zt.isRequired, areaOpacity: import_prop_types.default.number.isRequired, color: import_prop_types.default.string, fill: import_prop_types.default.string, path: import_prop_types.default.string.isRequired };
var me = function(e4) {
  var i3 = e4.areaGenerator, r3 = e4.areaOpacity, n3 = e4.areaBlendMode, o3 = e4.lines.slice(0).reverse();
  return (0, import_jsx_runtime2.jsx)("g", { children: o3.map(function(e6) {
    return (0, import_jsx_runtime2.jsx)(ge, re({ path: i3(e6.data.map(function(e7) {
      return e7.position;
    })) }, re({ areaOpacity: r3, areaBlendMode: n3 }, e6)), e6.id);
  }) });
};
me.propTypes = { areaGenerator: import_prop_types.default.func.isRequired, areaOpacity: import_prop_types.default.number.isRequired, areaBlendMode: zt.isRequired, lines: import_prop_types.default.arrayOf(import_prop_types.default.object).isRequired };
var ve = (0, import_react2.memo)(me);
var xe = function(e4) {
  var r3 = e4.lineGenerator, n3 = e4.points, o3 = e4.color, t5 = e4.thickness, a3 = (0, import_react2.useMemo)(function() {
    return r3(n3);
  }, [r3, n3]), s3 = $r(a3);
  return (0, import_jsx_runtime2.jsx)(animated.path, { d: s3, fill: "none", strokeWidth: t5, stroke: o3 });
};
xe.propTypes = { points: import_prop_types.default.arrayOf(import_prop_types.default.shape({ x: import_prop_types.default.oneOfType([import_prop_types.default.string, import_prop_types.default.number]), y: import_prop_types.default.oneOfType([import_prop_types.default.string, import_prop_types.default.number]) })), lineGenerator: import_prop_types.default.func.isRequired, color: import_prop_types.default.string.isRequired, thickness: import_prop_types.default.number.isRequired };
var Re = (0, import_react2.memo)(xe);
var qe = function(e4) {
  var i3 = e4.lines, r3 = e4.lineGenerator, n3 = e4.lineWidth;
  return i3.slice(0).reverse().map(function(e6) {
    var i4 = e6.id, o3 = e6.data, t5 = e6.color;
    return (0, import_jsx_runtime2.jsx)(Re, { id: i4, points: o3.map(function(e7) {
      return e7.position;
    }), lineGenerator: r3, color: t5, thickness: n3 }, i4);
  });
};
qe.propTypes = { lines: import_prop_types.default.arrayOf(import_prop_types.default.shape({ id: import_prop_types.default.oneOfType([import_prop_types.default.string, import_prop_types.default.number]).isRequired, color: import_prop_types.default.string.isRequired, data: import_prop_types.default.arrayOf(import_prop_types.default.shape({ data: import_prop_types.default.shape({ x: import_prop_types.default.oneOfType([import_prop_types.default.string, import_prop_types.default.number, import_prop_types.default.instanceOf(Date)]), y: import_prop_types.default.oneOfType([import_prop_types.default.string, import_prop_types.default.number, import_prop_types.default.instanceOf(Date)]) }).isRequired, position: import_prop_types.default.shape({ x: import_prop_types.default.number, y: import_prop_types.default.number }).isRequired })).isRequired })).isRequired, lineWidth: import_prop_types.default.number.isRequired, lineGenerator: import_prop_types.default.func.isRequired };
var Oe = (0, import_react2.memo)(qe);
var Me = function(e4) {
  var i3 = e4.slice, r3 = e4.axis, t5 = e4.debug, a3 = e4.tooltip, s3 = e4.isCurrent, l2 = e4.setCurrent, u = e4.onMouseEnter, d = e4.onMouseMove, c = e4.onMouseLeave, f2 = e4.onClick, p2 = k(), h = p2.showTooltipFromEvent, y2 = p2.hideTooltip, b2 = (0, import_react2.useCallback)(function(e6) {
    h((0, import_react2.createElement)(a3, { slice: i3, axis: r3 }), e6, "right"), l2(i3), u && u(i3, e6);
  }, [h, a3, i3, u]), g3 = (0, import_react2.useCallback)(function(e6) {
    h((0, import_react2.createElement)(a3, { slice: i3, axis: r3 }), e6, "right"), d && d(i3, e6);
  }, [h, a3, i3, d]), m = (0, import_react2.useCallback)(function(e6) {
    y2(), l2(null), c && c(i3, e6);
  }, [y2, i3, c]), v2 = (0, import_react2.useCallback)(function(e6) {
    f2 && f2(i3, e6);
  }, [i3, f2]);
  return (0, import_jsx_runtime2.jsx)("rect", { x: i3.x0, y: i3.y0, width: i3.width, height: i3.height, stroke: "red", strokeWidth: t5 ? 1 : 0, strokeOpacity: 0.75, fill: "red", fillOpacity: s3 && t5 ? 0.35 : 0, onMouseEnter: b2, onMouseMove: g3, onMouseLeave: m, onClick: v2, "data-testid": "slice-" + i3.id });
};
Me.propTypes = { slice: import_prop_types.default.object.isRequired, axis: import_prop_types.default.oneOf(["x", "y"]).isRequired, debug: import_prop_types.default.bool.isRequired, height: import_prop_types.default.number.isRequired, tooltip: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]), isCurrent: import_prop_types.default.bool.isRequired, setCurrent: import_prop_types.default.func.isRequired, onMouseEnter: import_prop_types.default.func, onMouseMove: import_prop_types.default.func, onMouseLeave: import_prop_types.default.func, onClick: import_prop_types.default.func };
var Ce = (0, import_react2.memo)(Me);
var Se = function(e4) {
  var i3 = e4.slices, r3 = e4.axis, n3 = e4.debug, o3 = e4.height, t5 = e4.tooltip, a3 = e4.current, s3 = e4.setCurrent, l2 = e4.onMouseEnter, u = e4.onMouseMove, d = e4.onMouseLeave, c = e4.onClick;
  return i3.map(function(e6) {
    return (0, import_jsx_runtime2.jsx)(Ce, { slice: e6, axis: r3, debug: n3, height: o3, tooltip: t5, setCurrent: s3, isCurrent: null !== a3 && a3.id === e6.id, onMouseEnter: l2, onMouseMove: u, onMouseLeave: d, onClick: c }, e6.id);
  });
};
Se.propTypes = { slices: import_prop_types.default.arrayOf(import_prop_types.default.shape({ id: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string, import_prop_types.default.instanceOf(Date)]).isRequired, x: import_prop_types.default.number.isRequired, y: import_prop_types.default.number.isRequired, points: import_prop_types.default.arrayOf(import_prop_types.default.object).isRequired })).isRequired, axis: import_prop_types.default.oneOf(["x", "y"]).isRequired, debug: import_prop_types.default.bool.isRequired, height: import_prop_types.default.number.isRequired, tooltip: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]).isRequired, current: import_prop_types.default.object, setCurrent: import_prop_types.default.func.isRequired, onMouseEnter: import_prop_types.default.func, onMouseMove: import_prop_types.default.func, onMouseLeave: import_prop_types.default.func, onClick: import_prop_types.default.func };
var Te = (0, import_react2.memo)(Se);
var we = function(e4) {
  var i3 = e4.points, r3 = e4.symbol, n3 = e4.size, o3 = e4.borderWidth, t5 = e4.enableLabel, a3 = e4.label, s3 = e4.labelYOffset, l2 = Et(), d = ji(a3), c = i3.slice(0).reverse().map(function(e6) {
    return { id: e6.id, x: e6.x, y: e6.y, datum: e6.data, fill: e6.color, stroke: e6.borderColor, label: t5 ? d(e6.data) : null };
  });
  return (0, import_jsx_runtime2.jsx)("g", { children: c.map(function(e6) {
    return (0, import_jsx_runtime2.jsx)(Wi, { x: e6.x, y: e6.y, datum: e6.datum, symbol: r3, size: n3, color: e6.fill, borderWidth: o3, borderColor: e6.stroke, label: e6.label, labelYOffset: s3, theme: l2 }, e6.id);
  }) });
};
we.propTypes = { points: import_prop_types.default.arrayOf(import_prop_types.default.object), symbol: import_prop_types.default.func, size: import_prop_types.default.number.isRequired, color: import_prop_types.default.func.isRequired, borderWidth: import_prop_types.default.number.isRequired, borderColor: import_prop_types.default.func.isRequired, enableLabel: import_prop_types.default.bool.isRequired, label: import_prop_types.default.oneOfType([import_prop_types.default.string, import_prop_types.default.func]).isRequired, labelYOffset: import_prop_types.default.number };
var ke = (0, import_react2.memo)(we);
var Be = function(e4) {
  var i3 = e4.points, r3 = e4.width, t5 = e4.height, a3 = e4.margin, s3 = e4.setCurrent, l2 = e4.onMouseEnter, u = e4.onMouseMove, d = e4.onMouseLeave, c = e4.onClick, f2 = e4.tooltip, p2 = e4.debug, h = k(), y2 = h.showTooltipAt, b2 = h.hideTooltip, g3 = (0, import_react2.useCallback)(function(e6, i4) {
    y2((0, import_react2.createElement)(f2, { point: e6 }), [e6.x + a3.left, e6.y + a3.top], "top"), s3(e6), l2 && l2(e6, i4);
  }, [s3, y2, f2, l2, a3]), m = (0, import_react2.useCallback)(function(e6, i4) {
    y2((0, import_react2.createElement)(f2, { point: e6 }), [e6.x + a3.left, e6.y + a3.top], "top"), s3(e6), u && u(e6, i4);
  }, [s3, y2, f2, u]), v2 = (0, import_react2.useCallback)(function(e6, i4) {
    b2(), s3(null), d && d(e6, i4);
  }, [b2, s3, d]), x3 = (0, import_react2.useCallback)(function(e6, i4) {
    c && c(e6, i4);
  }, [c]);
  return (0, import_jsx_runtime2.jsx)(O, { nodes: i3, width: r3, height: t5, onMouseEnter: g3, onMouseMove: m, onMouseLeave: v2, onClick: x3, debug: p2 });
};
Be.propTypes = { points: import_prop_types.default.arrayOf(import_prop_types.default.object).isRequired, width: import_prop_types.default.number.isRequired, height: import_prop_types.default.number.isRequired, margin: import_prop_types.default.object.isRequired, setCurrent: import_prop_types.default.func.isRequired, onMouseEnter: import_prop_types.default.func, onMouseMove: import_prop_types.default.func, onMouseLeave: import_prop_types.default.func, onClick: import_prop_types.default.func, tooltip: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]).isRequired, debug: import_prop_types.default.bool.isRequired };
var Le = (0, import_react2.memo)(Be);
var We2 = function(e4) {
  var i3 = e4.data, n3 = e4.xScale, o3 = e4.xFormat, a3 = e4.yScale, s3 = e4.yFormat, l2 = e4.layers, d = e4.curve, c = e4.areaBaselineValue, f2 = e4.colors, p2 = e4.margin, h = e4.width, y2 = e4.height, b2 = e4.axisTop, g3 = e4.axisRight, m = e4.axisBottom, v2 = e4.axisLeft, x3 = e4.enableGridX, C3 = e4.enableGridY, S = e4.gridXValues, T2 = e4.gridYValues, w3 = e4.lineWidth, k4 = e4.enableArea, L = e4.areaOpacity, P3 = e4.areaBlendMode, E2 = e4.enablePoints, j3 = e4.pointSymbol, V = e4.pointSize, Y = e4.pointColor, D3 = e4.pointBorderWidth, X3 = e4.pointBorderColor, z2 = e4.enablePointLabel, H2 = e4.pointLabel, I = e4.pointLabelYOffset, J = e4.defs, K3 = e4.fill, Q2 = e4.markers, U = e4.legends, Z = e4.isInteractive, $ = e4.useMesh, _ = e4.debugMesh, ee = e4.onMouseEnter, ie = e4.onMouseMove, ne2 = e4.onMouseLeave, oe2 = e4.onClick, te2 = e4.tooltip, ae2 = e4.enableSlices, se2 = e4.debugSlices, le2 = e4.sliceTooltip, ue2 = e4.enableCrosshair, de2 = e4.crosshairType, ce2 = e4.role, fe2 = Bt(h, y2, p2), pe2 = fe2.margin, he2 = fe2.innerWidth, ye2 = fe2.innerHeight, ge2 = fe2.outerWidth, me2 = fe2.outerHeight, xe2 = be({ data: i3, xScale: n3, xFormat: o3, yScale: a3, yFormat: s3, width: he2, height: ye2, colors: f2, curve: d, areaBaselineValue: c, pointColor: Y, pointBorderColor: X3, enableSlices: ae2 }), Re2 = xe2.legendData, qe2 = xe2.toggleSerie, Me2 = xe2.lineGenerator, Ce2 = xe2.areaGenerator, Se2 = xe2.series, we2 = xe2.xScale, Be2 = xe2.yScale, We3 = xe2.slices, Ge2 = xe2.points, Pe2 = Et(), Ee2 = We(Y, Pe2), je2 = We(X3, Pe2), Fe2 = (0, import_react2.useState)(null), Ve2 = Fe2[0], Ye = Fe2[1], De = (0, import_react2.useState)(null), Xe2 = De[0], ze = De[1], Ae = { grid: (0, import_jsx_runtime2.jsx)(z, { theme: Pe2, width: he2, height: ye2, xScale: x3 ? we2 : null, yScale: C3 ? Be2 : null, xValues: S, yValues: T2 }, "grid"), markers: (0, import_jsx_runtime2.jsx)(Ti, { markers: Q2, width: he2, height: ye2, xScale: we2, yScale: Be2, theme: Pe2 }, "markers"), axes: (0, import_jsx_runtime2.jsx)(X, { xScale: we2, yScale: Be2, width: he2, height: ye2, theme: Pe2, top: b2, right: g3, bottom: m, left: v2 }, "axes"), areas: null, lines: (0, import_jsx_runtime2.jsx)(Oe, { lines: Se2, lineGenerator: Me2, lineWidth: w3 }, "lines"), slices: null, points: null, crosshair: null, mesh: null, legends: U.map(function(e6, i4) {
    return (0, import_jsx_runtime2.jsx)(X2, re({}, e6, { containerWidth: he2, containerHeight: ye2, data: e6.data || Re2, theme: Pe2, toggleSerie: e6.toggleSerie ? qe2 : void 0 }), "legend." + i4);
  }) }, He = Hi(J, Se2, K3);
  return k4 && (Ae.areas = (0, import_jsx_runtime2.jsx)(ve, { areaGenerator: Ce2, areaOpacity: L, areaBlendMode: P3, lines: Se2 }, "areas")), Z && false !== ae2 && (Ae.slices = (0, import_jsx_runtime2.jsx)(Te, { slices: We3, axis: ae2, debug: se2, height: ye2, tooltip: le2, current: Xe2, setCurrent: ze, onMouseEnter: ee, onMouseMove: ie, onMouseLeave: ne2, onClick: oe2 }, "slices")), E2 && (Ae.points = (0, import_jsx_runtime2.jsx)(ke, { points: Ge2, symbol: j3, size: V, color: Ee2, borderWidth: D3, borderColor: je2, enableLabel: z2, label: H2, labelYOffset: I }, "points")), Z && ue2 && (null !== Ve2 && (Ae.crosshair = (0, import_jsx_runtime2.jsx)(P, { width: he2, height: ye2, x: Ve2.x, y: Ve2.y, type: de2 }, "crosshair")), null !== Xe2 && (Ae.crosshair = (0, import_jsx_runtime2.jsx)(P, { width: he2, height: ye2, x: Xe2.x, y: Xe2.y, type: ae2 }, "crosshair"))), Z && $ && false === ae2 && (Ae.mesh = (0, import_jsx_runtime2.jsx)(Le, { points: Ge2, width: he2, height: ye2, margin: pe2, current: Ve2, setCurrent: Ye, onMouseEnter: ee, onMouseMove: ie, onMouseLeave: ne2, onClick: oe2, tooltip: te2, debug: _ }, "mesh")), (0, import_jsx_runtime2.jsx)(_i, { defs: He, width: ge2, height: me2, margin: pe2, role: ce2, children: l2.map(function(i4, r3) {
    return "function" == typeof i4 ? (0, import_jsx_runtime2.jsx)(import_react2.Fragment, { children: i4(re({}, e4, { innerWidth: he2, innerHeight: ye2, series: Se2, slices: We3, points: Ge2, xScale: we2, yScale: Be2, lineGenerator: Me2, areaGenerator: Ce2, currentPoint: Ve2, setCurrentPoint: Ye, currentSlice: Xe2, setCurrentSlice: ze })) }, r3) : Ae[i4];
  }) });
};
We2.propTypes = le, We2.defaultProps = ce;
var Ge = Mi(We2);
var Pe = function(e4) {
  return (0, import_jsx_runtime2.jsx)(Jt, { children: function(i3) {
    var r3 = i3.width, n3 = i3.height;
    return (0, import_jsx_runtime2.jsx)(Ge, re({ width: r3, height: n3 }, e4));
  } });
};
var Ee = function(e4) {
  var i3 = e4.width, t5 = e4.height, a3 = e4.margin, d = e4.pixelRatio, c = e4.data, f2 = e4.xScale, p2 = e4.xFormat, h = e4.yScale, y2 = e4.yFormat, b2 = e4.curve, g3 = e4.layers, m = e4.colors, v2 = e4.lineWidth, x3 = e4.enableArea, q = e4.areaBaselineValue, O2 = e4.areaOpacity, M = e4.enablePoints, C3 = e4.pointSize, w3 = e4.pointColor, k4 = e4.pointBorderWidth, B2 = e4.pointBorderColor, L = e4.enableGridX, W = e4.gridXValues, G = e4.enableGridY, j3 = e4.gridYValues, F = e4.axisTop, Y = e4.axisRight, D3 = e4.axisBottom, X3 = e4.axisLeft, A2 = e4.legends, H2 = e4.isInteractive, I = e4.debugMesh, J = e4.onMouseLeave, K3 = e4.onClick, Q2 = e4.tooltip, U = e4.canvasRef, Z = (0, import_react2.useRef)(null), $ = Bt(i3, t5, a3), ne2 = $.margin, oe2 = $.innerWidth, te2 = $.innerHeight, ae2 = $.outerWidth, se2 = $.outerHeight, le2 = Et(), ue2 = (0, import_react2.useState)(null), de2 = ue2[0], ce2 = ue2[1], fe2 = be({ data: c, xScale: f2, xFormat: p2, yScale: h, yFormat: y2, width: oe2, height: te2, colors: m, curve: b2, areaBaselineValue: q, pointColor: w3, pointBorderColor: B2 }), pe2 = fe2.lineGenerator, he2 = fe2.areaGenerator, ye2 = fe2.series, ge2 = fe2.xScale, me2 = fe2.yScale, ve2 = fe2.points, xe2 = x2({ points: ve2, width: oe2, height: te2, debug: I }), Re2 = xe2.delaunay, qe2 = xe2.voronoi;
  (0, import_react2.useEffect)(function() {
    U && (U.current = Z.current), Z.current.width = ae2 * d, Z.current.height = se2 * d;
    var e6 = Z.current.getContext("2d");
    e6.scale(d, d), e6.fillStyle = le2.background, e6.fillRect(0, 0, ae2, se2), e6.translate(ne2.left, ne2.top), g3.forEach(function(i4) {
      if ("function" == typeof i4 && i4({ ctx: e6, innerWidth: oe2, innerHeight: te2, series: ye2, points: ve2, xScale: ge2, yScale: me2, lineWidth: v2, lineGenerator: pe2, areaGenerator: he2, currentPoint: de2, setCurrentPoint: ce2 }), "grid" === i4 && le2.grid.line.strokeWidth > 0 && (e6.lineWidth = le2.grid.line.strokeWidth, e6.strokeStyle = le2.grid.line.stroke, L && D(e6, { width: oe2, height: te2, scale: ge2, axis: "x", values: W }), G && D(e6, { width: oe2, height: te2, scale: me2, axis: "y", values: j3 })), "axes" === i4 && j(e6, { xScale: ge2, yScale: me2, width: oe2, height: te2, top: F, right: Y, bottom: D3, left: X3, theme: le2 }), "areas" === i4 && true === x3 && (e6.save(), e6.globalAlpha = O2, he2.context(e6), ye2.forEach(function(i5) {
        e6.fillStyle = i5.color, e6.beginPath(), he2(i5.data.map(function(e7) {
          return e7.position;
        })), e6.fill();
      }), e6.restore()), "lines" === i4 && (pe2.context(e6), ye2.forEach(function(i5) {
        e6.strokeStyle = i5.color, e6.lineWidth = v2, e6.beginPath(), pe2(i5.data.map(function(e7) {
          return e7.position;
        })), e6.stroke();
      })), "points" === i4 && true === M && C3 > 0 && ve2.forEach(function(i5) {
        e6.fillStyle = i5.color, e6.beginPath(), e6.arc(i5.x, i5.y, C3 / 2, 0, 2 * Math.PI), e6.fill(), k4 > 0 && (e6.strokeStyle = i5.borderColor, e6.lineWidth = k4, e6.stroke());
      }), "mesh" === i4 && true === I && (P2(e6, qe2), de2 && j2(e6, qe2, de2.index)), "legends" === i4) {
        var r3 = ye2.map(function(e7) {
          return { id: e7.id, label: e7.id, color: e7.color };
        }).reverse();
        A2.forEach(function(i5) {
          H(e6, re({}, i5, { data: i5.data || r3, containerWidth: oe2, containerHeight: te2, theme: le2 }));
        });
      }
    });
  }, [Z, ae2, se2, g3, le2, pe2, ye2, ge2, me2, L, W, G, j3, F, Y, D3, X3, A2, ve2, M, C3, de2]);
  var Oe2 = (0, import_react2.useCallback)(function(e6) {
    var i4 = Fi(Z.current, e6), r3 = i4[0], n3 = i4[1];
    if (!Ai(ne2.left, ne2.top, oe2, te2, r3, n3)) return null;
    var o3 = Re2.find(r3 - ne2.left, n3 - ne2.top);
    return ve2[o3];
  }, [Z, ne2, oe2, te2, Re2]), Me2 = k(), Ce2 = Me2.showTooltipFromEvent, Se2 = Me2.hideTooltip, Te2 = (0, import_react2.useCallback)(function(e6) {
    var i4 = Oe2(e6);
    ce2(i4), i4 ? Ce2((0, import_react2.createElement)(Q2, { point: i4 }), e6) : Se2();
  }, [Oe2, ce2, Ce2, Se2, Q2]), we2 = (0, import_react2.useCallback)(function(e6) {
    Se2(), ce2(null), de2 && J && J(de2, e6);
  }, [Se2, ce2, J]), ke2 = (0, import_react2.useCallback)(function(e6) {
    if (K3) {
      var i4 = Oe2(e6);
      i4 && K3(i4, e6);
    }
  }, [Oe2, K3]);
  return (0, import_jsx_runtime2.jsx)("canvas", { ref: Z, width: ae2 * d, height: se2 * d, style: { width: ae2, height: se2, cursor: H2 ? "auto" : "normal" }, onMouseEnter: H2 ? Te2 : void 0, onMouseMove: H2 ? Te2 : void 0, onMouseLeave: H2 ? we2 : void 0, onClick: H2 ? ke2 : void 0 });
};
Ee.propTypes = ue, Ee.defaultProps = fe;
var je = Mi(Ee);
var Fe = (0, import_react2.forwardRef)(function(e4, i3) {
  return (0, import_jsx_runtime2.jsx)(je, re({}, e4, { canvasRef: i3 }));
});
var Ve = (0, import_react2.forwardRef)(function(e4, i3) {
  return (0, import_jsx_runtime2.jsx)(Jt, { children: function(r3) {
    var n3 = r3.width, o3 = r3.height;
    return (0, import_jsx_runtime2.jsx)(Fe, re({ width: n3, height: o3 }, e4, { ref: i3 }));
  } });
});
export {
  Ge as Line,
  Fe as LineCanvas,
  fe as LineCanvasDefaultProps,
  ue as LineCanvasPropTypes,
  ce as LineDefaultProps,
  le as LinePropTypes,
  Pe as ResponsiveLine,
  Ve as ResponsiveLineCanvas,
  he as useAreaGenerator,
  be as useLine,
  pe as useLineGenerator,
  ye as useSlices
};
//# sourceMappingURL=@nivo_line.js.map
