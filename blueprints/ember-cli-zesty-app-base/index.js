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
        { name: 'ember-cli-eslint' },
        { name: 'ember-cli-template-lint' },
        { name: 'ember-concurrency' },
        { name: 'ember-test-selectors' },
        { name: 'ember-cli-sass' }
      ],
      blueprintOptions: {
        saveDev: true
      }
    }).then(function() {
      return blueprint.addPackagesToProject([
        { name: 'ember-cli-deploy' }
      ])
    }).then(function() {
      safeUnlinkSync(path.join(project.root, '.jscsrc'));
      safeUnlinkSync(path.join(project.root, '.travis.yml'));

      return blueprint.removePackagesFromProject([
        { name: 'ember-ajax' },
        { name: 'ember-suave' },
        { name: 'ember-welcome-page' },
        { name: 'babel-eslint' },
        { name: 'ember-cli-envy' }
      ]);
    }).then(function() {
      return blueprint.addAddonToProject('ember-cli-deploy-zesty-pack');
    });
  }
};
