# Binarify

[![Build Status](https://travis-ci.org/hintss/binarify.svg?branch=master)](https://travis-ci.org/hintss/binarify)

Converts a backslash-escaped string into a Buffer. It's similar to the [backslash](https://www.npmjs.com/package/backslash) package, except backslash used punycode's encoder to handle hex escapes, breaking some things.

```js
const binarify = require('binarify');
binarify('\xCC'); // <Buffer cc>
```
