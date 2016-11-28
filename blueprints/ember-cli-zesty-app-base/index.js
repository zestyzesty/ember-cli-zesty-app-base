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

    return blueprint.addAddonsToProject({
      packages: [
        { name: 'ember-cli-eslint', target: '^2.0.0' },
        { name: 'ember-cli-template-lint', target: '^0.4.12' },
        { name: 'ember-concurrency', target: '^0.7.15' },
        { name: 'ember-test-selectors', target: '^0.0.3' },
        { name: 'ember-cli-sass', target: '^5.5.0' }
      ],
      blueprintOptions: {
        saveDev: true
      }
    }).then(function() {
      return blueprint.addPackagesToProject([
        { name: 'ember-cli-deploy', target: '^0.6.4' }
      ])
    }).then(function() {
      safeUnlinkSync(path.join(project.root, '.jscsrc'));
      safeUnlinkSync(path.join(project.root, '.travis.yml'));

      return blueprint.removePackagesFromProject([
        { name: 'ember-ajax' },
        { name: 'ember-suave' },
        { name: 'ember-welcome-page' },
        { name: 'babel-eslint' }
      ]);
    }).then(function() {
      return blueprint.addAddonToProject('ember-cli-deploy-zesty-pack');
    });
  }
};
