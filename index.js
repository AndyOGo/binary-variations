!function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals
        root.binaryVariations = factory();
    }
}(this, function() {
    /**
     * Check if value is an array.
     *
     * @type {Function}
     */
    var isArray = Array.isArray || function (value) {
            return Object.prototype.toString.call(value) === '[object Array]';
        };

    /**
     * Computes all possible binary ordered permutations of a given variations array,
     * considering optional inclusion/exclusion filter.
     *
     * @exports binaryVariations
     * @param {Array} variations - A array of variations who's binary, ordered permutations you want to compute.
     * @param {Object} [filter] - A filter object containing inclusion or exclusion rules.
     * @param {Array} [filter.include] - An array of items or combination of items to include.
     * @param {Array} [filter.exclude] - An array or items or combination if items to exclude.
     * @param {boolean} [filter.precedence=true] - Whether the inclusion filter takes precedence or not.
     * @param {Function} [callback] - A Callback to call for every matched combination.
     * @returns {Array} - Returns an array of possible binary, ordered permutations.
     *
     * @example <caption>All permutations</caption>
     *
     * var binaryVariations = require('binary-variations');
     *
     * binaryVariations(['a', 'b', 'c']);
     * => [["a"], ["b"], ["a", "b"], ["c"], ["a", "c"], ["b", "c"], ["a", "b", "c"]]
     *
     * @example <caption>Inclusion</caption>
     * var binaryVariations = require('binary-variations');
     *
     * binaryVariations(['a', 'b', 'c', 'd'], {
     *  // include only 'a' or containing 'a' and 'b' or containing 'b' and 'c'
     *  include: [ 'a', ['a', 'b'], ['b', 'c'] ]
     * });
     * => [["a"], ["a", "b"], ["b", "c"], ["a", "b", "c"], ["a", "b", "d"], ["b", "c", "d"], ["a", "b", "c", "d"]]
     *
     * @example <caption>Exclusion</caption>
     * var binaryVariations = require('binary-variations');
     *
     * binaryVariations(['a', 'b', 'c', 'd'], {
     *  // exclude only 'a' or containing 'a' and 'b' or containing 'b' and 'c'
     *  exclude: [ 'a', ['a', 'b'], ['b', 'c'] ]
     * });
     * => [["b"], ["c"], ["a", "c"], ["d"], ["a", "d"], ["b", "d"], ["c", "d"], ["a", "c", "d"]]
     */
    function binaryVariations(variations, filter, callback) {
        var filterType = typeof filter;

        // fix args
        if (filterType === 'function') {
            callback = filter;
            filter = undefined;
        }

        // clone array
        variations = variations.slice(0);

        var typeofCallback = typeof callback === 'function';
        var variationsLength = variations.length;
        var j;
        var bitmask;
        var expected = Math.pow(2, variationsLength) - 1;
        var binaryIndex = 1;
        var hasFilter = filterType === 'object';
        var precedence = hasFilter && typeof filter.precedence === 'boolean' ? filter.precedence : true;
        // include stuff
        var include = hasFilter && filter.include;
        var includeLength = isArray(include) ? include.length : 0;
        var i;
        var inclusion;
        var inclusionLength;
        var includeFlag;
        // exclude stuff
        var exclude = hasFilter && filter.exclude;
        var excludeLength = isArray(exclude) ? exclude.length : 0;
        var e;
        var exclusion;
        var exclusionLength;
        var excludeFlag;
        var n;
        // combination arrays
        var combinations = [];
        var combination;
        var combinationLength;

        for (; binaryIndex <= expected; binaryIndex++) {
            combination = [];

            // check each bit, if it is set -> include the item at this bit's index
            for (j = 0; j < variationsLength; j++) {
                bitmask = 1 << j;

                if (binaryIndex & bitmask) {
                    combination.push(variations[j]);
                }
            }

            combinationLength = combination.length;

            // check include
            if (includeLength) {
                includeFlag = false;

                for (i = 0; i < includeLength; i++) {
                    inclusion = include[i];

                    // if it is a string it has to match exactly a single item
                    if (typeof inclusion === 'string' && combinationLength === 1 && combination[0] === inclusion) {
                        includeFlag = true;
                        break;
                    }
                    // if it is an Array it has to be fully included in the current combination's Array
                    else if (isArray(inclusion)) {
                        includeFlag = true;

                        for (n = 0, inclusionLength = inclusion.length; n < inclusionLength; n++) {
                            if (!~combination.indexOf(inclusion[n])) {
                                includeFlag = false;
                                break;
                            }
                        }

                        if (includeFlag)
                            break;
                    }
                }
            }

            // check exclude
            if (excludeLength) {
                excludeFlag = false;

                for (e = 0; e < excludeLength; e++) {
                    exclusion = exclude[e];

                    // if it is a string it has to match exactly a single item
                    if (typeof exclusion === 'string' && combinationLength === 1 && combination[0] === exclusion) {
                        excludeFlag = true;
                        break;
                    }
                    // if it is an Array it has to be fully included in the current combination's Array
                    else if (isArray(exclusion)) {
                        excludeFlag = true;

                        for (n = 0, exclusionLength = exclusion.length; n < exclusionLength; n++) {
                            if (!~combination.indexOf(exclusion[n])) {
                                excludeFlag = false;
                                break;
                            }
                        }

                        if (excludeFlag)
                            break;
                    }
                }
            }

            // if both filters are given we have to deal with precedence
            if (includeLength && excludeLength) {
                if (precedence && !includeFlag ||
                    !precedence && excludeFlag) {
                    continue;
                }
            }
            // normal inclusion/exclusion checks
            else if (includeLength && !includeFlag ||
                excludeLength && excludeFlag) {
                continue;
            }

            // push combination
            combinations.push(combination);

            // execute callback if given
            typeofCallback && callback(combination);
        }

        return combinations;
    }

    binaryVariations.expect = expect;

    binaryVariations.join = join;

    /**
     * Returns the number of all possible variations.
     * Which is the sum of (2^n)-1.
     *
     * @memberOf module:binaryVariations
     * @param {Array} variations - The array of possible variations.
     * @returns {number} Returns the amount of possible combinations.
     * @example
     *
     * var binaryVariations = require('binary-variations');
     * var expect = binaryVariations.expect;
     *
     * expect( ['a'] );
     * // => 1
     *
     * expect( ['a', 'b'] );
     * // => 3
     *
     * expect( ['a', 'b', 'c'] );
     * // => 7
     *
     * expect( ['a', 'b', 'c', 'd'] );
     * // => 15
     */
    function expect(variations) {
        return Math.pow(2, variations.length) - 1;
    }

    /**
     * The `join()` function joins all element of `variations` into a string.
     *
     * @memberOf module:binaryVariations
     * @param {Array} variations - The variations array to join.
     * @param {string} [separator=,] - Specifies a string to separate each element of the array.
     * @param {string} [prefix] - The prefix prepended.
     * @param {string} [suffix] - The suffix appended.
     * @returns {string} Returns all elements of `variations` joined into a string.
     *
     * @example <caption>Default separator</caption>
     *
     * var binaryVariations = require('binary-variations');
     * var join = binaryVariations.join;
     *
     * join( ['a', 'b', 'c'] );
     * => 'a,b,c'
     *
     * @example <caption>Custom separator</caption>
     *
     * var binaryVariations = require('binary-variations');
     * var join = binaryVariations.join;
     *
     * join( ['a', 'b', 'c'], '-' );
     * => 'a-b-c'
     *
     * @example <caption>Prefix</caption>
     *
     * var binaryVariations = require('binary-variations');
     * var join = binaryVariations.join;
     *
     * join( ['a', 'b', 'c'] , ',', '-' );
     * => '-a,b,c'
     *
     * @example <caption>Suffix</caption>
     *
     * var binaryVariations = require('binary-variations');
     * var join = binaryVariations.join;
     *
     * join( ['a', 'b', 'c'] , ',', '', '-' );
     * => 'a,b,c-'
     */
    function join(variations, separator, prefix, suffix) {
        var str = variations.join(separator || ',');

        if (str) {
            str = (prefix || '') + str + (suffix || '');
        }

        return str;
    }

    // export public API
    return binaryVariations;
});