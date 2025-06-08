import {
  Bt,
  Di,
  Dt,
  Et,
  Fi,
  Gi,
  H,
  Hi,
  Ht,
  Jt,
  We,
  X,
  Yi,
  Zr,
  _i,
  ai,
  animated,
  fi,
  k,
  li,
  ni,
  oi,
  pr,
  to,
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
  __toESM
} from "./chunk-EWTE5DHJ.js";

// node_modules/@nivo/pie/dist/nivo-pie.es.js
var import_react2 = __toESM(require_react());

// node_modules/@nivo/arcs/dist/nivo-arcs.es.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
var import_react = __toESM(require_react());

// node_modules/@nivo/arcs/node_modules/d3-path/src/path.js
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
  moveTo: function(x4, y3) {
    this._ += "M" + (this._x0 = this._x1 = +x4) + "," + (this._y0 = this._y1 = +y3);
  },
  closePath: function() {
    if (this._x1 !== null) {
      this._x1 = this._x0, this._y1 = this._y0;
      this._ += "Z";
    }
  },
  lineTo: function(x4, y3) {
    this._ += "L" + (this._x1 = +x4) + "," + (this._y1 = +y3);
  },
  quadraticCurveTo: function(x1, y1, x4, y3) {
    this._ += "Q" + +x1 + "," + +y1 + "," + (this._x1 = +x4) + "," + (this._y1 = +y3);
  },
  bezierCurveTo: function(x1, y1, x22, y22, x4, y3) {
    this._ += "C" + +x1 + "," + +y1 + "," + +x22 + "," + +y22 + "," + (this._x1 = +x4) + "," + (this._y1 = +y3);
  },
  arcTo: function(x1, y1, x22, y22, r2) {
    x1 = +x1, y1 = +y1, x22 = +x22, y22 = +y22, r2 = +r2;
    var x0 = this._x1, y0 = this._y1, x21 = x22 - x1, y21 = y22 - y1, x01 = x0 - x1, y01 = y0 - y1, l01_2 = x01 * x01 + y01 * y01;
    if (r2 < 0) throw new Error("negative radius: " + r2);
    if (this._x1 === null) {
      this._ += "M" + (this._x1 = x1) + "," + (this._y1 = y1);
    } else if (!(l01_2 > epsilon)) ;
    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r2) {
      this._ += "L" + (this._x1 = x1) + "," + (this._y1 = y1);
    } else {
      var x20 = x22 - x0, y20 = y22 - y0, l21_2 = x21 * x21 + y21 * y21, l20_2 = x20 * x20 + y20 * y20, l21 = Math.sqrt(l21_2), l01 = Math.sqrt(l01_2), l = r2 * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2), t01 = l / l01, t21 = l / l21;
      if (Math.abs(t01 - 1) > epsilon) {
        this._ += "L" + (x1 + t01 * x01) + "," + (y1 + t01 * y01);
      }
      this._ += "A" + r2 + "," + r2 + ",0,0," + +(y01 * x20 > x01 * y20) + "," + (this._x1 = x1 + t21 * x21) + "," + (this._y1 = y1 + t21 * y21);
    }
  },
  arc: function(x4, y3, r2, a0, a1, ccw) {
    x4 = +x4, y3 = +y3, r2 = +r2, ccw = !!ccw;
    var dx = r2 * Math.cos(a0), dy = r2 * Math.sin(a0), x0 = x4 + dx, y0 = y3 + dy, cw = 1 ^ ccw, da = ccw ? a0 - a1 : a1 - a0;
    if (r2 < 0) throw new Error("negative radius: " + r2);
    if (this._x1 === null) {
      this._ += "M" + x0 + "," + y0;
    } else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) {
      this._ += "L" + x0 + "," + y0;
    }
    if (!r2) return;
    if (da < 0) da = da % tau + tau;
    if (da > tauEpsilon) {
      this._ += "A" + r2 + "," + r2 + ",0,1," + cw + "," + (x4 - dx) + "," + (y3 - dy) + "A" + r2 + "," + r2 + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
    } else if (da > epsilon) {
      this._ += "A" + r2 + "," + r2 + ",0," + +(da >= pi) + "," + cw + "," + (this._x1 = x4 + r2 * Math.cos(a1)) + "," + (this._y1 = y3 + r2 * Math.sin(a1));
    }
  },
  rect: function(x4, y3, w3, h2) {
    this._ += "M" + (this._x0 = this._x1 = +x4) + "," + (this._y0 = this._y1 = +y3) + "h" + +w3 + "v" + +h2 + "h" + -w3 + "Z";
  },
  toString: function() {
    return this._;
  }
};
var path_default = path;

// node_modules/@nivo/arcs/node_modules/d3-shape/src/constant.js
function constant_default(x4) {
  return function constant() {
    return x4;
  };
}

// node_modules/@nivo/arcs/node_modules/d3-shape/src/math.js
var abs = Math.abs;
var atan2 = Math.atan2;
var cos = Math.cos;
var max = Math.max;
var min = Math.min;
var sin = Math.sin;
var sqrt = Math.sqrt;
var epsilon2 = 1e-12;
var pi2 = Math.PI;
var halfPi = pi2 / 2;
var tau2 = 2 * pi2;
function acos(x4) {
  return x4 > 1 ? 0 : x4 < -1 ? pi2 : Math.acos(x4);
}
function asin(x4) {
  return x4 >= 1 ? halfPi : x4 <= -1 ? -halfPi : Math.asin(x4);
}

// node_modules/@nivo/arcs/node_modules/d3-shape/src/arc.js
function arcInnerRadius(d) {
  return d.innerRadius;
}
function arcOuterRadius(d) {
  return d.outerRadius;
}
function arcStartAngle(d) {
  return d.startAngle;
}
function arcEndAngle(d) {
  return d.endAngle;
}
function arcPadAngle(d) {
  return d && d.padAngle;
}
function intersect(x0, y0, x1, y1, x22, y22, x32, y3) {
  var x10 = x1 - x0, y10 = y1 - y0, x322 = x32 - x22, y32 = y3 - y22, t2 = y32 * x10 - x322 * y10;
  if (t2 * t2 < epsilon2) return;
  t2 = (x322 * (y0 - y22) - y32 * (x0 - x22)) / t2;
  return [x0 + t2 * x10, y0 + t2 * y10];
}
function cornerTangents(x0, y0, x1, y1, r1, rc, cw) {
  var x01 = x0 - x1, y01 = y0 - y1, lo = (cw ? rc : -rc) / sqrt(x01 * x01 + y01 * y01), ox = lo * y01, oy = -lo * x01, x11 = x0 + ox, y11 = y0 + oy, x10 = x1 + ox, y10 = y1 + oy, x00 = (x11 + x10) / 2, y00 = (y11 + y10) / 2, dx = x10 - x11, dy = y10 - y11, d2 = dx * dx + dy * dy, r2 = r1 - rc, D2 = x11 * y10 - x10 * y11, d = (dy < 0 ? -1 : 1) * sqrt(max(0, r2 * r2 * d2 - D2 * D2)), cx0 = (D2 * dy - dx * d) / d2, cy0 = (-D2 * dx - dy * d) / d2, cx1 = (D2 * dy + dx * d) / d2, cy1 = (-D2 * dx + dy * d) / d2, dx0 = cx0 - x00, dy0 = cy0 - y00, dx1 = cx1 - x00, dy1 = cy1 - y00;
  if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1) cx0 = cx1, cy0 = cy1;
  return {
    cx: cx0,
    cy: cy0,
    x01: -ox,
    y01: -oy,
    x11: cx0 * (r1 / r2 - 1),
    y11: cy0 * (r1 / r2 - 1)
  };
}
function arc_default() {
  var innerRadius = arcInnerRadius, outerRadius = arcOuterRadius, cornerRadius = constant_default(0), padRadius = null, startAngle = arcStartAngle, endAngle = arcEndAngle, padAngle = arcPadAngle, context = null;
  function arc() {
    var buffer, r2, r0 = +innerRadius.apply(this, arguments), r1 = +outerRadius.apply(this, arguments), a0 = startAngle.apply(this, arguments) - halfPi, a1 = endAngle.apply(this, arguments) - halfPi, da = abs(a1 - a0), cw = a1 > a0;
    if (!context) context = buffer = path_default();
    if (r1 < r0) r2 = r1, r1 = r0, r0 = r2;
    if (!(r1 > epsilon2)) context.moveTo(0, 0);
    else if (da > tau2 - epsilon2) {
      context.moveTo(r1 * cos(a0), r1 * sin(a0));
      context.arc(0, 0, r1, a0, a1, !cw);
      if (r0 > epsilon2) {
        context.moveTo(r0 * cos(a1), r0 * sin(a1));
        context.arc(0, 0, r0, a1, a0, cw);
      }
    } else {
      var a01 = a0, a11 = a1, a00 = a0, a10 = a1, da0 = da, da1 = da, ap = padAngle.apply(this, arguments) / 2, rp = ap > epsilon2 && (padRadius ? +padRadius.apply(this, arguments) : sqrt(r0 * r0 + r1 * r1)), rc = min(abs(r1 - r0) / 2, +cornerRadius.apply(this, arguments)), rc0 = rc, rc1 = rc, t0, t1;
      if (rp > epsilon2) {
        var p0 = asin(rp / r0 * sin(ap)), p1 = asin(rp / r1 * sin(ap));
        if ((da0 -= p0 * 2) > epsilon2) p0 *= cw ? 1 : -1, a00 += p0, a10 -= p0;
        else da0 = 0, a00 = a10 = (a0 + a1) / 2;
        if ((da1 -= p1 * 2) > epsilon2) p1 *= cw ? 1 : -1, a01 += p1, a11 -= p1;
        else da1 = 0, a01 = a11 = (a0 + a1) / 2;
      }
      var x01 = r1 * cos(a01), y01 = r1 * sin(a01), x10 = r0 * cos(a10), y10 = r0 * sin(a10);
      if (rc > epsilon2) {
        var x11 = r1 * cos(a11), y11 = r1 * sin(a11), x00 = r0 * cos(a00), y00 = r0 * sin(a00), oc;
        if (da < pi2 && (oc = intersect(x01, y01, x00, y00, x11, y11, x10, y10))) {
          var ax = x01 - oc[0], ay = y01 - oc[1], bx = x11 - oc[0], by = y11 - oc[1], kc = 1 / sin(acos((ax * bx + ay * by) / (sqrt(ax * ax + ay * ay) * sqrt(bx * bx + by * by))) / 2), lc = sqrt(oc[0] * oc[0] + oc[1] * oc[1]);
          rc0 = min(rc, (r0 - lc) / (kc - 1));
          rc1 = min(rc, (r1 - lc) / (kc + 1));
        }
      }
      if (!(da1 > epsilon2)) context.moveTo(x01, y01);
      else if (rc1 > epsilon2) {
        t0 = cornerTangents(x00, y00, x01, y01, r1, rc1, cw);
        t1 = cornerTangents(x11, y11, x10, y10, r1, rc1, cw);
        context.moveTo(t0.cx + t0.x01, t0.cy + t0.y01);
        if (rc1 < rc) context.arc(t0.cx, t0.cy, rc1, atan2(t0.y01, t0.x01), atan2(t1.y01, t1.x01), !cw);
        else {
          context.arc(t0.cx, t0.cy, rc1, atan2(t0.y01, t0.x01), atan2(t0.y11, t0.x11), !cw);
          context.arc(0, 0, r1, atan2(t0.cy + t0.y11, t0.cx + t0.x11), atan2(t1.cy + t1.y11, t1.cx + t1.x11), !cw);
          context.arc(t1.cx, t1.cy, rc1, atan2(t1.y11, t1.x11), atan2(t1.y01, t1.x01), !cw);
        }
      } else context.moveTo(x01, y01), context.arc(0, 0, r1, a01, a11, !cw);
      if (!(r0 > epsilon2) || !(da0 > epsilon2)) context.lineTo(x10, y10);
      else if (rc0 > epsilon2) {
        t0 = cornerTangents(x10, y10, x11, y11, r0, -rc0, cw);
        t1 = cornerTangents(x01, y01, x00, y00, r0, -rc0, cw);
        context.lineTo(t0.cx + t0.x01, t0.cy + t0.y01);
        if (rc0 < rc) context.arc(t0.cx, t0.cy, rc0, atan2(t0.y01, t0.x01), atan2(t1.y01, t1.x01), !cw);
        else {
          context.arc(t0.cx, t0.cy, rc0, atan2(t0.y01, t0.x01), atan2(t0.y11, t0.x11), !cw);
          context.arc(0, 0, r0, atan2(t0.cy + t0.y11, t0.cx + t0.x11), atan2(t1.cy + t1.y11, t1.cx + t1.x11), cw);
          context.arc(t1.cx, t1.cy, rc0, atan2(t1.y11, t1.x11), atan2(t1.y01, t1.x01), !cw);
        }
      } else context.arc(0, 0, r0, a10, a00, cw);
    }
    context.closePath();
    if (buffer) return context = null, buffer + "" || null;
  }
  arc.centroid = function() {
    var r2 = (+innerRadius.apply(this, arguments) + +outerRadius.apply(this, arguments)) / 2, a4 = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - pi2 / 2;
    return [cos(a4) * r2, sin(a4) * r2];
  };
  arc.innerRadius = function(_2) {
    return arguments.length ? (innerRadius = typeof _2 === "function" ? _2 : constant_default(+_2), arc) : innerRadius;
  };
  arc.outerRadius = function(_2) {
    return arguments.length ? (outerRadius = typeof _2 === "function" ? _2 : constant_default(+_2), arc) : outerRadius;
  };
  arc.cornerRadius = function(_2) {
    return arguments.length ? (cornerRadius = typeof _2 === "function" ? _2 : constant_default(+_2), arc) : cornerRadius;
  };
  arc.padRadius = function(_2) {
    return arguments.length ? (padRadius = _2 == null ? null : typeof _2 === "function" ? _2 : constant_default(+_2), arc) : padRadius;
  };
  arc.startAngle = function(_2) {
    return arguments.length ? (startAngle = typeof _2 === "function" ? _2 : constant_default(+_2), arc) : startAngle;
  };
  arc.endAngle = function(_2) {
    return arguments.length ? (endAngle = typeof _2 === "function" ? _2 : constant_default(+_2), arc) : endAngle;
  };
  arc.padAngle = function(_2) {
    return arguments.length ? (padAngle = typeof _2 === "function" ? _2 : constant_default(+_2), arc) : padAngle;
  };
  arc.context = function(_2) {
    return arguments.length ? (context = _2 == null ? null : _2, arc) : context;
  };
  return arc;
}

// node_modules/@nivo/arcs/node_modules/d3-shape/src/curve/linear.js
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
  point: function(x4, y3) {
    x4 = +x4, y3 = +y3;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x4, y3) : this._context.moveTo(x4, y3);
        break;
      case 1:
        this._point = 2;
      // proceed
      default:
        this._context.lineTo(x4, y3);
        break;
    }
  }
};
function linear_default(context) {
  return new Linear(context);
}

// node_modules/@nivo/arcs/node_modules/d3-shape/src/point.js
function x(p2) {
  return p2[0];
}
function y(p2) {
  return p2[1];
}

// node_modules/@nivo/arcs/node_modules/d3-shape/src/line.js
function line_default() {
  var x4 = x, y3 = y, defined = constant_default(true), context = null, curve = linear_default, output = null;
  function line(data) {
    var i2, n2 = data.length, d, defined0 = false, buffer;
    if (context == null) output = curve(buffer = path_default());
    for (i2 = 0; i2 <= n2; ++i2) {
      if (!(i2 < n2 && defined(d = data[i2], i2, data)) === defined0) {
        if (defined0 = !defined0) output.lineStart();
        else output.lineEnd();
      }
      if (defined0) output.point(+x4(d, i2, data), +y3(d, i2, data));
    }
    if (buffer) return output = null, buffer + "" || null;
  }
  line.x = function(_2) {
    return arguments.length ? (x4 = typeof _2 === "function" ? _2 : constant_default(+_2), line) : x4;
  };
  line.y = function(_2) {
    return arguments.length ? (y3 = typeof _2 === "function" ? _2 : constant_default(+_2), line) : y3;
  };
  line.defined = function(_2) {
    return arguments.length ? (defined = typeof _2 === "function" ? _2 : constant_default(!!_2), line) : defined;
  };
  line.curve = function(_2) {
    return arguments.length ? (curve = _2, context != null && (output = curve(context)), line) : curve;
  };
  line.context = function(_2) {
    return arguments.length ? (_2 == null ? context = output = null : output = curve(context = _2), line) : context;
  };
  return line;
}

// node_modules/@nivo/arcs/node_modules/d3-shape/src/curve/radial.js
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
  point: function(a4, r2) {
    this._curve.point(r2 * Math.sin(a4), r2 * -Math.cos(a4));
  }
};
function curveRadial(curve) {
  function radial(context) {
    return new Radial(curve(context));
  }
  radial._curve = curve;
  return radial;
}

// node_modules/@nivo/arcs/node_modules/d3-shape/src/array.js
var slice = Array.prototype.slice;

// node_modules/@nivo/arcs/node_modules/d3-shape/src/symbol/diamond.js
var tan30 = Math.sqrt(1 / 3);
var tan30_2 = tan30 * 2;

// node_modules/@nivo/arcs/node_modules/d3-shape/src/symbol/star.js
var kr = Math.sin(pi2 / 10) / Math.sin(7 * pi2 / 10);
var kx = Math.sin(tau2 / 10) * kr;
var ky = -Math.cos(tau2 / 10) * kr;

// node_modules/@nivo/arcs/node_modules/d3-shape/src/symbol/triangle.js
var sqrt3 = Math.sqrt(3);

// node_modules/@nivo/arcs/node_modules/d3-shape/src/symbol/wye.js
var s = Math.sqrt(3) / 2;
var k2 = 1 / Math.sqrt(12);
var a = (k2 / 2 + 1) * 3;

// node_modules/@nivo/arcs/node_modules/d3-shape/src/noop.js
function noop_default() {
}

// node_modules/@nivo/arcs/node_modules/d3-shape/src/curve/basis.js
function point(that, x4, y3) {
  that._context.bezierCurveTo(
    (2 * that._x0 + that._x1) / 3,
    (2 * that._y0 + that._y1) / 3,
    (that._x0 + 2 * that._x1) / 3,
    (that._y0 + 2 * that._y1) / 3,
    (that._x0 + 4 * that._x1 + x4) / 6,
    (that._y0 + 4 * that._y1 + y3) / 6
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
  point: function(x4, y3) {
    x4 = +x4, y3 = +y3;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x4, y3) : this._context.moveTo(x4, y3);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
      // proceed
      default:
        point(this, x4, y3);
        break;
    }
    this._x0 = this._x1, this._x1 = x4;
    this._y0 = this._y1, this._y1 = y3;
  }
};

// node_modules/@nivo/arcs/node_modules/d3-shape/src/curve/basisClosed.js
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
  point: function(x4, y3) {
    x4 = +x4, y3 = +y3;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._x2 = x4, this._y2 = y3;
        break;
      case 1:
        this._point = 2;
        this._x3 = x4, this._y3 = y3;
        break;
      case 2:
        this._point = 3;
        this._x4 = x4, this._y4 = y3;
        this._context.moveTo((this._x0 + 4 * this._x1 + x4) / 6, (this._y0 + 4 * this._y1 + y3) / 6);
        break;
      default:
        point(this, x4, y3);
        break;
    }
    this._x0 = this._x1, this._x1 = x4;
    this._y0 = this._y1, this._y1 = y3;
  }
};

// node_modules/@nivo/arcs/node_modules/d3-shape/src/curve/basisOpen.js
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
  point: function(x4, y3) {
    x4 = +x4, y3 = +y3;
    switch (this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        var x0 = (this._x0 + 4 * this._x1 + x4) / 6, y0 = (this._y0 + 4 * this._y1 + y3) / 6;
        this._line ? this._context.lineTo(x0, y0) : this._context.moveTo(x0, y0);
        break;
      case 3:
        this._point = 4;
      // proceed
      default:
        point(this, x4, y3);
        break;
    }
    this._x0 = this._x1, this._x1 = x4;
    this._y0 = this._y1, this._y1 = y3;
  }
};

// node_modules/@nivo/arcs/node_modules/d3-shape/src/curve/bundle.js
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
    var x4 = this._x, y3 = this._y, j3 = x4.length - 1;
    if (j3 > 0) {
      var x0 = x4[0], y0 = y3[0], dx = x4[j3] - x0, dy = y3[j3] - y0, i2 = -1, t2;
      while (++i2 <= j3) {
        t2 = i2 / j3;
        this._basis.point(
          this._beta * x4[i2] + (1 - this._beta) * (x0 + t2 * dx),
          this._beta * y3[i2] + (1 - this._beta) * (y0 + t2 * dy)
        );
      }
    }
    this._x = this._y = null;
    this._basis.lineEnd();
  },
  point: function(x4, y3) {
    this._x.push(+x4);
    this._y.push(+y3);
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

// node_modules/@nivo/arcs/node_modules/d3-shape/src/curve/cardinal.js
function point2(that, x4, y3) {
  that._context.bezierCurveTo(
    that._x1 + that._k * (that._x2 - that._x0),
    that._y1 + that._k * (that._y2 - that._y0),
    that._x2 + that._k * (that._x1 - x4),
    that._y2 + that._k * (that._y1 - y3),
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
  point: function(x4, y3) {
    x4 = +x4, y3 = +y3;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x4, y3) : this._context.moveTo(x4, y3);
        break;
      case 1:
        this._point = 2;
        this._x1 = x4, this._y1 = y3;
        break;
      case 2:
        this._point = 3;
      // proceed
      default:
        point2(this, x4, y3);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x4;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y3;
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

// node_modules/@nivo/arcs/node_modules/d3-shape/src/curve/cardinalClosed.js
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
  point: function(x4, y3) {
    x4 = +x4, y3 = +y3;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._x3 = x4, this._y3 = y3;
        break;
      case 1:
        this._point = 2;
        this._context.moveTo(this._x4 = x4, this._y4 = y3);
        break;
      case 2:
        this._point = 3;
        this._x5 = x4, this._y5 = y3;
        break;
      default:
        point2(this, x4, y3);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x4;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y3;
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

// node_modules/@nivo/arcs/node_modules/d3-shape/src/curve/cardinalOpen.js
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
  point: function(x4, y3) {
    x4 = +x4, y3 = +y3;
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
        point2(this, x4, y3);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x4;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y3;
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

// node_modules/@nivo/arcs/node_modules/d3-shape/src/curve/catmullRom.js
function point3(that, x4, y3) {
  var x1 = that._x1, y1 = that._y1, x22 = that._x2, y22 = that._y2;
  if (that._l01_a > epsilon2) {
    var a4 = 2 * that._l01_2a + 3 * that._l01_a * that._l12_a + that._l12_2a, n2 = 3 * that._l01_a * (that._l01_a + that._l12_a);
    x1 = (x1 * a4 - that._x0 * that._l12_2a + that._x2 * that._l01_2a) / n2;
    y1 = (y1 * a4 - that._y0 * that._l12_2a + that._y2 * that._l01_2a) / n2;
  }
  if (that._l23_a > epsilon2) {
    var b2 = 2 * that._l23_2a + 3 * that._l23_a * that._l12_a + that._l12_2a, m = 3 * that._l23_a * (that._l23_a + that._l12_a);
    x22 = (x22 * b2 + that._x1 * that._l23_2a - x4 * that._l12_2a) / m;
    y22 = (y22 * b2 + that._y1 * that._l23_2a - y3 * that._l12_2a) / m;
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
  point: function(x4, y3) {
    x4 = +x4, y3 = +y3;
    if (this._point) {
      var x23 = this._x2 - x4, y23 = this._y2 - y3;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x4, y3) : this._context.moveTo(x4, y3);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
      // proceed
      default:
        point3(this, x4, y3);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x4;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y3;
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

// node_modules/@nivo/arcs/node_modules/d3-shape/src/curve/catmullRomClosed.js
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
  point: function(x4, y3) {
    x4 = +x4, y3 = +y3;
    if (this._point) {
      var x23 = this._x2 - x4, y23 = this._y2 - y3;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1;
        this._x3 = x4, this._y3 = y3;
        break;
      case 1:
        this._point = 2;
        this._context.moveTo(this._x4 = x4, this._y4 = y3);
        break;
      case 2:
        this._point = 3;
        this._x5 = x4, this._y5 = y3;
        break;
      default:
        point3(this, x4, y3);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x4;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y3;
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

// node_modules/@nivo/arcs/node_modules/d3-shape/src/curve/catmullRomOpen.js
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
  point: function(x4, y3) {
    x4 = +x4, y3 = +y3;
    if (this._point) {
      var x23 = this._x2 - x4, y23 = this._y2 - y3;
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
        point3(this, x4, y3);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x4;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y3;
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

// node_modules/@nivo/arcs/node_modules/d3-shape/src/curve/linearClosed.js
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
  point: function(x4, y3) {
    x4 = +x4, y3 = +y3;
    if (this._point) this._context.lineTo(x4, y3);
    else this._point = 1, this._context.moveTo(x4, y3);
  }
};

// node_modules/@nivo/arcs/node_modules/d3-shape/src/curve/monotone.js
function sign(x4) {
  return x4 < 0 ? -1 : 1;
}
function slope3(that, x22, y22) {
  var h0 = that._x1 - that._x0, h1 = x22 - that._x1, s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0), s1 = (y22 - that._y1) / (h1 || h0 < 0 && -0), p2 = (s0 * h1 + s1 * h0) / (h0 + h1);
  return (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p2)) || 0;
}
function slope2(that, t2) {
  var h2 = that._x1 - that._x0;
  return h2 ? (3 * (that._y1 - that._y0) / h2 - t2) / 2 : t2;
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
  point: function(x4, y3) {
    var t1 = NaN;
    x4 = +x4, y3 = +y3;
    if (x4 === this._x1 && y3 === this._y1) return;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x4, y3) : this._context.moveTo(x4, y3);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        point4(this, slope2(this, t1 = slope3(this, x4, y3)), t1);
        break;
      default:
        point4(this, this._t0, t1 = slope3(this, x4, y3));
        break;
    }
    this._x0 = this._x1, this._x1 = x4;
    this._y0 = this._y1, this._y1 = y3;
    this._t0 = t1;
  }
};
function MonotoneY(context) {
  this._context = new ReflectContext(context);
}
(MonotoneY.prototype = Object.create(MonotoneX.prototype)).point = function(x4, y3) {
  MonotoneX.prototype.point.call(this, y3, x4);
};
function ReflectContext(context) {
  this._context = context;
}
ReflectContext.prototype = {
  moveTo: function(x4, y3) {
    this._context.moveTo(y3, x4);
  },
  closePath: function() {
    this._context.closePath();
  },
  lineTo: function(x4, y3) {
    this._context.lineTo(y3, x4);
  },
  bezierCurveTo: function(x1, y1, x22, y22, x4, y3) {
    this._context.bezierCurveTo(y1, x1, y22, x22, y3, x4);
  }
};

// node_modules/@nivo/arcs/node_modules/d3-shape/src/curve/natural.js
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
    var x4 = this._x, y3 = this._y, n2 = x4.length;
    if (n2) {
      this._line ? this._context.lineTo(x4[0], y3[0]) : this._context.moveTo(x4[0], y3[0]);
      if (n2 === 2) {
        this._context.lineTo(x4[1], y3[1]);
      } else {
        var px = controlPoints(x4), py = controlPoints(y3);
        for (var i0 = 0, i1 = 1; i1 < n2; ++i0, ++i1) {
          this._context.bezierCurveTo(px[0][i0], py[0][i0], px[1][i0], py[1][i0], x4[i1], y3[i1]);
        }
      }
    }
    if (this._line || this._line !== 0 && n2 === 1) this._context.closePath();
    this._line = 1 - this._line;
    this._x = this._y = null;
  },
  point: function(x4, y3) {
    this._x.push(+x4);
    this._y.push(+y3);
  }
};
function controlPoints(x4) {
  var i2, n2 = x4.length - 1, m, a4 = new Array(n2), b2 = new Array(n2), r2 = new Array(n2);
  a4[0] = 0, b2[0] = 2, r2[0] = x4[0] + 2 * x4[1];
  for (i2 = 1; i2 < n2 - 1; ++i2) a4[i2] = 1, b2[i2] = 4, r2[i2] = 4 * x4[i2] + 2 * x4[i2 + 1];
  a4[n2 - 1] = 2, b2[n2 - 1] = 7, r2[n2 - 1] = 8 * x4[n2 - 1] + x4[n2];
  for (i2 = 1; i2 < n2; ++i2) m = a4[i2] / b2[i2 - 1], b2[i2] -= m, r2[i2] -= m * r2[i2 - 1];
  a4[n2 - 1] = r2[n2 - 1] / b2[n2 - 1];
  for (i2 = n2 - 2; i2 >= 0; --i2) a4[i2] = (r2[i2] - a4[i2 + 1]) / b2[i2];
  b2[n2 - 1] = (x4[n2] + a4[n2 - 1]) / 2;
  for (i2 = 0; i2 < n2 - 1; ++i2) b2[i2] = 2 * x4[i2 + 1] - a4[i2 + 1];
  return [a4, b2];
}

// node_modules/@nivo/arcs/node_modules/d3-shape/src/curve/step.js
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
  point: function(x4, y3) {
    x4 = +x4, y3 = +y3;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x4, y3) : this._context.moveTo(x4, y3);
        break;
      case 1:
        this._point = 2;
      // proceed
      default: {
        if (this._t <= 0) {
          this._context.lineTo(this._x, y3);
          this._context.lineTo(x4, y3);
        } else {
          var x1 = this._x * (1 - this._t) + x4 * this._t;
          this._context.lineTo(x1, this._y);
          this._context.lineTo(x1, y3);
        }
        break;
      }
    }
    this._x = x4, this._y = y3;
  }
};

// node_modules/@nivo/arcs/dist/nivo-arcs.es.js
function M() {
  return M = Object.assign ? Object.assign.bind() : function(t2) {
    for (var n2 = 1; n2 < arguments.length; n2++) {
      var e2 = arguments[n2];
      for (var r2 in e2) Object.prototype.hasOwnProperty.call(e2, r2) && (t2[r2] = e2[r2]);
    }
    return t2;
  }, M.apply(this, arguments);
}
var k3 = { pointerEvents: "none" };
var b = function(n2) {
  var e2 = n2.label, r2 = n2.style, a4 = Et();
  return (0, import_jsx_runtime.jsx)(animated.g, { transform: r2.transform, opacity: r2.progress, style: k3, children: (0, import_jsx_runtime.jsx)(animated.text, { textAnchor: "middle", dominantBaseline: "central", style: M({}, a4.labels.text, { fill: r2.textColor }), children: e2 }) });
};
var C = function(t2) {
  var n2 = t2 % (2 * Math.PI);
  return n2 < 0 && (n2 += 2 * Math.PI), n2;
};
var L = function(t2, n2) {
  return t2.filter(function(t3) {
    return Math.abs(oi(t3.arc.endAngle - t3.arc.startAngle)) >= n2;
  });
};
var E = { startAngle: { enter: function(t2) {
  return M({}, t2, { endAngle: t2.startAngle });
}, update: function(t2) {
  return t2;
}, leave: function(t2) {
  return M({}, t2, { startAngle: t2.endAngle });
} }, middleAngle: { enter: function(t2) {
  var n2 = t2.startAngle + (t2.endAngle - t2.startAngle) / 2;
  return M({}, t2, { startAngle: n2, endAngle: n2 });
}, update: function(t2) {
  return t2;
}, leave: function(t2) {
  var n2 = t2.startAngle + (t2.endAngle - t2.startAngle) / 2;
  return M({}, t2, { startAngle: n2, endAngle: n2 });
} }, endAngle: { enter: function(t2) {
  return M({}, t2, { startAngle: t2.endAngle });
}, update: function(t2) {
  return t2;
}, leave: function(t2) {
  return M({}, t2, { endAngle: t2.startAngle });
} }, innerRadius: { enter: function(t2) {
  return M({}, t2, { outerRadius: t2.innerRadius });
}, update: function(t2) {
  return t2;
}, leave: function(t2) {
  return M({}, t2, { innerRadius: t2.outerRadius });
} }, centerRadius: { enter: function(t2) {
  var n2 = t2.innerRadius + (t2.outerRadius - t2.innerRadius) / 2;
  return M({}, t2, { innerRadius: n2, outerRadius: n2 });
}, update: function(t2) {
  return t2;
}, leave: function(t2) {
  var n2 = t2.innerRadius + (t2.outerRadius - t2.innerRadius) / 2;
  return M({}, t2, { innerRadius: n2, outerRadius: n2 });
} }, outerRadius: { enter: function(t2) {
  return M({}, t2, { innerRadius: t2.outerRadius });
}, update: function(t2) {
  return t2;
}, leave: function(t2) {
  return M({}, t2, { outerRadius: t2.innerRadius });
} }, pushIn: { enter: function(t2) {
  return M({}, t2, { innerRadius: t2.innerRadius - t2.outerRadius + t2.innerRadius, outerRadius: t2.innerRadius });
}, update: function(t2) {
  return t2;
}, leave: function(t2) {
  return M({}, t2, { innerRadius: t2.outerRadius, outerRadius: t2.outerRadius + t2.outerRadius - t2.innerRadius });
} }, pushOut: { enter: function(t2) {
  return M({}, t2, { innerRadius: t2.outerRadius, outerRadius: t2.outerRadius + t2.outerRadius - t2.innerRadius });
}, update: function(t2) {
  return t2;
}, leave: function(t2) {
  return M({}, t2, { innerRadius: t2.innerRadius - t2.outerRadius + t2.innerRadius, outerRadius: t2.innerRadius });
} } };
var I = function(t2, n2) {
  return (0, import_react.useMemo)(function() {
    var e2 = E[t2];
    return { enter: function(t3) {
      return M({ progress: 0 }, e2.enter(t3.arc), n2 ? n2.enter(t3) : {});
    }, update: function(t3) {
      return M({ progress: 1 }, e2.update(t3.arc), n2 ? n2.update(t3) : {});
    }, leave: function(t3) {
      return M({ progress: 0 }, e2.leave(t3.arc), n2 ? n2.leave(t3) : {});
    } };
  }, [t2, n2]);
};
var T = function(t2, n2) {
  var e2 = ai(t2) - Math.PI / 2, r2 = t2.innerRadius + (t2.outerRadius - t2.innerRadius) * n2;
  return li(e2, r2);
};
var j = function(t2) {
  return function(e2, r2, i2, a4) {
    return to([e2, r2, i2, a4], function(n2, e3, r3, i3) {
      var a5 = T({ startAngle: n2, endAngle: e3, innerRadius: r3, outerRadius: i3 }, t2);
      return "translate(" + a5.x + "," + a5.y + ")";
    });
  };
};
var W = function(t2, n2, r2, i2) {
  void 0 === n2 && (n2 = 0.5), void 0 === r2 && (r2 = "innerRadius");
  var a4 = Zr(), o2 = a4.animate, u = a4.config, l = I(r2, i2);
  return { transition: useTransition(t2, { keys: function(t3) {
    return t3.id;
  }, initial: l.update, from: l.enter, enter: l.update, update: l.update, leave: l.leave, config: u, immediate: !o2 }), interpolate: j(n2) };
};
var S = function(t2) {
  var n2 = t2.data, e2 = t2.offset, r2 = void 0 === e2 ? 0.5 : e2, i2 = t2.skipAngle, a4 = void 0 === i2 ? 0 : i2, o2 = t2.computeExtraProps, u = void 0 === o2 ? function() {
    return {};
  } : o2;
  return (0, import_react.useMemo)(function() {
    return L(n2, a4).map(function(t3) {
      var n3 = T(t3.arc, r2);
      return M({}, u(t3), { x: n3.x, y: n3.y, data: t3 });
    });
  }, [n2, r2, a4, u]);
};
var B = function(t2) {
  var n2 = t2.center, e2 = t2.data, r2 = t2.transitionMode, o2 = t2.label, u = t2.radiusOffset, l = t2.skipAngle, s3 = t2.textColor, f = t2.component, c = void 0 === f ? b : f, g = Gi(o2), h2 = Et(), x4 = We(s3, h2), m = (0, import_react.useMemo)(function() {
    return e2.filter(function(t3) {
      return Math.abs(oi(t3.arc.endAngle - t3.arc.startAngle)) >= l;
    });
  }, [e2, l]), y3 = W(m, u, r2), k5 = y3.transition, C2 = y3.interpolate, L2 = c;
  return (0, import_jsx_runtime.jsx)("g", { transform: "translate(" + n2[0] + "," + n2[1] + ")", children: k5(function(t3, n3) {
    return (0, import_react.createElement)(L2, { key: n3.id, datum: n3, label: g(n3), style: M({}, t3, { transform: C2(t3.startAngle, t3.endAngle, t3.innerRadius, t3.outerRadius), textColor: x4(n3) }) });
  }) });
};
var w2 = function(t2, n2, e2) {
  t2.textAlign = "center", t2.textBaseline = "middle", t2.font = e2.labels.text.fontSize + "px " + e2.labels.text.fontFamily, n2.forEach(function(n3) {
    t2.fillStyle = n3.textColor, t2.fillText("" + n3.label, n3.x, n3.y);
  });
};
var z = function(t2) {
  var n2 = t2.data, e2 = t2.offset, r2 = t2.skipAngle, a4 = t2.label, o2 = t2.textColor, u = Gi(a4), l = Et(), s3 = We(o2, l), f = (0, import_react.useCallback)(function(t3) {
    return { label: u(t3), textColor: s3(t3) };
  }, [u, s3]);
  return S({ data: n2, offset: e2, skipAngle: r2, computeExtraProps: f });
};
var G = function(n2) {
  var e2 = n2.label, r2 = n2.style, a4 = Et();
  return (0, import_jsx_runtime.jsxs)(animated.g, { opacity: r2.opacity, children: [(0, import_jsx_runtime.jsx)(animated.path, { fill: "none", stroke: r2.linkColor, strokeWidth: r2.thickness, d: r2.path }), (0, import_jsx_runtime.jsx)(animated.text, { transform: r2.textPosition, textAnchor: r2.textAnchor, dominantBaseline: "central", style: M({}, a4.labels.text, { fill: r2.textColor }), children: e2 })] });
};
var q = function(t2) {
  var n2 = C(t2.startAngle + (t2.endAngle - t2.startAngle) / 2 - Math.PI / 2);
  return n2 < Math.PI / 2 || n2 > 1.5 * Math.PI ? "start" : "end";
};
var D = function(t2, n2, e2, r2) {
  var i2, a4, u = C(t2.startAngle + (t2.endAngle - t2.startAngle) / 2 - Math.PI / 2), l = li(u, t2.outerRadius + n2), s3 = li(u, t2.outerRadius + n2 + e2);
  return u < Math.PI / 2 || u > 1.5 * Math.PI ? (i2 = "after", a4 = { x: s3.x + r2, y: s3.y }) : (i2 = "before", a4 = { x: s3.x - r2, y: s3.y }), { side: i2, points: [l, s3, a4] };
};
var H2 = line_default().x(function(t2) {
  return t2.x;
}).y(function(t2) {
  return t2.y;
});
var J = function(t2, e2, r2, i2, a4, o2, u) {
  return to([t2, e2, r2, i2, a4, o2, u], function(t3, n2, e3, r3, i3, a5, o3) {
    var u2 = D({ startAngle: t3, endAngle: n2, innerRadius: e3, outerRadius: r3 }, i3, a5, o3).points;
    return H2(u2);
  });
};
var K = function(t2, e2, r2, i2) {
  return to([t2, e2, r2, i2], function(t3, n2, e3, r3) {
    return q({ startAngle: t3, endAngle: n2, innerRadius: e3, outerRadius: r3 });
  });
};
var N = function(t2, e2, r2, i2, a4, o2, u, l) {
  return to([t2, e2, r2, i2, a4, o2, u, l], function(t3, n2, e3, r3, i3, a5, o3, u2) {
    var l2 = D({ startAngle: t3, endAngle: n2, innerRadius: e3, outerRadius: r3 }, i3, a5, o3), s3 = l2.points, d = l2.side, f = s3[2];
    return "before" === d ? f.x -= u2 : f.x += u2, "translate(" + f.x + "," + f.y + ")";
  });
};
var Q = function(t2) {
  var n2 = t2.data, r2 = t2.offset, a4 = void 0 === r2 ? 0 : r2, o2 = t2.diagonalLength, u = t2.straightLength, l = t2.skipAngle, d = void 0 === l ? 0 : l, f = t2.textOffset, c = t2.linkColor, g = t2.textColor, p2 = Zr(), h2 = p2.animate, A2 = p2.config, x4 = Et(), m = We(c, x4), y3 = We(g, x4), M2 = function(t3, n3) {
    return (0, import_react.useMemo)(function() {
      return L(t3, n3);
    }, [t3, n3]);
  }(n2, d), k5 = function(t3) {
    var n3 = t3.offset, e2 = t3.diagonalLength, r3 = t3.straightLength, i2 = t3.textOffset, a5 = t3.getLinkColor, o3 = t3.getTextColor;
    return (0, import_react.useMemo)(function() {
      return { enter: function(t4) {
        return { startAngle: t4.arc.startAngle, endAngle: t4.arc.endAngle, innerRadius: t4.arc.innerRadius, outerRadius: t4.arc.outerRadius, offset: n3, diagonalLength: 0, straightLength: 0, textOffset: i2, linkColor: a5(t4), textColor: o3(t4), opacity: 0 };
      }, update: function(t4) {
        return { startAngle: t4.arc.startAngle, endAngle: t4.arc.endAngle, innerRadius: t4.arc.innerRadius, outerRadius: t4.arc.outerRadius, offset: n3, diagonalLength: e2, straightLength: r3, textOffset: i2, linkColor: a5(t4), textColor: o3(t4), opacity: 1 };
      }, leave: function(t4) {
        return { startAngle: t4.arc.startAngle, endAngle: t4.arc.endAngle, innerRadius: t4.arc.innerRadius, outerRadius: t4.arc.outerRadius, offset: n3, diagonalLength: 0, straightLength: 0, textOffset: i2, linkColor: a5(t4), textColor: o3(t4), opacity: 0 };
      } };
    }, [e2, r3, i2, a5, o3, n3]);
  }({ offset: a4, diagonalLength: o2, straightLength: u, textOffset: f, getLinkColor: m, getTextColor: y3 });
  return { transition: useTransition(M2, { keys: function(t3) {
    return t3.id;
  }, initial: k5.update, from: k5.enter, enter: k5.update, update: k5.update, leave: k5.leave, config: A2, immediate: !h2 }), interpolateLink: J, interpolateTextAnchor: K, interpolateTextPosition: N };
};
var U = function(t2) {
  var n2 = t2.center, e2 = t2.data, r2 = t2.label, i2 = t2.skipAngle, a4 = t2.offset, o2 = t2.diagonalLength, u = t2.straightLength, l = t2.strokeWidth, s3 = t2.textOffset, f = t2.textColor, c = t2.linkColor, g = t2.component, h2 = void 0 === g ? G : g, v2 = Gi(r2), x4 = Q({ data: e2, skipAngle: i2, offset: a4, diagonalLength: o2, straightLength: u, textOffset: s3, linkColor: c, textColor: f }), R = x4.transition, m = x4.interpolateLink, y3 = x4.interpolateTextAnchor, k5 = x4.interpolateTextPosition, b2 = h2;
  return (0, import_jsx_runtime.jsx)("g", { transform: "translate(" + n2[0] + "," + n2[1] + ")", children: R(function(t3, n3) {
    return (0, import_react.createElement)(b2, { key: n3.id, datum: n3, label: v2(n3), style: M({}, t3, { thickness: l, path: m(t3.startAngle, t3.endAngle, t3.innerRadius, t3.outerRadius, t3.offset, t3.diagonalLength, t3.straightLength), textAnchor: y3(t3.startAngle, t3.endAngle, t3.innerRadius, t3.outerRadius), textPosition: k5(t3.startAngle, t3.endAngle, t3.innerRadius, t3.outerRadius, t3.offset, t3.diagonalLength, t3.straightLength, t3.textOffset) }) });
  }) });
};
var V = function(t2, n2, e2, r2) {
  t2.textBaseline = "middle", t2.font = e2.labels.text.fontSize + "px " + e2.labels.text.fontFamily, n2.forEach(function(n3) {
    t2.fillStyle = n3.textColor, t2.textAlign = fi.canvas.align[n3.textAnchor], t2.fillText("" + n3.label, n3.x, n3.y), t2.beginPath(), t2.strokeStyle = n3.linkColor, t2.lineWidth = r2, n3.points.forEach(function(n4, e3) {
      0 === e3 ? t2.moveTo(n4.x, n4.y) : t2.lineTo(n4.x, n4.y);
    }), t2.stroke();
  });
};
var X2 = function(t2) {
  var n2 = t2.data, e2 = t2.skipAngle, r2 = void 0 === e2 ? 0 : e2, i2 = t2.offset, o2 = void 0 === i2 ? 0.5 : i2, u = t2.diagonalLength, l = t2.straightLength, s3 = t2.computeExtraProps, d = void 0 === s3 ? function() {
    return {};
  } : s3, f = (0, import_react.useMemo)(function() {
    return n2.filter(function(t3) {
      return Math.abs(oi(t3.arc.endAngle - t3.arc.startAngle)) >= r2;
    }).map(function(t3) {
      return M({}, D(t3.arc, o2, u, l), { data: t3 });
    });
  }, [n2, r2, o2, u, l]);
  return (0, import_react.useMemo)(function() {
    return f.map(function(t3) {
      return M({}, d(t3), t3);
    });
  }, [f, d]);
};
var Y = function(t2) {
  var n2 = t2.data, e2 = t2.skipAngle, r2 = t2.offset, a4 = t2.diagonalLength, o2 = t2.straightLength, u = t2.textOffset, l = void 0 === u ? 0 : u, s3 = t2.label, f = t2.linkColor, c = t2.textColor, g = Gi(s3), p2 = Et(), h2 = We(f, p2), v2 = We(c, p2), A2 = (0, import_react.useCallback)(function(t3) {
    var n3, e3 = { x: t3.points[2].x, y: t3.points[2].y };
    return "before" === t3.side ? (e3.x -= l, n3 = "end") : (e3.x += l, n3 = "start"), M({}, e3, { label: g(t3.data), linkColor: h2(t3.data), textAnchor: n3, textColor: v2(t3.data) });
  }, [g, h2, v2, l]);
  return X2({ data: n2, skipAngle: e2, offset: r2, diagonalLength: a4, straightLength: o2, computeExtraProps: A2 });
};
var tt = function(n2) {
  var e2 = n2.datum, r2 = n2.style, i2 = n2.onClick, a4 = n2.onMouseEnter, o2 = n2.onMouseMove, u = n2.onMouseLeave, l = (0, import_react.useCallback)(function(t2) {
    return null == i2 ? void 0 : i2(e2, t2);
  }, [i2, e2]), s3 = (0, import_react.useCallback)(function(t2) {
    return null == a4 ? void 0 : a4(e2, t2);
  }, [a4, e2]), d = (0, import_react.useCallback)(function(t2) {
    return null == o2 ? void 0 : o2(e2, t2);
  }, [o2, e2]), f = (0, import_react.useCallback)(function(t2) {
    return null == u ? void 0 : u(e2, t2);
  }, [u, e2]);
  return (0, import_jsx_runtime.jsx)(animated.path, { d: r2.path, opacity: r2.opacity, fill: e2.fill || r2.color, stroke: r2.borderColor, strokeWidth: r2.borderWidth, onClick: i2 ? l : void 0, onMouseEnter: a4 ? s3 : void 0, onMouseMove: o2 ? d : void 0, onMouseLeave: u ? f : void 0 });
};
var nt = function(t2, e2, r2, i2, a4) {
  return to([t2, e2, r2, i2], function(t3, n2, e3, r3) {
    return a4({ startAngle: t3, endAngle: n2, innerRadius: Math.max(0, e3), outerRadius: Math.max(0, r3) });
  });
};
var et = function(t2, n2, r2) {
  void 0 === n2 && (n2 = "innerRadius");
  var i2 = Zr(), a4 = i2.animate, o2 = i2.config, u = I(n2, r2);
  return { transition: useTransition(t2, { keys: function(t3) {
    return t3.id;
  }, initial: u.update, from: u.enter, enter: u.update, update: u.update, leave: u.leave, config: o2, immediate: !a4 }), interpolate: nt };
};
var rt = function(t2) {
  var n2 = t2.center, e2 = t2.data, r2 = t2.arcGenerator, a4 = t2.borderWidth, o2 = t2.borderColor, u = t2.onClick, l = t2.onMouseEnter, s3 = t2.onMouseMove, d = t2.onMouseLeave, f = t2.transitionMode, c = t2.component, g = void 0 === c ? tt : c, h2 = Et(), v2 = We(o2, h2), x4 = et(e2, f, { enter: function(t3) {
    return { opacity: 0, color: t3.color, borderColor: v2(t3) };
  }, update: function(t3) {
    return { opacity: 1, color: t3.color, borderColor: v2(t3) };
  }, leave: function(t3) {
    return { opacity: 0, color: t3.color, borderColor: v2(t3) };
  } }), m = x4.transition, y3 = x4.interpolate, k5 = g;
  return (0, import_jsx_runtime.jsx)("g", { transform: "translate(" + n2[0] + "," + n2[1] + ")", children: m(function(t3, n3) {
    return (0, import_react.createElement)(k5, { key: n3.id, datum: n3, style: M({}, t3, { borderWidth: a4, path: y3(t3.startAngle, t3.endAngle, t3.innerRadius, t3.outerRadius, r2) }), onClick: u, onMouseEnter: l, onMouseMove: s3, onMouseLeave: d });
  }) });
};
var it = function(t2, n2, e2, r2, i2, a4) {
  void 0 === a4 && (a4 = true);
  var l = [], s3 = li(ni(r2), e2);
  l.push([s3.x, s3.y]);
  var d = li(ni(i2), e2);
  l.push([d.x, d.y]);
  for (var f = Math.round(Math.min(r2, i2)); f <= Math.round(Math.max(r2, i2)); f++) if (f % 90 == 0) {
    var c = li(ni(f), e2);
    l.push([c.x, c.y]);
  }
  l = l.map(function(e3) {
    var r3 = e3[0], i3 = e3[1];
    return [t2 + r3, n2 + i3];
  }), a4 && l.push([t2, n2]);
  var g = l.map(function(t3) {
    return t3[0];
  }), p2 = l.map(function(t3) {
    return t3[1];
  }), h2 = Math.min.apply(Math, g), v2 = Math.max.apply(Math, g), A2 = Math.min.apply(Math, p2);
  return { points: l, x: h2, y: A2, width: v2 - h2, height: Math.max.apply(Math, p2) - A2 };
};
var at = function(t2, n2, e2, r2, i2, a4) {
  var o2 = Di(i2, a4, t2, n2);
  return o2 < e2 && o2 > r2;
};
var ot = function(t2, n2, e2, r2, i2, a4, o2) {
  if (at(t2, n2, e2, r2, a4, o2)) {
    var u = Yi(a4, o2, t2, n2);
    return i2.find(function(t3) {
      var n3 = t3.startAngle, e3 = t3.endAngle;
      return u >= n3 && u < e3;
    });
  }
};
var lt = function(t2) {
  var n2 = void 0 === t2 ? {} : t2, e2 = n2.cornerRadius, r2 = void 0 === e2 ? 0 : e2, i2 = n2.padAngle, a4 = void 0 === i2 ? 0 : i2;
  return (0, import_react.useMemo)(function() {
    return arc_default().innerRadius(function(t3) {
      return t3.innerRadius;
    }).outerRadius(function(t3) {
      return t3.outerRadius;
    }).cornerRadius(r2).padAngle(a4);
  }, [r2, a4]);
};

// node_modules/@nivo/pie/dist/nivo-pie.es.js
var import_jsx_runtime2 = __toESM(require_jsx_runtime());

// node_modules/@nivo/pie/node_modules/d3-path/src/path.js
var pi3 = Math.PI;
var tau3 = 2 * pi3;
var epsilon3 = 1e-6;
var tauEpsilon2 = tau3 - epsilon3;
function Path2() {
  this._x0 = this._y0 = // start of current subpath
  this._x1 = this._y1 = null;
  this._ = "";
}
function path2() {
  return new Path2();
}
Path2.prototype = path2.prototype = {
  constructor: Path2,
  moveTo: function(x4, y3) {
    this._ += "M" + (this._x0 = this._x1 = +x4) + "," + (this._y0 = this._y1 = +y3);
  },
  closePath: function() {
    if (this._x1 !== null) {
      this._x1 = this._x0, this._y1 = this._y0;
      this._ += "Z";
    }
  },
  lineTo: function(x4, y3) {
    this._ += "L" + (this._x1 = +x4) + "," + (this._y1 = +y3);
  },
  quadraticCurveTo: function(x1, y1, x4, y3) {
    this._ += "Q" + +x1 + "," + +y1 + "," + (this._x1 = +x4) + "," + (this._y1 = +y3);
  },
  bezierCurveTo: function(x1, y1, x22, y22, x4, y3) {
    this._ += "C" + +x1 + "," + +y1 + "," + +x22 + "," + +y22 + "," + (this._x1 = +x4) + "," + (this._y1 = +y3);
  },
  arcTo: function(x1, y1, x22, y22, r2) {
    x1 = +x1, y1 = +y1, x22 = +x22, y22 = +y22, r2 = +r2;
    var x0 = this._x1, y0 = this._y1, x21 = x22 - x1, y21 = y22 - y1, x01 = x0 - x1, y01 = y0 - y1, l01_2 = x01 * x01 + y01 * y01;
    if (r2 < 0) throw new Error("negative radius: " + r2);
    if (this._x1 === null) {
      this._ += "M" + (this._x1 = x1) + "," + (this._y1 = y1);
    } else if (!(l01_2 > epsilon3)) ;
    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon3) || !r2) {
      this._ += "L" + (this._x1 = x1) + "," + (this._y1 = y1);
    } else {
      var x20 = x22 - x0, y20 = y22 - y0, l21_2 = x21 * x21 + y21 * y21, l20_2 = x20 * x20 + y20 * y20, l21 = Math.sqrt(l21_2), l01 = Math.sqrt(l01_2), l = r2 * Math.tan((pi3 - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2), t01 = l / l01, t21 = l / l21;
      if (Math.abs(t01 - 1) > epsilon3) {
        this._ += "L" + (x1 + t01 * x01) + "," + (y1 + t01 * y01);
      }
      this._ += "A" + r2 + "," + r2 + ",0,0," + +(y01 * x20 > x01 * y20) + "," + (this._x1 = x1 + t21 * x21) + "," + (this._y1 = y1 + t21 * y21);
    }
  },
  arc: function(x4, y3, r2, a0, a1, ccw) {
    x4 = +x4, y3 = +y3, r2 = +r2, ccw = !!ccw;
    var dx = r2 * Math.cos(a0), dy = r2 * Math.sin(a0), x0 = x4 + dx, y0 = y3 + dy, cw = 1 ^ ccw, da = ccw ? a0 - a1 : a1 - a0;
    if (r2 < 0) throw new Error("negative radius: " + r2);
    if (this._x1 === null) {
      this._ += "M" + x0 + "," + y0;
    } else if (Math.abs(this._x1 - x0) > epsilon3 || Math.abs(this._y1 - y0) > epsilon3) {
      this._ += "L" + x0 + "," + y0;
    }
    if (!r2) return;
    if (da < 0) da = da % tau3 + tau3;
    if (da > tauEpsilon2) {
      this._ += "A" + r2 + "," + r2 + ",0,1," + cw + "," + (x4 - dx) + "," + (y3 - dy) + "A" + r2 + "," + r2 + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
    } else if (da > epsilon3) {
      this._ += "A" + r2 + "," + r2 + ",0," + +(da >= pi3) + "," + cw + "," + (this._x1 = x4 + r2 * Math.cos(a1)) + "," + (this._y1 = y3 + r2 * Math.sin(a1));
    }
  },
  rect: function(x4, y3, w3, h2) {
    this._ += "M" + (this._x0 = this._x1 = +x4) + "," + (this._y0 = this._y1 = +y3) + "h" + +w3 + "v" + +h2 + "h" + -w3 + "Z";
  },
  toString: function() {
    return this._;
  }
};

// node_modules/@nivo/pie/node_modules/d3-shape/src/constant.js
function constant_default2(x4) {
  return function constant() {
    return x4;
  };
}

// node_modules/@nivo/pie/node_modules/d3-shape/src/math.js
var epsilon4 = 1e-12;
var pi4 = Math.PI;
var halfPi2 = pi4 / 2;
var tau4 = 2 * pi4;

// node_modules/@nivo/pie/node_modules/d3-shape/src/curve/linear.js
function Linear2(context) {
  this._context = context;
}
Linear2.prototype = {
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
  point: function(x4, y3) {
    x4 = +x4, y3 = +y3;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x4, y3) : this._context.moveTo(x4, y3);
        break;
      case 1:
        this._point = 2;
      // proceed
      default:
        this._context.lineTo(x4, y3);
        break;
    }
  }
};
function linear_default2(context) {
  return new Linear2(context);
}

// node_modules/@nivo/pie/node_modules/d3-shape/src/descending.js
function descending_default3(a4, b2) {
  return b2 < a4 ? -1 : b2 > a4 ? 1 : b2 >= a4 ? 0 : NaN;
}

// node_modules/@nivo/pie/node_modules/d3-shape/src/identity.js
function identity_default2(d) {
  return d;
}

// node_modules/@nivo/pie/node_modules/d3-shape/src/pie.js
function pie_default2() {
  var value = identity_default2, sortValues = descending_default3, sort = null, startAngle = constant_default2(0), endAngle = constant_default2(tau4), padAngle = constant_default2(0);
  function pie(data) {
    var i2, n2 = data.length, j3, k5, sum3 = 0, index = new Array(n2), arcs = new Array(n2), a0 = +startAngle.apply(this, arguments), da = Math.min(tau4, Math.max(-tau4, endAngle.apply(this, arguments) - a0)), a1, p2 = Math.min(Math.abs(da) / n2, padAngle.apply(this, arguments)), pa = p2 * (da < 0 ? -1 : 1), v2;
    for (i2 = 0; i2 < n2; ++i2) {
      if ((v2 = arcs[index[i2] = i2] = +value(data[i2], i2, data)) > 0) {
        sum3 += v2;
      }
    }
    if (sortValues != null) index.sort(function(i3, j4) {
      return sortValues(arcs[i3], arcs[j4]);
    });
    else if (sort != null) index.sort(function(i3, j4) {
      return sort(data[i3], data[j4]);
    });
    for (i2 = 0, k5 = sum3 ? (da - n2 * pa) / sum3 : 0; i2 < n2; ++i2, a0 = a1) {
      j3 = index[i2], v2 = arcs[j3], a1 = a0 + (v2 > 0 ? v2 * k5 : 0) + pa, arcs[j3] = {
        data: data[j3],
        index: i2,
        value: v2,
        startAngle: a0,
        endAngle: a1,
        padAngle: p2
      };
    }
    return arcs;
  }
  pie.value = function(_2) {
    return arguments.length ? (value = typeof _2 === "function" ? _2 : constant_default2(+_2), pie) : value;
  };
  pie.sortValues = function(_2) {
    return arguments.length ? (sortValues = _2, sort = null, pie) : sortValues;
  };
  pie.sort = function(_2) {
    return arguments.length ? (sort = _2, sortValues = null, pie) : sort;
  };
  pie.startAngle = function(_2) {
    return arguments.length ? (startAngle = typeof _2 === "function" ? _2 : constant_default2(+_2), pie) : startAngle;
  };
  pie.endAngle = function(_2) {
    return arguments.length ? (endAngle = typeof _2 === "function" ? _2 : constant_default2(+_2), pie) : endAngle;
  };
  pie.padAngle = function(_2) {
    return arguments.length ? (padAngle = typeof _2 === "function" ? _2 : constant_default2(+_2), pie) : padAngle;
  };
  return pie;
}

// node_modules/@nivo/pie/node_modules/d3-shape/src/curve/radial.js
var curveRadialLinear2 = curveRadial2(linear_default2);
function Radial2(curve) {
  this._curve = curve;
}
Radial2.prototype = {
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
  point: function(a4, r2) {
    this._curve.point(r2 * Math.sin(a4), r2 * -Math.cos(a4));
  }
};
function curveRadial2(curve) {
  function radial(context) {
    return new Radial2(curve(context));
  }
  radial._curve = curve;
  return radial;
}

// node_modules/@nivo/pie/node_modules/d3-shape/src/array.js
var slice2 = Array.prototype.slice;

// node_modules/@nivo/pie/node_modules/d3-shape/src/symbol/diamond.js
var tan302 = Math.sqrt(1 / 3);
var tan30_22 = tan302 * 2;

// node_modules/@nivo/pie/node_modules/d3-shape/src/symbol/star.js
var kr2 = Math.sin(pi4 / 10) / Math.sin(7 * pi4 / 10);
var kx2 = Math.sin(tau4 / 10) * kr2;
var ky2 = -Math.cos(tau4 / 10) * kr2;

// node_modules/@nivo/pie/node_modules/d3-shape/src/symbol/triangle.js
var sqrt32 = Math.sqrt(3);

// node_modules/@nivo/pie/node_modules/d3-shape/src/symbol/wye.js
var s2 = Math.sqrt(3) / 2;
var k4 = 1 / Math.sqrt(12);
var a2 = (k4 / 2 + 1) * 3;

// node_modules/@nivo/pie/node_modules/d3-shape/src/noop.js
function noop_default2() {
}

// node_modules/@nivo/pie/node_modules/d3-shape/src/curve/basis.js
function point5(that, x4, y3) {
  that._context.bezierCurveTo(
    (2 * that._x0 + that._x1) / 3,
    (2 * that._y0 + that._y1) / 3,
    (that._x0 + 2 * that._x1) / 3,
    (that._y0 + 2 * that._y1) / 3,
    (that._x0 + 4 * that._x1 + x4) / 6,
    (that._y0 + 4 * that._y1 + y3) / 6
  );
}
function Basis2(context) {
  this._context = context;
}
Basis2.prototype = {
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
        point5(this, this._x1, this._y1);
      // proceed
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
    }
    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x4, y3) {
    x4 = +x4, y3 = +y3;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x4, y3) : this._context.moveTo(x4, y3);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
      // proceed
      default:
        point5(this, x4, y3);
        break;
    }
    this._x0 = this._x1, this._x1 = x4;
    this._y0 = this._y1, this._y1 = y3;
  }
};

// node_modules/@nivo/pie/node_modules/d3-shape/src/curve/basisClosed.js
function BasisClosed2(context) {
  this._context = context;
}
BasisClosed2.prototype = {
  areaStart: noop_default2,
  areaEnd: noop_default2,
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
  point: function(x4, y3) {
    x4 = +x4, y3 = +y3;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._x2 = x4, this._y2 = y3;
        break;
      case 1:
        this._point = 2;
        this._x3 = x4, this._y3 = y3;
        break;
      case 2:
        this._point = 3;
        this._x4 = x4, this._y4 = y3;
        this._context.moveTo((this._x0 + 4 * this._x1 + x4) / 6, (this._y0 + 4 * this._y1 + y3) / 6);
        break;
      default:
        point5(this, x4, y3);
        break;
    }
    this._x0 = this._x1, this._x1 = x4;
    this._y0 = this._y1, this._y1 = y3;
  }
};

// node_modules/@nivo/pie/node_modules/d3-shape/src/curve/basisOpen.js
function BasisOpen2(context) {
  this._context = context;
}
BasisOpen2.prototype = {
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
  point: function(x4, y3) {
    x4 = +x4, y3 = +y3;
    switch (this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        var x0 = (this._x0 + 4 * this._x1 + x4) / 6, y0 = (this._y0 + 4 * this._y1 + y3) / 6;
        this._line ? this._context.lineTo(x0, y0) : this._context.moveTo(x0, y0);
        break;
      case 3:
        this._point = 4;
      // proceed
      default:
        point5(this, x4, y3);
        break;
    }
    this._x0 = this._x1, this._x1 = x4;
    this._y0 = this._y1, this._y1 = y3;
  }
};

// node_modules/@nivo/pie/node_modules/d3-shape/src/curve/bundle.js
function Bundle2(context, beta) {
  this._basis = new Basis2(context);
  this._beta = beta;
}
Bundle2.prototype = {
  lineStart: function() {
    this._x = [];
    this._y = [];
    this._basis.lineStart();
  },
  lineEnd: function() {
    var x4 = this._x, y3 = this._y, j3 = x4.length - 1;
    if (j3 > 0) {
      var x0 = x4[0], y0 = y3[0], dx = x4[j3] - x0, dy = y3[j3] - y0, i2 = -1, t2;
      while (++i2 <= j3) {
        t2 = i2 / j3;
        this._basis.point(
          this._beta * x4[i2] + (1 - this._beta) * (x0 + t2 * dx),
          this._beta * y3[i2] + (1 - this._beta) * (y0 + t2 * dy)
        );
      }
    }
    this._x = this._y = null;
    this._basis.lineEnd();
  },
  point: function(x4, y3) {
    this._x.push(+x4);
    this._y.push(+y3);
  }
};
var bundle_default2 = function custom8(beta) {
  function bundle(context) {
    return beta === 1 ? new Basis2(context) : new Bundle2(context, beta);
  }
  bundle.beta = function(beta2) {
    return custom8(+beta2);
  };
  return bundle;
}(0.85);

// node_modules/@nivo/pie/node_modules/d3-shape/src/curve/cardinal.js
function point6(that, x4, y3) {
  that._context.bezierCurveTo(
    that._x1 + that._k * (that._x2 - that._x0),
    that._y1 + that._k * (that._y2 - that._y0),
    that._x2 + that._k * (that._x1 - x4),
    that._y2 + that._k * (that._y1 - y3),
    that._x2,
    that._y2
  );
}
function Cardinal2(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}
Cardinal2.prototype = {
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
        point6(this, this._x1, this._y1);
        break;
    }
    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x4, y3) {
    x4 = +x4, y3 = +y3;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x4, y3) : this._context.moveTo(x4, y3);
        break;
      case 1:
        this._point = 2;
        this._x1 = x4, this._y1 = y3;
        break;
      case 2:
        this._point = 3;
      // proceed
      default:
        point6(this, x4, y3);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x4;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y3;
  }
};
var cardinal_default2 = function custom9(tension) {
  function cardinal(context) {
    return new Cardinal2(context, tension);
  }
  cardinal.tension = function(tension2) {
    return custom9(+tension2);
  };
  return cardinal;
}(0);

// node_modules/@nivo/pie/node_modules/d3-shape/src/curve/cardinalClosed.js
function CardinalClosed2(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}
CardinalClosed2.prototype = {
  areaStart: noop_default2,
  areaEnd: noop_default2,
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
  point: function(x4, y3) {
    x4 = +x4, y3 = +y3;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._x3 = x4, this._y3 = y3;
        break;
      case 1:
        this._point = 2;
        this._context.moveTo(this._x4 = x4, this._y4 = y3);
        break;
      case 2:
        this._point = 3;
        this._x5 = x4, this._y5 = y3;
        break;
      default:
        point6(this, x4, y3);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x4;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y3;
  }
};
var cardinalClosed_default2 = function custom10(tension) {
  function cardinal(context) {
    return new CardinalClosed2(context, tension);
  }
  cardinal.tension = function(tension2) {
    return custom10(+tension2);
  };
  return cardinal;
}(0);

// node_modules/@nivo/pie/node_modules/d3-shape/src/curve/cardinalOpen.js
function CardinalOpen2(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}
CardinalOpen2.prototype = {
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
  point: function(x4, y3) {
    x4 = +x4, y3 = +y3;
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
        point6(this, x4, y3);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x4;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y3;
  }
};
var cardinalOpen_default2 = function custom11(tension) {
  function cardinal(context) {
    return new CardinalOpen2(context, tension);
  }
  cardinal.tension = function(tension2) {
    return custom11(+tension2);
  };
  return cardinal;
}(0);

// node_modules/@nivo/pie/node_modules/d3-shape/src/curve/catmullRom.js
function point7(that, x4, y3) {
  var x1 = that._x1, y1 = that._y1, x22 = that._x2, y22 = that._y2;
  if (that._l01_a > epsilon4) {
    var a4 = 2 * that._l01_2a + 3 * that._l01_a * that._l12_a + that._l12_2a, n2 = 3 * that._l01_a * (that._l01_a + that._l12_a);
    x1 = (x1 * a4 - that._x0 * that._l12_2a + that._x2 * that._l01_2a) / n2;
    y1 = (y1 * a4 - that._y0 * that._l12_2a + that._y2 * that._l01_2a) / n2;
  }
  if (that._l23_a > epsilon4) {
    var b2 = 2 * that._l23_2a + 3 * that._l23_a * that._l12_a + that._l12_2a, m = 3 * that._l23_a * (that._l23_a + that._l12_a);
    x22 = (x22 * b2 + that._x1 * that._l23_2a - x4 * that._l12_2a) / m;
    y22 = (y22 * b2 + that._y1 * that._l23_2a - y3 * that._l12_2a) / m;
  }
  that._context.bezierCurveTo(x1, y1, x22, y22, that._x2, that._y2);
}
function CatmullRom2(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}
CatmullRom2.prototype = {
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
  point: function(x4, y3) {
    x4 = +x4, y3 = +y3;
    if (this._point) {
      var x23 = this._x2 - x4, y23 = this._y2 - y3;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x4, y3) : this._context.moveTo(x4, y3);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
      // proceed
      default:
        point7(this, x4, y3);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x4;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y3;
  }
};
var catmullRom_default2 = function custom12(alpha) {
  function catmullRom(context) {
    return alpha ? new CatmullRom2(context, alpha) : new Cardinal2(context, 0);
  }
  catmullRom.alpha = function(alpha2) {
    return custom12(+alpha2);
  };
  return catmullRom;
}(0.5);

// node_modules/@nivo/pie/node_modules/d3-shape/src/curve/catmullRomClosed.js
function CatmullRomClosed2(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}
CatmullRomClosed2.prototype = {
  areaStart: noop_default2,
  areaEnd: noop_default2,
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
  point: function(x4, y3) {
    x4 = +x4, y3 = +y3;
    if (this._point) {
      var x23 = this._x2 - x4, y23 = this._y2 - y3;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1;
        this._x3 = x4, this._y3 = y3;
        break;
      case 1:
        this._point = 2;
        this._context.moveTo(this._x4 = x4, this._y4 = y3);
        break;
      case 2:
        this._point = 3;
        this._x5 = x4, this._y5 = y3;
        break;
      default:
        point7(this, x4, y3);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x4;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y3;
  }
};
var catmullRomClosed_default2 = function custom13(alpha) {
  function catmullRom(context) {
    return alpha ? new CatmullRomClosed2(context, alpha) : new CardinalClosed2(context, 0);
  }
  catmullRom.alpha = function(alpha2) {
    return custom13(+alpha2);
  };
  return catmullRom;
}(0.5);

// node_modules/@nivo/pie/node_modules/d3-shape/src/curve/catmullRomOpen.js
function CatmullRomOpen2(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}
CatmullRomOpen2.prototype = {
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
  point: function(x4, y3) {
    x4 = +x4, y3 = +y3;
    if (this._point) {
      var x23 = this._x2 - x4, y23 = this._y2 - y3;
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
        point7(this, x4, y3);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x4;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y3;
  }
};
var catmullRomOpen_default2 = function custom14(alpha) {
  function catmullRom(context) {
    return alpha ? new CatmullRomOpen2(context, alpha) : new CardinalOpen2(context, 0);
  }
  catmullRom.alpha = function(alpha2) {
    return custom14(+alpha2);
  };
  return catmullRom;
}(0.5);

// node_modules/@nivo/pie/node_modules/d3-shape/src/curve/linearClosed.js
function LinearClosed2(context) {
  this._context = context;
}
LinearClosed2.prototype = {
  areaStart: noop_default2,
  areaEnd: noop_default2,
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._point) this._context.closePath();
  },
  point: function(x4, y3) {
    x4 = +x4, y3 = +y3;
    if (this._point) this._context.lineTo(x4, y3);
    else this._point = 1, this._context.moveTo(x4, y3);
  }
};

// node_modules/@nivo/pie/node_modules/d3-shape/src/curve/monotone.js
function sign2(x4) {
  return x4 < 0 ? -1 : 1;
}
function slope32(that, x22, y22) {
  var h0 = that._x1 - that._x0, h1 = x22 - that._x1, s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0), s1 = (y22 - that._y1) / (h1 || h0 < 0 && -0), p2 = (s0 * h1 + s1 * h0) / (h0 + h1);
  return (sign2(s0) + sign2(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p2)) || 0;
}
function slope22(that, t2) {
  var h2 = that._x1 - that._x0;
  return h2 ? (3 * (that._y1 - that._y0) / h2 - t2) / 2 : t2;
}
function point8(that, t0, t1) {
  var x0 = that._x0, y0 = that._y0, x1 = that._x1, y1 = that._y1, dx = (x1 - x0) / 3;
  that._context.bezierCurveTo(x0 + dx, y0 + dx * t0, x1 - dx, y1 - dx * t1, x1, y1);
}
function MonotoneX2(context) {
  this._context = context;
}
MonotoneX2.prototype = {
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
        point8(this, this._t0, slope22(this, this._t0));
        break;
    }
    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x4, y3) {
    var t1 = NaN;
    x4 = +x4, y3 = +y3;
    if (x4 === this._x1 && y3 === this._y1) return;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x4, y3) : this._context.moveTo(x4, y3);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        point8(this, slope22(this, t1 = slope32(this, x4, y3)), t1);
        break;
      default:
        point8(this, this._t0, t1 = slope32(this, x4, y3));
        break;
    }
    this._x0 = this._x1, this._x1 = x4;
    this._y0 = this._y1, this._y1 = y3;
    this._t0 = t1;
  }
};
function MonotoneY2(context) {
  this._context = new ReflectContext2(context);
}
(MonotoneY2.prototype = Object.create(MonotoneX2.prototype)).point = function(x4, y3) {
  MonotoneX2.prototype.point.call(this, y3, x4);
};
function ReflectContext2(context) {
  this._context = context;
}
ReflectContext2.prototype = {
  moveTo: function(x4, y3) {
    this._context.moveTo(y3, x4);
  },
  closePath: function() {
    this._context.closePath();
  },
  lineTo: function(x4, y3) {
    this._context.lineTo(y3, x4);
  },
  bezierCurveTo: function(x1, y1, x22, y22, x4, y3) {
    this._context.bezierCurveTo(y1, x1, y22, x22, y3, x4);
  }
};

// node_modules/@nivo/pie/node_modules/d3-shape/src/curve/natural.js
function Natural2(context) {
  this._context = context;
}
Natural2.prototype = {
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
    var x4 = this._x, y3 = this._y, n2 = x4.length;
    if (n2) {
      this._line ? this._context.lineTo(x4[0], y3[0]) : this._context.moveTo(x4[0], y3[0]);
      if (n2 === 2) {
        this._context.lineTo(x4[1], y3[1]);
      } else {
        var px = controlPoints2(x4), py = controlPoints2(y3);
        for (var i0 = 0, i1 = 1; i1 < n2; ++i0, ++i1) {
          this._context.bezierCurveTo(px[0][i0], py[0][i0], px[1][i0], py[1][i0], x4[i1], y3[i1]);
        }
      }
    }
    if (this._line || this._line !== 0 && n2 === 1) this._context.closePath();
    this._line = 1 - this._line;
    this._x = this._y = null;
  },
  point: function(x4, y3) {
    this._x.push(+x4);
    this._y.push(+y3);
  }
};
function controlPoints2(x4) {
  var i2, n2 = x4.length - 1, m, a4 = new Array(n2), b2 = new Array(n2), r2 = new Array(n2);
  a4[0] = 0, b2[0] = 2, r2[0] = x4[0] + 2 * x4[1];
  for (i2 = 1; i2 < n2 - 1; ++i2) a4[i2] = 1, b2[i2] = 4, r2[i2] = 4 * x4[i2] + 2 * x4[i2 + 1];
  a4[n2 - 1] = 2, b2[n2 - 1] = 7, r2[n2 - 1] = 8 * x4[n2 - 1] + x4[n2];
  for (i2 = 1; i2 < n2; ++i2) m = a4[i2] / b2[i2 - 1], b2[i2] -= m, r2[i2] -= m * r2[i2 - 1];
  a4[n2 - 1] = r2[n2 - 1] / b2[n2 - 1];
  for (i2 = n2 - 2; i2 >= 0; --i2) a4[i2] = (r2[i2] - a4[i2 + 1]) / b2[i2];
  b2[n2 - 1] = (x4[n2] + a4[n2 - 1]) / 2;
  for (i2 = 0; i2 < n2 - 1; ++i2) b2[i2] = 2 * x4[i2 + 1] - a4[i2 + 1];
  return [a4, b2];
}

// node_modules/@nivo/pie/node_modules/d3-shape/src/curve/step.js
function Step2(context, t2) {
  this._context = context;
  this._t = t2;
}
Step2.prototype = {
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
  point: function(x4, y3) {
    x4 = +x4, y3 = +y3;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x4, y3) : this._context.moveTo(x4, y3);
        break;
      case 1:
        this._point = 2;
      // proceed
      default: {
        if (this._t <= 0) {
          this._context.lineTo(this._x, y3);
          this._context.lineTo(x4, y3);
        } else {
          var x1 = this._x * (1 - this._t) + x4 * this._t;
          this._context.lineTo(x1, this._y);
          this._context.lineTo(x1, y3);
        }
        break;
      }
    }
    this._x = x4, this._y = y3;
  }
};

// node_modules/@nivo/pie/dist/nivo-pie.es.js
function E2() {
  return E2 = Object.assign ? Object.assign.bind() : function(e2) {
    for (var t2 = 1; t2 < arguments.length; t2++) {
      var i2 = arguments[t2];
      for (var n2 in i2) Object.prototype.hasOwnProperty.call(i2, n2) && (e2[n2] = i2[n2]);
    }
    return e2;
  }, E2.apply(this, arguments);
}
function F(e2, t2) {
  if (null == e2) return {};
  var i2, n2, a4 = {}, r2 = Object.keys(e2);
  for (n2 = 0; n2 < r2.length; n2++) i2 = r2[n2], t2.indexOf(i2) >= 0 || (a4[i2] = e2[i2]);
  return a4;
}
var H3;
var X3 = function(e2) {
  var t2 = e2.width, i2 = e2.height, n2 = e2.legends, a4 = e2.data, r2 = e2.toggleSerie;
  return (0, import_jsx_runtime2.jsx)(import_jsx_runtime2.Fragment, { children: n2.map(function(e3, n3) {
    var o2;
    return (0, import_jsx_runtime2.jsx)(X, E2({}, e3, { containerWidth: t2, containerHeight: i2, data: null != (o2 = e3.data) ? o2 : a4, toggleSerie: e3.toggleSerie ? r2 : void 0 }), n3);
  }) });
};
var Y2 = { id: "id", value: "value", sortByValue: false, innerRadius: 0, padAngle: 0, cornerRadius: 0, layers: ["arcs", "arcLinkLabels", "arcLabels", "legends"], startAngle: 0, endAngle: 360, fit: true, activeInnerRadiusOffset: 0, activeOuterRadiusOffset: 0, borderWidth: 0, borderColor: { from: "color", modifiers: [["darker", 1]] }, enableArcLabels: true, arcLabel: "formattedValue", arcLabelsSkipAngle: 0, arcLabelsRadiusOffset: 0.5, arcLabelsTextColor: { theme: "labels.text.fill" }, enableArcLinkLabels: true, arcLinkLabel: "id", arcLinkLabelsSkipAngle: 0, arcLinkLabelsOffset: 0, arcLinkLabelsDiagonalLength: 16, arcLinkLabelsStraightLength: 24, arcLinkLabelsThickness: 1, arcLinkLabelsTextOffset: 6, arcLinkLabelsTextColor: { theme: "labels.text.fill" }, arcLinkLabelsColor: { theme: "axis.ticks.line.stroke" }, colors: { scheme: "nivo" }, defs: [], fill: [], isInteractive: true, animate: true, motionConfig: "gentle", transitionMode: "innerRadius", tooltip: function(e2) {
  var t2 = e2.datum;
  return (0, import_jsx_runtime2.jsx)(w, { id: t2.id, value: t2.formattedValue, enableChip: true, color: t2.color });
}, legends: [], role: "img", pixelRatio: "undefined" != typeof window && null != (H3 = window.devicePixelRatio) ? H3 : 1 };
var j2 = ["points"];
var P = function(t2) {
  var i2 = t2.data, n2 = t2.id, a4 = void 0 === n2 ? Y2.id : n2, r2 = t2.value, o2 = void 0 === r2 ? Y2.value : r2, s3 = t2.valueFormat, c = t2.colors, u = void 0 === c ? Y2.colors : c, v2 = Gi(a4), f = Gi(o2), g = Dt(s3), L2 = pr(u, "id");
  return (0, import_react2.useMemo)(function() {
    return i2.map(function(e2) {
      var t3, i3 = v2(e2), n3 = f(e2), a5 = { id: i3, label: null != (t3 = e2.label) ? t3 : i3, hidden: false, value: n3, formattedValue: g(n3), data: e2 };
      return E2({}, a5, { color: L2(a5) });
    });
  }, [i2, v2, f, g, L2]);
};
var q2 = function(n2) {
  var a4 = n2.data, r2 = n2.startAngle, o2 = n2.endAngle, d = n2.innerRadius, l = n2.outerRadius, u = n2.padAngle, v2 = n2.sortByValue, f = n2.activeId, g = n2.activeInnerRadiusOffset, L2 = n2.activeOuterRadiusOffset, h2 = n2.hiddenIds, b2 = n2.forwardLegendData, A2 = (0, import_react2.useMemo)(function() {
    var e2 = pie_default2().value(function(e3) {
      return e3.value;
    }).startAngle(ni(r2)).endAngle(ni(o2)).padAngle(ni(u));
    return v2 || e2.sortValues(null), e2;
  }, [r2, o2, u, v2]), p2 = (0, import_react2.useMemo)(function() {
    var e2 = a4.filter(function(e3) {
      return !h2.includes(e3.id);
    });
    return { dataWithArc: A2(e2).map(function(e3) {
      var t2 = Math.abs(e3.endAngle - e3.startAngle);
      return E2({}, e3.data, { arc: { index: e3.index, startAngle: e3.startAngle, endAngle: e3.endAngle, innerRadius: f === e3.data.id ? d - g : d, outerRadius: f === e3.data.id ? l + L2 : l, thickness: l - d, padAngle: e3.padAngle, angle: t2, angleDeg: oi(t2) } });
    }), legendData: a4.map(function(e3) {
      return { id: e3.id, label: e3.label, color: e3.color, hidden: h2.includes(e3.id), data: e3 };
    }) };
  }, [A2, a4, h2, f, d, g, l, L2]), k5 = p2.legendData, I2 = (0, import_react2.useRef)(b2);
  return (0, import_react2.useEffect)(function() {
    "function" == typeof I2.current && I2.current(k5);
  }, [I2, k5]), p2;
};
var z2 = function(e2) {
  var t2 = e2.activeId, i2 = e2.onActiveIdChange, r2 = e2.defaultActiveId, o2 = void 0 !== t2, d = (0, import_react2.useState)(o2 ? null : void 0 === r2 ? null : r2), l = d[0], s3 = d[1];
  return { activeId: o2 ? t2 : l, setActiveId: (0, import_react2.useCallback)(function(e3) {
    i2 && i2(e3), o2 || s3(e3);
  }, [o2, i2, s3]) };
};
var J2 = function(e2) {
  var t2 = e2.data, i2 = e2.radius, r2 = e2.innerRadius, o2 = e2.startAngle, d = void 0 === o2 ? Y2.startAngle : o2, l = e2.endAngle, c = void 0 === l ? Y2.endAngle : l, u = e2.padAngle, v2 = void 0 === u ? Y2.padAngle : u, f = e2.sortByValue, g = void 0 === f ? Y2.sortByValue : f, L2 = e2.cornerRadius, h2 = void 0 === L2 ? Y2.cornerRadius : L2, b2 = e2.activeInnerRadiusOffset, p2 = void 0 === b2 ? Y2.activeInnerRadiusOffset : b2, k5 = e2.activeOuterRadiusOffset, I2 = void 0 === k5 ? Y2.activeOuterRadiusOffset : k5, R = e2.activeId, m = e2.onActiveIdChange, O = e2.defaultActiveId, C2 = e2.forwardLegendData, x4 = z2({ activeId: R, onActiveIdChange: m, defaultActiveId: O }), w3 = x4.activeId, M2 = x4.setActiveId, y3 = (0, import_react2.useState)([]), W3 = y3[0], S3 = y3[1], T2 = q2({ data: t2, startAngle: d, endAngle: c, innerRadius: r2, outerRadius: i2, padAngle: v2, sortByValue: g, activeId: w3, activeInnerRadiusOffset: p2, activeOuterRadiusOffset: I2, hiddenIds: W3, forwardLegendData: C2 }), D2 = (0, import_react2.useCallback)(function(e3) {
    S3(function(t3) {
      return t3.indexOf(e3) > -1 ? t3.filter(function(t4) {
        return t4 !== e3;
      }) : [].concat(t3, [e3]);
    });
  }, []);
  return E2({}, T2, { arcGenerator: lt({ cornerRadius: h2, padAngle: ni(v2) }), setActiveId: M2, toggleSerie: D2 });
};
var K2 = function(t2) {
  var i2 = t2.data, r2 = t2.width, o2 = t2.height, d = t2.innerRadius, l = void 0 === d ? Y2.innerRadius : d, c = t2.startAngle, u = void 0 === c ? Y2.startAngle : c, v2 = t2.endAngle, f = void 0 === v2 ? Y2.endAngle : v2, g = t2.padAngle, L2 = void 0 === g ? Y2.padAngle : g, h2 = t2.sortByValue, b2 = void 0 === h2 ? Y2.sortByValue : h2, k5 = t2.cornerRadius, I2 = void 0 === k5 ? Y2.cornerRadius : k5, R = t2.fit, m = void 0 === R ? Y2.fit : R, O = t2.activeInnerRadiusOffset, C2 = void 0 === O ? Y2.activeInnerRadiusOffset : O, x4 = t2.activeOuterRadiusOffset, w3 = void 0 === x4 ? Y2.activeOuterRadiusOffset : x4, M2 = t2.activeId, y3 = t2.onActiveIdChange, W3 = t2.defaultActiveId, S3 = t2.forwardLegendData, T2 = z2({ activeId: M2, onActiveIdChange: y3, defaultActiveId: W3 }), D2 = T2.activeId, V2 = T2.setActiveId, B2 = (0, import_react2.useState)([]), G2 = B2[0], H4 = B2[1], X4 = (0, import_react2.useMemo)(function() {
    var e2, t3 = Math.min(r2, o2) / 2, i3 = t3 * Math.min(l, 1), n2 = r2 / 2, a4 = o2 / 2;
    if (m) {
      var d2 = it(n2, a4, t3, u - 90, f - 90), s3 = d2.points, c2 = F(d2, j2), v3 = Math.min(r2 / c2.width, o2 / c2.height), g2 = { width: c2.width * v3, height: c2.height * v3 };
      g2.x = (r2 - g2.width) / 2, g2.y = (o2 - g2.height) / 2, n2 = (n2 - c2.x) / c2.width * c2.width * v3 + g2.x, a4 = (a4 - c2.y) / c2.height * c2.height * v3 + g2.y, e2 = { box: c2, ratio: v3, points: s3 }, t3 *= v3, i3 *= v3;
    }
    return { centerX: n2, centerY: a4, radius: t3, innerRadius: i3, debug: e2 };
  }, [r2, o2, l, u, f, m]), P2 = q2({ data: i2, startAngle: u, endAngle: f, innerRadius: X4.innerRadius, outerRadius: X4.radius, padAngle: L2, sortByValue: b2, activeId: D2, activeInnerRadiusOffset: C2, activeOuterRadiusOffset: w3, hiddenIds: G2, forwardLegendData: S3 }), J3 = (0, import_react2.useCallback)(function(e2) {
    H4(function(t3) {
      return t3.indexOf(e2) > -1 ? t3.filter(function(t4) {
        return t4 !== e2;
      }) : [].concat(t3, [e2]);
    });
  }, []);
  return E2({ arcGenerator: lt({ cornerRadius: I2, padAngle: ni(L2) }), activeId: D2, setActiveId: V2, toggleSerie: J3 }, P2, X4);
};
var N2 = function(t2) {
  var i2 = t2.dataWithArc, n2 = t2.arcGenerator, a4 = t2.centerX, r2 = t2.centerY, o2 = t2.radius, d = t2.innerRadius;
  return (0, import_react2.useMemo)(function() {
    return { dataWithArc: i2, arcGenerator: n2, centerX: a4, centerY: r2, radius: o2, innerRadius: d };
  }, [i2, n2, a4, r2, o2, d]);
};
var Q2 = function(t2) {
  var i2 = t2.center, n2 = t2.data, a4 = t2.arcGenerator, o2 = t2.borderWidth, d = t2.borderColor, l = t2.isInteractive, s3 = t2.onClick, c = t2.onMouseEnter, u = t2.onMouseMove, v2 = t2.onMouseLeave, f = t2.setActiveId, g = t2.tooltip, L2 = t2.transitionMode, h2 = k(), b2 = h2.showTooltipFromEvent, A2 = h2.hideTooltip, p2 = (0, import_react2.useMemo)(function() {
    if (l) return function(e2, t3) {
      null == s3 || s3(e2, t3);
    };
  }, [l, s3]), I2 = (0, import_react2.useMemo)(function() {
    if (l) return function(e2, t3) {
      b2((0, import_react2.createElement)(g, { datum: e2 }), t3), f(e2.id), null == c || c(e2, t3);
    };
  }, [l, b2, f, c, g]), R = (0, import_react2.useMemo)(function() {
    if (l) return function(e2, t3) {
      b2((0, import_react2.createElement)(g, { datum: e2 }), t3), null == u || u(e2, t3);
    };
  }, [l, b2, u, g]), m = (0, import_react2.useMemo)(function() {
    if (l) return function(e2, t3) {
      A2(), f(null), null == v2 || v2(e2, t3);
    };
  }, [l, A2, f, v2]);
  return (0, import_jsx_runtime2.jsx)(rt, { center: i2, data: n2, arcGenerator: a4, borderWidth: o2, borderColor: d, transitionMode: L2, onClick: p2, onMouseEnter: I2, onMouseMove: R, onMouseLeave: m });
};
var U2 = ["isInteractive", "animate", "motionConfig", "theme", "renderWrapper"];
var Z = function(e2) {
  var t2 = e2.data, i2 = e2.id, n2 = void 0 === i2 ? Y2.id : i2, a4 = e2.value, d = void 0 === a4 ? Y2.value : a4, l = e2.valueFormat, s3 = e2.sortByValue, c = void 0 === s3 ? Y2.sortByValue : s3, u = e2.layers, L2 = void 0 === u ? Y2.layers : u, h2 = e2.startAngle, b2 = void 0 === h2 ? Y2.startAngle : h2, A2 = e2.endAngle, p2 = void 0 === A2 ? Y2.endAngle : A2, k5 = e2.padAngle, m = void 0 === k5 ? Y2.padAngle : k5, O = e2.fit, C2 = void 0 === O ? Y2.fit : O, x4 = e2.innerRadius, w3 = void 0 === x4 ? Y2.innerRadius : x4, M2 = e2.cornerRadius, y3 = void 0 === M2 ? Y2.cornerRadius : M2, S3 = e2.activeInnerRadiusOffset, T2 = void 0 === S3 ? Y2.activeInnerRadiusOffset : S3, D2 = e2.activeOuterRadiusOffset, V2 = void 0 === D2 ? Y2.activeOuterRadiusOffset : D2, B2 = e2.width, G2 = e2.height, E3 = e2.margin, F2 = e2.colors, H4 = void 0 === F2 ? Y2.colors : F2, j3 = e2.borderWidth, q3 = void 0 === j3 ? Y2.borderWidth : j3, z3 = e2.borderColor, J3 = void 0 === z3 ? Y2.borderColor : z3, U3 = e2.enableArcLabels, Z2 = void 0 === U3 ? Y2.enableArcLabels : U3, $2 = e2.arcLabel, _2 = void 0 === $2 ? Y2.arcLabel : $2, ee2 = e2.arcLabelsSkipAngle, te2 = void 0 === ee2 ? Y2.arcLabelsSkipAngle : ee2, ie2 = e2.arcLabelsTextColor, ne2 = void 0 === ie2 ? Y2.arcLabelsTextColor : ie2, ae = e2.arcLabelsRadiusOffset, re = void 0 === ae ? Y2.arcLabelsRadiusOffset : ae, oe = e2.arcLabelsComponent, de = e2.enableArcLinkLabels, le = void 0 === de ? Y2.enableArcLinkLabels : de, se = e2.arcLinkLabel, ce = void 0 === se ? Y2.arcLinkLabel : se, ue = e2.arcLinkLabelsSkipAngle, ve = void 0 === ue ? Y2.arcLinkLabelsSkipAngle : ue, fe = e2.arcLinkLabelsOffset, ge = void 0 === fe ? Y2.arcLinkLabelsOffset : fe, Le = e2.arcLinkLabelsDiagonalLength, he = void 0 === Le ? Y2.arcLinkLabelsDiagonalLength : Le, be = e2.arcLinkLabelsStraightLength, Ae = void 0 === be ? Y2.arcLinkLabelsStraightLength : be, pe = e2.arcLinkLabelsThickness, ke = void 0 === pe ? Y2.arcLinkLabelsThickness : pe, Ie = e2.arcLinkLabelsTextOffset, Re = void 0 === Ie ? Y2.arcLinkLabelsTextOffset : Ie, me = e2.arcLinkLabelsTextColor, Oe = void 0 === me ? Y2.arcLinkLabelsTextColor : me, Ce = e2.arcLinkLabelsColor, xe = void 0 === Ce ? Y2.arcLinkLabelsColor : Ce, we = e2.arcLinkLabelComponent, Me = e2.defs, ye = void 0 === Me ? Y2.defs : Me, We2 = e2.fill, Se = void 0 === We2 ? Y2.fill : We2, Te = e2.isInteractive, De = void 0 === Te ? Y2.isInteractive : Te, Ve = e2.onClick, Be = e2.onMouseEnter, Ge = e2.onMouseMove, Ee = e2.onMouseLeave, Fe = e2.tooltip, He = void 0 === Fe ? Y2.tooltip : Fe, Xe = e2.activeId, Ye = e2.onActiveIdChange, je = e2.defaultActiveId, Pe = e2.transitionMode, qe = void 0 === Pe ? Y2.transitionMode : Pe, ze = e2.legends, Je = void 0 === ze ? Y2.legends : ze, Ke = e2.forwardLegendData, Ne = e2.role, Qe = void 0 === Ne ? Y2.role : Ne, Ue = Bt(B2, G2, E3), Ze = Ue.outerWidth, $e = Ue.outerHeight, _e = Ue.margin, et2 = Ue.innerWidth, tt2 = Ue.innerHeight, it2 = P({ data: t2, id: n2, value: d, valueFormat: l, colors: H4 }), nt2 = K2({ data: it2, width: et2, height: tt2, fit: C2, innerRadius: w3, startAngle: b2, endAngle: p2, padAngle: m, sortByValue: c, cornerRadius: y3, activeInnerRadiusOffset: T2, activeOuterRadiusOffset: V2, activeId: Xe, onActiveIdChange: Ye, defaultActiveId: je, forwardLegendData: Ke }), at2 = nt2.dataWithArc, rt2 = nt2.legendData, ot2 = nt2.arcGenerator, dt = nt2.centerX, lt2 = nt2.centerY, st = nt2.radius, ct = nt2.innerRadius, ut = nt2.setActiveId, vt = nt2.toggleSerie, ft = Hi(ye, at2, Se), gt = { arcs: null, arcLinkLabels: null, arcLabels: null, legends: null };
  L2.includes("arcs") && (gt.arcs = (0, import_jsx_runtime2.jsx)(Q2, { center: [dt, lt2], data: at2, arcGenerator: ot2, borderWidth: q3, borderColor: J3, isInteractive: De, onClick: Ve, onMouseEnter: Be, onMouseMove: Ge, onMouseLeave: Ee, setActiveId: ut, tooltip: He, transitionMode: qe }, "arcs")), le && L2.includes("arcLinkLabels") && (gt.arcLinkLabels = (0, import_jsx_runtime2.jsx)(U, { center: [dt, lt2], data: at2, label: ce, skipAngle: ve, offset: ge, diagonalLength: he, straightLength: Ae, strokeWidth: ke, textOffset: Re, textColor: Oe, linkColor: xe, component: we }, "arcLinkLabels")), Z2 && L2.includes("arcLabels") && (gt.arcLabels = (0, import_jsx_runtime2.jsx)(B, { center: [dt, lt2], data: at2, label: _2, radiusOffset: re, skipAngle: te2, textColor: ne2, transitionMode: qe, component: oe }, "arcLabels")), Je.length > 0 && L2.includes("legends") && (gt.legends = (0, import_jsx_runtime2.jsx)(X3, { width: et2, height: tt2, data: rt2, legends: Je, toggleSerie: vt }, "legends"));
  var Lt = N2({ dataWithArc: at2, arcGenerator: ot2, centerX: dt, centerY: lt2, radius: st, innerRadius: ct });
  return (0, import_jsx_runtime2.jsx)(_i, { width: Ze, height: $e, margin: _e, defs: ft, role: Qe, children: L2.map(function(e3, t3) {
    return void 0 !== gt[e3] ? gt[e3] : "function" == typeof e3 ? (0, import_jsx_runtime2.jsx)(import_react2.Fragment, { children: (0, import_react2.createElement)(e3, Lt) }, t3) : null;
  }) });
};
var $ = function(e2) {
  var t2 = e2.isInteractive, i2 = void 0 === t2 ? Y2.isInteractive : t2, n2 = e2.animate, a4 = void 0 === n2 ? Y2.animate : n2, r2 = e2.motionConfig, o2 = void 0 === r2 ? Y2.motionConfig : r2, d = e2.theme, l = e2.renderWrapper, s3 = F(e2, U2);
  return (0, import_jsx_runtime2.jsx)(Ht, { animate: a4, isInteractive: i2, motionConfig: o2, renderWrapper: l, theme: d, children: (0, import_jsx_runtime2.jsx)(Z, E2({ isInteractive: i2 }, s3)) });
};
var _ = function(e2) {
  return (0, import_jsx_runtime2.jsx)(Jt, { children: function(t2) {
    var i2 = t2.width, n2 = t2.height;
    return (0, import_jsx_runtime2.jsx)($, E2({ width: i2, height: n2 }, e2));
  } });
};
var ee = ["isInteractive", "theme", "renderWrapper"];
var te = function(n2) {
  var a4 = n2.data, o2 = n2.id, d = void 0 === o2 ? Y2.id : o2, l = n2.value, s3 = void 0 === l ? Y2.value : l, c = n2.valueFormat, u = n2.sortByValue, f = void 0 === u ? Y2.sortByValue : u, g = n2.startAngle, L2 = void 0 === g ? Y2.startAngle : g, A2 = n2.endAngle, p2 = void 0 === A2 ? Y2.endAngle : A2, k5 = n2.padAngle, I2 = void 0 === k5 ? Y2.padAngle : k5, R = n2.fit, M2 = void 0 === R ? Y2.fit : R, S3 = n2.innerRadius, T2 = void 0 === S3 ? Y2.innerRadius : S3, D2 = n2.cornerRadius, B2 = void 0 === D2 ? Y2.cornerRadius : D2, F2 = n2.activeInnerRadiusOffset, H4 = void 0 === F2 ? Y2.activeInnerRadiusOffset : F2, X4 = n2.activeOuterRadiusOffset, j3 = void 0 === X4 ? Y2.activeOuterRadiusOffset : X4, q3 = n2.width, z3 = n2.height, J3 = n2.margin, N3 = n2.pixelRatio, Q3 = void 0 === N3 ? Y2.pixelRatio : N3, U3 = n2.colors, Z2 = void 0 === U3 ? Y2.colors : U3, $2 = n2.borderWidth, _2 = void 0 === $2 ? Y2.borderWidth : $2, ee2 = n2.borderColor, te2 = void 0 === ee2 ? Y2.borderColor : ee2, ie2 = n2.enableArcLabels, ne2 = void 0 === ie2 ? Y2.enableArcLabels : ie2, ae = n2.arcLabel, re = void 0 === ae ? Y2.arcLabel : ae, oe = n2.arcLabelsSkipAngle, de = void 0 === oe ? Y2.arcLabelsSkipAngle : oe, le = n2.arcLabelsTextColor, se = void 0 === le ? Y2.arcLabelsTextColor : le, ce = n2.arcLabelsRadiusOffset, ue = void 0 === ce ? Y2.arcLabelsRadiusOffset : ce, ve = n2.enableArcLinkLabels, fe = void 0 === ve ? Y2.enableArcLinkLabels : ve, ge = n2.arcLinkLabel, Le = void 0 === ge ? Y2.arcLinkLabel : ge, he = n2.arcLinkLabelsSkipAngle, be = void 0 === he ? Y2.arcLinkLabelsSkipAngle : he, Ae = n2.arcLinkLabelsOffset, pe = void 0 === Ae ? Y2.arcLinkLabelsOffset : Ae, ke = n2.arcLinkLabelsDiagonalLength, Ie = void 0 === ke ? Y2.arcLinkLabelsDiagonalLength : ke, Re = n2.arcLinkLabelsStraightLength, me = void 0 === Re ? Y2.arcLinkLabelsStraightLength : Re, Oe = n2.arcLinkLabelsThickness, Ce = void 0 === Oe ? Y2.arcLinkLabelsThickness : Oe, xe = n2.arcLinkLabelsTextOffset, we = void 0 === xe ? Y2.arcLinkLabelsTextOffset : xe, Me = n2.arcLinkLabelsTextColor, ye = void 0 === Me ? Y2.arcLinkLabelsTextColor : Me, We2 = n2.arcLinkLabelsColor, Se = void 0 === We2 ? Y2.arcLinkLabelsColor : We2, Te = n2.isInteractive, De = void 0 === Te ? Y2.isInteractive : Te, Ve = n2.onClick, Be = n2.onMouseMove, Ge = n2.tooltip, Ee = void 0 === Ge ? Y2.tooltip : Ge, Fe = n2.activeId, He = n2.onActiveIdChange, Xe = n2.defaultActiveId, Ye = n2.legends, je = void 0 === Ye ? Y2.legends : Ye, Pe = n2.forwardLegendData, qe = (0, import_react2.useRef)(null), ze = Et(), Je = Bt(q3, z3, J3), Ke = Je.margin, Ne = Je.innerWidth, Qe = Je.innerHeight, Ue = Je.outerWidth, Ze = Je.outerHeight, $e = P({ data: a4, id: d, value: s3, valueFormat: c, colors: Z2 }), _e = K2({ data: $e, width: Ne, height: Qe, fit: M2, innerRadius: T2, startAngle: L2, endAngle: p2, padAngle: I2, sortByValue: f, cornerRadius: B2, activeInnerRadiusOffset: H4, activeOuterRadiusOffset: j3, activeId: Fe, onActiveIdChange: He, defaultActiveId: Xe, forwardLegendData: Pe }), et2 = _e.dataWithArc, tt2 = _e.arcGenerator, it2 = _e.centerX, nt2 = _e.centerY, at2 = _e.radius, rt2 = _e.innerRadius, ot2 = _e.setActiveId, dt = We(te2, ze), lt2 = z({ data: et2, label: re, skipAngle: de, offset: ue, textColor: se }), st = Y({ data: et2, skipAngle: be, offset: pe, diagonalLength: Ie, straightLength: me, label: Le, linkColor: Se, textOffset: we, textColor: ye });
  (0, import_react2.useEffect)(function() {
    if (qe.current) {
      qe.current.width = Ue * Q3, qe.current.height = Ze * Q3;
      var e2 = qe.current.getContext("2d");
      e2.scale(Q3, Q3), e2.fillStyle = ze.background, e2.fillRect(0, 0, Ue, Ze), e2.save(), e2.translate(Ke.left, Ke.top), tt2.context(e2), e2.save(), e2.translate(it2, nt2), et2.forEach(function(t2) {
        e2.beginPath(), e2.fillStyle = t2.color, e2.strokeStyle = dt(t2), e2.lineWidth = _2, tt2(t2.arc), e2.fill(), _2 > 0 && e2.stroke();
      }), true === fe && V(e2, st, ze, Ce), true === ne2 && w2(e2, lt2, ze), e2.restore(), je.forEach(function(t2) {
        H(e2, E2({}, t2, { data: et2, containerWidth: Ne, containerHeight: Qe, theme: ze }));
      });
    }
  }, [qe, Ne, Qe, Ue, Ze, Ke.top, Ke.left, Q3, it2, nt2, tt2, et2, _2, dt, ne2, lt2, fe, st, Ce, je, ze]);
  var ct = (0, import_react2.useMemo)(function() {
    return et2.map(function(e2) {
      return E2({ id: e2.id }, e2.arc);
    });
  }, [et2]), ut = function(e2) {
    if (!qe.current) return null;
    var t2 = Fi(qe.current, e2), i2 = t2[0], n3 = t2[1], a5 = ot(Ke.left + it2, Ke.top + nt2, at2, rt2, ct, i2, n3);
    return a5 ? et2.find(function(e3) {
      return e3.id === a5.id;
    }) : null;
  }, vt = k(), ft = vt.showTooltipFromEvent, gt = vt.hideTooltip, Lt = function(e2) {
    var t2 = ut(e2);
    t2 ? (null == Be || Be(t2, e2), ot2(t2.id), ft((0, import_react2.createElement)(Ee, { datum: t2 }), e2)) : (ot2(null), gt());
  };
  return (0, import_jsx_runtime2.jsx)("canvas", { ref: qe, width: Ue * Q3, height: Ze * Q3, style: { width: Ue, height: Ze, cursor: De ? "auto" : "normal" }, onMouseEnter: De ? Lt : void 0, onMouseMove: De ? Lt : void 0, onMouseLeave: De ? function() {
    gt();
  } : void 0, onClick: De ? function(e2) {
    if (Ve) {
      var t2 = ut(e2);
      t2 && Ve(t2, e2);
    }
  } : void 0 });
};
var ie = function(e2) {
  var t2 = e2.isInteractive, i2 = void 0 === t2 ? Y2.isInteractive : t2, n2 = e2.theme, a4 = e2.renderWrapper, r2 = F(e2, ee);
  return (0, import_jsx_runtime2.jsx)(Ht, { isInteractive: i2, renderWrapper: a4, theme: n2, children: (0, import_jsx_runtime2.jsx)(te, E2({ isInteractive: i2 }, r2)) });
};
var ne = function(e2) {
  return (0, import_jsx_runtime2.jsx)(Jt, { children: function(t2) {
    var i2 = t2.width, n2 = t2.height;
    return (0, import_jsx_runtime2.jsx)(ie, E2({ width: i2, height: n2 }, e2));
  } });
};
export {
  $ as Pie,
  ie as PieCanvas,
  _ as ResponsivePie,
  ne as ResponsivePieCanvas,
  Y2 as defaultProps,
  P as useNormalizedData,
  J2 as usePie,
  q2 as usePieArcs,
  K2 as usePieFromBox,
  N2 as usePieLayerContext
};
//# sourceMappingURL=@nivo_pie.js.map
