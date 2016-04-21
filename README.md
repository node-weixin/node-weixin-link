# node-weixin-link [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]


微信推广API

微信推广API是([node-weixin-api](https://github.com/node-weixin/node-weixin-api) 或者 [node-weixin-express](https://github.com/node-weixin/node-weixin-express))的一个子项目。
它提供:

1. 推广API共提供两类4个方法

  A.

  qrcode.temporary.create ： 创建临时二维码

  qrcode.permanent.create ： 创建永久二维码

  qrcode.permanent.stringCreate ： 创建永久字符串二维码

  B.

  url.shorten ： 创建url短链接



交流QQ群: 39287176

注:

 [node-weixin-express](https://github.com/node-weixin/node-weixin-express)是基于node-weixin-*的服务器端参考实现。

 [node-weixin-api](https://github.com/node-weixin/node-weixin-api)是基于node-weixin-*的API接口SDK。

 它们都是由下列子项目组合而成:

 1. [node-weixin-config](https://github.com/node-weixin/node-weixin-config)
    用于微信配置信息的校验

 2. [node-weixin-auth](https://github.com/node-weixin/node-weixin-auth)
    用于与微信服务器握手检验

 3. [node-weixin-util](https://github.com/node-weixin/node-weixin-util)
    一些常用的微信请求，加密，解密，检验的功能与处理

 4. [node-weixin-request](https://github.com/node-weixin/node-weixin-request)
    微信的各类服务的HTTP请求的抽象集合

 5. [node-weixin-oauth](https://github.com/node-weixin/node-weixin-oauth)
    微信OAuth相关的操作

 6. [node-weixin-pay](https://github.com/node-weixin/node-weixin-pay)
    微信支付的服务器接口

 7. [node-weixin-jssdk](https://github.com/node-weixin/node-weixin-jssdk)
    微信JSSDK相关的服务器接口

 8. [node-weixin-menu](https://github.com/node-weixin/node-weixin-menu)
    微信菜单相关的操作与命令

 9. [node-weixin-media](https://github.com/node-weixin/node-weixin-media)
    微信多媒体相关的操作

 10. [node-weixin-user](https://github.com/node-weixin/node-weixin-user)
    微信用户相关的操作与命令

 11. [node-weixin-link](https://github.com/node-weixin/node-weixin-link)
    微信推广相关的操作

## Install

```sh
$ npm install --save node-weixin-link
```


## Usage

```js
var link = require('node-weixin-link');

var app = {
  id: process.env.APP_ID,
  secret: process.env.APP_SECRET,
  token: process.env.APP_TOKEN
};
var auth = require("node-weixin-auth");
var config = require("node-weixin-config");
config.app.init(app);

```

1. 创建临时二维码

```js
link.qrcode.temporary.create(settings, app, auth, 10, function (error, json) {
  //json.url
  //json.expire_seconds
  //json.ticket
});
```
2. 创建永久二维码

```js
link.qrcode.permanent.create(settings, app, auth, 10, function (error, json) {
  //json.url
  //json.ticket
});
```

3. 创建永久字符串二维码

```js
link.qrcode.permanent.createString(settings, app, auth, 'heleoodo', function (error, json) {
  //json.url
  //json.ticket
});
```

4. 创建url短链接

```js
var url = 'http://mp.weixin.qq.com/wiki/3/17e6919a39c1c53555185907acf70093.html';
link.url.shorten(settings, app, auth, url, function (error, json) {
  //json.short_url
});  
```


## License

Apache-2.0 © [calidion](calidion.github.io)


[npm-image]: https://badge.fury.io/js/node-weixin-link.svg
[npm-url]: https://npmjs.org/package/node-weixin-link
[travis-image]: https://travis-ci.org/node-weixin/node-weixin-link.svg?branch=master
[travis-url]: https://travis-ci.org/node-weixin/node-weixin-link
[daviddm-image]: https://david-dm.org/node-weixin/node-weixin-link.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/node-weixin/node-weixin-link
[coveralls-image]: https://coveralls.io/repos/node-weixin/node-weixin-link/badge.svg
[coveralls-url]: https://coveralls.io/r/node-weixin/node-weixin-link
