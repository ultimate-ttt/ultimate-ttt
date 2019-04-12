import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { number, withKnobs } from '@storybook/addon-knobs';
import { HistoryButtons } from './HistoryButtons';
import { action } from '@storybook/addon-actions';
import { RMWCProvider } from '@rmwc/provider';

const stories = storiesOf('Analysis', module);
stories.addDecorator(withKnobs);

stories.add('HistoryButtons', () => (
  <RMWCProvider
    icon={{
      strategy: 'className',
      basename: '',
      prefix: 'icon-',
    }}
  >
    <div className="historyButtons">
      <HistoryButtons
        currentMove={number('currentMove', 1)}
        lastMove={number('lastMove', 5)}
        moveForwardInHistory={action('moveForwardInHistory')}
        moveBackwardInHistory={action('moveBackwardInHistory')}
        onInteraction={action('interaction')}
      />
    </div>
  </RMWCProvider>
));
