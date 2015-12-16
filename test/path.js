import cases from '../';

import path from 'path';
import test from 'ava';

test('returns path', t => {
    t.same(cases.path('tab.css'), path.join(__dirname, '../cases/tab.css'));
});
