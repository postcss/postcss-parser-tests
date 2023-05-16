# Change Log
This project uses major version number for PostCSS,
minor for adding/removing tests, and patch for fixes.

## 8.6
* Removed Habr.com real tests because of often 404 error.

## 8.5.2
* Fixed ESM support.

## 8.5.1
* Fixed empty Custom Properties position.

## 8.5
* Added safe example for comment removal.

## 8.4
* Added more CSS Custom Properties tests.
* Added more dangerous comments tests.
* Reduced dependencies.

## 8.3.7
* Replaced `nanocolors` with `picocolors`.
* Removed `ci-job-number`.

## 8.3.6
* Replaced `coloretter` with `nanocolors`.

## 8.3.5
* Removed `Nodeinputs` and `Node#source.inputId` (by Niklas Mischkulnig).

## 8.3.4
* Removed `Node#source.input` from test cases.

## 8.3.3
* Reverted Node.js 15 warning fix.

## 8.3.2
* Fixed Node.js 15 warning.

## 8.3.1
* Added funding links.

## 8.3
* Added `Node#source.offset` to test cases.

## 8.2
* Added empty Custom Properties case with comments and `!important`.

## 8.1
* Added empty Custom Properties case.

## 8.0
* Added Custom Properties with `{}` case for PostCSS 8.
* Added at-rule with `{}` in params case for PostCSS 8.
* Added ESM support.
* Added TypeScript types.
* Replace `chalk` to `colorette`.

## 6.5
* Parse `--a: {}` as `--a` declaration with `{}` value.

## 6.4
* Add more cases for Custom Properties (by Ivan Solovev).

## 6.3.1
* Fix compatibility with PostCSS 7.0.6.

## 6.3
* Add case with nested at-rule without semicolon, params, and spaces.

## 6.2.1
* Remove `gulp-util`.

## 6.2
* Add case with comment between word tokens (by Oleh Kuchuk).

## 6.1
* Add `!IMPORTANT` case.

## 6.0.2
* Fix `end` position in at-rule test (by Oleh Kuchuk).

## 6.0.1
* Add `\62 olor: red` case.

## 6.0
* Add rule with semicolon case for PostCSS 6.0.

## 5.0.11
* Add `/**/!important` case.
* Clean up npm package from unnecessary files.

## 5.0.10
* Add `[attr=;]` case.

## 5.0.9
* Remove `node.id` removing.

## 5.0.8
* Remove unique `node.id` too (by Ivan Serniaev).

## 5.0.7
* Add test for correct `between`.

## 5.0.6
* Remove cache properties from node in `jsonify`.

## 5.0.5
* Add more tests for `!important`.

## 5.0.4
* Add value trimming test.
* Add nested at-rule without semicolon test.

## 5.0.3
* Add multi-tokens property test.

## 5.0.2
* Fix `Root` start source.

## 5.0.1
* Better test with `url()`.
* Add tests with empty files.
* Add test with BOM symbol.
* Add start source to `Root`.

## 5.0
* Initial release from PostCSS sources.
