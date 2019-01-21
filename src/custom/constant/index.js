/* eslint-disable */
import LOG_CONSTANT from './logConstant'

const NODE_ENV = 'production'

const API_URL = 'https://api-maps.thinknet.co.th/v2/maps-styles'

// Config Logger
const LOGGER_URL = 'https://api-maps.thinknet.co.th/v1/log/emit-log'
const LOGGER_CONFIG_URL = 'api-maps.thinknet.co.th/v1/log/get-config'
const LOGGER_URL_DEV = 'http://localhost:5006/v1/log/emit-log'
const LOGGER_CONFIG_URL_DEV = 'http://localhost:5006/v1/log/get-config'
const LOGGER_TIMER = 5000

// constant function

export {
  LOG_CONSTANT,
  LOGGER_URL,
  LOGGER_CONFIG_URL,
  LOGGER_URL_DEV,
  LOGGER_CONFIG_URL_DEV,
  LOGGER_TIMER,
  API_URL,
  NODE_ENV,
  LOGO_IMG,
}
