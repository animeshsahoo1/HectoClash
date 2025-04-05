function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  const OPERATORS = ['+', '-', '*', '/'];
  
  function applyOperator(a, b, op) {
    if (op === '+') return a + b;
    if (op === '-') return a - b;
    if (op === '*') return a * b;
    if (op === '/') {
      if (b === 0 || a % b !== 0) return null; // Only allow clean integer division
      return a / b;
    }
    return null;
  }
  
  function evaluateExpression(numbers, operators) {
    let result = numbers[0];
    for (let i = 0; i < operators.length; i++) {
      result = applyOperator(result, numbers[i + 1], operators[i]);
      if (result === null) return null;
    }
    return result;
  }
  
  function buildExpressionWithHiddenOperators(numbers) {
    let expression = '';
    for (let i = 0; i < numbers.length - 1; i++) {
      expression += `${numbers[i]} ? `;
    }
    expression += numbers[numbers.length - 1];
    return expression;
  }
  
  function generatePuzzleTarget100(maxAttempts = 2000) {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const numbers = Array.from({ length: 6 }, () => getRandomInt(1, 20));
  
      const combinations = cartesianProduct(OPERATORS, 5);
  
      for (const ops of combinations) {
        const result = evaluateExpression(numbers, ops);
        if (result === 100) {
          return {
            puzzle: `Fill in all operators (?s): ${buildExpressionWithHiddenOperators(numbers)} = 100`,
            numbers,
            answer: ops,
            result: 100
          };
        }
      }
    }
  
    return { error: "Could not find a valid puzzle for result = 100." };
  }
  
  function cartesianProduct(arr, repeat) {
    if (repeat === 1) return arr.map(el => [el]);
  
    const result = [];
    const smaller = cartesianProduct(arr, repeat - 1);
  
    for (const el of arr) {
      for (const sm of smaller) {
        result.push([el, ...sm]);
      }
    }
  
    return result;
  }

  