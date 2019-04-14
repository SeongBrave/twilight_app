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
    const {
      req: {
        body: {
          jsonList
        }
      }
    } = this
    const jlist = JSON.parse(jsonList)
    for (const model of jlist) {
      await Product.create({
          desc: model.desc,
          pdname: model.pdname,
          attr: model.attr,
          imageurl: model.imageurl,
          uri: model.uri
        }).intercept('E_UNIQUE', (err) => {
          return 'pinAlreadyInUse';
        })
        .intercept('UsageError', (err) => {
          return 'invalid';
        })
    }
    return exits.success('添加成功');
  }
};
