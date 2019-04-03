import gameReducer from './gameReducer';
import { changePlayer, gameFinished } from './gameAction';
import { Player, Winner } from '../../AppState';
import { restartGame } from '../../commonAction';

describe('gameReducer', () => {
  it('should return init state', () => {
    let initState = gameReducer(undefined, { type: 'init' });
    expect(initState).not.toBeNull();
    expect(initState).not.toBeUndefined();
  });

  describe('changePlayer', () => {
    it('should change player from X to O', () => {
      const action = changePlayer();
      let newState = gameReducer(
        {
          currentPlayer: Player.Cross,
          isFinished: false,
          winningPlayer: Winner.None,
        },
        action,
      );

      expect(newState.currentPlayer).toEqual(Player.Circle);
    });

    it('should change player from O to X', () => {
      const action = changePlayer();
      let newState = gameReducer(
        {
          currentPlayer: Player.Circle,
          isFinished: false,
          winningPlayer: Winner.None,
        },
        action,
      );

      expect(newState.currentPlayer).toEqual(Player.Cross);
    });
  });

  describe('finishGame', () => {
    it('should change the state of the game according to the action, winning: Circle', () => {
      const action = gameFinished(Winner.Circle);
      const newState = gameReducer(
        {
          currentPlayer: Player.Circle,
          isFinished: false,
          winningPlayer: Winner.None,
        },
        action,
      );

      expect(newState.isFinished).toBe(true);
      expect(newState.winningPlayer).toEqual(Winner.Circle);
    });

    it('should change the state of the game according to the action, winning: Cross', () => {
      const action = gameFinished(Winner.Cross);
      const newState = gameReducer(
        {
          currentPlayer: Player.Circle,
          isFinished: false,
          winningPlayer: Winner.None,
        },
        action,
      );

      expect(newState.isFinished).toBe(true);
      expect(newState.winningPlayer).toEqual(Winner.Cross);
    });

    it('should change the state of the game according to the action, draw', () => {
      const action = gameFinished(Winner.Draw);
      const newState = gameReducer(
        {
          currentPlayer: Player.Circle,
          isFinished: false,
          winningPlayer: Winner.None,
        },
        action,
      );

      expect(newState.isFinished).toBe(true);
      expect(newState.winningPlayer).toEqual(Winner.Draw);
    });
  });

  describe('restartGame', () => {
    it('should return the initial state', () => {
      const action = restartGame();
      const newState = gameReducer(
        {
          currentPlayer: Player.Circle,
          isFinished: true,
          winningPlayer: Winner.None,
        },
        action,
      );

      expect(newState.isFinished).toBe(false);
      expect(newState.currentPlayer).toBe(Player.Cross);
      expect(newState.winningPlayer).toBe(Winner.None);
    });
  });
});
