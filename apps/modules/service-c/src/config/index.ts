import { readFileSync } from 'fs'
import * as path from 'path'

const yaml = require('js-yaml');

const configFileNameObj = {
  development :'dev',
  test: 'test',
  production: 'prod'
}

const env = process.env.NODE_ENV



export default () => {
  const configPath = path.join(__dirname, 'config',configFileNameObj[env] + '.yml')
  return yaml.load(readFileSync(configPath, 'utf8')) as Record<string, any>
}
