module.exports = {


  friendlyName: 'Add',


  description: 'Add product.',


  inputs: {

  },


  exits: {
    success: {
      description: 'Returns ok response from api/responses/ok.js',
      responseType: 'ok'
    }
  },

  fn: async function (inputs, exits) {
    var body = this.req.body;
    var product = await Product.create({
        desc: body.desc,
        pdname: body.pdname,
        attr: body.attr,
        imageurl: body.imageurl,
        uri: body.uri
      }).intercept('E_UNIQUE', (err) => {
        return 'pinAlreadyInUse';
      })
      .intercept('UsageError', (err) => {
        return 'invalid';
      })
      .fetch();
    return exits.success(product);

  }


};
