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

    this.insertIntoFile('ember-cli-build.js', [
      '',
      '    babel: {',
      '      includePolyfill: true,',
      '    }',
      ''
    ].join('\n'), {
      after: '// Add options here\n'
    });

    return blueprint.addPackagesToProject([
      { name: 'babel-eslint' },
      { name: 'ember-cli-deploy' },
      { name: 'ember-cli-envy' },
      { name: 'ember-cli-eslint' },
      { name: 'ember-cli-template-lint' },
      { name: 'ember-concurrency' },
      { name: 'ember-test-selectors' }
    ]).then(function() {
      safeUnlinkSync(path.join(project.root, '.jshintrc'));
      safeUnlinkSync(path.join(project.root, '.jscsrc'));
      safeUnlinkSync(path.join(project.root, 'tests/.jshintrc'));
      safeUnlinkSync(path.join(project.root, '.jscsrc'));
      safeUnlinkSync(path.join(project.root, '.jscsrc'));

      return blueprint.removePackagesFromProject([
        { name: 'ember-cli-jshint' },
        { name: 'ember-suave' }
      ]);
      return blueprint.removePackageFromProject('ember-cli-jshint');
    }).then(function() {
      return blueprint.addAddonToProject('ember-cli-deploy-zesty-pack');
    });
  }
};
