import { isMatch, Match, Separator, SportParser, SupportedSports } from '../models/matches';

export class EventParser {
    private sportParserMap: SportParser;

    constructor() {
        this.sportParserMap = {
            [SupportedSports.SOCCER]: {
                separator: Separator.HYPHEN,
                scoreFormatter: this.formatDefaultScore,
            },
            [SupportedSports.VOLLEYBALL]: {
                separator: Separator.HYPHEN,
                scoreFormatter: this.formatSetBasedScore,
            },
            [SupportedSports.HANDBALL]: {
                separator: Separator.VERSUS,
                scoreFormatter: this.formatDefaultScore,
            },
            [SupportedSports.BASKETBALL]: {
                separator: Separator.HYPHEN,
                scoreFormatter: this.formatBasketballScore,
            },
            [SupportedSports.TENNIS]: {
                separator: Separator.VERSUS,
                scoreFormatter: this.formatSetBasedScore,
            },
        };
    }

    public filterSupportedMatches(matches: Array<any>): Array<Match> {
        return matches.filter(match => isMatch(match));
    }

    public formatScore(match: Match) {
        return this.sportParserMap[match.sport].scoreFormatter(match.score);
    }

    public makeEventName(match: Match) {
        return match.participant1 + this.sportParserMap[match.sport].separator + match.participant2;
    }

    private formatBasketballScore(score: Array<Array<string>>): string {
        return score.flat().join(',');
    }

    private formatDefaultScore(score: string): string {
        return score;
    }

    private formatSetBasedScore(score: string): string {
        const mainScoreValue = score.split(',').slice(0, 1);
        const main = `Main score: ${mainScoreValue}`;

        const sets = score.split(',').slice(1);
        const formattedSetsValue = sets.map((set, index) => `set${index + 1} ${set}`).join(', ');

        // idk if its possible to get score without sets (only main score) but i covered that case as well
        const formattedSets = formattedSetsValue ? ` (${formattedSetsValue})` : '';

        return `${main}${formattedSets}`;
    }
}
