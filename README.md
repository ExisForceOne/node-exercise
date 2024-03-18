# node-exercise

Tested on node v20.5.0. Starting snipped was also running without issues.
Maybe i overengineered in some places but I assumed that I was in a middle of bigger environment. ;)

## Setup

Install all dependencies.

```bash
npm i
```

## Development

Compile and run code on changes for development.

```bash
npm run dev
```

## Start

Compile and run code.

```bash
npm run start
```

## Testing

Run unit tests.

```bash
npm run test
```

## Assumptions

-   You have to refactor code in app.js file. Change it, split it, improve it, do it your own way!
-   You can use version of node you prefer
-   Code was tested in node 6, 10, 12, 14, 16, so it should be quite version agnostic at this stage
-   Application should print out the array of parsed events:

```js
[
    {
        name: 'Chelsea - Arsenal',
        score: '2:1',
    },
    {
        name: 'Germany - France',
        score: 'Main score: 3:0 (set1 25:23, set2 25:19, set3 25:21)',
    },
    {
        name: 'Pogoń Szczeciń vs Azoty Puławy',
        score: '34:26',
    },
    {
        name: 'GKS Tychy - GKS Katowice',
        score: '9:7,2:1,5:3,9:9',
    },
    {
        name: 'Maria Sharapova vs Serena Williams',
        score: 'Main score: 2:1 (set1 7:6, set2 6:3, set3 6:7)',
    },
];
```

-   Structure of matches data should stay intact (that doesn't mean you can't move it around tho!)
-   You can stick to JS, or use TypeScript as well (it is event better, because we mostly work with TS)
-   We strongly recommend to write some unit tests!

Good luck!
