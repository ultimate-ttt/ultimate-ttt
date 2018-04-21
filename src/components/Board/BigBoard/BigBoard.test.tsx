import * as React from 'react';
import { configure, shallow } from 'enzyme';
import * as ReactSixteenAdapter from 'enzyme-adapter-react-16';
import { Player } from '../../../state/AppState';
import unfinishedBoardMock from '../../../__mocks__/unfinishedBoardMock';
import { BigBoard } from './BigBoard';

configure( {adapter: new ReactSixteenAdapter()} );

describe( 'BigBoard', function () {
    it( 'should render 9 small boards', () => {
        // tslint:disable:no-empty
        const playerMoved = jest.fn( () => {
        } );
        const activeBoards = [{x: 0, y: 0}];

        const bigBoard = shallow( (
                                      <BigBoard
                                          currentPlayer={Player.Cross}
                                          board={unfinishedBoardMock}
                                          activeBoards={activeBoards}
                                          onPlayerMoved={playerMoved}
                                      />) );

        expect( bigBoard.children().length ).toBe( 9 );
    } );

    it( 'should match snapshot', () => {
        // tslint:disable:no-empty
        const playerMoved = jest.fn( () => {
        } );
        const activeBoards = [{x: 0, y: 0}];

        const bigBoard = shallow( (
                                      <BigBoard
                                          currentPlayer={Player.Cross}
                                          board={unfinishedBoardMock}
                                          activeBoards={activeBoards}
                                          onPlayerMoved={playerMoved}
                                      />) );

        expect( bigBoard ).toMatchSnapshot();
    } );
} );