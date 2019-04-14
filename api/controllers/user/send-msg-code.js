module.exports = {


  friendlyName: 'Login',


  description: 'Login user.',


  inputs: {
    phone: {
      type: 'string',
      unique: true,
      description: '用户手机号',
      maxLength: 100,
      example: '18700000000'
    },
  },

  exits: {
    success: {
      description: 'Returns ok response from api/responses/ok.js',
      responseType: 'ok'
    },
  },
  fn: async function (inputs, exits) {
    const {
      res,
      req
    } = this
    const {
      phone
    } = inputs
    // let user = await User.findOne({
    //   phone: phone,
    // });
    if (!phone) {
      return res.serverError({
        msg: '输入用户名不能为空',
        code: '20021'
      })
    }
    // if (!user) {
    //   return res.serverError({
    //     msg: '用户不存在',
    //     code: '20022'
    //   })
    // }
    let msgCode = parseInt(Math.random() * 9000 + 1000)
    req.session.verfyObj = {
      msgCode,
      phone
    }
    return exits.success({
      phone,
      msgCode
    });
  }


};
