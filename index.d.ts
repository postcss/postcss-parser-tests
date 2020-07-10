export function jsonify (node: Node): string

export function path (name: string): string

export function each (
  callback: (name: string, css: string, json: string) => void
): void

export function real (
  callback: (css: string) => { css: string },
  extra: string[]
): void
