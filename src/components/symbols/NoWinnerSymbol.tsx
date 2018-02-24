import * as React from 'react';

interface NoWinnerSymbolProps {
}

interface NoWinnerSymbolState {
}

export class NoWinnerSymbol extends React.Component<NoWinnerSymbolProps, NoWinnerSymbolState> {

    constructor( props: NoWinnerSymbolProps ) {
        super( props );
    }

    render() {
        return (
            <i className="material-icons big-symbol no-winner animate-no-winner-big-symbol">remove</i>
        );
    }
}