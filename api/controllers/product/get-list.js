module.exports = {


  friendlyName: 'Get list',


  description: '',


  inputs: {
    id : {
      description : 'this is product id',
      type : 'string'
    },
    page : {
      description : 'this is skip',
      type : 'number'
    },
    pageSize : {
      description : 'this is skip',
      type : 'number'
    },
  },


  exits: {
    success: {
      description: 'Returns ok response from api/responses/ok.js',
      responseType: 'ok'
    }
  },


  fn: async function (inputs, exits) {
    var limit = inputs.pageSize || 10;
    var skip =  (inputs.page||1 - 1) * limit;
    console.log('skip',skip);
    console.log('limit',limit);
     var product = await Product.find({
       where:{id:inputs.id},
       skip ,
       limit,
       sort: 'createdAt DESC'
     });
     if (product) {
       return exits.success(product);
     }else{
        throw "还没有商品信息呢";
     }

  }


};
