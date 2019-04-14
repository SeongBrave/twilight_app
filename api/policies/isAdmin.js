// policies/isLoggedIn.js
module.exports = async function (req, res, proceed) {

  // If `req.me` is set, then we know that this request originated
  // from a logged-in user.  So we can safely proceed to the next policy--
  // or, if this is the last policy, the relevant action.
  // > For more about where `req.me` comes from, check out this app's
  // > custom hook (`api/hooks/custom/index.js`).
  const token = req.headers['token']
  if (!token) return res.serverError('没有权限')
  try {
    const decryptedSessionStorageToken = await sails.helpers.tokenVerify(token)
    const user = await User.findOne({
      id: decryptedSessionStorageToken.id
    })
    if (user.logout) {
      return res.serverError({
        code: '2010',
        msg: '用户已经退出了'
      })
    }
    if (user.userType !== 1) {
      return res.serverError({
        code: '2012',
        msg: '只有管理员才有该权限'
      })
    }
    return proceed()
  } catch (error) {
    return res.serverError(error)
  }
};
