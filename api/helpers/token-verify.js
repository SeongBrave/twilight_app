const jwt = require('jsonwebtoken')
const tokenSecret = 'secretissecret'
module.exports = {


  friendlyName: 'Token verify',


  description: '',


  inputs: {
    token: {
      description: 'this is payload',
      type: 'string'
    },
  },


  exits: {

  },

  fn: async function (inputs, exits) {
    try {
      return exits.success(jwt.verify(inputs.token, tokenSecret));
    } catch (error) {
      const emap = new Map([
        ['TokenExpiredError', 'token超时'],
        ['JsonWebTokenError', 'token错误'],
        ['NotBeforeError', 'token不存在']
      ])
      throw Error(emap.get(error.name) || 'token验证错误')
    }
  }
};
