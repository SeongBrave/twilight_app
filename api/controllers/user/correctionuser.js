module.exports = {


  friendlyName: 'Correctionuser',


  description: 'Correctionuser user.',


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
        headers: {
          token
        }
      }
    } = this
    if (!token) return res.serverError({
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
    let rusr = { ...user1,
      token
    }
    delete rusr.password
    return exits.success(rusr);
  }
};
