import * as React from 'react';
import { configure, shallow } from 'enzyme';
import * as ReactSixteenAdapter from 'enzyme-adapter-react-16';
import { Player } from '../../state/AppState';
import { GameFinishedDisplay } from './GameFinishedDisplay';

configure( {adapter: new ReactSixteenAdapter()} );

describe( 'GameFinished', function () {

    it( 'should match snapshot when draw', () => {
        // tslint:disable:no-empty
        const restart = () => {
        };
        const gameFinishedIndicator = shallow( (
                                                   <GameFinishedDisplay
                                                       onRestartGame={restart}
                                                       isGameFinished={true}
                                                       winner={null!}
                                                   />
                                               ) );

        expect( gameFinishedIndicator ).toMatchSnapshot();
    } );

    it( 'should match snapshot when circle wins', () => {
        // tslint:disable:no-empty
        const restart = () => {
        };
        const gameFinishedIndicator = shallow( (
                                                   <GameFinishedDisplay
                                                       onRestartGame={restart}
                                                       isGameFinished={true}
                                                       winner={Player.Circle}
                                                   />
                                               ) );

        expect( gameFinishedIndicator ).toMatchSnapshot();
    } );

    it( 'should match snapshot when cross wins', () => {
        // tslint:disable:no-empty
        const restart = () => {
        };
        const gameFinishedIndicator = shallow( (
                                                   <GameFinishedDisplay
                                                       onRestartGame={restart}
                                                       isGameFinished={true}
                                                       winner={Player.Cross}
                                                   />
                                               ) );

        expect( gameFinishedIndicator ).toMatchSnapshot();
    } );

    it( 'should match snapshot when no one wins', () => {
        // tslint:disable:no-empty
        const restart = () => {
        };
        const gameFinishedIndicator = shallow( (
                                                   <GameFinishedDisplay
                                                       onRestartGame={restart}
                                                       isGameFinished={false}
                                                       winner={null!}
                                                   />
                                               ) );

        expect( gameFinishedIndicator ).toMatchSnapshot();
    } );
} );