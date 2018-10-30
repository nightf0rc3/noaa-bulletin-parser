import * as fs from 'fs';
import { parseBulletin } from '../src';
describe('bulletin-parser test', () => {
    test('Normal Bulletin', () => {
        const file = fs.readFileSync('__tests__/normal_bulletin.bltn');
        const obj = parseBulletin(file.toString());
        const xpctObj = {
            name: '95L',
            fullTag: 'TROPICAL DISTURBANCE (95L)',
            date: { day: '26', hour: '11', minute: '45' },
            lat: '24.7N',
            lng: '45.1W',
            details: {
                tropical: 'T',
                satelliteT: { t: '2.0', maxWinds: 35, category: 'TD' },
                currentT: { t: '2.0', maxWinds: 35, category: 'TD' },
                change: { status: 'D', amount: '2.0', time: '24' }
            },
            satellite: 'GOES-E',
            g: 'IR/EIR/VIS',
            text: '3.5/10 BANDING FOR A DT=2.0. MET AND PT ARE UNDEFINED. FT\nIS BASED ON DT.\n\n'
        };
        expect(obj).toEqual(xpctObj);
    });

    test('Overland Bulletin', () => {
        const file = fs.readFileSync('__tests__/overland_bulletin.bltn');
        const obj = parseBulletin(file.toString());
        const xpctObj = {
            name: 'YUTU',
            fullTag: '31W (YUTU)',
            date: { day: '30', hour: '02', minute: '30' },
            lat: '16.7N',
            lng: '120.6E',
            details: {
                tropical: 'OVERLAND',
                satelliteT: { t: 'OVERLAND', maxWinds: 0, category: 'Overland' },
                currentT: { t: 'OVERLAND', maxWinds: 0, category: 'Overland' },
                change: { status: 'O', amount: '0.0', time: '24' }
            },
            satellite: 'HIMAWARI-8',
            g: 'IR/EIR/SWIR',
            text: 'THIS ESTIMATE WAS DERIVED USING 4 KM IR DATA. THIS WILL\nBE THE FINAL BULLETIN UNLESS SYSTEM MOVES OVER WATER.\n\n'
        };
        expect(obj).toEqual(xpctObj);
    });

});
