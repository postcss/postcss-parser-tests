export function jsonify(node: object): object

export function testPath(name: string): string

export function eachTest(
  callback: (name: string, css: string, json: object) => void
): void

export function testOnReal(
  callback: (css: string) => { css: string },
  extra: string[]
): void
