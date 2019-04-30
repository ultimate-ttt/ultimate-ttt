import * as React from 'react';
import { Button } from '@rmwc/button';
import styles from './Paging.module.css';
import { useState } from 'react';

interface PagingProps {
  pages: number;
  pageToStartWith: number;
  onPageChange: (/* lastPage: number, */ newPage: number) => void;
  pagesToDisplayFrom?: number;
  pagesToDisplayTo?: number;
}

export function Paging(props: PagingProps) {
  const { pages, onPageChange } = props;

  const [currentPage, setCurrentPage] = useState(props.pageToStartWith);

  const getPages = () => {
    const pageButtons: JSX.Element[] = [];
    for (let i = 1; i < pages + 1; i++) {
      pageButtons.push(
        <Button
          key={i}
          label={i}
          onClick={() => {
            if (i !== currentPage) {
              setCurrentPage(i);
              onPageChange(i);
            }
          }}
          dense={true}
          ripple={false}
          outlined={i === currentPage}
          className={styles.pagingButton}
        />,
      );
    }
    return pageButtons;
  };

  return <div>{getPages()}</div>;
}
