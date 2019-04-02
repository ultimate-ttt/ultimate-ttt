import * as React from 'react';
import { configure, shallow } from 'enzyme';
import * as ReactSixteenAdapter from 'enzyme-adapter-react-16';
import { Analysis } from './Analysis';
import { circleFinishedBoardMock } from '../../__mocks__/finishedBoardMock';
import { Player } from '../../state/AppState';

configure( {adapter: new ReactSixteenAdapter()} );

describe('Analysis', () => {
    it('should match snapshot', () => {
        // tslint:disable:no-empty
        const onLoad = jest.fn((id) => {});
        const moveForwardInHistory = jest.fn((number) => {});
        const moveBackwardInHistory = jest.fn((number) => {});
        const mock: any = jest.fn();
        const match = {
            isExact: true,
            params: {
                id: 'someId'
            },
            path: "",
            url: ""
        }

        const analysis = shallow(
           <Analysis
               onLoad={onLoad}
               moveForwardInHistory={moveForwardInHistory}
               moveBackwardInHistory={moveBackwardInHistory}
               board={circleFinishedBoardMock}
               activeBoards={[]}
               currentPlayer={Player.Cross}
               currentMove={1}
               history={mock}
               location={mock}
               match={match}
           />
       );

        expect(analysis).toMatchSnapshot();
    });

    it('should call onLoad with givenId when mounted', () => {
        // tslint:disable:no-empty
        const onLoad = jest.fn((id) => {});
        const moveForwardInHistory = jest.fn((number) => {});
        const moveBackwardInHistory = jest.fn((number) => {});
        const mock: any = jest.fn();
        const match = {
            isExact: true,
            params: {
                id: '123'
            },
            path: "",
            url: ""
        }

        shallow(
            <Analysis
                onLoad={onLoad}
                moveForwardInHistory={moveForwardInHistory}
                moveBackwardInHistory={moveBackwardInHistory}
                board={circleFinishedBoardMock}
                activeBoards={[]}
                currentPlayer={Player.Cross}
                currentMove={1}
                history={mock}
                location={mock}
                match={match}
            />
        );

        expect(onLoad).toHaveBeenCalledWith('123');
    });
});