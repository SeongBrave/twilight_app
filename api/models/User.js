/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
var moment = require('moment');
module.exports = {

  attributes: {
    username: {
      type: 'string',
      description: 'Full representation of the user\'s name',
      maxLength: 120,
      example: 'Lisa Microwave van der Jenny'
    },
    password: {
      type: 'string',
      description: 'Securely hashed representation of the user\'s login password.',
      protect: true,
      example: '2$28a8eabna301089103-13948134nad'
    },
    phone: {
      type: 'string',
      unique: true,
      description: '用户手机号',
      maxLength: 100,
      example: '18700000000'
    },
    wechat: {
      type: 'string',
      description: '微信号',
      maxLength: 100,
      example: '18700000000'
    },
    email: {
      type: 'string',
      isEmail: true,
      maxLength: 200,
      example: 'carol.reyna@microsoft.com'
    },
    userType: {
      type: 'number',
      description: '用户类型 0为普通用户 ，1 管理员用户，2其它',
      example: 0
    },
    logout: {
      type: 'boolean',
      description: '登出操作',
      defaultsTo: false,
    },
    regFromType: {
      type: 'number',
      description: '注册来源 0:mobile,1:H5,2:Web',
      example: 0
    },
    tosAcceptedByIp: {
      type: 'string',
      description: 'The IP (ipv4) address of the request that accepted the terms of service.',
      extendedDescription: 'Useful for certain types of businesses and regulatory requirements (KYC, etc.)',
      moreInfoUrl: 'https://en.wikipedia.org/wiki/Know_your_customer'
    },
  },
  customToJSON: function () {
    // var obj = this;
    // delete obj.password;

    const obj = Object.assign({}, this)

    // delete password property
    delete obj.password
    const createdAt = moment(obj.createdAt).format("YYYY/MM/DD");
    const updatedAt = moment(obj.updatedAt).format("YYYY/MM/DD");
    // return user object
    return obj
    return _.omit(this, ['password', 'ssn'])
  }

};
