# LILY

[![NPM Version](https://img.shields.io/npm/v/%40jcubic/lily)](https://www.npmjs.com/package/@jcubic/lily)
[![Test](https://github.com/jcubic/lily/actions/workflows/test.yml/badge.svg)](https://github.com/jcubic/lily/actions/workflows/test.yml)
[![Coverage Status](https://coveralls.io/repos/github/jcubic/lily/badge.svg?branch=master)](https://coveralls.io/github/jcubic/lily?branch=master)
[![LICENSE MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/NApp-notes/markdown-parser/blob/master/LICENSE)

[LILY is very simple option parser inspired by YARGS with no dependencies](https://github.com/jcubic/lily)

LILY stands for LILY Is Like Yargs

In fact it's inspired by [yargs-parser](https://www.npmjs.com/package/yargs-parser/) used by Yargs to parse the options.

## Installation

```bash
npm install --save @jcubic/lily
```

## Usage

```javascript
#!/usr/bin/env node
const lily = require('@jcubic/lily');

const options = lily(process.argv.slice(2), {boolean: ['b']});
```

if you run the script with:

```
./script -l 10 --hello 20 -asb one two three
```

you will get this object as result:

```
{
    "_": [
        "one",
        "two",
        "three"
    ],
    "l": "10",
    "hello": "20",
    "a": true,
    "s": true,
    "b": true
}
```

## License

Copyright (C) 2020-2025 [Jakub T. Jankiewicz](https://jcubic.pl/me)

Released under MIT license
