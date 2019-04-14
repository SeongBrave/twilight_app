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
    msgCode: {
      type: 'number',
      description: '验证码',
    },
    password: {
      description: 'The new, unencrypted password.',
      example: 'abc123v2',
      required: true
    }
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
      phone,
      msgCode,
      password
    } = inputs
    const verfyObj = req.session.verfyObj
    if (!phone) {
      return res.serverError({
        msg: '手机号不能为空',
        code: '20051'
      })
    }
    if (!msgCode) {
      return res.serverError({
        msg: '验证码不能为空',
        code: '20052'
      })
    }
    if (verfyObj && verfyObj.msgCode && verfyObj.phone) {
      if (phone !== verfyObj.phone) {
        return res.serverError({
          msg: '验证手机号错误',
          code: '20054'
        })
      }
      if (msgCode !== verfyObj.msgCode) {
        return res.serverError({
          msg: '验证码错误',
          code: '20055'
        })
      }
      //更新密码
      await User.updateOne({
          phone: phone
        })
        .set({
          password: await sails.helpers.passwords.hashPassword(password)
        })
      delete req.session.verfyObj
      return exits.success('修改成功');
    } else {
      return res.serverError({
        msg: '验证码已经失效',
        code: '20053'
      })
    }
  }
};
