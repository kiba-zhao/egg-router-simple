/**
 * @fileOverview 路由类
 * @name router.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const assert = require('assert');
const { isString, isArray } = require('lodash');

class RouterSimple {

  constructor(app) {
    this.app = app;
  }

  simple(...args) {

    assert(args.length >= 1, 'need more than 2 args');

    const _args = args.slice(0);
    const path = _args.shift();
    if (isArray(path)) {
      for (const p of path) {
        this.simple(p, ..._args);
      }
      return;
    }
    assert(isString(path), 'path must be a string');

    const name = _args.pop();
    assert(isString(name), 'service key must be a string');

    const router = this.app.router;
    router.all(path, ..._args, resourcesMiddleware(name));
    router.all(`${path}/:id`, ..._args, resourceMiddleware(name));
  }

}

module.exports = RouterSimple;

const HEADER_CONTENT_LENGTH = 'Content-length';
const HEADER_CONTENT_TYPE = 'Content-Type';
const CONTENT_TYPE_JSON = 'application/json; charset=utf-8';
const METHOD_GET = 'get';
const METHOD_POST = 'post';
const METHOD_PUT = 'put';
const METHOD_PATCH = 'patch';
const METHOD_DELETE = 'delete';
const METHOD_HEAD = 'head';
const METHOD_OPTIONS = 'options';
const OPTIONS_SEQ = ', ';
function resourcesMiddleware(serviceName) {

  let options_headers = null;
  return async (ctx, next) => {
    const service = ctx.service[serviceName];
    const method = ctx.method.toLowerCase();

    if (method === METHOD_OPTIONS) {
      if (!options_headers) {
        const options = [ METHOD_OPTIONS.toUpperCase() ];
        if (service.deleteAll) { options.push(METHOD_DELETE.toUpperCase()); }
        if (service.find) { options.push(METHOD_GET.toUpperCase()); }
        if (service.createOne) {
          options.push(METHOD_POST.toUpperCase());
        }
        options_headers = { Allow: options.join(OPTIONS_SEQ) };
      }
      ctx.set(options_headers);
      ctx.status = 200;
      return;
    }

    let action = service.find;
    let args = null;
    let status = 200;
    switch (method) {
      case METHOD_DELETE:
        action = service.deleteAll;
        status = 204;
      /* falls through */
      case METHOD_GET:
        args = [ ctx.query, ctx.params ];
        break;
      /* falls through */
      case METHOD_POST:
        action = service.createOne;
        status = 201;
        args = [ ctx.request.body, ctx.params ];
      /* falls through */
      default:
    }

    if (args) {
      const res = await action.call(service, ...args);
      if (!res) { return; }
      ctx.status = status;
      if (status !== 204) { ctx.body = res; }
    } else {
      next();
    }

  };

}


function resourceMiddleware(serviceName) {

  let options_headers = null;
  return async (ctx, next) => {

    const service = ctx.service[serviceName];
    const method = ctx.method.toLowerCase();

    if (method === METHOD_OPTIONS) {
      if (!options_headers) {
        const options = [ METHOD_OPTIONS.toUpperCase() ];
        if (service.deleteOne) { options.push(METHOD_DELETE.toUpperCase()); }
        if (service.findOne) {
          options.push(METHOD_GET.toUpperCase());
          options.push(METHOD_HEAD.toUpperCase());
        }
        if (service.replaceOne) {
          options.push(METHOD_PUT.toUpperCase());
        }
        if (service.updateOne) {
          options.push(METHOD_PATCH.toUpperCase());
        }
        options_headers = { Allow: options.join(OPTIONS_SEQ) };
      }
      ctx.set(options_headers);
      ctx.status = 200;
      return;
    }

    let action = null;
    let args = null;
    let status = 200;
    const { id, ...opts } = ctx.params;
    switch (method) {
      case METHOD_DELETE:
        action = service.deleteOne;
        status = 204;
      /* falls through */
      case METHOD_HEAD:
      /* falls through */
      case METHOD_GET:
        action = action || service.findOne;
        args = [{ ...ctx.query, id }, opts ];
        break;
      /* falls through */
      case METHOD_PATCH:
        action = service.updateOne;
        args = [{ ...ctx.request.body }, { ...ctx.query, id }, opts ];
        break;
      /* falls through */
      case METHOD_PUT:
        action = service.replaceOne;
        args = [{ ...ctx.request.body, id }, { ...ctx.query, id }, opts ];
      /* falls through */
      default:
    }

    if (args) {
      const res = await action.call(service, ...args);
      if (!res) { return; }
      ctx.status = status;
      if (METHOD_HEAD === method) {
        const buffer = Buffer.from(JSON.stringify(res));
        ctx.set({
          [HEADER_CONTENT_TYPE]: [ CONTENT_TYPE_JSON ],
          [HEADER_CONTENT_LENGTH]: buffer.byteLength,
        });
      } else if (status !== 204) { ctx.body = res; }
    } else {
      next();
    }

  };

}
