/**
 * LILY is very simple option parser inspired by YARGS with no dependencies
 *
 * Copyright (C) 2020-2021 [Jakub T. Jankiewicz](https://jcubic.pl)
 *
 * Released under MIT license
 */

const re_re = /^\/((?:\\\/|[^/]|\[[^\]]*\/[^\]]*\])+)\/([gimsuy]*)$/;
const float_re = /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/;

module.exports = function parse_options(arg, options) {
    var settings = Object.assign({}, {
        boolean: [],
        parse_args: false
    }, options);
    var result = {
        _: []
    };
    function token(value) {
        this.value = value;
    }
    function process_arg(arg) {
        if (settings.parse_args) {
            return parse_argument(arg);
        }
        return arg;
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
            var m = arg.match(/--([^=]+)(?:=(.+))?/);
            if (m) {
                var name = m[1];
                if (m[2]) {
                    result[name] = process_arg(m[2]);
                } else if (settings.boolean.indexOf(name) === -1) {
                    return new token(name);
                } else {
                    result[name] = true;
                }
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
        } else if (arg) {
            arg = process_arg(arg);
            if (acc instanceof token) {
                result[acc.value] = arg;
            } else {
                result._.push(arg);
            }
        }
        return null;
    }, null);
    if (rest instanceof token) {
        result[rest.value] = true;
    }
    return result;
};

const boolean = {
    'true': true,
    'false': false
};

function parse_argument(arg) {
    if (arg in boolean) {
        return boolean[arg];
    }
    var regex = arg.match(re_re);
    if (regex) {
        return new RegExp(regex[1], regex[2]);
    } else if (arg.match(/^-?[0-9]+$/)) {
        return parseInt(arg, 10);
    } else if (arg.match(float_re)) {
        return parseFloat(arg);
    }
    return arg;
}
