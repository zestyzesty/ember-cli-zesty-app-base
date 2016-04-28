import Ember from 'ember';

export function initialize() {
  Ember.$.ajaxSetup({
    // Treat all responses as JSON and set the Accept header
    dataType: 'json',

    // Workaround for https://github.com/rails/rails/issues/9940
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  });
}

export default {
  name: 'setup-jquery-ajax',
  initialize
};
