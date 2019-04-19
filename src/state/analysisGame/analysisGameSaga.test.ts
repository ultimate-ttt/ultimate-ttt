import { expectSaga } from 'redux-saga-test-plan';
import { select } from 'redux-saga/effects';
import { AnalysisGame, Player, Winner } from '../AppState';
import loadFinishedGameSaga from './analysisGameSaga';
import {
  getAnalysisGameByDate,
  getAnalysisGameById,
  getLatestAnalysisGame,
} from '../selectors/analysisGame/AnalysisGameStateSelectors';
import { crossFinishedBoardMock } from '../../__mocks__';
import {
  LOAD_FINISHED_GAME_BY_DATE,
  LOAD_FINISHED_GAME_BY_ID,
  LOAD_LATEST_FINISHED_GAME,
  SET_ANALYSIS_GAME,
} from './analysisGameActions';

describe('loadFinishedGameSaga', () => {
  const analysisGame: AnalysisGame = {
    id: '1',
    board: crossFinishedBoardMock,
    activeBoards: [],
    moves: [
      {
        moveNumber: 1,
        tilePosition: { x: 0, y: 0 },
        boardPosition: { x: 0, y: 0 },
        player: Player.Cross,
      },
    ],
    currentMove: 1,
    game: {
      currentPlayer: Player.Circle,
      winningPlayer: Winner.Cross,
      isFinished: true,
    },
  };

  describe('loadFinishedGameById', () => {
    it('should dispatch the setAnalysisGame action for the analysisGame with the given id', () => {
      return expectSaga(loadFinishedGameSaga)
        .provide([[select(getAnalysisGameById, '1'), analysisGame]])
        .put({ type: SET_ANALYSIS_GAME, payload: analysisGame })
        .dispatch({
          type: LOAD_FINISHED_GAME_BY_ID,
          payload: '1',
        })
        .silentRun();
    });
  });

  describe('loadFinishedGameByDate', () => {
    it('should dispatch the setAnalysisGame action for the analysisGame with the given date', () => {
      return expectSaga(loadFinishedGameSaga)
        .provide([
          [select(getAnalysisGameByDate, new Date(2019, 1, 1)), analysisGame],
        ])
        .put({ type: SET_ANALYSIS_GAME, payload: analysisGame })
        .dispatch({
          type: LOAD_FINISHED_GAME_BY_DATE,
          payload: new Date(2019, 1, 1),
        })
        .silentRun();
    });
  });

  describe('loadLatestFinishedGame', () => {
    it('should dispatch the setAnalysisGame action for the latest analysisGame', () => {
      return expectSaga(loadFinishedGameSaga)
        .provide([[select(getLatestAnalysisGame), analysisGame]])
        .put({ type: SET_ANALYSIS_GAME, payload: analysisGame })
        .dispatch({
          type: LOAD_LATEST_FINISHED_GAME,
        })
        .silentRun();
    });
  });
});
