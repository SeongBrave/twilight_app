module.exports = {


  friendlyName: 'Delete',


  description: 'Delete product.',


  inputs: {
    id: {
      required: true,
      description: 'this is product id',
      type: 'string'
    }
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
    var product = await Product.destroy({
      id: inputs.id
    }).fetch();
    if (product.length > 0) {
      return exits.success({
        msg: "删除成功啦",
        obj: product[0]
      });
    } else {
      return exits.noError('未删除' + inputs.id + '的商品')
    }
  }


};
