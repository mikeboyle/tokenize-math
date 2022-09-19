const { tokenizeMath } = require(".");

describe("tokenizeMath", () => {
  it("handles integers < 10", () => {
    expect(tokenizeMath("1")).toEqual([1]);
  });

  it('handles integers > 10', () => {
    expect(tokenizeMath("23")).toEqual([23]);
    expect(tokenizeMath("5678")).toEqual([5678]);
  });

  it("handles numbers, operators, and parentheses", () => {
    const expression = '2+34-45+(3*(2+4))';
    const expected = [2, '+', 34, '-', 45, '+', '(', 3, '*', '(', 2, '+', 4, ')', ')'];
    expect(tokenizeMath(expression)).toEqual(expected);
  });

  it("handles whitespace", () => {
    const expression = '2 +    ( 7 * (1-    44)  ) + 3     ';
    const expected = [2, '+', '(', 7, '*', '(', 1, '-', 44, ')', ')', '+', 3];
    expect(tokenizeMath(expression)).toEqual(expected);
  });

  it('handles negative numbers', () => {
    const expression = '-3 - -5 -(-10 - -2)';
    const expected = [-3, '-', -5, '-', '(', -10, '-', -2, ')'];
    expect(tokenizeMath(expression)).toEqual(expected);
  });

  it("converts numbers to numbers", () => {
    const expression = '234+(57)';
    const expected = [234, '+', '(', 57, ')'];

    const actual = tokenizeMath(expression);

    expect(actual).toEqual(expected);

    expect(typeof actual[0]).toBe("number");
    expect(typeof actual[3]).toBe("number");

    for (const idx of [1, 2, 4]) {
      expect(typeof actual[idx]).toBe("string");
    }
  });

  
});