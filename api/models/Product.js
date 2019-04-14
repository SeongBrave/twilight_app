/**
 * Product.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    desc: {
      type: 'string',
      description: '商品描述',
      maxLength: 220,
      example: '荣耀9i 4GB+64GB 幻夜黑 移动联通电信4G全面屏手机 双卡双待'
    },
    pdname: {
      type: 'string',
      description: '品牌商',
      maxLength: 120,
      example: '华为'
    },
    attr: {
      type: 'string',
      description: '自定义字段',
      maxLength: 120,
      example: '4GB^64GB^5.84英'
    },
    uri: {
      type: 'string',
      description: '跳转路径',
      maxLength: 120,
      example: 'homevc'
    },
    imageurl: {
      type: 'string',
      description: '图片url',
      example: 'https://img12.360buyimg.com/n2/s240x240_jfs/t24199/102/894210890/231864/c3d58dbe/5b478f4aNb1f2d6bd.jpg!q70.jpg'
    },

  },

};
