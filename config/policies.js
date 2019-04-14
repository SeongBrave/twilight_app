/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  'user/delete': 'isAdmin',
  'user/get-all': 'isAdmin',
  'product/add-list': 'isAdmin',
  'product/get-admin-list': 'isAdmin',
  'product/get-token-list': 'isLoggedIn',
  'product/delete': 'isAdmin',
  'product/update': 'isAdmin',

};
