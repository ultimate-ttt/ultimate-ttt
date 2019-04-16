import { expectSaga } from 'redux-saga-test-plan';
import { select } from 'redux-saga/effects';
import { Player, Winner } from '../AppState';
import loadFinishedGameSaga from './analysisGameSaga';
import { getAnalysisGameById } from '../selectors/AnalysisGameStateSelectors';
import { crossFinishedBoardMock } from '../../__mocks__';
import {
  LOAD_FINISHED_GAME_BY_ID,
  SET_ANALYSIS_GAME,
} from './analysisGameActions';

describe('loadFinishedGameSaga', () => {
  const analysisGame = {
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

  // if more put effects happen: this catches it + this checks for the order
  it('should match snapshot', () => {
    return expectSaga(loadFinishedGameSaga)
      .provide([[select(getAnalysisGameById, '1'), analysisGame]])
      .dispatch({
        type: LOAD_FINISHED_GAME_BY_ID,
        payload: '1',
      })
      .silentRun()
      .then((result) => {
        expect(result.toJSON()).toMatchSnapshot();
      });
  });
});
