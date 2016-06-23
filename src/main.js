#!/usr/bin/env node

let _ = require('lodash');
let base = require('taskcluster-base');


let load = base.loader({
  all: {
    requires: [],
    setup: async ({}) => {
    },
  },
}, ['profile', 'process']);

// If this file is executed launch component from first argument
if (!module.parent) {
  require('source-map-support').install();
  load(process.argv[2], {
    process: process.argv[2],
    profile: process.env.NODE_ENV,
  }).catch(err => {
    console.log(err.stack);
    process.exit(1);
  });
}

// Export load for tests
module.exports = load;
