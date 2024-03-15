import { EventParser } from './services/eventParser';
import { matches } from './mockedData/data';

const eventParser = new EventParser();

const filteredMatches = eventParser.filterSupportedMatches(matches);
const result = filteredMatches.map(match => {
    return {
        name: eventParser.makeEventName(match),
        score: eventParser.formatScore(match),
    };
});

console.log(result);
