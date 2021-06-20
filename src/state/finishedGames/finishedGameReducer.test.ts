import { FinishedGameState } from '../AppState';
import finishedGameReducer from './finishedGameReducer';
import {
  saveGameData,
  saveGameDataFulfilled,
  saveGameDataPending,
  saveGameDataRejected,
} from './saveFinishedGameDataActions';
import { crossFinishedBoardMock } from '../../mocks';
import finishedGameReducer from './finishedGameReducer';

describe('finishedGameReducer', () => {
  function getFinishedGameMock(): FinishedGameState {
    return {
      winner: 'X',
      date: new Date().toISOString(),
      gameState: crossFinishedBoardMock,
      // not real data
      moves: [
        {
          boardPosition: {
            x: 1,
            y: 0,
          },
          tilePosition: {
            x: 1,
            y: 1,
          },
          player: 0,
          moveNumber: 1,
        },
      ],
      saveState: 'pending' as SaveState,
      errorMessage: '',
    };
  }

  it('should return init state', () => {
    let initState = finishedGameReducer(undefined, { type: 'init' });
    expect(initState).not.toBeNull();
    expect(initState).not.toBeUndefined();
  });

  describe('saveGameData', () => {
    it('should add data to array', () => {
      const finishedGameMock = getFinishedGameMock();
      const action = saveGameData(finishedGameMock);
      const newState = finishedGameReducer([], action);

      expect(newState.length).toBe(1);
    });

    it('should add data to array', () => {
      const finishedGameMock = getFinishedGameMock();
      const action = saveGameData(finishedGameMock);
      const newState = finishedGameReducer([finishedGameMock], action);

      expect(newState.length).toBe(2);
    });
  });

  describe('saveGameDataPending', () => {
    it('should set data to pending', () => {
      const finishedGameMock = getFinishedGameMock();
      finishedGameMock.saveState = '';
      const action = saveGameDataPending();
      const newState = finishedGameReducer([finishedGameMock], action);

      expect(newState[0].saveState).toEqual('pending');
    });
  });

  describe('saveGameDataFulfilled', () => {
    it('should set data to fulfilled', () => {
      const finishedGameMock = getFinishedGameMock();
      finishedGameMock.saveState = '';
      const action = saveGameDataFulfilled('123');
      const newState = finishedGameReducer([finishedGameMock], action);

      expect(newState[0].saveState).toEqual('fulfilled');
    });

    it('should set id to provided id', () => {
      const finishedGameMock = getFinishedGameMock();
      finishedGameMock.saveState = '';
      const action = saveGameDataFulfilled('123');
      const newState = finishedGameReducer([finishedGameMock], action);

      expect(newState[0].id).toEqual('123');
    });
  });

  describe('saveGameDataRejected', () => {
    it('should set data to rejected', () => {
      const finishedGameMock = getFinishedGameMock();
      finishedGameMock.saveState = '';
      const action = saveGameDataRejected('error');
      const newState = finishedGameReducer([finishedGameMock], action);

      expect(newState[0].saveState).toEqual('rejected');
      expect(newState[0].errorMessage).toEqual('error');
    });
  });
});
