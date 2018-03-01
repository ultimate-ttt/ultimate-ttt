# Ultimate Tic Tac Toe

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/maracuja-juice/ultimate-tic-tac-react/issues)
[![Build Status](https://travis-ci.org/maracuja-juice/ultimate-tic-tac-react.svg?branch=master)](https://travis-ci.org/maracuja-juice/ultimate-tic-tac-react)
[![Maintainability](https://api.codeclimate.com/v1/badges/563d045ede94fda03570/maintainability)](https://codeclimate.com/github/maracuja-juice/ultimate-tic-tac-react/maintainability)
[![Greenkeeper badge](https://badges.greenkeeper.io/maracuja-juice/ultimate-tic-tac-react.svg)](https://greenkeeper.io/)
[![codecov](https://codecov.io/gh/maracuja-juice/ultimate-tic-tac-react/branch/master/graph/badge.svg)](https://codecov.io/gh/maracuja-juice/ultimate-tic-tac-react)

This is a board game made with React & Redux. 

The game consists of nine tic-tac-toe boards arranged in a 3x3 grid. Every move on a small board sends the opponent to an equivalent on the big board. If you win a small board you get a position on the big board. And with three small boards in a row you win the game. [Wikipedia](https://en.m.wikipedia.org/wiki/Ultimate_tic-tac-toe)

## Demo

Here is a quick demo of me showing the game mechanics.
You can test it out yourself [here](https://maracuja-juice.github.io/ultimate-tic-tac-react/)

<img src="https://user-images.githubusercontent.com/16801528/36629951-37a825b2-195e-11e8-95f7-9c52f95695ec.gif" width="500">

## Set up dev environment
### Prerequisites

- [NodeJS](https://nodejs.org/en/)
- [yarn](https://yarnpkg.com/en/docs/install)

### Actual Set up

Install dependencies
```
yarn install
```

Now you can run the tests and start the app 
```
yarn test
yarn start
```

## Deployment

When checking in/merging to master, the latest version of the app gets automatically deployed to Github Pages.

## Contribute

Contributions are welcome via pull requests.

## License
[MIT](https://tldrlegal.com/license/mit-license)
