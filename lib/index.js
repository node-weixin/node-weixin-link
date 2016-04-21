'use strict';
/* eslint camelcase: [2, {properties: "never"}] */

var request = require('node-weixin-request');
var util = require('node-weixin-util');
var auth = require('node-weixin-auth');

var baseUrl = 'https://api.weixin.qq.com/cgi-bin/qrcode/';

function send(settings, app, url, data, cb) {
  auth.determine(settings, app, function () {
    settings.get(app.id, 'auth', function (authData) {
      url += util.toParam({
        access_token: authData.accessToken
      });
      request.json(url, data, cb);
    });
  });
}

module.exports = {
  qrcode: {
    temporary: {
      create: function (settings, app, id, cb) {
        var data = {
          expire_seconds: 604800,
          action_name: 'QR_SCENE',
          action_info: {
            scene: {
              scene_id: id
            }
          }
        };
        send(settings, app, baseUrl + 'create?', data, cb);
      }
    },
    permanent: {
      create: function (settings, app, id, cb) {
        var data = {
          action_name: 'QR_LIMIT_SCENE',
          action_info: {
            scene: {
              scene_id: id
            }
          }
        };
        send(settings, app, baseUrl + 'create?', data, cb);
      },
      createString: function (settings, app, string, cb) {
        var data = {
          action_name: 'QR_LIMIT_STR_SCENE',
          action_info: {
            scene: {
              scene_str: string
            }
          }
        };
        send(settings, app, baseUrl + 'create?', data, cb);
      }
    }
  },
  url: {
    shorten: function (settings, app, longUrl, cb) {
      var data = {
        action: 'long2short',
        long_url: longUrl
      };
      send(settings, app, 'https://api.weixin.qq.com/cgi-bin/shorturl?', data, cb);
    }
  }
};
