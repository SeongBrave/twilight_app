const jwt = require('jsonwebtoken')
const tokenSecret = 'secretissecret'

module.exports = {


  friendlyName: 'Token issue',


  description: '',


  inputs: {
    payload: {
      description: 'this is payload',
      type: 'ref'
    },

  },


  exits: {

  },


  fn: async function (inputs, exits) {
    return exits.success(jwt.sign(inputs.payload, tokenSecret, {
      expiresIn: '5m'
    }))

  }


};
