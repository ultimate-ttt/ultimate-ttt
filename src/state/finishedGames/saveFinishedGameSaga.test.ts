import { expectSaga } from 'redux-saga-test-plan';
import saveFinishedGameDataSaga from './saveFinishedGameSaga';
import { circleFinishedBoardMock } from '../../mocks/board';
import { Player } from '../AppState';
import {
  SAVE_GAME,
  SAVE_GAME_FULFILLED,
  SAVE_GAME_PENDING,
  SAVE_GAME_REJECTED,
} from './saveFinishedGameActions';
import { rest } from 'msw';
import { server } from '../../mocks/api/server';
import { getApiUrl } from '../../lib';

const finishedGameDataMock = {
  winner: 'X',
  gameState: circleFinishedBoardMock,
  moves: [
    {
      boardPosition: { x: 0, y: 0 },
      tilePosition: { x: 0, y: 0 },
      player: Player.Cross,
      moveNumber: 1,
    },
  ],
};

describe('saveFinishedGameDataSaga', () => {
  it('should make a successful fetch call', () => {
    return expectSaga(saveFinishedGameDataSaga)
      .put({ type: SAVE_GAME_PENDING })
      .put.like({ action: { type: SAVE_GAME_FULFILLED } })
      .dispatch({
        type: SAVE_GAME,
        payload: finishedGameDataMock,
        saveOnline: true,
      })
      .silentRun();
  });

  it('should dispatch error when there is an error in the fetch call', () => {
    server.use(
      rest.post(getApiUrl(), async (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    );

    return expectSaga(saveFinishedGameDataSaga)
      .put({ type: SAVE_GAME_PENDING })
      .put.like({ action: { type: SAVE_GAME_REJECTED } })
      .dispatch({
        type: SAVE_GAME,
        payload: finishedGameDataMock,
        saveOnline: true,
      })
      .silentRun();
  });
});
