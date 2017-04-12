/* global require, module */
var fs = require('fs');
var path = require('path');
var existsSync = require('exists-sync');

function safeUnlinkSync(path) {
  if (existsSync(path)) {
    return fs.unlinkSync(path);
  }
}

module.exports = {
  name: 'ember-cli-zesty-app-base',

  normalizeEntityName: function() {},

  afterInstall: function() {
    var blueprint = this;
    var project = this.project;

    // Note that the order of these packages determines the order that their blueprints are run.
    return blueprint.addAddonsToProject({
      packages: [
        { name: 'ember-cli-deploy' },
        { name: 'ember-cli-deploy-zesty-pack' }, // Must run after ember-cli-deploy's blueprint.
        { name: 'ember-cli-sass' },
        { name: 'ember-cli-template-lint' },
        { name: 'ember-concurrency' },
        { name: 'ember-test-selectors' }
      ]
    }).then(function() {
      safeUnlinkSync(path.join(project.root, '.travis.yml'));

      return blueprint.removePackagesFromProject([
        { name: 'ember-ajax' },
        { name: 'ember-welcome-page' },
      ]);
    });
  }
};
