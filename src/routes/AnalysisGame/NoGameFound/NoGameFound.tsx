import * as React from 'react';
import { Typography } from '@rmwc/typography';
import styles from './NoGameFound.module.css';
interface NoGameFoundProps {}

export function NoGameFound(props: NoGameFoundProps) {
  return (
    <div className={styles.noGameFound}>
      <Typography use="headline3" tag="h1">
        No game was found
      </Typography>
    </div>
  );
}
