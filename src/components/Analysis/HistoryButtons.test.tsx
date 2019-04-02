import * as React from 'react';
import { configure, shallow } from 'enzyme';
import * as ReactSixteenAdapter from 'enzyme-adapter-react-16';
import { HistoryButtons } from './HistoryButtons';
import { Button } from '@rmwc/button';

configure( {adapter: new ReactSixteenAdapter()} );

describe( 'HistoryButtons', function () {
    it( 'should match snapshot', () => {
        // tslint:disable:no-empty
        const moveForwardInHistory = jest.fn((numberOfMoves) => {});
        const moveBackwardInHistory = jest.fn((numberOfMoves) => {});

        const historyButtons = shallow(
            <HistoryButtons
                currentMove={1}
                lastMove={15}
                moveForwardInHistory={moveForwardInHistory}
                moveBackwardInHistory={moveBackwardInHistory}
            />
        );

        expect(historyButtons).toMatchSnapshot();
    } );

    it( 'calls forward when move forward button is clicked', () => {
        // tslint:disable:no-empty
        const moveForwardInHistory = jest.fn((numberOfMoves) => {});
        const moveBackwardInHistory = jest.fn((numberOfMoves) => {});

        const historyButtons = shallow(
            <HistoryButtons
                currentMove={1}
                lastMove={15}
                moveForwardInHistory={moveForwardInHistory}
                moveBackwardInHistory={moveBackwardInHistory}
            />
        );

        const forwardButton = historyButtons.find(Button).at(1);
        forwardButton.simulate('click');

        expect(moveForwardInHistory).toHaveBeenCalledWith(1);
    });

    it( 'calls backward when move backward button is clicked', () => {
        // tslint:disable:no-empty
        const moveForwardInHistory = jest.fn((numberOfMoves) => {});
        const moveBackwardInHistory = jest.fn((numberOfMoves) => {});

        const historyButtons = shallow(
            <HistoryButtons
                currentMove={1}
                lastMove={15}
                moveForwardInHistory={moveForwardInHistory}
                moveBackwardInHistory={moveBackwardInHistory}
            />
        );

        const backwardButton = historyButtons.find(Button).first();
        backwardButton.simulate('click');

        expect(moveBackwardInHistory).toHaveBeenCalledWith(1);
    });
} );