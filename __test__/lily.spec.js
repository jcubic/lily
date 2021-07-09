const lily = require('..');


test('should parse short options', () => {
  expect(lily(['-a', '-b'])).toStrictEqual({_: [], a: true, b: true});
});

test('should parse short combined options', () => {
  expect(lily(['-abc', '-e'])).toStrictEqual({_: [], a: true, b: true, c: true, e: true});
});

test('should parse long option', () => {
  expect(lily(['--foo', 'hello'])).toStrictEqual({_: [], foo: 'hello'});
});

test('should parse two long successive option', () => {
  expect(lily(['--foo', '--hello'])).toStrictEqual({_: [], foo: true, hello: true});
});

test('should parse two long successive option and argument', () => {
  expect(lily(['--foo', '--hello', 'world'])).toStrictEqual({_: [], foo: true, hello: 'world'});
});

test('should parse long options as boolean', () => {
  expect(lily(['--hello', '-abc'])).toStrictEqual({_: [], a: true, b: true, c: true, hello: true});
});

test('should parse short combined before long option', () => {
  expect(lily(['-abc', '--hello'])).toStrictEqual({_: [], a: true, b: true, c: true, hello: true});
});

test('should parse short option with argument', () => {
  expect(lily(['-abc', 'foo', '--hello'])).toStrictEqual({_: [], a: true, b: true, c: "foo", hello: true});
});

test('should parse long option with argument', () => {
  expect(lily(['-abc', 'foo', '--hello', 'bar'])).toStrictEqual({_: [], a: true, b: true, c: "foo", hello: 'bar'});
});

test('should parse long boolean option', () => {
  expect(lily(['--hello', '--world'])).toStrictEqual({_: [], hello: true, world: true});
});

test('should parse rest arguments after short option', () => {
  expect(lily(['-abc', 'hello', 'world'])).toStrictEqual({_: ['world'], a: true, b: true, c: 'hello'});
});

test('should parse rest arguments after long option', () => {
  expect(lily(['--foo', 'hello', 'world'])).toStrictEqual({_: ['world'], foo: 'hello'});
});

test('should handle short boolean options', () => {
  expect(lily(['-abc', 'hello', 'world'], { boolean: ['c']})).toStrictEqual({_: ['hello', 'world'], a: true, b: true, c: true});
});

test('should handle long boolean options', () => {
  expect(lily(['--foo', 'hello', 'world'], { boolean: ['foo']})).toStrictEqual({_: ['hello', 'world'], foo: true});
});

test('should parse numbers', () => {
    const input = lily(['--foo', '10', '-b', '10.10'], { parse_args: true });
    expect(input).toStrictEqual({_:[], foo: 10, b: 10.10});
});

test('should parse booleans', () => {
    const input = lily(['--foo', 'true', '-b', 'false', '-c'], { parse_args: true });
    expect(input).toStrictEqual({_:[], foo: true, b: false, c: true});
});

test('should parse regex', () => {
    const input = lily(['--foo', '/foo/', '-b', '/foo bar/gi'], { parse_args: true });
    expect(input).toStrictEqual({_:[], foo: /foo/, b: /foo bar/gi});
});

test('should parse equal sign long option', () => {
    const input = lily(['--foo=/foo/g', '/foo/', '-b', '/foo bar/gi'], {
        parse_args: true
    });
    expect(input).toStrictEqual({_:[/foo/], foo: /foo/g, b: /foo bar/gi});
});
