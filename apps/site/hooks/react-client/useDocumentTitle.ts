import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const useDocumentTitle = (): string => {
  const pathname = usePathname();
  const [title, setTitle] = useState<string>(window.document.title);

  useEffect(() => {
    setTitle(window.document.title);
  }, [pathname]);

  return title;
};

export default useDocumentTitle;
