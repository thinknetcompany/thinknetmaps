/* eslint-disable */
import Debugger from '../../../src/custom/util/Debugger'

jest.mock('../../../src/util/dom', () => ({
    create: () => ({
        innerHTML: ''
    }),
}))

const mockAppendChild = jest.fn()

document.getElementsByClassName = jest.fn(() => [{
    remove: jest.fn(),
    appendChild: mockAppendChild,
}])

describe('Testing Debugger function', () => {
    it('If something has valid ', () => {
        Debugger.alertMissingKey('appID', null)
        expect(mockAppendChild.mock.calls[0][0].innerHTML).toBe('Error: App ID and API Key should be provided for THINKNET Maps')
        expect(mockAppendChild.mock.calls[1][0].innerHTML).toBe('Get your key at <a href="https://developer-maps.thinknet.co.th">https://developer-maps.thinknet.co.th</a>')
    });

    it('If param valid is false', () => {
        mockAppendChild.mockReset()
        Debugger.alertMissingKey('appID', 'apiKey', false)
        expect(mockAppendChild.mock.calls[0][0].innerHTML).toBe('Error: App ID or API key are invalid')
    });

    it('Correctly.', () => {
        mockAppendChild.mockReset()
        Debugger.alertMissingKey('appID', 'apiKey')
        expect(mockAppendChild).not.toBeCalled()
    });
});
