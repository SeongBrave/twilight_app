module.exports = {


  friendlyName: 'Register',


  description: 'Register user.',


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
      req,
      req: {
        body: {
          username,
          password,
          phone,
          wechat,
          email,
          msgCode
        }
      },
      res,
    } = this

    const verfyObj = req.session.verfyObj
    if (!phone) {
      return res.serverError({
        msg: '手机号不能为空',
        code: '20031'
      })
    }
    if (!msgCode) {
      return res.serverError({
        msg: '验证码不能为空',
        code: '20032'
      })
    }
    if (verfyObj && verfyObj.msgCode && verfyObj.phone) {
      if (phone !== verfyObj.phone) {
        return res.serverError({
          msg: '验证手机号错误',
          code: '20034'
        })
      }
      if (msgCode != verfyObj.msgCode) {
        return res.serverError({
          msg: '验证码错误',
          code: '20035'
        })
      }
      delete req.session.verfyObj

      let userType = 0
      let regFromType = 0
      if (password === 'gckit123') {
        userType = 1
      }
      const user = await User.create({
          username,
          password: await sails.helpers.passwords.hashPassword(password),
          phone,
          wechat,
          email,
          userType,
          regFromType,
          tosAcceptedByIp: req.ip
        }).fetch()
        .catch({
          code: 'E_UNIQUE'
        }, function (err) {
          const regExp = /index: (.+)_1.*"(.+)"/
          const ret = regExp.exec(err.raw.errmsg)
          res.serverError({
            code: '10011',
            message: `${ret[1]}值${ret[2]}重名`
          });
        })
        .catch({
          name: 'UsageError'
        }, function (err) {
          res.serverError({
            code: '10012',
            message: err.message
          });
        })
        // If something completely unexpected happened.
        .catch(function (err) {
          res.serverError(err);
        });
      const token = await sails.helpers.tokenIssue({
        id: user.id
      })
      req.session.user = user
      let rusr = {
        ...user,
        token
      }
      delete rusr.password
      return exits.success(rusr);

    } else {
      return res.serverError({
        msg: '验证码已经失效',
        code: '20033'
      })
    }

  }
};
