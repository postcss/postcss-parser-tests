import loguxTsConfig from '@logux/eslint-config/ts'

export default [
  ...loguxTsConfig,
  {
    files: ['test/update.js'],
    rules: {
      'n/no-missing-require': 'off'
    }
  }
]
