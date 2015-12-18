'use strict';
var request = require("node-weixin-request");
var util = require("node-weixin-util");
var auth = require('node-weixin-auth');
var settings = require('node-weixin-settings');

var baseUrl = 'https://api.weixin.qq.com/cgi-bin/qrcode/';

module.exports = {
  qrcode: {
    temporary: {
      create: function (app, id, cb) {
        auth.determine(app, function () {
          var authData = settings.get(app.id, 'auth');
          var data = {
            expire_seconds: 604800,
            action_name: "QR_SCENE",
            action_info: {
              scene: {
                scene_id: id
              }
            }
          };
          var url = baseUrl + 'create' + '?' + util.toParam({
              access_token: authData.accessToken
            });
          request.json(url, data, cb);
        });
      }
    },
    permanent: {
      create: function (app, id, cb) {
        auth.determine(app, function () {
          var authData = settings.get(app.id, 'auth');
          var data = {
            action_name: "QR_LIMIT_SCENE",
              action_info: {
              scene: {
                scene_id: id
              }
            }
          };
          var url = baseUrl + 'create' + '?' + util.toParam({
              access_token: authData.accessToken
            });
          request.json(url, data, cb);
        });
      },
      createString: function (app, string, cb) {
        auth.determine(app, function () {
          var authData = settings.get(app.id, 'auth');
          var data = {
            action_name: "QR_LIMIT_STR_SCENE",
            action_info: {
              scene: {
                scene_str: string
              }
            }
          };
          var url = baseUrl + 'create' + '?' + util.toParam({
              access_token: authData.accessToken
            });
          request.json(url, data, cb);
        });
      }
    }
  },
  url: {
    shorten: function (app, longUrl, cb) {
      auth.determine(app, function () {
        var authData = settings.get(app.id, 'auth');
        var data = {
          action: 'long2short',
          long_url: longUrl
        };
        var url = 'https://api.weixin.qq.com/cgi-bin/shorturl?' + util.toParam({
            access_token: authData.accessToken
          });
        request.json(url, data, cb);
      });
    }
  }
};
