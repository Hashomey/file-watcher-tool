// math.test.js

const { add, subtract } = require('./math');

describe('math', () => {

  test('can add two numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('can subtract two numbers', () => {
    expect(subtract(5, 3)).toBe(2); 
  });

});