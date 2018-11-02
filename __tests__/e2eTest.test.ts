import axios from 'axios';
import { parseBulletin } from '../src';

const getListOfBulletins = async () => {
    const response = await axios.get('https://www.ssd.noaa.gov/PS/TROP/bulletins.html');
    const part = response.data.split('Most Recent Bulletins Regardless of Basin:');
    const part2 = part[1].split('</dt>');
    const linkRegex = /<a[^>]* href="([^"]*)"/g;
    let match;
    const urls = [];
    while (match = linkRegex.exec(part2[0])) {
        urls.push(match[1]);
    }
    return urls;
};

describe('NOAA Recent bulletins', () => {
    test('Recent bulletins', async () => {
        expect.assertions(1);
        let errs = 0;
        const bulletinList = await getListOfBulletins();
        const proms = bulletinList.map(async (bltn) => {
            const result = await axios.get(bltn);
            try {
                const data = parseBulletin(result.data);
                console.log(data.details.tropical);
            } catch (err) {
                console.log(bltn);
                console.log(err);
                errs = errs + 1;
            }
        });
        await Promise.all(proms);
        expect(errs).toBe(0);
    });
});
