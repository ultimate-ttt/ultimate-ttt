import howToPlayReducer from './howToPlayReducer';
import {
  howToPlayClose,
  howToPlayOpen,
  howToPlayStateForward,
  howToPlayStepBackward,
  howToPlayStepForward,
} from './howToPlayActions';
import { howToPlaySteps } from './howToPlaySteps';

const getInitState = () => {
  return {
    open: false,
    stepNumber: 0,
    maxStepNumber: howToPlaySteps.length - 1,
    stateNumber: -1,
    boardState: {
      animate: true,
      board: howToPlaySteps[0].states[0].getBoard(),
      currentPlayer: howToPlaySteps[0].states[0].getCurrentPlayer(),
      activeBoards: howToPlaySteps[0].states[0].getCurrentActiveBoards(),
    },
  };
};

describe('howToPlayReducer', () => {
  it('should return init state', () => {
    const initState = howToPlayReducer(undefined, { type: 'init' });
    expect(initState).not.toBeNull();
    expect(initState).not.toBeUndefined();
    expect(initState.maxStepNumber).toBe(howToPlaySteps.length - 1);
  });

  describe('howToPlayOpen', () => {
    it('should set open to true', () => {
      const action = howToPlayOpen();
      const newState = howToPlayReducer(undefined, action);

      expect(newState).not.toBeUndefined();
      expect(newState.open).toBe(true);
    });

    it('should set state to init state', () => {
      let initState = getInitState();
      initState.stepNumber = 10;
      initState.stateNumber = 10;

      const action = howToPlayOpen();
      const newState = howToPlayReducer(initState, action);

      expect(newState.stepNumber).toEqual(getInitState().stepNumber);
      expect(newState.stateNumber).toEqual(getInitState().stateNumber);
    });
  });

  describe('howToPlayClose', () => {
    it('should set open to false', () => {
      let initState = getInitState();
      initState.open = true;

      const action = howToPlayClose();
      const newState = howToPlayReducer(initState, action);

      expect(newState.open).toBe(false);
    });
  });

  describe('howToPlayStepForward', () => {
    it('should apply next step values', () => {
      const initState = getInitState();
      const action = howToPlayStepForward();
      const newState = howToPlayReducer(initState, action);

      expect(newState.stepNumber).toBe(1);
      expect(newState.stateNumber).toBe(-1);
      expect(newState.boardState).toEqual(initState.boardState);
    });

    it('should set state number to 0 on step with multiple states', () => {
      const index = howToPlaySteps.findIndex((s) => s.states.length > 1);
      let initState = getInitState();
      initState.stepNumber = index - 1;

      const action = howToPlayStepForward();
      const newState = howToPlayReducer(initState, action);

      expect(newState.stepNumber).toBe(index);
      expect(newState.stateNumber).toBe(0);
    });
  });

  describe('howToPlayStepBackward', () => {
    it('should apply previous step values', () => {
      let initState = getInitState();
      initState.stepNumber = 1;

      const action = howToPlayStepBackward();
      const newState = howToPlayReducer(initState, action);

      expect(newState.stepNumber).toBe(0);
      expect(newState.stateNumber).toBe(-1);
      expect(newState.boardState).toEqual(initState.boardState);
    });

    it('should set state number to 0 on step with multiple states', () => {
      const index = howToPlaySteps.findIndex((s) => s.states.length > 1);
      let initState = getInitState();
      initState.stepNumber = index + 1;

      const action = howToPlayStepBackward();
      const newState = howToPlayReducer(initState, action);

      expect(newState.stepNumber).toBe(index);
      expect(newState.stateNumber).toBe(0);
    });
  });

  describe('howToPlayStateForward', () => {
    describe('state cycling based on moves', () => {
      it('should apply next state', () => {
        const index = howToPlaySteps.findIndex((s) => s.moves.length > 0);
        let initState = getInitState();
        initState.stepNumber = index;
        initState.stateNumber = -1;

        const action = howToPlayStateForward();
        const newState = howToPlayReducer(initState, action);

        expect(newState.stateNumber).toBe(0);
        expect(newState.boardState).not.toEqual(initState.boardState);
      });

      it('should set stateNumber to -1 when last state applied', () => {
        const index = howToPlaySteps.findIndex(
          (s) => s.moves.length > 0 && s.states[0].getMoves().length > 0,
        );
        let initState = getInitState();
        initState.stepNumber = index;
        initState.stateNumber = howToPlaySteps[index].moves.length - 1;

        const action = howToPlayStateForward();
        const newState = howToPlayReducer(initState, action);

        expect(newState.stateNumber).toBe(-1);
        expect(newState.boardState).not.toEqual(initState.boardState);
      });
    });

    describe('state cycling based on states', () => {
      it('should apply next state', () => {
        const index = howToPlaySteps.findIndex((s) => s.states.length > 1);
        let initState = getInitState();
        initState.stepNumber = index;
        initState.stateNumber = 1;

        const action = howToPlayStateForward();
        const newState = howToPlayReducer(initState, action);

        expect(newState.stateNumber).toBe(2);
        expect(newState.boardState).not.toEqual(initState.boardState);
      });

      it('should set stateNumber to 0 when last state applied', () => {
        const index = howToPlaySteps.findIndex((s) => s.states.length > 1);
        let initState = getInitState();
        initState.stepNumber = index;
        initState.stateNumber = howToPlaySteps[index].states.length - 1;

        const action = howToPlayStateForward();
        const newState = howToPlayReducer(initState, action);

        expect(newState.stateNumber).toBe(0);
        expect(newState.boardState).not.toEqual(initState.boardState);
      });
    });
  });
});
