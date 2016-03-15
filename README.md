# Installation

Install `binary-variations` as dependency (append --save-dev for development only):

```shell
npm install binary-variations
```

# API Documentation

<a name="module_binaryVariations"></a>

## binaryVariations ⇒ <code>Array</code>
Computes all possible binary ordered permutations of a given variations array,
considering optional inclusion/exclusion filter.

**Returns**: <code>Array</code> - - Returns an array of possible binary, ordered permutations.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| variations | <code>Array</code> |  | A array of variations who's binary, ordered permutations you want to compute. |
| [filter] | <code>Object</code> |  | A filter object containing inclusion or exclusion rules. |
| [filter.include] | <code>Array</code> |  | An array of items or combination of items to include. |
| [filter.exclude] | <code>Array</code> |  | An array or items or combination if items to exclude. |
| [filter.precedence] | <code>boolean</code> | <code>true</code> | Whether the inclusion filter takes precedence or not. |
| [callback] | <code>function</code> |  | A Callback to call for every matched combination. |

**Example**  
```js
<caption>All permutations</cation>

var binaryVariations = require('binary-variations');

binaryVariations(['a', 'b', 'c']);
=> [["a"], ["b"], ["a", "b"], ["c"], ["a", "c"], ["b", "c"], ["a", "b", "c"]]
```
**Example**  
```js
<caption>Exclusion</cation>
var binaryVariations = require('binary-variations');

binaryVariations(['a', 'b', 'c', 'd'], {
 // exclude only 'a' or containing 'a' and 'b' or containing 'b' and 'c'
 exclude: [ 'a', ['a', 'b'], ['b', 'c'] ]
});
=>
```

* [binaryVariations](#module_binaryVariations) ⇒ <code>Array</code>
    * [.expect(variations)](#module_binaryVariations.expect) ⇒ <code>number</code>
    * [.join(variations, [separator], [prefix], [suffix])](#module_binaryVariations.join) ⇒ <code>string</code>

<a name="module_binaryVariations.expect"></a>

### binaryVariations.expect(variations) ⇒ <code>number</code>
Returns the number of all possible variations.
Which is the sum of (2^n)-1.

**Kind**: static method of <code>[binaryVariations](#module_binaryVariations)</code>  
**Returns**: <code>number</code> - Returns the amount of possible combinations.  

| Param | Type | Description |
| --- | --- | --- |
| variations | <code>Array</code> | The array of possible variations. |

**Example**  
```js
var binaryVariations = require('binary-variations');
var expect = binaryVariations.expect;

expect( ['a'] );
// => 1

expect( ['a', 'b'] );
// => 3

expect( ['a', 'b', 'c'] );
// => 7

expect( ['a', 'b', 'c', 'd'] );
// => 15
```
<a name="module_binaryVariations.join"></a>

### binaryVariations.join(variations, [separator], [prefix], [suffix]) ⇒ <code>string</code>
The `join()` function joins all element of `variations` into a string.

**Kind**: static method of <code>[binaryVariations](#module_binaryVariations)</code>  
**Returns**: <code>string</code> - Returns all elements of `variations` joined into a string.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| variations | <code>Array</code> |  | The variations array to join. |
| [separator] | <code>string</code> | <code>&quot;,&quot;</code> | Specifies a string to separate each element of the array. |
| [prefix] | <code>string</code> |  | The prefix prepended. |
| [suffix] | <code>string</code> |  | The suffix appended. |

**Example** *(Default separator)*  
```js

var binaryVariations = require('binary-variations');
var join = binaryVariations.join;

join( ['a', 'b', 'c'] );
=> 'a,b,c'
```
**Example** *(Custom separator)*  
```js

var binaryVariations = require('binary-variations');
var join = binaryVariations.join;

join( ['a', 'b', 'c'], '-' );
=> 'a-b-c'
```
**Example** *(Prefix)*  
```js

var binaryVariations = require('binary-variations');
var join = binaryVariations.join;

join( ['a', 'b', 'c'] , ',', '-' );
=> '-a,b,c'
```
**Example** *(Suffix)*  
```js

var binaryVariations = require('binary-variations');
var join = binaryVariations.join;

join( ['a', 'b', 'c'] , ',', '', '-' );
=> 'a,b,c-'
```

#License

The MIT License (MIT)

Copyright (c) 2016 Andreas Deuschlinger

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the &quot;Software&quot;), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
