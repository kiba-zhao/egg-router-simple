/**
 * @fileOverview app worker入口
 * @name app.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const Router = require('./lib/router');

module.exports = app => {

  const router = new Router(app);

  app.router.simple = (...args) => {
    return router.simple(...args);
  };
};
