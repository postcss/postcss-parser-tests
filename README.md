# PostCSS Parser Tests [![Build Status][ci-img]][ci]

<img align="right" width="95" height="95"
     title="Philosopher’s stone, logo of PostCSS"
     src="http://postcss.github.io/postcss/logo.svg">

Base tests for every [PostCSS] CSS parser. It contains:

* 24 CSS files to test extreme cases of CSS spec.
* Integration tests by popular website styles to test CSS from the wild.

This tests also will be useful any CSS parser, not only from PostCSS ecosystem.

## Cases

You can iterate through all cases by `cases.each` method:

```js
var cases = require('postcss-parser-tests');

cases.each( (name, css, ideal) => {
    it('parses ' + name, () => {
        let root = parse(css, { from: name });
        let json = cases.jsonify(root);
        expect(json).to.eql(ideal);
    });
});
```

It returns case name, CSS string and PostCSS AST JSON.

If you create non-PostCSS parser, just compare that input CSS is equal output
CSS after parsing.

You can got path to some speific test case by `cases.path(name)` method.

## Integration

Integration tests are packed into Gulp task:

```js
gulp.task('integration', function (done) {
    var cases  = require('postcss-parser-tests');
    let parser = require('./');
    cases.real(done, function (css) {
        return parser(css).toResult({ map: { annotation: false } });
    });
});
```

Your callback must parse CSS and stringify it back. Plugin will compare input
and output CSS.

You can add extra sites in optional second argument:

```js
cases.real(done, [['Browserhacks', 'http://browserhacks.com/']],
    function (css) {

    });
```

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://img.shields.io/travis/postcss/postcss-parser-tests.svg
[ci]:      https://travis-ci.org/postcss/postcss-parser-tests
