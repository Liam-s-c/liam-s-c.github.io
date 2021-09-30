"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

console.clear();
var canvas = document.querySelector('canvas');
var svg = document.querySelector('svg');
var ctx = canvas.getContext('2d');
var width = svg.clientWidth;
var height = svg.clientHeight;
canvas.width = width;
canvas.height = height;
var gradients = [[[0, [118, 179, 236]], [10, [41, 102, 193]], [20, [129, 77, 185]], [30, [129, 77, 185]], [50, [250, 148, 170]], [60, [237, 70, 54]], [70, [253, 134, 100]], [80, [254, 156, 33]], [90, [250, 213, 0]], [100, [171, 211, 96]]], [[0, [1, 123, 147]], [100, [131, 201, 167]]]];
var dots = [];

var Dot =
/*#__PURE__*/
function () {
  function Dot(x, y, color, delay) {
    var _this = this;

    _classCallCheck(this, Dot);

    this.x = x;
    this.y = y;
    this.r = 0;
    this.color = color;
    this.delay = delay * 0.9;
    this.tween = gsap.fromTo(this, {
      r: 0,
      x: x - 0.05,
      y: y - 0.05
    }, {
      x: x,
      y: y,
      r: function r() {
        return width * 0.03 + Math.abs(Math.sin(_this.delay * 3.4 - 1.5)) * width * 0.02;
      },
      duration: 1.8,
      ease: 'elastic.out(1, 0.5)',
      delay: this.delay
    });
  }

  _createClass(Dot, [{
    key: "draw",
    value: function draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x * width, this.y * height, this.r, 0, 2 * Math.PI);
      ctx.fill();
    }
  }]);

  return Dot;
}();

function init() {
  var paths = svg.querySelectorAll('path');

  var totalLength = _toConsumableArray(paths).reduce(function (p) {
    return p.getTotalLength();
  });

  var sum_length = 0;
  paths.forEach(function (path, pathIndex) {
    var length = path.getTotalLength();

    for (var i = 0; i < length; i += 2) {
      var point = path.getPointAtLength(i);
      var x = point.x / 400;
      var y = point.y / 488;
      var RGB_color = getColor(pathIndex, length, i / length);
      var color = "rgb(".concat(RGB_color[0], ", ").concat(RGB_color[1], ", ").concat(RGB_color[2], ")");
      var dot = new Dot(x, y, color, 1.5 - sum_length / totalLength);
      dots.push(dot);
      sum_length += 2;
    }
  });
}
/* Code copied from https://stackoverflow.com/a/30144587 */


function pickHex(color1, color2, weight) {
  var p = weight;
  var w = p * 2 - 1;
  var w1 = (w / 1 + 1) / 2;
  var w2 = 1 - w1;
  var rgb = [Math.round(color1[0] * w1 + color2[0] * w2), Math.round(color1[1] * w1 + color2[1] * w2), Math.round(color1[2] * w1 + color2[2] * w2)];
  return rgb;
}

function getColor(pathIndex, pathLength, colorIndex) {
  var colorRange = [];
  var stop = false;
  var gradient = gradients[pathIndex];
  gradient.forEach(function (step, index) {
    if (!stop && colorIndex * 100 <= step[0]) {
      if (index === 0) {
        index = 1;
      }

      colorRange = [index - 1, index];
      stop = true;
    }
  }); //Get the two closest colors

  var firstcolor = gradient[colorRange[0]][1];
  var secondcolor = gradient[colorRange[1]][1]; //Calculate ratio between the two closest colors

  var firstcolor_x = pathLength * (gradient[colorRange[0]][0] / 100);
  var secondcolor_x = pathLength * (gradient[colorRange[1]][0] / 100) - firstcolor_x;
  var slider_x = pathLength * colorIndex - firstcolor_x;
  var ratio = slider_x / secondcolor_x; //Get the color with pickHex(thx, less.js's mix function!)

  return pickHex(secondcolor, firstcolor, ratio);
}

function render() {
  requestAnimationFrame(render);
  ctx.clearRect(0, 0, width, height);
  dots.forEach(function (dot) {
    dot.draw();
  });
}

window.addEventListener('click', function () {
  dots.forEach(function (dot) {
    dot.tween.restart(true);
  });
});
window.addEventListener('resize', function () {
  width = svg.clientWidth;
  height = svg.clientHeight;
  canvas.width = width;
  canvas.height = height;
  dots.forEach(function (dot) {
    dot.tween.invalidate().restart(true);
  });
});
init();
requestAnimationFrame(render);