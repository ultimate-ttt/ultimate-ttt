import * as React from 'react';
import { configure, shallow } from 'enzyme';
import * as ReactSixteenAdapter from 'enzyme-adapter-react-16';
import { GameFinishedDisplay } from './GameFinishedText';
import { Player } from '../../state/AppState';

configure( {adapter: new ReactSixteenAdapter()} );

describe( 'GameFinished', function () {

    it('should match snapshot when draw', () => {
        const gameFinishedIndicator = shallow(<GameFinishedDisplay isGameFinished={true} winner={null!}/>);

        expect(gameFinishedIndicator).toMatchSnapshot();
    });

    it('should match snapshot when circle wins', () => {
        const gameFinishedIndicator = shallow(<GameFinishedDisplay isGameFinished={true} winner={Player.Circle}/>);

        expect(gameFinishedIndicator).toMatchSnapshot();
    });

    it('should match snapshot when cross wins', () => {
        const gameFinishedIndicator = shallow(<GameFinishedDisplay isGameFinished={true} winner={Player.Cross}/>);

        expect(gameFinishedIndicator).toMatchSnapshot();
    });

    it('should match snapshot when no one wins', () => {
        const gameFinishedIndicator = shallow(<GameFinishedDisplay isGameFinished={false} winner={null!}/>);

        expect(gameFinishedIndicator).toMatchSnapshot();
    });
} );