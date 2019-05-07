import * as React from 'react';
import { Typography } from '@rmwc/typography';
import styles from './NoGameFound.module.css';
import classNames from 'classnames';

interface NoGameFoundProps {
  center?: boolean;
  className?: string;
  tag: string;
}

export function NoGameFound(props: NoGameFoundProps) {
  return (
    <div
      className={classNames(props.className, {
        [styles.noGameFoundLayout]: props.center,
      })}
    >
      <Typography use="headline3" tag={props.tag}>
        No game was found
      </Typography>
    </div>
  );
}
