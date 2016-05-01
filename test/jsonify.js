import jsonify from '../jsonify';

import postcss from 'postcss';
import test    from 'ava';

test('converts to JSON string', t => {
    let node = postcss.rule();
    t.deepEqual(jsonify(node), '{\n' +
        '  "raws": {},\n' +
        '  "type": "rule",\n' +
        '  "nodes": []\n' +
    '}');
});
test('converts source.input', t => {
    let node = postcss.rule({
        source: {
            input: {
                css: 'test',
                file: '/a.css'
            }
        }
    });
    node.each(function () { });
    t.deepEqual(jsonify(node), '{\n' +
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

test('converts source.input recursively', t => {
    let rule = postcss.rule({
        source: {
            input: {
                css: 'test',
                file: '/a.css'
            }
        }
    });
    let root = postcss.root();
    root.append(rule);

    t.deepEqual(jsonify(root), '{\n' +
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
