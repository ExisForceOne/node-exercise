import { SupportedSports } from '../src/models/matches';
import { EventParser } from '../src/services/eventParser';

describe('Event parser', () => {
    const eventParser = new EventParser();

    const data = [
        {
            sport: SupportedSports.HANDBALL,
            participant1: 'Pogoń Szczeciń',
            participant2: 'Azoty Puławy',
            score: '34:26',
        },
        {
            sport: SupportedSports.BASKETBALL,
            participant1: 'GKS Tychy',
            participant2: 'GKS Katowice',
            score: [
                ['9:7', '2:1'],
                ['5:3', '9:9'],
            ],
        },
        {
            sport: SupportedSports.TENNIS,
            participant1: 'Maria Sharapova',
            participant2: 'Serena Williams',
            score: '2:1,7:6,6:3,6:7',
        },
    ];
    it('should corectly filter out not supported matches types', () => {
        const data = [
            {
                sport: 'volleyball',
                participant1: 'Germany',
                participant2: 'France',
                score: '3:0,25:23,25:19,25:21',
            },
            {
                sport: 'formula1',
                participant1: 'Pogoń Szczeciń',
                participant2: 'Azoty Puławy',
                score: '34:26',
            },
            {
                sport: 'basketball',
                participant1: 'GKS Tychy',
                participant2: 12,
                score: [
                    ['9:7', '2:1'],
                    ['5:3', '9:9'],
                ],
            },
            {
                sport: 'ski jumping',
            },
        ];

        const expected = [
            {
                sport: 'volleyball',
                participant1: 'Germany',
                participant2: 'France',
                score: '3:0,25:23,25:19,25:21',
            },
        ];

        const result = eventParser.filterSupportedMatches(data);

        expect(result).toEqual(expected);
    });

    it('should corectly parse score', () => {
        const expected = [
            {
                score: '34:26',
            },
            {
                score: '9:7,2:1,5:3,9:9',
            },
            {
                score: 'Main score: 2:1 (set1 7:6, set2 6:3, set3 6:7)',
            },
        ];

        const result = data.map(data => ({ score: eventParser.formatScore(data) }));

        expect(result).toEqual(expected);
    });

    it('should corectly parse event name', () => {
        const expected = [
            {
                name: 'Pogoń Szczeciń vs Azoty Puławy',
            },
            {
                name: 'GKS Tychy - GKS Katowice',
            },
            {
                name: 'Maria Sharapova vs Serena Williams',
            },
        ];

        const result = data.map(data => ({ name: eventParser.makeEventName(data) }));

        expect(result).toEqual(expected);
    });

    it('should corectly set based score with different number of sets', () => {
        const setsMatches = [
            {
                sport: SupportedSports.TENNIS,
                participant1: 'Maria Sharapova',
                participant2: 'Serena Williams',
                score: '2:1,7:6,6:3,6:7',
            },
            {
                sport: SupportedSports.TENNIS,
                participant1: 'Maria Sharapova',
                participant2: 'Serena Williams',
                score: '2:1',
            },
            {
                sport: SupportedSports.VOLLEYBALL,
                participant1: 'Maria Sharapova',
                participant2: 'Serena Williams',
                score: '2:1,7:6,6:3,6:7,1:2,6:7',
            },
        ];
        const expected = [
            {
                score: 'Main score: 2:1 (set1 7:6, set2 6:3, set3 6:7)',
            },
            {
                score: 'Main score: 2:1',
            },
            {
                score: 'Main score: 2:1 (set1 7:6, set2 6:3, set3 6:7, set4 1:2, set5 6:7)',
            },
        ];

        const result = setsMatches.map(data => ({ score: eventParser.formatScore(data) }));

        expect(result).toEqual(expected);
    });
});
