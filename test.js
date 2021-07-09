#!/usr/bin/env node

const lily = require('.');

const options = lily(process.argv.slice(2), {
    boolean: ['b'],
    parse_args: true
});

console.log(options);
