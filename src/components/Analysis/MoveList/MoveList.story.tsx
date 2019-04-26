import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { number, object, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { RMWCProvider } from '@rmwc/provider';
import { MoveList } from './MoveList';
import { movesForBoardWithThreeMovesMock } from '../../../__mocks__';

const stories = storiesOf('Analysis', module);
stories.addDecorator(withKnobs);

stories.add('MoveList', () => (
  <RMWCProvider
    icon={{
      strategy: 'className',
      basename: '',
      prefix: 'icon-',
    }}
  >
    <div className="moveList">
      <MoveList
        currentMove={number('currentMove', 2)}
        reversedMoves={object(
          'reversedMoves',
          movesForBoardWithThreeMovesMock.slice().reverse(),
        )}
        moveForwardInHistory={action('moveForwardInHistory')}
        moveBackwardInHistory={action('moveBackwardInHistory')}
      />
    </div>
  </RMWCProvider>
));
