var cases = require('../');

var expect = require('chai').expect;
var path   = require('path');

describe('path', function () {

    it('returns path', function () {
        expect(cases.path('tab.css'))
            .to.eql(path.join(__dirname, '..', 'cases', 'tab.css'));
    });

});
