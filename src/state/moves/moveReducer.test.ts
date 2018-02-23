import moveReducer from './moveReducer';
import { registerMove } from './moveAction';
import { Player } from '../AppState';

describe( 'moveReducer', () => {
    it('should return init state', () => {
       let initState = moveReducer(undefined, {type: 'init'});
       expect(initState).not.toBeNull();
       expect(initState).not.toBeUndefined();
    });

    it('should add a move', () => {
        const bigBoardPoint = {x: 1, y: 2};
        const smallBoardPoint = {x: 2, y: 2};
        const action = registerMove(bigBoardPoint, smallBoardPoint, Player.Cross);
        let newState = moveReducer(undefined, action);

        expect(newState[0].bigBoardPoint.x).toEqual(1);
        expect(newState[0].bigBoardPoint.y).toEqual(2);
        expect(newState[0].smallBoardPoint.x).toEqual(2);
        expect(newState[0].smallBoardPoint.y).toEqual(2);
        expect(newState[0].player).toEqual(Player.Cross);

        expect(newState[0].moveNumber).toEqual(1);
    });

    it('should count up moveNumber', () => {
        const bigBoardPoint1 = {x: 2, y: 2};
        const smallBoardPoint1 = {x: 1, y: 2};
        const action1 = registerMove(bigBoardPoint1, smallBoardPoint1, Player.Cross);

        const bigBoardPoint2 = {x: 1, y: 2};
        const smallBoardPoint2 = {x: 0, y: 0};
        const action2 = registerMove(bigBoardPoint2, smallBoardPoint2, Player.Cross);

        const bigBoardPoint3 = {x: 0, y: 0};
        const smallBoardPoint3 = {x: 2, y: 2};
        const action3 = registerMove(bigBoardPoint3, smallBoardPoint3, Player.Cross);

        const newState1 = moveReducer(undefined, action1);
        const newState2 = moveReducer(newState1, action2);
        const newState3 = moveReducer(newState2, action3);

        expect(newState1[0].moveNumber).toEqual(1);
        expect(newState2[1].moveNumber).toEqual(2);
        expect(newState3[2].moveNumber).toEqual(3);
    });
});