# `tokenize-math`

## Overview
Converts a mathematical expression from string form to an array of its parts.

The main benefit of this package is that it does the work of extracting entire numbers from your expression. For example, in the expression `-1 -   (-345 * -4) - 2`, it will:

- handle extra and unnecessary whitespace
- extract the multi digit number `-345` from the string
- distinguish between negative numbers and minus signs

When the part of the expression is a number, the corresponding array element will be a number.

When the part is a string (for example operators like `*` or parentheses like `(`), the corresponding array element will be a string.

## Limitations
Currently `tokenize-math` can parse any integer, positive or negative, but _cannot_ parse floating point numbers.

The library does _not_ validate your expression (for example, checking for balanced parentheses). It simply converts the string into an array of tokens.

## Usage
```
const { tokenizeMath } = require("tokenize-math");

const expression = '2 +    ( 7 * (1-    44)  ) + 3     ';
const tokens = tokenizeMath(expression);
console.log(tokens);
// [2, '+', '(', 7, '*', '(', 1, '-', 44, ')', ')', '+', 3];
```