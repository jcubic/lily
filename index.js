/**
 * LILY is very simple option parser inspired by YARGS with no dependencies
 *
 * Copyright (C) 2020 [Jakub T. Jankiewicz](https://jcubic.pl)
 *
 * Released under MIT license
 */
module.exports = function parse_options(arg, options) {
    var settings = Object.assign({}, {
        boolean: []
    }, options);
    var result = {
        _: []
    };
    function token(value) {
        this.value = value;
    }
    var rest = arg.reduce(function(acc, arg) {
        if (typeof arg !== 'string') {
            arg = String(arg);
        }
        // last short option followed by option e.g. --abc --foo
        if (acc instanceof token && acc.value.length === 1 && arg.match(/^-/)) {
            result[acc.value] = true;
        } else if (arg.match(/^-[^-]/) && acc instanceof token) {
            result[acc.value] = true;
        }
        if (arg.match(/^--./)) {
            if (acc instanceof token) {
                result[acc.value] = true;
            }
            var name = arg.replace(/^--/, '');
            if (settings.boolean.indexOf(name) === -1) {
                return new token(name);
            } else {
                result[name] = true;
            }
        } else if (arg.match(/^-[^-]/)) {
            var single = arg.replace(/^-/, '').split('');
            // handling short option that have argument -abc foo c=foo
            if (settings.boolean.indexOf(single.slice(-1)[0]) === -1) {
                var last = single.pop();
            }
            single.forEach(function(single) {
                result[single] = true;
            });
            if (last) {
                return new token(last);
            }
        } else if (acc instanceof token) {
            result[acc.value] = arg;
        } else if (arg) {
            result._.push(arg);
        }
        return null;
    }, null);
    if (rest instanceof token) {
        result[rest.value] = true;
    }
    return result;
};
