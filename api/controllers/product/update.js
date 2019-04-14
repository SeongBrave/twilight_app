module.exports = {


  friendlyName: 'Update',


  description: 'Update product.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs, exits) {
    var body = this.req.body;
    var product = await Product.update({
        id: body.id
      })
      .set({
        desc: body.desc,
        pdname: body.pdname,
        attr: body.attr,
        imageurl: body.imageurl,
        uri: body.uri
      })
      .fetch();
    return exits.success(product);
  }
};
