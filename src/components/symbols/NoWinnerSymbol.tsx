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
            <i className="material-icons bigSymbol no-winner">remove</i>
        );
    }
}