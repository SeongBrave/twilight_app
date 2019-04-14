/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  '/': {
    view: 'pages/homepage'
  },


  'POST /api/v1/user/register': {
    action: 'user/register'
  },
  'POST /api/v1/user/login': {
    action: 'user/login'
  },
  'GET /api/v1/user/correctionuser': {
    action: 'user/correctionuser'
  },
  'POST /api/v1/user/logout': {
    action: 'user/logout'
  },
  'POST /api/v1/user/updatepassword': {
    action: 'user/update-password'
  },
  'POST /api/v1/user/sendmsgcode': {
    action: 'user/send-msg-code'
  },
  'POST /api/v1/user/verifycode': {
    action: 'user/verify-code'
  },
  'GET /api/v1/users': {
    action: 'user/get-all'
  },

  'GET /api/v1/products': {
    action: 'product/get-list'
  },
  'GET /api/v1/token/products': {
    action: 'product/get-token-list'
  },
  'GET /api/v1/admin/products': {
    action: 'product/get-admin-list'
  },
  'POST /api/v1/product/add': {
    action: 'product/add'
  },
  'POST /api/v1/product/addlist': {
    action: 'product/add-list'
  },
  'POST /api/v1/product/update': {
    action: 'product/update'
  },
  'GET /api/v1/product/id': {
    action: 'product/find-one'
  },
  'POST /api/v1/product/delete': {
    action: 'product/delete'
  },

};
