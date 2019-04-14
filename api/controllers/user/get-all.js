module.exports = {


  friendlyName: 'Get all',


  description: '',


  inputs: {

  },


  exits: {
    success: {
      description: 'Returns ok response from api/responses/ok.js',
      responseType: 'ok'
    }
  },


  fn: async function (inputs, exits) {
    var users = await User.find();
    return exits.success(users);
  }


};
