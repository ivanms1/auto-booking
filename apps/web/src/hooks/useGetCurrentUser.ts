import { authQueryKey } from '@/services/login/request';
import { useQuery } from '@tanstack/react-query';

function useGetCurrentUser() {
  const { data, isLoading, error } = useQuery({
    ...authQueryKey.detail(),
    retry: 0,
  });

  return { user: data, isLoading };
}

export default useGetCurrentUser;
