var jsonify = require('../jsonify');

var postcss = require('postcss');
var expect  = require('chai').expect;

describe('jsonify', function () {

    it('converts to JSON string', function () {
        var node = postcss.rule();
        expect(jsonify(node)).to.eql('{\n' +
            '  "raw": {},\n' +
            '  "nodes": [],\n' +
            '  "type": "rule"\n' +
        '}');
    });

    it('converts source.input', function () {
        var node = postcss.rule({
            source: {
                input: {
                    css: 'test',
                    file: '/a.css'
                }
            }
        });
        expect(jsonify(node)).to.eql('{\n' +
            '  "raw": {},\n' +
            '  "source": {\n' +
            '    "input": {\n' +
            '      "file": "a.css"\n' +
            '    }\n' +
            '  },\n' +
            '  "nodes": [],\n' +
            '  "type": "rule"\n' +
        '}');
    });

    it('converts source.input recursively', function () {
        var rule = postcss.rule({
            source: {
                input: {
                    css: 'test',
                    file: '/a.css'
                }
            }
        });
        var root = postcss.root();
        root.append(rule);

        expect(jsonify(root)).to.eql('{\n' +
            '  "raw": {},\n' +
            '  "nodes": [\n' +
            '    {\n' +
            '      "raw": {},\n' +
            '      "source": {\n' +
            '        "input": {\n' +
            '          "file": "a.css"\n' +
            '        }\n' +
            '      },\n' +
            '      "nodes": [],\n' +
            '      "type": "rule"\n' +
            '    }\n' +
            '  ],\n' +
            '  "type": "root"\n' +
        '}');
    });

});
