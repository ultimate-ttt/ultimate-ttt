import * as React from 'react';
import { Button } from '@rmwc/button';
import styles from './Paging.module.css';
import { useState } from 'react';
import { ArrowButtons } from '../ArrowButtons/ArrowButtons';

export interface PagingProps {
  pages: number;
  pageToStartWith: number;
  onPageChange: (newPage: number) => void;
  className?: string;
}

export function Paging(props: PagingProps) {
  const { pages, onPageChange, className } = props;

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
          unelevated={i === currentPage}
          outlined={i !== currentPage}
          dense={true}
          className={styles.pagingButton}
        />,
      );
    }
    return pageButtons;
  };

  return (
    <div className={className}>
      <ArrowButtons
        value={currentPage}
        maxValue={pages}
        minValue={1}
        onInteraction={(forward) => {
          let newPage = currentPage;
          if (forward) newPage++;
          else newPage--;
          setCurrentPage(newPage);
          onPageChange(newPage);
        }}
        handleKeyboard={false}
      >
        {getPages()}
      </ArrowButtons>
    </div>
  );
}
