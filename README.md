# Ultimate Tic Tac Toe

[![Build Status](https://travis-ci.org/maracuja-juice/ultimate-tic-tac-react.svg?branch=master)](https://travis-ci.org/maracuja-juice/ultimate-tic-tac-react)
[![Maintainability](https://api.codeclimate.com/v1/badges/563d045ede94fda03570/maintainability)](https://codeclimate.com/github/maracuja-juice/ultimate-tic-tac-react/maintainability)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)

This is a board game made with React & Redux. 

The game consists of nine tic-tac-toe boards arranged in a 3x3 grid. Every move on a small board sends the opponent to an equivalent on the big board. If you win a small board you get a position on the big board. And with three small boards in a row you win the game. [Wikipedia](https://en.m.wikipedia.org/wiki/Ultimate_tic-tac-toe)

## Demo

Here is a quick demo of me showing the game mechanics.
You can test it out yourself [here](https://maracuja-juice.github.io/ultimate-tic-tac-react/)

<img src="https://user-images.githubusercontent.com/16801528/36617426-af1bc562-18e7-11e8-8572-4212bb8688d2.gif" width="500">

## Why

This app was mainly made for learning how to use React, Redux and CSS Grid and also because I always wanted to make my own implementation of this game.

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

## Deployment

To deploy the latest version to GitHub Pages

```
yarn deploy
```

## Contribute

Contributions are welcome via pull requests.

## License
[MIT](https://tldrlegal.com/license/mit-license)
