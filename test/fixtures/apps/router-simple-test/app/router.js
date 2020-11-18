'use strict';

module.exports = app => {
  const { router } = app;

  router.simple('/simple', 'simple');
};
