/**
 * serverError.js
 *
 * A custom response.
 *
 * Example usage:
 * ```
 *     return res.serverError();
 *     // -or-
 *     return res.serverError(optionalData);
 * ```
 *
 * Or with actions2:
 * ```
 *     exits: {
 *       somethingHappened: {
 *         responseType: 'serverError'
 *       }
 *     }
 * ```
 *
 * ```
 *     throw 'somethingHappened';
 *     // -or-
 *     throw { somethingHappened: optionalData }
 * ```
 */

module.exports = function serverError(optionalData) {
  const res = this.res;
  // Define the status code to send in the response.
  const statusCodeToSet = 200;
  let ret = {
    msg: '未知错误',
    status: 100010
  }
  if (optionalData instanceof Error) {
    _.merge(ret, {
      msg: optionalData.message,
      status: 100010
    })
  } else if (typeof optionalData === `string`) {
    _.merge(ret, {
      msg: optionalData,
      status: 200010
    })
  } else if (typeof optionalData === `object`) {
    _.merge(ret, {
      msg: optionalData.msg || optionalData.message,
      status: optionalData.code || 200010
    })
  }
  return res.status(statusCodeToSet).send(ret);
}
