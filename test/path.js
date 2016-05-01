import cases from '../';

import path from 'path';
import test from 'ava';

test('returns path', t => {
    t.deepEqual(cases.path('tab.css'),
                path.join(__dirname, '../cases/tab.css'));
});
