import * as React from 'react';
import SmallBoardContainer from './SmallBoardContainer';

interface BigBoardProps {
}

interface BigBoardState {
}

export class BigBoard extends React.Component<BigBoardProps, BigBoardState> {

    constructor( props: BigBoardProps ) {
        super( props );

        this.createSmallBoards = this.createSmallBoards.bind( this );
    }

    createSmallBoards() {
        let rows = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                rows.push( (
                    <SmallBoardContainer
                        key={i.toString() + j.toString()}
                        x={i}
                        y={j}
                    />) );
            }
        }
        return rows;
    }

    render() {
        const smallBoards = this.createSmallBoards();

        return (
            <div className="big-board">
                {smallBoards}
            </div>
        );
    }
}