/**
 * LILY is very simple option parser inspired by YARGS with no dependencies
 *
 * Copyright (C) 2020-2025 [Jakub T. Jankiewicz](https://jcubic.pl)
 *
 * Released under MIT license
 */

declare module '@jcubic/lily' {
  /**
   * Options for configuring the lily parser
   */
  export interface LilyOptions {
    /**
     * Array of option names that should be treated as boolean flags.
     * When specified, these options won't consume the next argument as their value.
     * @example
     * lily(['--foo', 'bar'], { boolean: ['foo'] })
     * // Result: { _: ['bar'], foo: true }
     */
    boolean?: string[];

    /**
     * When true, automatically parses argument values to their appropriate types:
     * - Numbers: '10' -> 10, '10.5' -> 10.5
     * - Booleans: 'true' -> true, 'false' -> false
     * - RegExp: '/foo/gi' -> /foo/gi
     * @default false
     */
    parse_args?: boolean;
  }

  /**
   * The result object returned by lily parser
   */
  export interface LilyResult {
    /**
     * Array of non-option arguments (positional arguments)
     */
    _: Array<string | number | boolean | RegExp>;

    /**
     * Parsed options as key-value pairs.
     * Values can be:
     * - true for boolean flags
     * - string for string arguments
     * - number for numeric arguments (when parse_args is true)
     * - boolean for boolean arguments (when parse_args is true)
     * - RegExp for regex arguments (when parse_args is true)
     */
    [key: string]: string | number | boolean | RegExp | Array<string | number | boolean | RegExp>;
  }

  /**
   * LILY - Very simple option parser inspired by YARGS with no dependencies
   *
   * Parses command-line arguments into an object with options and positional arguments.
   *
   * @param args - Array of arguments to parse (typically process.argv.slice(2))
   * @param options - Optional configuration for parsing behavior
   * @returns Parsed result object with options and positional arguments
   *
   * @example
   * // Basic usage
   * lily(['-a', '-b', 'value'])
   * // Result: { _: [], a: true, b: 'value' }
   *
   * @example
   * // Combined short options
   * lily(['-abc'])
   * // Result: { _: [], a: true, b: true, c: true }
   *
   * @example
   * // Long options
   * lily(['--foo', 'bar', '--baz'])
   * // Result: { _: [], foo: 'bar', baz: true }
   *
   * @example
   * // Equal sign syntax
   * lily(['--foo=bar'])
   * // Result: { _: [], foo: 'bar' }
   *
   * @example
   * // Boolean options
   * lily(['--foo', 'bar'], { boolean: ['foo'] })
   * // Result: { _: ['bar'], foo: true }
   *
   * @example
   * // Parse arguments
   * lily(['--num', '10', '--flag', 'true'], { parse_args: true })
   * // Result: { _: [], num: 10, flag: true }
   *
   * @example
   * // Double dash to end options
   * lily(['--foo', '--', '--bar'])
   * // Result: { _: ['--bar'], foo: true }
   */
  function lily(args: string[], options?: LilyOptions): LilyResult;

  export default lily;
}
