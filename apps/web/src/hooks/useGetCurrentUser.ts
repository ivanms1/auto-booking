import { useQuery } from '@tanstack/react-query';
import { authQueryKey } from '@/services/login/request';

function useGetCurrentUser() {
  const { data, isLoading } = useQuery({
    ...authQueryKey.detail(),
    retry: 0,
  });

  return { user: data, isLoading };
}

export default useGetCurrentUser;
