declare module 'react-github-corner' {
    import * as React from 'react';
    import { CSSProperties } from 'react';

    interface GithubCornerProps {
        href?: string;
        size?: number | string;
        direction?: string;
        octoColor?: string;
        bannerColor?: string;
        ariaLabel?: string;
        className?: string;
        svgStyle?: CSSProperties;
    }

    export default class GithubCorner extends React.Component<GithubCornerProps, any> {}
}

declare module 'react-dom-confetti' {
    import * as React from 'react';

    interface ConfettiConfig {
        angle?: number;
        spread?: number;
        startVelocity?: number;
        elementCount?: number;
        decay?: number;
    }

    interface ConfettiProps {
        active: boolean;
        config?: ConfettiConfig;
    }

    export default class Confetti extends React.Component<ConfettiProps, any> {}
}