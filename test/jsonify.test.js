const postcss = require('postcss');

const jsonify = require('../jsonify');

it('converts to JSON string', () => {
    const node = postcss.rule();
    expect(jsonify(node)).toEqual('{\n' +
        '  "raws": {},\n' +
        '  "type": "rule",\n' +
        '  "nodes": []\n' +
    '}');
});

it('converts source.input', () => {
    const node = postcss.rule({
        source: {
            input: {
                css: 'test',
                file: '/a.css'
            }
        }
    });
    node.each(function () { });
    expect(jsonify(node)).toEqual('{\n' +
        '  "raws": {},\n' +
        '  "source": {\n' +
        '    "input": {\n' +
        '      "file": "a.css"\n' +
        '    }\n' +
        '  },\n' +
        '  "type": "rule",\n' +
        '  "nodes": []\n' +
    '}');
});

it('converts source.input recursively', () => {
    const rule = postcss.rule({
        source: {
            input: {
                css: 'test',
                file: '/a.css'
            }
        }
    });
    let root = postcss.root();
    root.append(rule);

    expect(jsonify(root)).toEqual('{\n' +
        '  "raws": {},\n' +
        '  "type": "root",\n' +
        '  "nodes": [\n' +
        '    {\n' +
        '      "raws": {},\n' +
        '      "source": {\n' +
        '        "input": {\n' +
        '          "file": "a.css"\n' +
        '        }\n' +
        '      },\n' +
        '      "type": "rule",\n' +
        '      "nodes": []\n' +
        '    }\n' +
        '  ]\n' +
    '}');
});
