import * as t from 'io-ts';

export enum SupportedSports {
    SOCCER = 'soccer',
    VOLLEYBALL = 'volleyball',
    HANDBALL = 'handball',
    BASKETBALL = 'basketball',
    TENNIS = 'tennis',
}

export enum Separator {
    VERSUS = ' vs ',
    HYPHEN = ' - ',
}

export interface Match {
    sport: SupportedSports;
    participant1: string;
    participant2: string;
    score: string | string[][];
}

export interface SportParserValues {
    separator: Separator;
    scoreFormatter(score: Match['score']): string;
}

export type SportParser = Record<SupportedSports, SportParserValues>;

const MatchValidator = t.type({
    sport: t.keyof({
        [SupportedSports.SOCCER]: null,
        [SupportedSports.VOLLEYBALL]: null,
        [SupportedSports.HANDBALL]: null,
        [SupportedSports.BASKETBALL]: null,
        [SupportedSports.TENNIS]: null,
    }),
    participant1: t.string,
    participant2: t.string,
    score: t.union([t.string, t.array(t.array(t.string))]),
});

export const isMatch = (obj: unknown): obj is Match => {
    return MatchValidator.is(obj);
};
