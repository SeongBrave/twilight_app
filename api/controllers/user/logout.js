module.exports = {


  friendlyName: 'Login',


  description: 'Login user.',


  inputs: {

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
      req,
      req: {
        session: {
          user
        },
        headers: {
          token
        }
      }
    } = this
    if (!token || !user) return res.serverError({
      msg: '用户已经退出',
      code: '20041'
    })
    const decryptedSessionStorageToken = await sails.helpers.tokenVerify(token)
    const user1 = await User.findOne({
      id: decryptedSessionStorageToken.id
    })
    if (user1.logout) {
      return res.serverError({
        code: '20042',
        msg: '用户已经退出了'
      })
    }

    //更新登陆状态
    let uuser = await User.updateOne({
        id: user1.id
      })
      .set({
        logout: true
      })
    req.session.user = uuser

    return exits.success('退出成功');
  }
};
