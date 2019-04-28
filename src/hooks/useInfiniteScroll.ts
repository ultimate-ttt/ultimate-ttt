import { useState, useEffect } from 'react';

const useInfiniteScroll = (callback: () => void) => {
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    function handleScroll() {
      const scrollHeight = document.body.scrollHeight;
      const totalHeight = window.scrollY + window.innerHeight;

      if (totalHeight < scrollHeight || isFetching) {
        console.log('is fetching will not be triggered');
        return;
      }

      console.log('is fetching was triggered.');
      setIsFetching(true);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFetching]);
  useEffect(() => {
    if (!isFetching) return;
    callback();
  }, [isFetching, callback]);

  return [isFetching, setIsFetching] as [boolean, (item: boolean) => void];
};

export default useInfiniteScroll;
