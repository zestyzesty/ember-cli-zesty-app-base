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
      '      includePolyfill: true',
      '    }'
    ].join('\n'), {
      after: '// Add options here\n'
    });

    return blueprint.addPackagesToProject([
      { name: 'babel-eslint', target: '^6.0.4'},
      { name: 'ember-cli-deploy', target: '^0.6.2'},
      { name: 'ember-cli-envy', target: '^2.0.0'},
      { name: 'ember-cli-eslint', target: '^1.4.0'},
      { name: 'ember-cli-template-lint', target: '^0.4.10'},
      { name: 'ember-concurrency', target: '^0.7.1'},
      { name: 'ember-test-selectors', target: '^0.0.3'}
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
