'use strict';
var request = require("node-weixin-request");
var util = require("node-weixin-util");
var baseUrl = 'https://api.weixin.qq.com/cgi-bin/qrcode/';

module.exports = {
  qrcode: {
    temporary: {
      create: function (app, auth, id, cb) {
        auth.determine(app, function () {
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
              access_token: app.auth.accessToken
            });
          request.json(url, data, cb);
        });
      }
    },
    permanent: {
      create: function (app, auth, id, cb) {
        auth.determine(app, function () {
          var data = {
            action_name: "QR_LIMIT_SCENE",
              action_info: {
              scene: {
                scene_id: id
              }
            }
          };
          var url = baseUrl + 'create' + '?' + util.toParam({
              access_token: app.auth.accessToken
            });
          request.json(url, data, cb);
        });
      },
      createString: function (app, auth, string, cb) {
        auth.determine(app, function () {
          var data = {
            action_name: "QR_LIMIT_STR_SCENE",
            action_info: {
              scene: {
                scene_str: string
              }
            }
          };
          var url = baseUrl + 'create' + '?' + util.toParam({
              access_token: app.auth.accessToken
            });
          request.json(url, data, cb);
        });
      }
    }
  },
  url: {
    shorten: function (app, auth, longUrl, cb) {
      auth.determine(app, function () {
        var data = {
          action: 'long2short',
          long_url: longUrl
        };
        var url = 'https://api.weixin.qq.com/cgi-bin/shorturl?' + util.toParam({
            access_token: app.auth.accessToken
          });
        request.json(url, data, cb);
      });
    }
  }
};
