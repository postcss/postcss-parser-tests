const path = require('path');

const cases = require('../');

it('returns path', () => {
    expect(cases.path('tab.css'))
        .toEqual(path.join(__dirname, '../cases/tab.css'));
});
