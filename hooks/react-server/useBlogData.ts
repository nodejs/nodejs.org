import useClientContext from '@/hooks/react-server/useClientContext';
import { useBaseBlogData } from '@/hooks/useBaseBlogData';

const useBlogData = () => {
  const { pathname } = useClientContext();
  const data = useBaseBlogData(pathname);

  return data;
};

export default useBlogData;
