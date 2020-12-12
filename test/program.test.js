var task = require('../function/program');

describe('Analyze task test', () => {
  test('should only acccept strings with newlines or .txt file extensions', () => {
    const wrongFormat = task.analyzeTasks('djfekwle');
    expect(wrongFormat).toMatch('Invalid input format')
  })

  test('should always return a string', () => {
    const input = task.analyzeTasks(`2
    1 PT
    2 US
    3
    1 1 10
    2 1 5
    3 2 10`);
    expect(typeof input).toMatch('string')
  })

  test('should always return a string with newlines', () => {
    const input = task.analyzeTasks(`2
    1 PT
    2 US
    3
    1 1 10
    2 1 5
    3 2 10`);
    expect(input).toMatch(/\n/g)
  })
})
