"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.object = void 0;

var _model = require("./model.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var object = function object() {
  var _this = this;

  _classCallCheck(this, object);

  _defineProperty(this, "setSource", function (source1) {
    _this.sourceText = source1;
  });

  _defineProperty(this, "setDate", function (date) {
    var newdate = _this.formatDate(date);

    _this.dateText = newdate;
  });

  _defineProperty(this, "setAuthor", function (category) {
    _this.authorText = category;
  });

  _defineProperty(this, "setImageurl", function (url) {
    _this.imageurlText = url;
  });

  _defineProperty(this, "setContent", function (content) {
    _this.contentText = content;
  });

  _defineProperty(this, "setDescription", function (description) {
    _this.descriptionText = description;
  });

  _defineProperty(this, "formatDate", function (date) {
    var tempDate = new Date(date);
    var month = tempDate.toLocaleString('default', {
      month: 'long'
    });
    var year = tempDate.getFullYear();
    var day = tempDate.getDay();
    return "".concat(day, " ").concat(month, " ").concat(year);
  });

  this.sourceText = "";
  this.dateText = "";
  this.authorText = "";
  this.imageurlText = "";
  this.contentText = "";
  this.descriptionText = "";
};

exports.object = object;
new _model.model();
