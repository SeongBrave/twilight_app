module.exports = {


  friendlyName: 'Find one',


  description: '',


  inputs: {
    id : {
      required: true,
      description : 'this is id',
      type : 'string'
    },
  },


  exits: {
    success: {
      description: 'Returns ok response from api/responses/ok.js',
      responseType: 'ok'
    },
    noError: {
      statusCode: 200,
      responseType: 'serverError',
      description: 'The provided email address is already in use.',
    },
  },


  fn: async function (inputs, exits) {
    var product = await Product.findOne({id:inputs.id});
    if (product) {
      return exits.success(product);
    }else{
      return exits.noError('未找到对应的商品');
    }
  }


};
