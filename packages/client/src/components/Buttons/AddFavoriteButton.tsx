import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Pressable, StyleProp, ViewStyle } from 'react-native';

import { useAddToFavorites } from '../../apollo/ad/useAddToFavorites';
import { CurrentUser_currentUser } from '../../apollo/types/CurrentUser';
import { Icon } from '../../utils/icons';
import { blackColor, primaryColor } from '../../utils/theme/colors';

interface Props {
  user?: CurrentUser_currentUser;
  adId: string;
  style?: StyleProp<ViewStyle>;
}

export const AddFavoriteButton: React.FC<Props> = ({ user, adId, style }) => {
  const [addToFavorites] = useAddToFavorites();

  const isFavorite = () => !!user?.favorites?.find((fav) => fav.id === adId);

  const [favorite, setFavorite] = useState(isFavorite());

  React.useEffect(() => {
    setFavorite(isFavorite());
  }, [user]);

  return (
    <Pressable
      style={[styles.starIcon, style]}
      onPress={() => {
        setFavorite((oldValue) => !oldValue);

        try {
          addToFavorites({
            variables: { adId },
          });
        } catch (error) {
          setFavorite((oldValue) => !oldValue);
          console.error(error);
        }
      }}
    >
      {favorite ? (
        // <ImageComponent name="star-filled" style={styles.starFilled} />
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
