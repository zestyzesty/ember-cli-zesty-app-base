import Ember from 'ember';
import Pretender from 'pretender';
import { module, test } from 'qunit';
import { initialize } from 'dummy/initializers/setup-jquery-ajax';

module('Unit | Initializer | setup-jquery-ajax', {
  beforeEach() {
    this.server = new Pretender();
  },
  afterEach() {
    this.server.shutdown();
  }
});

test(`it adds an X-Requested-With request header`, function(assert) {
  assert.expect(1);

  this.server.get('/test', (request) => {
    assert.equal(request.requestHeaders['X-Requested-With'], 'XMLHttpRequest');
    return [200, {}, '{}'];
  });

  initialize();

  return Ember.$.ajax({ url: '/test' });
});

test(`it uses JSON as the default dataType`, function(assert) {
  assert.expect(2);

  this.server.get('/test', (request) => {
    assert.ok(request.requestHeaders['Accept'].indexOf('json') !== -1)
    return [200, {}, JSON.stringify({ foo: 'bar'})];
  });

  initialize();

  return Ember.$.ajax({ url: '/test' }).then((data) => {
    assert.deepEqual(data, { foo: 'bar' });
  });
});
