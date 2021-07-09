# LILY

[LILY is very simple option parser inspired by YARGS with no dependencies](https://github.com/jcubic/lily)

LILY stands for LILY Is Like Yargs

## Installation

```bash
npm install --save-dev @jcubic/lily
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

Copyright (C) 2020-2021 [Jakub T. Jankiewicz](https://jcubic.pl/me)

Released under MIT license
