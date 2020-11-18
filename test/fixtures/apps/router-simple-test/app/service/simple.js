/**
 * @fileOverview 测试示例服务
 * @name simple.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

/* eslint-disable */
const { Service } = require('egg');

class SimpleService extends Service {

  /**
 * 列出匹配条件的所有资源
 * @param {Object} condition 匹配条件
 * @param {Object} opts 可选项
 */
  async find(condition, opts) {
    throw Error();
  }

  /**
   * 获取一个匹配的资源
   * @param {Object} condition 匹配条件
   * @param {Object} opts 可选项
   */
  async findOne(condition, opts) {
    throw Error();
  }

  /**
   * 新建一个资源
   * @param {Object} entity 资源内容
   * @param {Object} opts 可选项
   */
  async createOne(entity, opts) {
    throw Error();
  }

  /**
   * 更新一个匹配资源的内容
   * @param {Object} entity 更新资源内容
   * @param {Object} condition 匹配条件
   * @param {Object} opts 可选项
   */
  async replaceOne(entity, condition, opts) {
    throw Error();
  }

  /**
   * 更新一个匹配资源的部分内容
   * @param {Object} entity 更新资源内容
   * @param {Object} condition 匹配条件
   * @param {Object} opts 可选项
   */
  async updateOne(entity, condition, opts) {
    throw Error();
  }

  /**
   * 销毁一个匹配的资源
   * @param {Object} condition 匹配条件
   * @param {Object} opts 可选项
   */
  async deleteOne(condition, opts) {
    throw Error();
  }

  /**
   * 销毁匹配的所有资源
   * @param {Object} condition 匹配条件
   * @param {Object} opts 可选项
   */
  async deleteAll(condition, opts) {
    throw Error();
  }


}

module.exports = SimpleService;
/* eslint-disable */
