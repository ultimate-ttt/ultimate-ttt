import * as React from 'react';
import { Typography, TypographyT } from '@rmwc/typography';
import styles from './NoGameFound.module.css';
import classNames from 'classnames';

interface NoGameFoundProps {
  tag: string;
  center?: boolean;
  className?: string;
  children?: any;
  size?: TypographyT;
}

export function NoGameFound(props: NoGameFoundProps) {
  return (
    <div
      className={classNames(props.className, {
        [styles.noGameFoundLayout]: props.center,
      })}
    >
      <Typography use={props.size ? props.size : 'headline3'} tag={props.tag}>
        {props.children ? props.children : 'No game was found'}
      </Typography>
    </div>
  );
}
