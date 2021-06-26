
<p align="center">
  <img src="https://github.com/maracuja-juice/ultimate-tic-tac-react/blob/main/public/android-chrome-192x192.png"
width="150" alt="tic tac toe logo" />
</p>
<h1 align="center">Ultimate Tic-Tac-Toe</h1>


<div align="center">

A browser game implementation of ultimate tic-tac-toe using React, Redux and CSS Grid.

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/ultimate-ttt/ultimate-ttt/issues)
[![Build Status](https://github.com/ultimate-ttt/ultimate-ttt/actions/workflows/main.yml/badge.svg?branch=master)](https://github.com/ultimate-ttt/ultimate-ttt/actions/workflows/main.yml)

</div>

## Demo

Below you see a quick demo of the game mechanics.
You can test it out yourself [here](https://playtictactoe.xyz/)

<img src="https://user-images.githubusercontent.com/16801528/38771159-2815f1ec-401e-11e8-8edb-157b58403761.gif" alt="demo of the game" width="500">

## Game Rules

> For an interactive explanation you can go to our [how to play page](https://playtictactoe.xyz/how-to-play).

Ultimate Tic-Tac-Toe is played with 9 small tic-tac-toe boards.
Each turn a player marks a field. When you get three signs in a row (diagonal, vertical or horizontal) on a small board, you’ve won that board.
To win the game, you need to win three small boards in a row.

But here's the **twist:**
Each turn the previous move of your opponent dictates in which board you can move next.

For example the first player makes this move in one of the small boards:
```
[ ][X][ ]
[ ][ ][ ]
[ ][ ][ ]
```
The second player can in the next turn only play in the tiles that are marked with a `!`. These are tiles from the small board that are equivalent to the position of the last move.
```
[ ][ ][ ]   [!][!][!]   [ ][ ][ ]
[ ][ ][ ]   [!][!][!]   [ ][ ][ ]
[ ][ ][ ]   [!][!][!]   [ ][ ][ ]

[ ][ ][ ]   [ ][ ][ ]   [ ][ ][ ]
[ ][ ][ ]   [ ][ ][ ]   [ ][ ][ ]
[ ][ ][ ]   [ ][ ][ ]   [ ][ ][ ]

[ ][ ][ ]   [ ][ ][ ]   [ ][X][ ]
[ ][ ][ ]   [ ][ ][ ]   [ ][ ][ ]
[ ][ ][ ]   [ ][ ][ ]   [ ][ ][ ]
```

If your opponent sends you to a board that's already won, you can make your move on **any** of the other boards.
If one of the small boards results in a tie, the board counts for neither X nor O.

## Supported browsers
All browser versions that support CSS Grid layout are supported. For an exact overview of which browser versions that are [click here](https://caniuse.com/#feat=css-grid). If you detect an issue with a behaviour in a particular browser version: [let us know](https://github.com/ultimate-ttt/ultimate-ttt/issues/new?template=bug_report.md)!

## Run locally
It's easy to run a local instance of this game - just clone the repository, run `yarn` ([installation instructions for yarn](https://yarnpkg.com/en/docs/install)) and use:

- `yarn test` for tests in watch mode
- `yarn test:int` for executing browser tests (currently requires bash)
- `yarn start` to run
- `yarn storybook` to test the components with [Storybook](https://github.com/storybooks/storybook)
- `yarn prettier` to format the code with [Prettier](https://github.com/prettier/prettier)

## Contribute

Any type of feedback, pull request or issue is welcome. Follow the "Run locally" section of this documentation to learn how to debug the project.

## License
[MIT](https://tldrlegal.com/license/mit-license)
