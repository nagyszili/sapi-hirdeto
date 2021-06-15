import { useReactiveVar } from '@apollo/client';
import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Pressable, StyleProp, ViewStyle } from 'react-native';

import { addToAsyncFavorites } from '../../apollo/ad/addToAsyncFavorites';
import { useAddToFavorites } from '../../apollo/ad/useAddToFavorites';
import {
  isLoggedInVar,
  asyncFavoritesVar,
} from '../../apollo/reactiveVariables';
import { CurrentUser_currentUser } from '../../apollo/types/CurrentUser';
import { Icon } from '../../utils/icons';
import { blackColor, primaryColor } from '../../utils/theme/colors';

interface Props {
  user?: CurrentUser_currentUser;
  adId: string;
  style?: StyleProp<ViewStyle>;
}

export const AddFavoriteButton: React.FC<Props> = ({ user, adId, style }) => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const asyncFavorites = useReactiveVar(asyncFavoritesVar);

  const isFavorite = () => {
    if (isLoggedIn && user) {
      return user.favorites?.some((fav) => fav === adId) || false;
    }
    return asyncFavorites.some((fav) => fav === adId) || false;
  };

  const [favorite, setFavorite] = useState<boolean>(false);

  const [addToFavorites] = useAddToFavorites(setFavorite);

  React.useEffect(() => {
    setFavorite(isFavorite());
  }, [user, isLoggedIn, asyncFavorites]);

  const onPress = () => {
    setFavorite((oldValue) => !oldValue);

    if (isLoggedIn && user?.id) {
      addToFavorites({
        variables: { adId },
      });
    } else {
      addToAsyncFavorites(adId);
    }
  };

  return (
    <Pressable style={[styles.starIcon, style]} onPress={onPress}>
      {favorite ? (
        <Icon name="star-empty" size={24} color={primaryColor} />
      ) : (
        <Icon name="star-empty" size={24} color={blackColor} />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  starIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    padding: 5,
  },
  starFilled: {
    marginRight: 2.5,
    width: 20,
    height: 20,
  },
});
