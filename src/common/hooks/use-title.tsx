import { useEffect } from 'react';

function useTitle(title: string): void {
  useEffect(() => {
    document.title = `AMORA - ${title}`;
  }, [title]);
}

export default useTitle;
