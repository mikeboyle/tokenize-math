const DIGITS = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
const LEFT_PARENS = '(';
const RIGHT_PARENS = ')';

/**
 * Removes all whitespace from a string
 * @param {string} str 
 * @returns {string} string without whitespace
 */
const removeWhitespace = (str) => {
  const result = [];
  for (const char of str) {
    if (char != " ") {
      result.push(char);
    }
  }
  return result.join("");
};

/**
 * Converts a string math expression into an array of tokens
 * @param {string} expression 
 * @returns {(string | number)[]} array of tokens representing the expression
 */
const tokenizeMath = (expression) => {
  const tokens = [];

  let numberCanBeNext = true;
  let buffer = '';

  let stripped = removeWhitespace(expression);

  for (let i = 0; i < stripped.length; i++) {
    const char = stripped[i];
    if (DIGITS.has(char)) {
      buffer += char;
      numberCanBeNext = false;
    } else if (char === '-' && numberCanBeNext) {
      if (stripped[i + 1] == LEFT_PARENS) {
        // it's a minus sign
        if (buffer.length > 0) {
          tokens.push(Number(buffer));
          buffer = '';
        }
        tokens.push(char);
      } else {
        // minus sign as start of negative number
        buffer += char;
        numberCanBeNext = false;
      }
    } else {
      // next symbol is not a number; handle as an operator
      if (buffer.length > 0) {
        tokens.push(Number(buffer));
        buffer = '';
      }
      tokens.push(char);
      numberCanBeNext = char !== RIGHT_PARENS;
    }
  }

  // Flush rest of buffer
  if (buffer.length > 0) {
    tokens.push(Number(buffer));
    buffer = '';
  }

  return tokens;
};

module.exports = {
  tokenizeMath,
};
