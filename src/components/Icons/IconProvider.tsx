import * as React from 'react';
import { RMWCProvider } from '@rmwc/provider';

interface IconProviderProps {
  children?: any;
}

/* If we ever need to customize something for all icons. */
export function IconProvider(props: IconProviderProps) {
  return <RMWCProvider>{props.children}</RMWCProvider>;
}
