export function jsonify (node: Node): string

export function testPath (name: string): string

export function eachTest (
  callback: (name: string, css: string, json: string) => void
): void

export function testOnReal (
  callback: (css: string) => { css: string },
  extra: string[]
): void
