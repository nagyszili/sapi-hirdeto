import { useReactiveVar } from '@apollo/client';

import { useSetAdStatus } from '../apollo/ad/useSetAdStatus';
import { isLoggedInVar } from '../apollo/reactiveVariables';
import { setLoading } from '../apollo/ui/uiMutations';
import { useCurrentUser } from '../apollo/user/useCurrentUser';
import { STATUS, CURRENCY, ROLES } from '../utils/constants';

interface SetAdStatusParams {
  userId: string;
  adId: string;
  status: string;
  reasonOfDelete?: string;
}

export const useSetAdStatusById = () => {
  const [setAdStatus] = useSetAdStatus();
  const { data: user, loading: userLoading } = useCurrentUser();
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  const _setAdStatus = async ({
    userId,
    adId,
    status,
    reasonOfDelete,
  }: SetAdStatusParams) => {
    if (isAdBelongsToUser(userId)) {
      setLoading(true);
      try {
        await setAdStatus({
          variables: {
            id: adId,
            status,
            ...(reasonOfDelete ? { reasonOfDelete } : {}),
          },
          optimisticResponse: {
            setAdStatus: {
              status,
              __typename: 'Ad',
              id: adId,
            },
          },
          update: (cache) => {
            if (status === STATUS.DELETED) {
              cache.evict({
                id: cache.identify({
                  __typename: 'AdListItem',
                  id: adId,
                  currency: CURRENCY.EURO,
                }),
                broadcast: false,
              });
              cache.evict({
                id: cache.identify({
                  __typename: 'AdListItem',
                  id: adId,
                  currency: CURRENCY.LEI,
                }),
                broadcast: false,
              });

              cache.gc();
            }
          },
        });
      } catch (error) {
        console.error(error);
        alert('Error');
      }
      setLoading(false);
    }
  };

  const isAdBelongsToUser = (userId: string) =>
    isLoggedIn
      ? user?.currentUser.id === userId ||
        user?.currentUser.role === ROLES.ADMIN
      : false;

  return {
    setAdStatus: _setAdStatus,
    isAdBelongsToUser,
    user,
    userLoading,
  };
};
