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