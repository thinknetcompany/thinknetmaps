/* eslint-disable */
import Logger from '../../../src/custom/util/Logger';
import logger from 'beaver-logger'

jest.mock('../../../src/custom/constant', () => ({
    LOGGER_URL: 'logger url',
    LOGGER_TIMER: 'logger timer',
}))
jest.mock('beaver-logger', () => ({
    init: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
}))

describe('Testing Logger', () => {

    // console.log(logger)

    it('Log debug is correct.', () => {
        Logger.init('APP_ID', 'LOGGING', true)
        Logger.debug('test')
        expect(logger.debug).toBeCalled()
    });

    it('Log info is correct.', () => {
        Logger.init('APP_ID', 'LOGGING', true)
        Logger.info('test')
        expect(logger.info).toBeCalled()
    });

    it('Log warn is correct.', () => {
        Logger.init('APP_ID', 'LOGGING', true)
        Logger.warn('test')
        expect(logger.warn).toBeCalled()
    });

    it('Log error is correct.', () => {
        Logger.init('APP_ID', 'LOGGING', true)
        Logger.error('test')
        expect(logger.error).toBeCalled()
    });

    it('Log error is correct.', () => {
        Logger.init('APP_ID', 'LOGGING', true)
        Logger.error('test')
        expect(logger.error).toBeCalled()
    });

    it('If debug is false will no have args in payload.', () => {
        logger.error.mockReset()
        Logger.init('APP_ID', 'LOGGING', false)
        Logger.error('test')
        expect(logger.error.mock.calls[0][1].args).toBe(undefined)
    });

    it('If don`t emit log loger will not called.', () => {
        logger.error.mockReset()
        Logger.init('APP_ID', null, false)
        Logger.error('test')
        expect(logger.error).not.toBeCalled()
    });

    it('Get props debug is correct.', () => {
        Logger.init('APP_ID', '', true)
        const debug = Logger.getDebug()
        expect(debug).toBe(true)
    });

    it('Get props logging mode is correct.', () => {
        Logger.init('APP_ID', 'LOGGING', true)
        const logging = Logger.getLogging()
        expect(logging).toBe('LOGGING')
    });

});
