# egg-router-simple

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-router-simple.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-router-simple
[travis-image]: https://img.shields.io/travis/eggjs/egg-router-simple.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-router-simple
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-router-simple.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-router-simple?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-router-simple.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-router-simple
[snyk-image]: https://snyk.io/test/npm/egg-router-simple/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-router-simple
[download-image]: https://img.shields.io/npm/dm/egg-router-simple.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-router-simple

<!--
Description here.
-->

## 依赖说明

### 依赖的 egg 版本

egg-router-simple 版本 | egg 1.x
--- | ---
1.x | 😁
0.x | ❌

### 依赖的插件
<!--

如果有依赖其它插件，请在这里特别说明。如

- security
- multipart

-->

## 开启插件

```js
// config/plugin.js
exports.routerSimple = {
  enable: true,
  package: 'egg-router-simple',
};
```

## 使用场景

- 通过router设置使用接口需要使用的service业务函数，避免书写大量重复的controller代码文件

### 路由設置 ###

``` javascript
// app/router.js

module.exports = app => {
  const { router } = app;

  router.simple('/simple', 'simple');
};


```

同等于如下代码功能：

``` javascript
// app/router.js
module.exports = app => {
    const { router, controller } = app;

    // 列出所有资源
    if(controller.simple.index)
        router.get('/simples', controller.simple.index);
    // 新建一个资源
    if(controller.simple.post)
        router.post('/simples', controller.simple.post);
    // 获取一个资源内容
    if(controller.simple.get)
        router.get('/simples/:id', controller.simple.get);
    // 更新一个资源内容
    if(controller.simple.put)
        router.put('/simples/:id', controller.simple.put);
    // 更新一个资源的部分内容
    if(controller.simple.patch)
        router.patch('/simples/:id', controller.simple.patch);
    // 删除某个资源
    if(controller.simple.delete)
        router.delete('/simples/:id', controller.simple.delete);
    // 删除所有资源
    if(controller.simple.clean)
        router.delete('/simples', controller.simple.clean);
    // 获取某个资源的元信息(返回数据格式，内容大小)
    if(controller.simple.head)
        router.head('/simples/:id', controller.simple.head);
    // 获取某个资源的相关信息
    if(controller.simple.options)
        router.options('/simples/:id', controller.simple.options);
    // 获取资源的相关信息
    if(controller.simple.allow)
        router.options('/simples', controller.simple.allow);
};



// app/controller/simple.js
const { Controller } = require('egg');
const OPTIONS = Symbol('CONTROLLER_OPTIONS');
const ALLOW_OPTIONS = Symbol('CONTROLLER_ALLOW_OPTIONS');

class SimpleController extends Controller {

    constructor(...args){
        super(...args);

        const options = ['OPTIONS'];
        const allow_options = options.slice(0);

        if(this.index)
            allow_options.push('GET');
        if(this.clean)
            allow_options.push('DELETE');
        if(this.post)
            allow_options.push('POST');

        if(this.get)
            options.push('GET');
        if(this.head)
            options.push('HEAD');
        if(this.put)
            options.push('PUT');
        if(this.patch)
            options.push('PATCH');
        if(this.delete)
            options.push('DELETE');

        this[OPTIONS] = options.join(', ');
        this[ALLOW_OPTIONS] = allow_options.join(', ');
    }

   /**
    * 列出所有资源
    */
    async index(){
        const { ctx } = this;
        const res = await ctx.service.simple.find(ctx.query,ctx.params);
        ctx.body = res;
    }

  /**
   * 新建一个资源
   */
    async post() {
        const { ctx } = this;
        const res = await ctx.service.simple.createOne(ctx.request.body,ctx.params);
        if (!res) { return; }
        ctx.body = res;
        ctx.status = 201;
    }

  /**
   * 获取一个资源内容
   */
    async get() {
        const { ctx } = this;
        const {id,...opts} = ctx.params;
        const res = await ctx.service.simple.findOne({...ctx.query,id},opts);
        if (!res) { return; }
        ctx.body = res;
    }

   /**
    * 更新某个资源内容
    */
    async put() {
        const { ctx } = this;
        const {id,...opts} = ctx.params;
        const res = await ctx.service.simple.replaceOne({...ctx.request.body,id},{...ctx.query,id},opts);
        if (!res) { return; }
        ctx.body = res;
        ctx.status = 200;
    }

   /**
    * 更新某个资源的部分内容
    */
    async patch() {
        const { ctx } = this;
        const {id,...opts} = ctx.params;
        const res = await ctx.service.simple.updateOne(ctx.request.body,{...ctx.query,id},opts);
        if (!res) { return; }
        ctx.body = res;
        ctx.status = 200;
    }

   /**
    * 删除某个资源
    */
    async delete() {
        const { ctx } = this;
        const {id,...opts} = ctx.params;
        const res = await ctx.service.simple.deleteOne({...ctx.query,id},opts);
        if (!res) { return; }
        ctx.status = 204;
    }

   /**
    * 删除所有资源
    */
    async clean() {
        const { ctx } = this;
        const res = await ctx.service.simple.deleteAll(ctx.query,ctx.params);
        if (!res) { return; }
        ctx.status = 204;
    }

   /**
    * 获取某个资源的元信息(返回数据格式，内容大小)
    */
    async head() {
        const { ctx } = this;
        const {id,...opts} = ctx.params;
        const res = await ctx.service.simple.findOne({...ctx.query,id},opts);
        if (!res) { return; }
        const buffer = Buffer.form(JSON.stringify(res));
        ctx.set({
            'Content-Type': 'application/json; charset=utf-8',
            'Content-length': buffer.byteLength,
        });
        ctx.status = 200;
    }

   /**
    * 获取某个资源的相关信息
    */
    async options(){
        const { ctx } = this;
        ctx.set({
            'Allow': this[OPTIONS],
        });
        ctx.status = 200;
    }

   /**
    * 获取资源的相关信息
    */
    async allow(){
        const { ctx } = this;
        ctx.set({
            'Allow': this[ALLOW_OPTIONS],
        });
        ctx.status = 200;
    }

}

```


### 服務接口說明 ###

``` javascript
const { Service } = require('egg');
class SimpleService extends Service {

  /**
   * 列出匹配条件的所有资源
   * @param {Object} condition 匹配条件
   * @param {Object} opts 可选项
   */
   async find(condition,opts) {}

  /**
   * 获取一个匹配的资源
   * @param {Object} condition 匹配条件
   * @param {Object} opts 可选项   
   */
   async findOne(condition,opts) {}

  /**
   * 新建一个资源
   * @param {Object} entity 资源内容
   * @param {Object} opts 可选项      
   */
   async createOne(entity,opts) {}

  /**
   * 更新一个匹配资源的内容
   * @param {Object} entity 更新资源内容
   * @param {Object} condition 匹配条件
   * @param {Object} opts 可选项
   */
   async replaceOne(entity,condition,opts){}

  /**
   * 更新一个匹配资源的部分内容
   * @param {Object} entity 更新资源内容
   * @param {Object} condition 匹配条件
   * @param {Object} opts 可选项
   */
   async updateOne(entity,condition,opts){}

  /**
   * 销毁一个匹配的资源
   * @param {Object} condition 匹配条件
   * @param {Object} opts 可选项
   */
   async deleteOne(condition,opts) {}

  /**
   * 销毁匹配的所有资源
   * @param {Object} condition 匹配条件
   * @param {Object} opts 可选项
   */
   async deleteAll(condition,opts) {}

}

```

## 详细配置

请到 [config/config.default.js](config/config.default.js) 查看详细配置项说明。

## 单元测试

<!-- 描述如何在单元测试中使用此插件，例如 schedule 如何触发。无则省略。-->

## 提问交流

请到 [egg issues](https://github.com/kiba-zhao/egg-router-simple/issues) 异步交流。

## License

[MIT](LICENSE)
