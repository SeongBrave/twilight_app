module.exports = {


  friendlyName: 'Login',


  description: 'Login user.',


  inputs: {
    password: {
      required: true,
      type: 'string',
      maxLength: 200,
      example: 'passwordlol',
      description: 'The unencrypted password to use for the new account.'
    },
    username: {
      type: 'string',
      description: 'Full representation of the user\'s name',
      unique: true,
      maxLength: 120,
      example: 'Lisa Microwave van der Jenny'
    },
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
    noError: {
      statusCode: 200,
      responseType: 'serverError',
      description: 'The provided email address is already in use.',
    },

  },
  fn: async function (inputs, exits) {
    const {
      res,
      req
    } = this
    const {
      username,
      phone,
      password
    } = inputs
    let user = null
    if (username) {
      user = await User.findOne({
        username: username,
      });
    } else if (phone) {
      user = await User.findOne({
        phone: phone,
      });
    } else {
      return res.serverError({
        msg: '输入用户名不能为空',
        code: '20021'
      })
    }
    if (!user) {
      return res.serverError({
        msg: '用户不存在',
        code: '20022'
      })
    }
    await sails.helpers.passwords.checkPassword(password, user.password).catch((err) => {
      return res.serverError({
        code: 20023,
        msg: '密码错误'
      })
    })
    const token = await sails.helpers.tokenIssue({
      id: user.id
    })
    //更新登陆状态
    let uuser = await User.updateOne({
        id: user.id
      })
      .set({
        logout: false
      })
    req.session.user = uuser
    let rusr = { ...uuser,
      token
    }
    delete rusr.password
    return exits.success(rusr);
  }
};
