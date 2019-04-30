import * as React from 'react';
import { Button } from '@rmwc/button';

interface PagingProps {
  pages: number;
  currentPage: number;
  onPageChange: (/* lastPage: number, */ newPage: number) => void;
  pagesToDisplayFrom?: number;
  pagesToDisplayTo?: number;
}

export function Paging(props: PagingProps) {
  return (
    <Button raised={false} dense={true}>
      1
    </Button>
  );
}
