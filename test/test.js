'use strict';
var assert = require('assert');
var validator = require('validator');
var link = require('../');

describe('node-weixin-link node module', function () {
  var app = {
    id: process.env.APP_ID,
    secret: process.env.APP_SECRET,
    token: process.env.APP_TOKEN
  };
  var auth = require("node-weixin-auth");
  var config = require("node-weixin-config");
  config.app.init(app);

  it('should be able to create a temporary qrcode', function (done) {
    link.qrcode.temporary.create(app, auth, 10, function (error, json) {
      assert.equal(true, validator.isURL(json.url));
      assert.equal(true, json.expire_seconds <= 7 * 3600 * 24);
      assert.equal(true, typeof json.ticket === 'string');
      done();
    });
  });

  it('should be able to create a permanent qrcode', function (done) {

    link.qrcode.permanent.create(app, auth, 10, function (error, json) {
      assert.equal(true, validator.isURL(json.url));
      assert.equal(true, typeof json.ticket === 'string');
      done();
    });
  });

  it('should be able to create a permanent string qrcode', function (done) {
    link.qrcode.permanent.createString(app, auth, 'heleoodo', function (error, json) {
      assert.equal(true, validator.isURL(json.url));
      assert.equal(true, typeof json.ticket === 'string');
      done();
    });
  });

  it('should be able to shorten a url', function (done) {
    var url = 'http://mp.weixin.qq.com/wiki/3/17e6919a39c1c53555185907acf70093.html';
    link.url.shorten(app, auth, url, function (error, json) {
      assert.equal(true, validator.isURL(json.short_url));
      assert.equal(true, json.errcode === 0);
      assert.equal(true, json.errmsg === 'ok');
      assert.equal(true, json.short_url.length < url.length);
      done();
    });
  });
});
