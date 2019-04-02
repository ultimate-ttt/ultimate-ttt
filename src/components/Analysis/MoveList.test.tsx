import * as React from 'react';
import { configure, shallow } from 'enzyme';
import * as ReactSixteenAdapter from 'enzyme-adapter-react-16';
import { MoveList } from './MoveList';
import { Move, Player } from '../../state/AppState';
import { List } from '@rmwc/list';

configure( {adapter: new ReactSixteenAdapter()} );

describe( 'MoveList', function () {
    const moves: Move[] = [
        {
            moveNumber: 1,
            player: Player.Cross,
            tilePosition: {x: 0, y: 0},
            boardPosition: {x: 0, y: 0}
        },
        {
            moveNumber: 2,
            player: Player.Circle,
            tilePosition: {x: 0, y: 1},
            boardPosition: {x: 0, y: 0}
        },
        {
            moveNumber: 3,
            player: Player.Cross,
            tilePosition: {x: 0, y: 0},
            boardPosition: {x: 0, y: 1}
        },
        {
            moveNumber: 4,
            player: Player.Circle,
            tilePosition: {x: 0, y: 2},
            boardPosition: {x: 0, y: 0}
        },
    ].reverse();

    it( 'should match snapshot', () => {
        // tslint:disable:no-empty
        const moveForwardInHistory = jest.fn( ( numberOfMoves ) => {
        } );
        const moveBackwardInHistory = jest.fn( ( numberOfMoves ) => {
        } );

        const moveList = shallow(
            <MoveList
                reversedMoves={moves}
                currentMove={moves.length}
                moveForwardInHistory={moveForwardInHistory}
                moveBackwardInHistory={moveBackwardInHistory}
            />
        );

        expect( moveList ).toMatchSnapshot();
    } );

    it( 'should display amount of moves in list', () => {
        // tslint:disable:no-empty
        const moveForwardInHistory = jest.fn( ( numberOfMoves ) => {
        } );
        const moveBackwardInHistory = jest.fn( ( numberOfMoves ) => {
        } );

        const moveList = shallow(
            <MoveList
                reversedMoves={moves}
                currentMove={moves.length}
                moveForwardInHistory={moveForwardInHistory}
                moveBackwardInHistory={moveBackwardInHistory}
            />
        );

        expect( moveList.find( List ).children().length ).toBe( moves.length );
    } );
/*
    // TODO this doesn't work yet.. rmwc is probably the problem..
    it( 'should call backward function with 3 when currentMove is 4 and move 1 is clicked', () => {
        // tslint:disable:no-empty
        const moveForwardInHistory = jest.fn( ( number ) => {
        } );
        const moveBackwardInHistory = jest.fn( ( number ) => {
        } );

        const moveList = shallow(
            <MoveList
                reversedMoves={moves}
                currentMove={moves.length}
                moveForwardInHistory={moveForwardInHistory}
                moveBackwardInHistory={moveBackwardInHistory}
            />
        );

        const elementToClick = moveList.find( List ).childAt( moves.length - 1 );
        elementToClick.simulate( 'click' );

        expect( moveForwardInHistory ).toHaveBeenCalledTimes(1); //  moves.length - 1 );
    } );

    // TODO add more tests for backward moving and also for forward moving
    */
} );
