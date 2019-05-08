import * as React from 'react';
import { RMWCProvider } from '@rmwc/provider';

interface IconProviderProps {
  children?: any;
}

export function IconProvider(props: IconProviderProps) {
  return (
    <RMWCProvider
      icon={{
        strategy: 'className',
        basename: '',
        prefix: 'icon-',
      }}
    >
      {props.children}
    </RMWCProvider>
  );
}
