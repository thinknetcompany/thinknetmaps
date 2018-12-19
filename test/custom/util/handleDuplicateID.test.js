/* eslint-disable */

import handleDuplicateID from '../../../src/custom/util/handleDuplicateID';

describe('Unit test: handleDuplicateID', () => {
    it('Duplicate ID (building)', () => {
        expect(handleDuplicateID('building')).toContain('mmg-building-');
    });
    it('Not duplicate ID', () => {
        expect(handleDuplicateID('thinknetmaps-marker')).toBe('thinknetmaps-marker');
    });
});
