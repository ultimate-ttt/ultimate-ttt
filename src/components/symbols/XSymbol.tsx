import * as React from 'react';

interface XSymbolProps {
    bigSymbol?: boolean;
    shouldAnimate?: boolean;
}

interface XSymbolState {
}

export class XSymbol extends React.Component<XSymbolProps, XSymbolState> {

    public static defaultProps: Partial<XSymbolProps> = {
        shouldAnimate: true
    };

    constructor( props: XSymbolProps ) {
        super( props );
    }

    render() {
        const bigSymbolClass = this.props.bigSymbol ? 'big-symbol' : '';
        let animateClass = this.props.shouldAnimate ? 'animate-x' : '';
        if (animateClass.length > 0 && this.props.bigSymbol) {
            animateClass += `-${bigSymbolClass}`;
        }

        return (
            <i className={`material-icons x ${bigSymbolClass} ${animateClass}`}>clear</i>
        );
    }
}