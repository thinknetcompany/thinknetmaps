/* eslint-disable */
import getLogConfig from '../../../src/custom/util/getLogConfig'
import window from '../../../src/util/window'
import constant from '../../../src/custom/constant'

jest.mock('../../../src/custom/constant', () => ({
    NODE_ENV: 'NODE',
    LOGGER_CONFIG_URL: 'true',
    LOGGER_CONFIG_URL_DEV: 'true',
}))

jest.mock('../../../src/util/window', () => ({
    XMLHttpRequest: 
        class XMLHttpRequest {
            constructor(...arg) {
                this.readyState = 4
                this.responseType = arg.length > 0 && arg[0].reasponseType
                this.onreadystatechange = arg.length > 0 &&arg[0].onreadystatechange
            }
            open(param1, param2, param3) { 
                if (param3 === false) {
                    this.response = {
                        isDebug: true,
                        isLogging: true
                    }
                } if (param1 === 'TEST') {
                    this.readyState = 1
                }
             }
            send() { return jest.fn() }
        }
}))

describe('Unit test: getLogConfig', () => {
    beforeEach(() => {
        constant.NODE_ENV = 'NODE'
    })
    it ('Return from unit getLogConfig()', () => {
        const result = getLogConfig()
        result.onreadystatechange()
        expect(result.responseType).toEqual('json')
        expect(result.onreadystatechange).not.toEqual(undefined)
    })
    
    it ('test callback: no xhr.response', () => {
        getLogConfig((res) => {
            expect(res.isDebug).toBe(false)
            expect(res.isLogging).toBe(false)
        }).onreadystatechange()
    })

    it ('test callback: has xhr.response', () => {
        const callFunction = getLogConfig((res) => {
            expect(res.isDebug).toBe(true)
            expect(res.isLogging).toBe(true)
        })
        callFunction.open('GET', 'MockURL', false)
        callFunction.onreadystatechange()
    })

    it ('test callback: readyState = 1, should do nothing', () => {
        constant.NODE_ENV = 'production'
        const callFunction = getLogConfig((res) => {
            expect(res).toBe(undefined)
        })
        callFunction.open('TEST', 'MockURL', false)
        callFunction.onreadystatechange()
    })
});