import * as React from 'react';
import BigBoard from '../components/Board/BigBoard/BigBoard';

interface AnalyticsProps {
}

export class Analytics extends React.Component<AnalyticsProps> {

    render() {
        return (
            <div className="center">

                <BigBoard analysisMode={true}/>
            </div>
        );
    }
}

// TODO find a good way to change state with current infrastructure.

// playerMoved won't work because you also have to be able to move backwards.
// Easiest for the UI in the end would be to set state everytime completely new.
// But that would require to know it beforehand completely
// So the only way that is possible is to calculate it for every move