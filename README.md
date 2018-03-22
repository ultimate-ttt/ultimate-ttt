# Ultimate Tic Tac Toe

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/maracuja-juice/ultimate-tic-tac-react/issues)
[![Build Status](https://travis-ci.org/maracuja-juice/ultimate-tic-tac-react.svg?branch=master)](https://travis-ci.org/maracuja-juice/ultimate-tic-tac-react)
[![Maintainability](https://api.codeclimate.com/v1/badges/563d045ede94fda03570/maintainability)](https://codeclimate.com/github/maracuja-juice/ultimate-tic-tac-react/maintainability)
[![Greenkeeper badge](https://badges.greenkeeper.io/maracuja-juice/ultimate-tic-tac-react.svg)](https://greenkeeper.io/)
[![codecov](https://codecov.io/gh/maracuja-juice/ultimate-tic-tac-react/branch/master/graph/badge.svg)](https://codecov.io/gh/maracuja-juice/ultimate-tic-tac-react)

This is a board game made with React & Redux. 

## Game Rules
There are 9 normal tic-tac-toe board. You win a small tic-tac-toe board like in a normal tic tac toe. And you win the **game** if you have **3 won** tic-tac-toe boards **positioned in a row.** 

But here's the **twist:**
_Every move on a small board sends the opponent to the equivalent on the big board._

### Practical Example
Let's say we have this big board with 9 small boards. (the initial game state)

```
[ ][ ][ ]   [ ][ ][ ]   [ ][ ][ ]
[ ][ ][ ]   [ ][ ][ ]   [ ][ ][ ]
[ ][ ][ ]   [ ][ ][ ]   [ ][ ][ ]

[ ][ ][ ]   [ ][ ][ ]   [ ][ ][ ]
[ ][ ][ ]   [ ][ ][ ]   [ ][ ][ ]
[ ][ ][ ]   [ ][ ][ ]   [ ][ ][ ]

[ ][ ][ ]   [ ][ ][ ]   [ ][ ][ ]
[ ][ ][ ]   [ ][ ][ ]   [ ][ ][ ]
[ ][ ][ ]   [ ][ ][ ]   [ ][ ][ ]
```
And the first player makes this move in one of the small boards:
```
[ ][X][ ]
[ ][ ][ ]
[ ][ ][ ]
```
The second player can in the next turn only play in the tiles that are marked with a `!`. This are tiles from the small board that is equivalent to the position of the last move. 
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

But let's say that we are already later in the game and this board is already won (three in a row). The next player can then play in all boards that are not won yet. (marked with `!`)

(_note: of course later in the game there would be the same amount of X's and O's on the board => this is just for illustration purposes_)
```
[!][!][!]   [O][ ][ ]   [!][!][!]
[!][!][!]   [ ][O][ ]   [!][!][!]
[!][!][!]   [ ][ ][O]   [!][!][!]

[!][!][!]   [!][!][!]   [!][!][!]
[!][!][!]   [!][!][!]   [!][!][!]
[!][!][!]   [!][!][!]   [!][!][!]

[!][!][!]   [!][!][!]   [!][X][!]
[!][!][!]   [!][!][!]   [!][!][!]
[!][!][!]   [!][!][!]   [!][!][!]
```

## Demo

Here is a quick demo of me showing the game mechanics.
You can test it out yourself [here](https://maracuja-juice.github.io/ultimate-tic-tac-react/)

<img src="https://user-images.githubusercontent.com/16801528/37793352-bb6eefd8-2e0e-11e8-8b0c-5d94e9b2b727.gif" width="500">

## Set up dev environment

Install yarn if you haven't already

For macOS via Homebrew: (see [here](https://yarnpkg.com/en/docs/install) for other platforms/ways)
```
brew install yarn
```

Install dependencies
```
yarn install
```

Check if everything works correctly 
```
yarn test
```

And finally start the app
```
yarn start
```

## Contribute

Contributions are welcome via pull requests.

## License
[MIT](https://tldrlegal.com/license/mit-license)
