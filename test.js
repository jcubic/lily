#!/usr/bin/env node

const lily = require('.');
const options = lily(process.argv.slice(2), {boolean: ['b']});

console.log(JSON.stringify(options, true, 4));
