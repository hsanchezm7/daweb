import { useEffect } from 'react';

const SITE_NAME = 'swapIt';

const useDocumentTitle = (title) => {
  useEffect(() => {
    const previousTitle = document.title;

    document.title = title ? `${title} | ${SITE_NAME}` : SITE_NAME;

    return () => {
      document.title = previousTitle;
    };
  }, [title]);
};

export default useDocumentTitle;
